/* ==================== CHAT SML BOT - V5 COM RASTREAMENTO GA4 ==================== */
(function() {
  const chatFab = document.getElementById('chatFab');
  const chatOverlay = document.getElementById('chatOverlay');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  // ============ GA4 TRACKING ============
  function trackEvent(eventName, params = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
  }

  // ============ SISTEMA DE NORMALIZAÇÃO ============
  const typos = {
    'preso': 'preço', 'presiso': 'preciso', 'orcsamento': 'orçamento', 'orcamento': 'orçamento',
    'manutencao': 'manutenção', 'duvida': 'dúvida', 'obrigado': 'obrigado', 'obrigada': 'obrigado',
    'vlw': 'valeu', 'blz': 'beleza', 'tb': 'também', 'tbm': 'também', 'vc': 'você',
    'vcs': 'vocês', 'qto': 'quanto', 'qt': 'quanto', 'q': 'que', 'pq': 'porque',
    'prazo': 'prazo', 'praso': 'prazo', 'garatia': 'garantia', 'garantia': 'garantia',
    'dominio': 'domínio', 'hospedagem': 'hospedagem', 'responsivo': 'responsivo',
    'ecommerce': 'e-commerce', 'e commerce': 'e-commerce', 'loja virtual': 'e-commerce',
    'landing page': 'landing', 'landingpage': 'landing', 'bio page': 'vitrine',
    'whats': 'whatsapp', 'zap': 'whatsapp', 'wpp': 'whatsapp', 'celular': 'mobile',
    'site institucional': 'institucional', 'app': 'aplicativo', 'aplicativo': 'app',
    'cartao': 'cartão', 'pix': 'pix', 'dinheiro': 'pagamento', 'custo': 'preço',
    'valor': 'preço', 'investimento': 'preço', 'cobrar': 'preço', 'taxa': 'preço',
    'catalogo': 'catálogo', 'portfolio': 'portfólio', 'portfolio': 'portfólio',
    'ingles': 'inglês', 'traducao': 'tradução', 'multi idioma': 'multilíngue',
    'logo': 'identidade visual', 'logotipo': 'identidade visual', 'marca': 'identidade visual',
    'curso': 'aula', 'ensinar': 'curso', 'aula': 'curso', 'aprender': 'curso',
    'contratar': 'vaga', 'estagio': 'vaga', 'estágio': 'vaga', 'emprego': 'vaga',
    'revender': 'parceria', 'sociedade': 'parceria', 'socio': 'parceria',
    'urgencia': 'urgência', 'urgencia': 'urgência', 'pra hoje': 'urgência',
    'presente': 'vale-presente', 'gift': 'vale-presente', 'brinde': 'vale-presente',
    'sistema': 'sistema web', 'sistema web': 'sistema', 'erp': 'sistema',
    'agendamento': 'agenda', 'agenda': 'agendamento', 'reserva': 'agendamento',
    'wordpress': 'wordpress', 'elementor': 'wordpress', 'wix': 'wordpress',
    'anuncio': 'tráfego', 'trafego': 'tráfego', 'google ads': 'tráfego',
    'facebook ads': 'tráfego', 'instagram ads': 'tráfego', 'meta ads': 'tráfego',
    'google meu negocio': 'google business', 'gmb': 'google business',
    'perto de mim': 'seo local', 'procurar': 'seo', 'buscar': 'seo',
    'botao': 'botão', 'botão de pagamento': 'pagamento online',
    'pagamento online': 'pagamento online', 'checkout': 'pagamento online',
    'manutencao site outro': 'site terceiro', 'site de outro': 'site terceiro',
    'nao fui eu que fiz': 'site terceiro', 'outro dev': 'site terceiro',
    'indicacao': 'indicação', 'recomendar': 'indicação', 'conhece': 'indicação',
    'alguem': 'indicação', 'outro desenvolvedor': 'indicação',
  };

  function normalize(text) {
    let normalized = text.toLowerCase()
      .replace(/[àáâãä]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    
    for (const [typo, correct] of Object.entries(typos)) {
      normalized = normalized.replace(new RegExp('\\b' + typo + '\\b', 'g'), correct);
    }
    return normalized;
  }

  let conversationContext = { lastIntent: null, lastTopic: null, messageCount: 0, askingForPrice: false };

  // ============ BASE DE CONHECIMENTO (50+ INTENTS) ============
  const knowledgeBase = [
    { id: 'saudacao', keywords: ['oi', 'ola', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'saudações', 'iae', 'opa', 'fala', 'salve', 'bao', 'boa', 'hi', 'hello', 'iniciar', 'comecar', 'ajuda', 'poderia', 'gostaria'], weight: 10, gaEvent: 'chat_saudacao', responses: ["👋 Olá! Sou o assistente virtual da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br>Posso te ajudar com:<br>📱 <b>Vitrine Bio</b> (R$97) • 🎯 <b>Landing Page</b> (R$550)<br>📄 <b>Site 2 páginas</b> (R$700) • 🏢 <b>Institucional</b> (R$1.000)<br>🛒 <b>E-commerce</b> (sob consulta)<br><br>Pergunte à vontade sobre preços, prazos, materiais, manutenção, garantia ou qualquer dúvida! 💬", "Olá! 😊 Seja bem-vindo! Sou o assistente da SML/PN. Pergunte sobre planos, preços, prazos ou o que precisar. Estou aqui para ajudar!", "Hey! 👋 Que bom falar com você! Sou o bot da SML/PN. Temos sites a partir de R$97, garantia de 7 dias e hospedagem inclusa. No que posso ajudar?"] },
    { id: 'preco', keywords: ['preco', 'quanto', 'custa', 'valor', 'investimento', 'cobrar', 'taxa', 'tabela', 'planos', 'todos os precos', 'lista de precos', 'valores', 'precos', 'precinho', 'custo', 'orçamento'], weight: 15, gaEvent: 'chat_intent_preco', responses: ["📋 <b>Tabela completa (pagamento único):</b><br><br>📱 <b>Vitrine Bio</b> — R$ 97<br>🎯 <b>Landing Page</b> — R$ 550<br>📄 <b>Site 2 páginas</b> — R$ 700<br>🏢 <b>Institucional (até 5 págs)</b> — R$ 1.000<br>🛒 <b>E-commerce</b> — sob consulta<br><br>🛠️ <b>Manutenções:</b> R$ 40 a R$ 250<br>📦 <b>Pacote mensal:</b> R$ 200 (até 5 alterações)<br><br>✅ <b>Garantia de 7 dias</b> • 💳 50% início + 50% entrega<br>🌐 <b>Hospedagem inclusa!</b><br><br>Qual desses te interessa mais?", "Nossos planos:<br>📱 Vitrine Bio: <b>R$ 97</b><br>🎯 Landing Page: <b>R$ 550</b><br>📄 Site 2 páginas: <b>R$ 700</b><br>🏢 Institucional: <b>R$ 1.000</b><br>🛒 E-commerce: sob consulta<br><br>✅ Todos com pagamento único, hospedagem inclusa e 7 dias de garantia! Qual te atrai mais?", "💰 <b>Preços SML/PN:</b><br>• Vitrine Bio: <b>R$ 97</b> (bio Instagram)<br>• Landing Page: <b>R$ 550</b> (página de venda)<br>• Site 2 págs: <b>R$ 700</b><br>• Institucional: <b>R$ 1.000</b><br>• E-commerce: sob consulta<br><br>Pagamento único, sem mensalidades! Posso detalhar qualquer plano."] },
    { id: 'vitrine', keywords: ['vitrine', 'bio page', 'bio simples', 'link na bio', 'linktree', '97', 'r$ 97', 'pagina de bio', 'bio do instagram', 'pagina de links', 'bio profissional'], weight: 12, gaEvent: 'chat_intent_vitrine', responses: ["📱 <b>Vitrine Bio (R$ 97)</b> — Bio profissional para Instagram<br><br>✅ Página personalizada com sua identidade visual<br>✅ Banner + foto de perfil em destaque<br>✅ Até 5 botões de links (WhatsApp, Site, etc.)<br>✅ Estatísticas visíveis (nota, seguidores)<br>✅ Design responsivo (mobile + desktop)<br>✅ Pronta em até <b>48h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b><br><br>💳 Pagamento único! Ideal para quem quer bio profissional.<br><br>Quer pedir a sua? Me chama no WhatsApp: <b>(85) 8612-1078</b>", "Por apenas <b>R$ 97</b>, sua bio page inclui identidade visual, banner, foto, 5 botões de links, estatísticas e fica pronta em <b>48h</b>! Pagamento único!", "A Vitrine Bio custa <b>R$ 97</b> e transforma seu perfil do Instagram. Design personalizado, links, estatísticas e entrega em 48h. Bora criar a sua?"] },
    { id: 'landing', keywords: ['landing', 'landing page', 'pagina de vendas', 'conversao', '550', 'r$ 550', 'pagina profissional', 'pagina completa', 'pagina unica'], weight: 12, gaEvent: 'chat_intent_landing', responses: ["🎯 <b>Landing Page (R$ 550)</b> — Página de alta conversão<br><br>✅ Design exclusivo e moderno<br>✅ Hero, Sobre, Serviços, Diferenciais<br>✅ Mapa de localização integrado<br>✅ Galeria de imagens<br>✅ WhatsApp Multi (até 3 números)<br>✅ Botão CTA + formulário de contato<br>✅ Integração com redes sociais<br>✅ SEO básico configurado<br>✅ Design responsivo<br>✅ Pronta em até <b>72h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b><br><br>💳 Pagamento único! Ideal para vender ou captar clientes.", "Landing Page de <b>R$ 550</b>: hero, sobre, serviços, mapa, galeria, WhatsApp (até 3), formulário, CTA e SEO. Pronta em 72h com garantia de 7 dias!", "A Landing Page custa <b>R$ 550</b> e vem completa para converter visitantes em clientes: hero, mapa, galeria, múltiplos WhatsApp, formulário e SEO incluso."] },
    { id: 'site2', keywords: ['site 2', 'duas paginas', '700', 'r$ 700', 'pagina extra', '2 paginas', 'segunda pagina', 'site com 2'], weight: 11, gaEvent: 'chat_intent_site2', responses: ["📄 <b>Site 2 páginas (R$ 700)</b><br><br>✅ Landing page completa<br>✅ + 1 página extra (serviços, portfólio, blog ou sobre)<br>✅ Menu de navegação entre páginas<br>✅ Design consistente<br>✅ SEO em ambas as páginas<br>✅ Pronto em até <b>96h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b><br><br>💳 Pagamento único!"] },
    { id: 'institucional', keywords: ['site institucional', '5 paginas', '1000', 'r$ 1000', 'site completo', 'empresa', 'site grande', 'varias paginas', 'clinica', 'negocio'], weight: 11, gaEvent: 'chat_intent_institucional', responses: ["🏢 <b>Site Institucional (R$ 1.000)</b> — Presença digital completa<br><br>✅ Home + Sobre + Serviços + Contato + Blog<br>✅ Menu de navegação completo<br>✅ Formulário em página dedicada<br>✅ Mapa, galeria, WhatsApp Multi<br>✅ SEO configurado em todas as páginas<br>✅ Design 100% personalizado<br>✅ Integração com redes sociais<br>✅ Pronto em até <b>7 dias</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b><br><br>💳 Pagamento único! Ideal para empresas e clínicas."] },
    { id: 'ecommerce', keywords: ['ecommerce', 'e-commerce', 'loja virtual', 'loja online', 'carrinho', 'vender online', 'loja com pagamento', 'vitrine de produtos', 'catalogo'], weight: 13, gaEvent: 'chat_intent_ecommerce', responses: ["🛒 <b>E-commerce / Loja Virtual</b><br>Faço sim! Exemplo: <b>Amei Cetim</b> (da Rosana) com carrinho e checkout via WhatsApp.<br><br>✅ Vitrine de produtos<br>✅ Carrinho de compras<br>✅ Integração WhatsApp<br>✅ Integração Mercado Pago/PagSeguro (adicional)<br>✅ Lightbox para imagens<br>✅ Design responsivo<br><br>💰 Valor: <b>sob consulta</b> (depende do número de produtos)<br><br>Me chama no WhatsApp para orçamento personalizado! 📞"] },
    { id: 'redesign', keywords: ['ja tenho site', 'tenho um site', 'reformar', 'refazer', 'repaginar', 'site antigo', 'site existente', 'remodelar', 'melhorar meu site', 'redesign', 'modernizar'], weight: 11, gaEvent: 'chat_intent_redesign', responses: ["🔄 <b>Reformo seu site sim!</b> Faço análise gratuita do atual e refaço com foco em velocidade, SEO e conversão no WhatsApp.<br><br>💰 A partir de <b>R$ 550</b>. Me manda o link do seu site no WhatsApp que te digo o que dá pra melhorar! 📞"] },
    { id: 'materiais', keywords: ['precisa', 'preciso', 'mandar', 'enviar', 'materiais', 'briefing', 'informacoes', 'como comecar', 'para iniciar', 'necessario'], weight: 10, gaEvent: 'chat_intent_materiais', responses: ["📦 <b>Para começar, preciso de:</b><br>1️⃣ Logo (se tiver)<br>2️⃣ Cores que gosta / referências<br>3️⃣ Textos sobre seu negócio<br>4️⃣ Fotos suas ou do produto<br>5️⃣ Links: WhatsApp, Instagram, endereço<br><br>Com isso crio a primeira versão em 48h-72h! Não tem texto? Eu ajudo a criar. ✍️"] },
    { id: 'manutencao', keywords: ['manutencao', 'trocar', 'alterar', 'mudar', 'atualizar', 'troca', 'galeria', 'arrumar', 'consertar', 'mexer', 'modificar', 'ajuste'], weight: 12, gaEvent: 'chat_intent_manutencao', responses: ["🛠️ <b>Manutenções avulsas:</b><br>🔧 Trocar WhatsApp/link/texto: <b>R$ 40</b><br>🖼️ Substituir imagem/banner: <b>R$ 50</b><br>🔘 Adicionar/remover botão: <b>R$ 40</b><br>🖼️ Atualizar galeria (até 10 fotos): <b>R$ 100</b><br>📄 Criar nova página extra: <b>R$ 250</b><br>🌐 Configurar domínio: <b>R$ 80</b><br><br>📦 <b>Pacote mensal:</b> até 5 alterações por <b>R$ 200/mês</b><br><br>Só paga quando precisar, sem mensalidades obrigatórias!"] },
    { id: 'garantia', keywords: ['garantia', 'devolucao', 'reembolso', 'nao gostar', 'arrepender', '7 dias', 'dinheiro de volta', 'insatisfeito'], weight: 10, gaEvent: 'chat_intent_garantia', responses: ["✅ <b>Garantia de 7 dias!</b> Se não gostar do resultado, devolvo 100% do seu dinheiro. Sem burocracia! Pode ficar tranquilo. 😊"] },
    { id: 'pagamento', keywords: ['pagamento', 'pagar', 'cartao', 'pix', 'transferencia', 'boleto', 'parcela', '50%', 'sinal', 'forma', 'como paga'], weight: 11, gaEvent: 'chat_intent_pagamento', responses: ["💳 <b>Forma de pagamento:</b><br>• 50% no início (após fecharmos)<br>• 50% na entrega (após aprovar)<br><br>Aceitamos <b>Pix</b> e transferência. Pagamento único, sem surpresas!<br>✅ <b>Garantia de 7 dias</b> inclusa."] },
    { id: 'desconto', keywords: ['desconto', 'cupom', 'promocao', 'parcelar', 'parcela', 'parcelado', 'parcelamento', 'mais barato'], weight: 9, gaEvent: 'chat_intent_desconto', responses: ["💰 Meus preços já são bem enxutos por ser <b>pagamento único e sem mensalidade</b>. Não trabalho com descontos, mas facilito em <b>50% início + 50% entrega</b> no Pix.<br><br>Parcelamento no cartão via link: sob consulta."] },
    { id: 'prazo', keywords: ['prazo', 'demora', 'dias', 'semanas', 'entrega', 'rapido', 'urgente', 'tempo', 'quando fica pronto', 'agilidade'], weight: 11, gaEvent: 'chat_intent_prazo', responses: ["⏱️ <b>Prazos de entrega:</b><br>📱 Vitrine Bio: <b>até 48h</b><br>🎯 Landing Page: <b>até 72h</b><br>📄 Site 2 páginas: <b>até 96h</b><br>🏢 Institucional: <b>até 7 dias</b><br>🛒 E-commerce: <b>sob consulta</b><br><br>Se for urgente, posso acelerar em alguns casos. Me fale sua necessidade!"] },
    { id: 'urgencia', keywords: ['urgencia', 'pra hoje', '24h', '24 horas', 'amanha', 'muito urgente', 'mais rapido', 'correndo', 'pressa'], weight: 10, gaEvent: 'chat_intent_urgencia', responses: ["🚨 <b>Urgente?</b> Dependendo do plano e disponibilidade, posso acelerar!<br><br>📱 Vitrine Bio: consigo em <b>24h</b> (urgente)<br>🎯 Landing Page: consigo em <b>48h</b> (urgente)<br>📄/🏢 Planos maiores: depende da complexidade<br><br>Me chama no WhatsApp que vejo como te atender rápido! 📞"] },
    { id: 'processo', keywords: ['como funciona', 'processo', 'etapas', 'metodo', 'como e', 'passo a passo', 'fluxo'], weight: 10, gaEvent: 'chat_intent_processo', responses: ["🔄 <b>Processo em 4 etapas:</b><br>1️⃣ <b>Brief</b> — Entendo seu negócio e objetivos (WhatsApp, 30min)<br>2️⃣ <b>Design</b> — Layout mobile-first aprovado por você<br>3️⃣ <b>Code</b> — Código limpo, rápido, com SEO e WhatsApp<br>4️⃣ <b>Go</b> — Deploy, domínio e seu site no ar!<br><br>✅ <b>Garantia de 7 dias</b> • Suporte 15 dias<br>📞 Tudo alinhado via WhatsApp."] },
    { id: 'dominio', keywords: ['dominio', 'url', 'www', 'dns', 'endereco', 'com.br', 'comprar dominio', 'ja tenho dominio', 'registro'], weight: 10, gaEvent: 'chat_intent_dominio', responses: ["🌐 <b>Sobre domínio:</b><br>• Já tem? Configuro <b>grátis</b>!<br>• Não tem? Registro por <b>R$ 80</b><br>• Pode usar subdomínio gratuito também<br><br>O que faz mais sentido pra você?"] },
    { id: 'localizacao', keywords: ['onde fica', 'localizacao', 'trairi', 'ceara', 'atende', 'remoto', 'presencial', 'cidade', 'estado'], weight: 9, gaEvent: 'chat_intent_localizacao', responses: ["📍 Sou de <b>Trairi, Ceará</b>, mas atendo <b>100% online para todo o Brasil</b>! Tudo via WhatsApp, rápido e sem burocracia. Já atendi clientes de várias cidades."] },
    { id: 'posgarantia', keywords: ['depois dos 7 dias', 'apos a garantia', 'garantia acabou', 'sem garantia', 'e depois'], weight: 8, gaEvent: 'chat_intent_posgarantia', responses: ["Após os 7 dias, o site continua no ar <b>sem custo mensal</b>. Alterações futuras são cobradas como manutenção avulsa (a partir de <b>R$ 40</b>)."] },
    { id: 'projetos', keywords: ['portfolio', 'projetos', 'trabalhos', 'amei cetim', 'halison', 'colegio', 'exemplos', 'trabalhos feitos', 'mostrar', 'ver mais'], weight: 11, gaEvent: 'chat_intent_projetos', responses: ["📂 <b>Projetos no portfólio:</b><br>• <b>Amei Cetim</b> — E-commerce com carrinho e WhatsApp<br>• <b>Halison Henry</b> — Site institucional com SEO<br>• <b>Vitrine Bio</b> — Bio page premium para Instagram<br>• <b>Colégio Ágape</b> — Landing page com mapa e WhatsApp<br>• <b>Academia FitPro</b> e <b>Advocacia Souza</b> — Em desenvolvimento<br><br>Veja mais na seção <b>Projetos</b> aqui do site! 🚀"] },
    { id: 'tecnologias', keywords: ['tecnologia', 'ferramenta', 'stack', 'linguagem', 'programa', 'usa', 'react', 'python', 'node'], weight: 10, gaEvent: 'chat_intent_tecnologias', responses: ["🛠️ <b>Stack SML/PN:</b> HTML5, CSS3, JavaScript, React, Python, Node.js, PostgreSQL, Tailwind CSS. Design no Figma, deploy via Render/GitHub. Tudo otimizado para performance 95+!"] },
    { id: 'blog', keywords: ['blog', 'postagem', 'artigo', 'conteudo', 'escrever', 'redacao', 'materia'], weight: 8, gaEvent: 'chat_intent_blog', responses: ["📝 O blog já vem configurado no plano <b>Institucional</b>. Para postagens frequentes, trabalhamos com valor à parte. Quer saber mais?"] },
    { id: 'integracoes', keywords: ['integra', 'mercado pago', 'pagseguro', 'picpay', 'analytics', 'pixel', 'meta', 'google analytics'], weight: 10, gaEvent: 'chat_intent_integracoes', responses: ["🔌 Integramos <b>WhatsApp, Google Maps, Instagram, Google Analytics, Meta Pixel</b> em todos os planos. Para pagamentos online (Mercado Pago, PagSeguro), é um adicional. Me consulte!"] },
    { id: 'pagamento_online', keywords: ['pagamento online', 'botao pagamento', 'checkout', 'mercado pago integrado', 'vender com pagamento'], weight: 10, gaEvent: 'chat_intent_pagamento_online', responses: ["💳 <b>Pagamento online?</b> Sim! Integro Mercado Pago, PagSeguro ou outros gateways como <b>serviço adicional</b>. O básico já vem com checkout via WhatsApp. Quer orçamento com pagamento online incluso?"] },
    { id: 'contato', keywords: ['whatsapp', 'falar', 'atendente', 'humano', 'pessoa', 'conversar', 'ligar', 'telefone', 'contato', 'passar zap', 'quero falar'], weight: 13, gaEvent: 'chat_intent_contato', responses: ['Claro! Me chama no WhatsApp 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" class="whatsapp-chat-link" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>', 'Vamos no WhatsApp! É mais rápido 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" class="whatsapp-chat-link" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>'] },
    { id: 'agradecimento', keywords: ['obrigado', 'valeu', 'brigado', 'thanks', 'vlw', 'grato', 'agradecido', 'obrigada'], weight: 7, gaEvent: 'chat_intent_agradecimento', responses: ["De nada! 😊 Estou sempre à disposição no WhatsApp.", "Por nada! Qualquer dúvida, é só chamar. 👋", "Disponha! Conte comigo para o que precisar."] },
    { id: 'servicos', keywords: ['servicos', 'o que faz', 'quais servicos', 'oferece', 'tipos de site', 'trabalhos'], weight: 12, gaEvent: 'chat_intent_servicos', responses: ["🚀 <b>Serviços SML/PN:</b><br>📱 Vitrine Bio (R$97) • 🎯 Landing Page (R$550)<br>📄 Site 2 páginas (R$700) • 🏢 Institucional (R$1.000)<br>🛒 E-commerce • 🔍 SEO Local • 🛠️ Manutenção<br><br>Todos com hospedagem inclusa e garantia de 7 dias!"] },
    { id: 'seo', keywords: ['seo', 'google', 'ranquear', 'aparecer', 'primeira pagina', 'busca', 'organico', 'indexar', 'perto de mim', 'buscar'], weight: 10, gaEvent: 'chat_intent_seo', responses: ["🔍 <b>SEO incluso em todos os planos!</b> Otimização para Google, Google Meu Negócio e buscas locais. Palavras-chave, meta tags, sitemap — tudo configurado para seu site ranquear!"] },
    { id: 'google_business', keywords: ['google meu negocio', 'google business', 'gmb', 'maps', 'mapa negocio', 'perfil empresa google'], weight: 9, gaEvent: 'chat_intent_google_business', responses: ["📍 <b>Google Meu Negócio?</b> Configuro sim! É um adicional de <b>R$ 80</b>. Seu negócio aparece no Google Maps e nas buscas locais. Quer que eu configure?"] },
    { id: 'responsivo', keywords: ['responsivo', 'celular', 'mobile', 'tablet', 'dispositivo', 'adaptar', 'funciona no celular'], weight: 9, gaEvent: 'chat_intent_responsivo', responses: ["📱 Todos os sites são <b>100% responsivos</b> (mobile-first)! Funcionam perfeitamente no celular, tablet e computador. É padrão em todos os planos."] },
    { id: 'diferenciais', keywords: ['diferencial', 'por que voce', 'vantagem', 'diferente', 'por que escolher'], weight: 9, gaEvent: 'chat_intent_diferenciais', responses: ["✨ <b>Diferenciais SML/PN:</b> WhatsApp Multi, Mapas, Efeitos profissionais, Mobile+Desktop, Cores personalizadas, Foco em conversão, Fontes exclusivas, Performance 95+, Garantia 7 dias, Hospedagem inclusa!"] },
    { id: 'sobre', keywords: ['quem e', 'sobre voce', 'samuel', 'quem faz', 'desenvolvedor', 'fundador', 'dono'], weight: 10, gaEvent: 'chat_intent_sobre', responses: ["👨‍💻 Meu nome é <b>Samuel Pena</b>, sou desenvolvedor Full Stack em Trairi, Ceará. Crio sites rápidos, que ranqueiam bem e convertem no WhatsApp. <b>Garantia de 7 dias</b> e <b>hospedagem inclusa</b> em todos os projetos!"] },
    { id: 'hospedagem', keywords: ['hospedagem', 'hospedar', 'servidor', 'site no ar', 'publicacao', 'publicar', 'online'], weight: 10, gaEvent: 'chat_intent_hospedagem', responses: ["✅ <b>Hospedagem inclusa</b> em todos os planos! Seu site fica no ar por tempo indeterminado, sem custo mensal. Pagamento único!"] },
    { id: 'wordpress', keywords: ['wordpress', 'elementor', 'wix', 'cms', 'site pronto', 'template'], weight: 9, gaEvent: 'chat_intent_wordpress', responses: ["❌ <b>Não trabalho com WordPress, Elementor ou Wix.</b> Faço sites <b>do zero, código puro</b> — mais rápidos, mais seguros e sem plugins pesados. Performance 95+ no Lighthouse!<br><br>Quer um site leve e rápido? É comigo! 🚀"] },
    { id: 'sistema', keywords: ['sistema', 'sistema web', 'erp', 'agendamento', 'agenda', 'reserva', 'gestao', 'dashboard', 'painel'], weight: 11, gaEvent: 'chat_intent_sistema', responses: ["💻 <b>Sistema web?</b> Faço sim! Sistemas de agendamento, gestão, dashboard e ERPs simples. Exemplo no portfólio: <b>Academia FitPro</b> (em desenvolvimento).<br><br>💰 Valor: <b>sob consulta</b> (depende da complexidade). Me chama no WhatsApp para detalharmos!"] },
    { id: 'app', keywords: ['app', 'aplicativo', 'android', 'ios', 'iphone', 'celular app', 'mobile app'], weight: 9, gaEvent: 'chat_intent_app', responses: ["📱 <b>Aplicativo?</b> Não desenvolvo apps nativos (Android/iOS), mas posso criar um <b>site/app PWA</b> que funciona como app no celular (instalável, offline, notificações). Depende do que você precisa! Me explica melhor?"] },
    { id: 'identidade_visual', keywords: ['identidade visual', 'logo', 'logotipo', 'marca', 'branding', 'cores', 'paleta'], weight: 9, gaEvent: 'chat_intent_identidade', responses: ["🎨 <b>Identidade visual:</b> não crio logos do zero, mas posso <b>indicar designers</b> parceiros. No site, aplico suas cores, fontes e logo para deixar com a cara da sua marca!"] },
    { id: 'traducao', keywords: ['traducao', 'ingles', 'multilingue', 'idioma', 'outro idioma', 'site em ingles', 'espanhol'], weight: 8, gaEvent: 'chat_intent_traducao', responses: ["🌐 <b>Site multilíngue?</b> Sim, posso criar versões em inglês ou espanhol como páginas adicionais. Cada idioma extra: a partir de <b>R$ 200</b> por página traduzida."] },
    { id: 'parceria', keywords: ['parceria', 'revender', 'sociedade', 'socio', 'afiliado', 'comissao', 'indicar cliente'], weight: 9, gaEvent: 'chat_intent_parceria', responses: ["🤝 <b>Parcerias:</b> se você tem cliente que precisa de site, me indica! Ofereço <b>comissão</b> para indicações que fecharem. Vamos conversar no WhatsApp?"] },
    { id: 'curso', keywords: ['curso', 'ensinar', 'aula', 'aprender', 'mentoria', 'treinamento', 'workshop'], weight: 8, gaEvent: 'chat_intent_curso', responses: ["📚 <b>Cursos?</b> No momento não ofereço cursos, mas posso <b>indicar conteúdos gratuitos</b> para iniciar em programação. Foco total é criar sites para clientes!"] },
    { id: 'vaga', keywords: ['vaga', 'contratar', 'estagio', 'emprego', 'trabalho', 'curriculo', 'contratacao'], weight: 7, gaEvent: 'chat_intent_vaga', responses: ["👔 No momento não estou contratando, mas obrigado pelo interesse! Se quiser trocar ideia sobre tecnologia, me chama no WhatsApp."] },
    { id: 'indicacao', keywords: ['indicacao', 'recomendar', 'conhece', 'alguem', 'outro desenvolvedor', 'outro dev', 'designer'], weight: 8, gaEvent: 'chat_intent_indicacao', responses: ["👥 Conheço outros devs e designers. Depende do que você precisa! Me fala mais que indico a pessoa certa."] },
    { id: 'site_terceiro', keywords: ['site de outro', 'manutencao site outro', 'outro dev', 'nao fui eu', 'site de terceiro'], weight: 9, gaEvent: 'chat_intent_site_terceiro', responses: ["🛠️ <b>Manutenção em site de outro dev?</b> Depende! Se for HTML/CSS/JS puro, consigo dar manutenção sim. Se for WordPress ou tecnologia que não domino, indico alguém. Me mostra o site?"] },
    { id: 'trafego', keywords: ['trafego', 'anuncio', 'google ads', 'facebook ads', 'instagram ads', 'meta ads', 'trafego pago', 'campanha'], weight: 9, gaEvent: 'chat_intent_trafego', responses: ["📈 <b>Tráfego pago?</b> Não gerencio campanhas, mas posso <b>indicar gestores de tráfego</b> parceiros. Meu foco é criar sites que convertam bem o tráfego que você gerar!"] },
    { id: 'vale_presente', keywords: ['presente', 'vale', 'gift', 'brinde', 'surpresa', 'presentear'], weight: 7, gaEvent: 'chat_intent_vale_presente', responses: ["🎁 <b>Vale-presente?</b> Que ideia legal! Não tenho um sistema pronto, mas posso criar um voucher personalizado. Me chama no WhatsApp que combinamos!"] },
    { id: 'negativo', keywords: ['nao', 'horrivel', 'ruim', 'pessimo', 'caro', 'muito caro', 'absurdo', 'decepcao'], weight: 6, gaEvent: 'chat_intent_negativo', responses: ["Sinto muito que pense assim. Meus preços são abaixo do mercado para código puro e personalizado. Mas entendo! Se mudar de ideia, estou aqui. 😊"] },
    { id: 'satisfeito', keywords: ['otimo', 'legal', 'gostei', 'interessante', 'show', 'top', 'massa', 'bacana', 'bom', 'perfeito'], weight: 7, gaEvent: 'chat_intent_satisfeito', responses: ["Que bom que gostou! 😊 Quer fechar algum plano? Me chama no WhatsApp!", "Fico feliz! 🎉 Se quiser prosseguir, é só me chamar no WhatsApp para alinharmos."] }
  ];

  function findBestMatch(userMsg) {
    const normalized = normalize(userMsg);
    const words = normalized.split(' ').filter(w => w.length > 1);
    let bestMatch = null, bestScore = 0;
    for (const intent of knowledgeBase) {
      let score = 0;
      for (const keyword of intent.keywords) {
        if (normalized.includes(keyword)) score += intent.weight;
        for (const word of words) {
          if (keyword.includes(word) && word.length > 2) score += Math.floor(intent.weight / 3);
        }
      }
      if (conversationContext.lastIntent === intent.id) score += 3;
      if (score > bestScore) { bestScore = score; bestMatch = intent; }
    }
    return bestScore < 5 ? null : bestMatch;
  }

  const smartFallbacks = [
    "Não entendi completamente, mas posso ajudar com: <b>preços, planos, prazos, manutenção, domínio, SEO, materiais, garantia, e-commerce, WordPress, sistema web, tráfego pago, identidade visual...</b> No que posso focar?",
    "Hmm, não captei bem. Você pode me dar mais detalhes? Por exemplo: 'quanto custa um site?', 'você faz loja virtual?', 'qual o prazo?'",
    "Desculpe, não entendi. 😅 Posso falar sobre <b>planos (R$97 a R$1.000), prazos (48h a 7 dias), manutenção (R$40+), garantia (7 dias)</b>... O que te interessa?",
    "Essa eu não peguei! Mas que tal me perguntar sobre <b>preços, serviços, prazos ou materiais</b>? Estou aqui para ajudar! 💬"
  ];

  function getSmartFallback() { return smartFallbacks[Math.floor(Math.random() * smartFallbacks.length)]; }
  
  function getContextualResponse(intent) {
    const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
    if (intent.id === 'preco') conversationContext.askingForPrice = true;
    return response;
  }

  function addBubble(text, type) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + type;
    if (type === 'user') bubble.textContent = text;
    else bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (type === 'assistant') {
      setTimeout(() => {
        bubble.querySelectorAll('.whatsapp-chat-link').forEach(link => {
          link.addEventListener('click', () => trackEvent('chat_whatsapp_click', { intent: conversationContext.lastIntent || 'desconhecido' }));
        });
      }, 100);
    }
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-bubble assistant typing-dots';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.id = 'typingIndicator';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() { const t = document.getElementById('typingIndicator'); if (t) t.remove(); }

  function botReply(userMsg) {
    showTyping();
    setTimeout(() => {
      removeTyping();
      const intent = findBestMatch(userMsg);
      if (intent) {
        conversationContext.lastIntent = intent.id;
        conversationContext.messageCount++;
        if (intent.gaEvent) trackEvent(intent.gaEvent, { intent: intent.id, message_count: conversationContext.messageCount });
        addBubble(getContextualResponse(intent), 'assistant');
      } else {
        conversationContext.messageCount++;
        trackEvent('chat_fallback', { message_count: conversationContext.messageCount });
        addBubble(getSmartFallback(), 'assistant');
      }
    }, 600 + Math.random() * 1000);
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) { addBubble("Mensagem muito longa! Tenta resumir em até 500 caracteres 😅", 'assistant'); return; }
    addBubble(text, 'user');
    trackEvent('chat_message', { message_length: text.length });
    chatInput.value = '';
    chatInput.focus();
    botReply(text);
  }

  let hasGreeted = false;
  function openChat() {
    chatOverlay.classList.add('open');
    chatInput.focus();
    trackEvent('chat_open');
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => addBubble("👋 Olá! Sou o assistente virtual da <b>SML/PN</b>. Pergunte sobre planos, preços, prazos, manutenção, e-commerce, sistemas ou qualquer dúvida! Estou aqui para ajudar. 💬", 'assistant'), 600);
    }
  }

  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', () => chatOverlay.classList.remove('open'));
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
  chatOverlay.addEventListener('click', (e) => { if (e.target === chatOverlay) chatOverlay.classList.remove('open'); });
})();
