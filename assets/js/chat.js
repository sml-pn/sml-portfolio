
/* ==================== CHAT SML BOT - V6 FINAL COM BOTÕES E GA4 ==================== */
(function() {
  const chatFab = document.getElementById('chatFab');
  const chatOverlay = document.getElementById('chatOverlay');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  // ============ GA4 TRACKING ============
  function trackEvent(eventName, params) {
    params = params || {};
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
  }

  // ============ CORREÇÃO DE TYPOS ============
  var typos = {
    'preso': 'preco', 'presiso': 'preciso', 'orcsamento': 'orcamento', 'orcamento': 'orcamento',
    'manutencao': 'manutencao', 'duvida': 'duvida', 'obrigado': 'obrigado', 'obrigada': 'obrigado',
    'vlw': 'valeu', 'blz': 'beleza', 'tb': 'tambem', 'tbm': 'tambem', 'vc': 'voce',
    'vcs': 'voces', 'qto': 'quanto', 'qt': 'quanto', 'q': 'que', 'pq': 'porque',
    'prazo': 'prazo', 'praso': 'prazo', 'garatia': 'garantia', 'garantia': 'garantia',
    'dominio': 'dominio', 'hospedagem': 'hospedagem', 'responsivo': 'responsivo',
    'ecommerce': 'ecommerce', 'e commerce': 'ecommerce', 'loja virtual': 'ecommerce',
    'landing page': 'landing', 'landingpage': 'landing', 'bio page': 'vitrine',
    'whats': 'whatsapp', 'zap': 'whatsapp', 'wpp': 'whatsapp', 'celular': 'mobile',
    'site institucional': 'institucional', 'app': 'aplicativo', 'aplicativo': 'app',
    'cartao': 'cartao', 'pix': 'pix', 'dinheiro': 'pagamento', 'custo': 'preco',
    'valor': 'preco', 'investimento': 'preco', 'cobrar': 'preco', 'taxa': 'preco',
    'catalogo': 'catalogo', 'portfolio': 'portfolio', 'portfolio': 'portfolio',
    'ingles': 'ingles', 'traducao': 'traducao', 'multi idioma': 'multilingue',
    'logo': 'identidade visual', 'logotipo': 'identidade visual', 'marca': 'identidade visual',
    'curso': 'aula', 'ensinar': 'curso', 'aula': 'curso', 'aprender': 'curso',
    'contratar': 'vaga', 'estagio': 'vaga', 'estagio': 'vaga', 'emprego': 'vaga',
    'revender': 'parceria', 'sociedade': 'parceria', 'socio': 'parceria',
    'urgencia': 'urgencia', 'pra hoje': 'urgencia',
    'presente': 'vale-presente', 'gift': 'vale-presente', 'brinde': 'vale-presente',
    'sistema': 'sistema', 'sistema web': 'sistema', 'erp': 'sistema',
    'agendamento': 'agenda', 'agenda': 'agendamento', 'reserva': 'agendamento',
    'wordpress': 'wordpress', 'elementor': 'wordpress', 'wix': 'wordpress',
    'anuncio': 'trafego', 'trafego': 'trafego', 'google ads': 'trafego',
    'facebook ads': 'trafego', 'instagram ads': 'trafego', 'meta ads': 'trafego',
    'google meu negocio': 'google business', 'gmb': 'google business',
    'perto de mim': 'seo local', 'procurar': 'seo', 'buscar': 'seo',
    'botao': 'botao', 'botao de pagamento': 'pagamento online',
    'pagamento online': 'pagamento online', 'checkout': 'pagamento online',
    'manutencao site outro': 'site terceiro', 'site de outro': 'site terceiro',
    'nao fui eu que fiz': 'site terceiro', 'outro dev': 'site terceiro',
    'indicacao': 'indicacao', 'recomendar': 'indicacao', 'conhece': 'indicacao',
    'alguem': 'indicacao', 'outro desenvolvedor': 'indicacao',
  };

  function normalize(text) {
    var normalized = text.toLowerCase()
      .replace(/[àáâãä]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    
    for (var typo in typos) {
      normalized = normalized.replace(new RegExp('\\b' + typo + '\\b', 'g'), typos[typo]);
    }
    return normalized;
  }

  // ============ BOTÃO WHATSAPP PADRÃO ============
  function whatsappButton(texto) {
    var msg = texto || 'Olá! Vim pelo chat do site.';
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(msg) + '" target="_blank" class="whatsapp-chat-link" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>';
  }

  var context = { lastIntent: null, messageCount: 0 };

  // ============ BASE DE CONHECIMENTO ============
  var knowledgeBase = [
    {
      id: 'saudacao',
      keywords: ['oi', 'ola', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'saudacoes', 'iae', 'opa', 'fala', 'salve', 'bao', 'boa', 'hi', 'hello', 'iniciar', 'comecar', 'ajuda', 'poderia', 'gostaria'],
      weight: 10,
      gaEvent: 'chat_saudacao',
      responses: [
        '👋 Olá! Sou o assistente virtual da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br>Posso te ajudar com:<br>📱 <b>Vitrine Bio</b> (R$97) • 🎯 <b>Landing Page</b> (R$550)<br>📄 <b>Site 2 páginas</b> (R$700) • 🏢 <b>Institucional</b> (R$1.000)<br>🛒 <b>E-commerce</b> (sob consulta)<br><br>Pergunte à vontade ou clique abaixo para falar comigo!' + whatsappButton('Olá Samuel! Vim pelo chat do site.'),
        'Olá! 😊 Seja bem-vindo à SML/PN! Pergunte sobre planos, preços, prazos ou clique para falar direto comigo.' + whatsappButton('Oi! Quero saber mais sobre os planos.'),
        'Hey! 👋 Temos sites a partir de R$97, garantia de 7 dias e hospedagem inclusa. No que posso ajudar?' + whatsappButton('Quero um orçamento!')
      ]
    },
    {
      id: 'preco',
      keywords: ['preco', 'quanto', 'custa', 'valor', 'investimento', 'cobrar', 'taxa', 'tabela', 'planos', 'todos os precos', 'lista de precos', 'valores', 'precos', 'precinho', 'custo', 'orcamento'],
      weight: 15,
      gaEvent: 'chat_intent_preco',
      responses: [
        '📋 <b>Tabela completa (pagamento único):</b><br><br>📱 <b>Vitrine Bio</b> — R$ 97<br>🎯 <b>Landing Page</b> — R$ 550<br>📄 <b>Site 2 páginas</b> — R$ 700<br>🏢 <b>Institucional (até 5 págs)</b> — R$ 1.000<br>🛒 <b>E-commerce</b> — sob consulta<br><br>🛠️ <b>Manutenções:</b> R$ 40 a R$ 250<br>📦 <b>Pacote mensal:</b> R$ 200 (até 5 alterações)<br><br>✅ <b>Garantia de 7 dias</b> • 💳 50% início + 50% entrega<br>🌐 <b>Hospedagem inclusa!</b>' + whatsappButton('Quero contratar um plano!'),
        '💰 <b>Preços SML/PN:</b><br>• Vitrine Bio: <b>R$ 97</b> (bio Instagram)<br>• Landing Page: <b>R$ 550</b> (página de venda)<br>• Site 2 págs: <b>R$ 700</b><br>• Institucional: <b>R$ 1.000</b><br>• E-commerce: sob consulta<br><br>Pagamento único, sem mensalidades!' + whatsappButton('Quero saber mais sobre os planos!')
      ]
    },
    {
      id: 'vitrine',
      keywords: ['vitrine', 'bio page', 'bio simples', 'link na bio', 'linktree', '97', 'pagina de bio', 'bio do instagram', 'pagina de links', 'bio profissional'],
      weight: 12,
      gaEvent: 'chat_intent_vitrine',
      responses: [
        '📱 <b>Vitrine Bio (R$ 97)</b> — Bio profissional para Instagram<br><br>✅ Página personalizada com sua identidade visual<br>✅ Banner + foto de perfil em destaque<br>✅ Até 5 botões de links<br>✅ Estatísticas visíveis<br>✅ Design responsivo<br>✅ Pronta em até <b>48h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b><br><br>💳 Pagamento único!' + whatsappButton('Quero minha Vitrine Bio!'),
        'Por apenas <b>R$ 97</b>, sua bio page inclui identidade visual, banner, foto, 5 botões de links, estatísticas e fica pronta em <b>48h</b>!' + whatsappButton('Quero pedir a minha Bio Page!')
      ]
    },
    {
      id: 'landing',
      keywords: ['landing', 'landing page', 'pagina de vendas', 'conversao', '550', 'pagina profissional', 'pagina completa', 'pagina unica'],
      weight: 12,
      gaEvent: 'chat_intent_landing',
      responses: [
        '🎯 <b>Landing Page (R$ 550)</b> — Página de alta conversão<br><br>✅ Design exclusivo<br>✅ Hero, Sobre, Serviços, Diferenciais<br>✅ Mapa de localização<br>✅ Galeria de imagens<br>✅ WhatsApp Multi (até 3 números)<br>✅ Botão CTA + formulário<br>✅ SEO + responsivo<br>✅ Pronta em até <b>72h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b>' + whatsappButton('Quero uma Landing Page!'),
        'Landing Page de <b>R$ 550</b>: hero, sobre, serviços, mapa, galeria, WhatsApp, formulário, CTA e SEO. Pronta em 72h!' + whatsappButton('Quero contratar Landing Page!')
      ]
    },
    {
      id: 'site2',
      keywords: ['site 2', 'duas paginas', '700', 'pagina extra', '2 paginas', 'segunda pagina', 'site com 2'],
      weight: 11,
      gaEvent: 'chat_intent_site2',
      responses: [
        '📄 <b>Site 2 páginas (R$ 700)</b><br><br>✅ Landing page completa<br>✅ + 1 página extra (serviços, portfólio, blog)<br>✅ Menu de navegação<br>✅ SEO em ambas<br>✅ Pronto em até <b>96h</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b>' + whatsappButton('Quero Site 2 páginas!')
      ]
    },
    {
      id: 'institucional',
      keywords: ['site institucional', '5 paginas', '1000', 'site completo', 'empresa', 'site grande', 'varias paginas', 'clinica', 'negocio'],
      weight: 11,
      gaEvent: 'chat_intent_institucional',
      responses: [
        '🏢 <b>Site Institucional (R$ 1.000)</b> — Presença digital completa<br><br>✅ Home + Sobre + Serviços + Contato + Blog<br>✅ Menu completo, formulário, mapa, galeria<br>✅ WhatsApp Multi + SEO em todas as páginas<br>✅ Design 100% personalizado<br>✅ Pronto em até <b>7 dias</b><br>✅ Hospedagem inclusa<br>✅ <b>Garantia de 7 dias</b>' + whatsappButton('Quero um Site Institucional!')
      ]
    },
    {
      id: 'ecommerce',
      keywords: ['ecommerce', 'e-commerce', 'loja virtual', 'loja online', 'carrinho', 'vender online', 'vitrine de produtos', 'catalogo'],
      weight: 13,
      gaEvent: 'chat_intent_ecommerce',
      responses: [
        '🛒 <b>E-commerce / Loja Virtual</b><br>Faço sim! Exemplo: <b>Amei Cetim</b> com carrinho e checkout via WhatsApp.<br><br>✅ Vitrine de produtos<br>✅ Carrinho de compras<br>✅ Integração WhatsApp<br>✅ Mercado Pago/PagSeguro (adicional)<br>✅ Design responsivo<br><br>💰 Valor: <b>sob consulta</b>' + whatsappButton('Quero orçamento de E-commerce!')
      ]
    },
    {
      id: 'redesign',
      keywords: ['ja tenho site', 'tenho um site', 'reformar', 'refazer', 'repaginar', 'site antigo', 'site existente', 'remodelar', 'redesign', 'modernizar'],
      weight: 11,
      gaEvent: 'chat_intent_redesign',
      responses: [
        '🔄 <b>Reformo seu site sim!</b> Análise gratuita + refaço com foco em velocidade, SEO e WhatsApp.<br><br>💰 A partir de <b>R$ 550</b>.' + whatsappButton('Quero reformar meu site!')
      ]
    },
    {
      id: 'materiais',
      keywords: ['precisa', 'preciso', 'mandar', 'enviar', 'materiais', 'briefing', 'informacoes', 'como comecar', 'para iniciar', 'necessario'],
      weight: 10,
      gaEvent: 'chat_intent_materiais',
      responses: [
        '📦 <b>Para começar, preciso de:</b><br>1️⃣ Logo (se tiver)<br>2️⃣ Cores / referências<br>3️⃣ Textos sobre seu negócio<br>4️⃣ Fotos<br>5️⃣ Links: WhatsApp, Instagram, endereço<br><br>Com isso crio a primeira versão em 48h-72h!' + whatsappButton('Vou te enviar os materiais!')
      ]
    },
    {
      id: 'manutencao',
      keywords: ['manutencao', 'trocar', 'alterar', 'mudar', 'atualizar', 'troca', 'galeria', 'arrumar', 'consertar', 'mexer', 'modificar', 'ajuste'],
      weight: 12,
      gaEvent: 'chat_intent_manutencao',
      responses: [
        '🛠️ <b>Manutenções avulsas:</b><br>🔧 WhatsApp/link/texto: <b>R$ 40</b><br>🖼️ Imagem/banner: <b>R$ 50</b><br>🔘 Botão/ícone: <b>R$ 40</b><br>🖼️ Galeria (até 10 fotos): <b>R$ 100</b><br>📄 Página extra: <b>R$ 250</b><br>🌐 Domínio: <b>R$ 80</b><br><br>📦 <b>Pacote mensal:</b> R$ 200 (até 5 alterações)' + whatsappButton('Preciso de manutenção!')
      ]
    },
    {
      id: 'garantia',
      keywords: ['garantia', 'devolucao', 'reembolso', 'nao gostar', 'arrepender', '7 dias', 'dinheiro de volta', 'insatisfeito'],
      weight: 10,
      gaEvent: 'chat_intent_garantia',
      responses: [
        '✅ <b>Garantia de 7 dias!</b> Se não gostar do resultado, devolvo 100% do seu dinheiro. Sem burocracia! Pode ficar tranquilo. 😊'
      ]
    },
    {
      id: 'pagamento',
      keywords: ['pagamento', 'pagar', 'cartao', 'pix', 'transferencia', 'boleto', 'parcela', '50%', 'sinal', 'forma', 'como paga'],
      weight: 11,
      gaEvent: 'chat_intent_pagamento',
      responses: [
        '💳 <b>Forma de pagamento:</b><br>• 50% no início<br>• 50% na entrega (após aprovar)<br><br>Aceitamos <b>Pix</b> e transferência. Pagamento único!<br>✅ <b>Garantia de 7 dias</b> inclusa.' + whatsappButton('Quero fechar um plano!')
      ]
    },
    {
      id: 'prazo',
      keywords: ['prazo', 'demora', 'dias', 'semanas', 'entrega', 'rapido', 'urgente', 'tempo', 'quando fica pronto', 'agilidade'],
      weight: 11,
      gaEvent: 'chat_intent_prazo',
      responses: [
        '⏱️ <b>Prazos de entrega:</b><br>📱 Vitrine Bio: <b>até 48h</b><br>🎯 Landing Page: <b>até 72h</b><br>📄 Site 2 páginas: <b>até 96h</b><br>🏢 Institucional: <b>até 7 dias</b><br>🛒 E-commerce: <b>sob consulta</b>' + whatsappButton('Tenho urgência! Me chama?')
      ]
    },
    {
      id: 'processo',
      keywords: ['como funciona', 'processo', 'etapas', 'metodo', 'como e', 'passo a passo', 'fluxo'],
      weight: 10,
      gaEvent: 'chat_intent_processo',
      responses: [
        '🔄 <b>Processo em 4 etapas:</b><br>1️⃣ <b>Brief</b> — Entendo seu negócio (WhatsApp, 30min)<br>2️⃣ <b>Design</b> — Layout mobile-first<br>3️⃣ <b>Code</b> — Código limpo, SEO, WhatsApp<br>4️⃣ <b>Go</b> — Deploy, domínio e seu site no ar!<br><br>✅ Garantia 7 dias • Suporte 15 dias' + whatsappButton('Vamos começar!')
      ]
    },
    {
      id: 'dominio',
      keywords: ['dominio', 'url', 'www', 'dns', 'endereco', 'com.br', 'comprar dominio', 'ja tenho dominio', 'registro'],
      weight: 10,
      gaEvent: 'chat_intent_dominio',
      responses: [
        '🌐 <b>Sobre domínio:</b><br>• Já tem? Configuro <b>grátis</b>!<br>• Não tem? Registro por <b>R$ 80</b><br>• Pode usar subdomínio gratuito também' + whatsappButton('Quero configurar meu domínio!')
      ]
    },
    {
      id: 'localizacao',
      keywords: ['onde fica', 'localizacao', 'trairi', 'ceara', 'atende', 'remoto', 'presencial', 'cidade', 'estado'],
      weight: 9,
      gaEvent: 'chat_intent_localizacao',
      responses: [
        '📍 Sou de <b>Trairi, Ceará</b>, mas atendo <b>100% online para todo o Brasil</b>! Tudo via WhatsApp, rápido e sem burocracia.' + whatsappButton('Atende minha cidade?')
      ]
    },
    {
      id: 'projetos',
      keywords: ['portfolio', 'projetos', 'trabalhos', 'amei cetim', 'halison', 'colegio', 'exemplos', 'trabalhos feitos', 'mostrar', 'ver mais'],
      weight: 11,
      gaEvent: 'chat_intent_projetos',
      responses: [
        '📂 <b>Projetos no portfólio:</b><br>• <b>Amei Cetim</b> — E-commerce com carrinho<br>• <b>Halison Henry</b> — Site institucional<br>• <b>Vitrine Bio</b> — Bio page premium<br>• <b>Colégio Ágape</b> — Landing page<br>• <b>Academia FitPro</b> e <b>Advocacia Souza</b> — Em desenvolvimento<br><br>Veja mais na seção <b>Projetos</b> do site!' + whatsappButton('Quero um site como esses!')
      ]
    },
    {
      id: 'contato',
      keywords: ['whatsapp', 'falar', 'atendente', 'humano', 'pessoa', 'conversar', 'ligar', 'telefone', 'contato', 'passar zap', 'quero falar'],
      weight: 13,
      gaEvent: 'chat_intent_contato',
      responses: [
        'Claro! Me chama no WhatsApp 👇' + whatsappButton('Olá! Vim pelo chat do site.'),
        'Vamos no WhatsApp! É mais rápido 👇' + whatsappButton('Quero falar com o Samuel!')
      ]
    },
    {
      id: 'agradecimento',
      keywords: ['obrigado', 'valeu', 'brigado', 'thanks', 'vlw', 'grato', 'agradecido', 'obrigada'],
      weight: 7,
      gaEvent: 'chat_intent_agradecimento',
      responses: [
        'De nada! 😊 Estou sempre à disposição no WhatsApp.' + whatsappButton('Preciso de mais ajuda!'),
        'Por nada! Qualquer dúvida, é só chamar. 👋'
      ]
    },
    {
      id: 'servicos',
      keywords: ['servicos', 'o que faz', 'quais servicos', 'oferece', 'tipos de site', 'trabalhos'],
      weight: 12,
      gaEvent: 'chat_intent_servicos',
      responses: [
        '🚀 <b>Serviços SML/PN:</b><br>📱 Vitrine Bio (R$97) • 🎯 Landing Page (R$550)<br>📄 Site 2 páginas (R$700) • 🏢 Institucional (R$1.000)<br>🛒 E-commerce • 🔍 SEO Local • 🛠️ Manutenção<br><br>Todos com hospedagem inclusa e garantia de 7 dias!' + whatsappButton('Quero contratar!')
      ]
    },
    {
      id: 'seo',
      keywords: ['seo', 'google', 'ranquear', 'aparecer', 'primeira pagina', 'busca', 'organico', 'indexar'],
      weight: 10,
      gaEvent: 'chat_intent_seo',
      responses: [
        '🔍 <b>SEO incluso em todos os planos!</b> Otimização para Google, Google Meu Negócio e buscas locais. Palavras-chave, meta tags, sitemap — tudo configurado!' + whatsappButton('Quero ranquear no Google!')
      ]
    },
    {
      id: 'sistema',
      keywords: ['sistema', 'sistema web', 'erp', 'agendamento', 'agenda', 'reserva', 'gestao', 'dashboard', 'painel'],
      weight: 11,
      gaEvent: 'chat_intent_sistema',
      responses: [
        '💻 <b>Sistema web?</b> Faço sim! Sistemas de agendamento, gestão, dashboard. Exemplo: <b>Academia FitPro</b> (em desenvolvimento).<br><br>💰 Valor: <b>sob consulta</b>.' + whatsappButton('Quero orçamento de sistema!')
      ]
    },
    {
      id: 'wordpress',
      keywords: ['wordpress', 'elementor', 'wix', 'cms', 'site pronto', 'template'],
      weight: 9,
      gaEvent: 'chat_intent_wordpress',
      responses: [
        '❌ <b>Não trabalho com WordPress.</b> Faço sites <b>do zero, código puro</b> — mais rápidos, seguros e sem plugins. Performance 95+!' + whatsappButton('Quero site em código puro!')
      ]
    },
    {
      id: 'parceria',
      keywords: ['parceria', 'revender', 'sociedade', 'socio', 'afiliado', 'comissao', 'indicar cliente'],
      weight: 9,
      gaEvent: 'chat_intent_parceria',
      responses: [
        '🤝 <b>Parcerias:</b> indica clientes e ganhe <b>comissão</b>! Vamos conversar?' + whatsappButton('Quero ser parceiro!')
      ]
    },
    {
      id: 'trafego',
      keywords: ['trafego', 'anuncio', 'google ads', 'facebook ads', 'instagram ads', 'trafego pago', 'campanha'],
      weight: 9,
      gaEvent: 'chat_intent_trafego',
      responses: [
        '📈 <b>Tráfego pago?</b> Não gerencio campanhas, mas indico gestores parceiros. Meu foco é criar sites que convertam!' + whatsappButton('Me indica um gestor?')
      ]
    },
    {
      id: 'sobre',
      keywords: ['quem e', 'sobre voce', 'samuel', 'quem faz', 'desenvolvedor', 'fundador', 'dono'],
      weight: 10,
      gaEvent: 'chat_intent_sobre',
      responses: [
        '👨‍💻 Meu nome é <b>Samuel Pena</b>, Full Stack em Trairi-CE. Crio sites rápidos, que ranqueiam e convertem. <b>Garantia de 7 dias</b> e <b>hospedagem inclusa</b>!' + whatsappButton('Quero falar com o Samuel!')
      ]
    },
    {
      id: 'hospedagem',
      keywords: ['hospedagem', 'hospedar', 'servidor', 'site no ar', 'publicacao', 'publicar', 'online'],
      weight: 10,
      gaEvent: 'chat_intent_hospedagem',
      responses: [
        '✅ <b>Hospedagem inclusa</b> em todos os planos! Seu site fica no ar por tempo indeterminado, sem custo mensal. Pagamento único!'
      ]
    }
  ];

  // ============ FUNÇÃO DE MATCH ============
  function findBestMatch(userMsg) {
    var normalized = normalize(userMsg);
    var words = normalized.split(' ').filter(function(w) { return w.length > 1; });
    var bestMatch = null;
    var bestScore = 0;
    
    for (var i = 0; i < knowledgeBase.length; i++) {
      var intent = knowledgeBase[i];
      var score = 0;
      
      for (var j = 0; j < intent.keywords.length; j++) {
        var keyword = intent.keywords[j];
        if (normalized.indexOf(keyword) !== -1) {
          score += intent.weight;
        }
        for (var k = 0; k < words.length; k++) {
          if (keyword.indexOf(words[k]) !== -1 && words[k].length > 2) {
            score += Math.floor(intent.weight / 3);
          }
        }
      }
      
      if (context.lastIntent === intent.id) {
        score += 3;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = intent;
      }
    }
    
    return bestScore < 5 ? null : bestMatch;
  }

  // ============ FALLBACKS ============
  var smartFallbacks = [
    'Não entendi completamente, mas posso ajudar com: <b>preços, planos, prazos, manutenção, domínio, SEO, materiais, garantia, e-commerce, sistema web...</b>' + whatsappButton('Preciso de ajuda!'),
    'Hmm, não captei bem. Tente: "quanto custa um site?", "você faz loja virtual?", "qual o prazo?"' + whatsappButton('Quero falar com o Samuel!'),
    'Desculpe, não entendi. 😅 Posso falar sobre <b>planos (R$97 a R$1.000), prazos (48h a 7 dias), manutenção (R$40+)</b>...' + whatsappButton('Me ajuda!')
  ];

  function getSmartFallback() {
    return smartFallbacks[Math.floor(Math.random() * smartFallbacks.length)];
  }

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ============ UI ============
  function addBubble(text, type) {
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + type;
    if (type === 'user') {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = text;
    }
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (type === 'assistant') {
      setTimeout(function() {
        var links = bubble.querySelectorAll('.whatsapp-chat-link');
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function() {
            trackEvent('chat_whatsapp_click', { intent: context.lastIntent || 'desconhecido' });
          });
        }
      }, 100);
    }
  }

  function showTyping() {
    var typing = document.createElement('div');
    typing.className = 'chat-bubble assistant typing-dots';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.id = 'typingIndicator';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    var typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  function botReply(userMsg) {
    showTyping();
    var delay = 600 + Math.random() * 1000;
    
    setTimeout(function() {
      removeTyping();
      var intent = findBestMatch(userMsg);
      
      if (intent) {
        context.lastIntent = intent.id;
        context.messageCount++;
        if (intent.gaEvent) {
          trackEvent(intent.gaEvent, { intent: intent.id, message_count: context.messageCount });
        }
        addBubble(getRandom(intent.responses), 'assistant');
      } else {
        context.messageCount++;
        trackEvent('chat_fallback', { message_count: context.messageCount });
        addBubble(getSmartFallback(), 'assistant');
      }
    }, delay);
  }

  function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) {
      addBubble("Mensagem muito longa! Tenta resumir em até 500 caracteres 😅", 'assistant');
      return;
    }
    addBubble(text, 'user');
    trackEvent('chat_message', { message_length: text.length });
    chatInput.value = '';
    chatInput.focus();
    botReply(text);
  }

  var hasGreeted = false;
  
  function openChat() {
    chatOverlay.classList.add('open');
    chatInput.focus();
    trackEvent('chat_open');
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(function() {
        var saudacao = null;
        for (var i = 0; i < knowledgeBase.length; i++) {
          if (knowledgeBase[i].id === 'saudacao') { saudacao = knowledgeBase[i]; break; }
        }
        if (saudacao) {
          addBubble(getRandom(saudacao.responses), 'assistant');
        }
      }, 500);
    }
  }

  // ============ EVENTOS ============
  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', function() { chatOverlay.classList.remove('open'); });
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
  chatOverlay.addEventListener('click', function(e) { if (e.target === chatOverlay) chatOverlay.classList.remove('open'); });
  
})();
