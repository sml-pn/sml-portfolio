
/* ==================== CHAT SML BOT - V3 FINAL BLINDADO ==================== */
(function() {
  const chatFab = document.getElementById('chatFab');
  const chatOverlay = document.getElementById('chatOverlay');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  let lastTopic = null;
  let failCount = 0;
  let hasGreeted = false;
  const MAX_FAILS = 3;

  const intents = [
    {
      name: 'saudacao',
      patterns: [/^(oi|olá|ola|hey|bom dia|boa tarde|boa noite|saudações|e aí|iae|yo|opa|fala|salve|bão|boa|hi|hello)/i],
      responses: [
        "Olá! 👋 Seja bem-vindo à SML/PN. Como posso te ajudar? Pergunte sobre nossos planos, preços, prazos, manutenção, garantia, domínio, materiais necessários, e-commerce, redesign ou qualquer dúvida sobre sites.",
        "Oi! 😊 Estou aqui para tirar suas dúvidas sobre sites, landing pages, bio pages, preços, prazos, manutenção, domínio…",
        "Hey! Que bom ter você aqui. Me diga como posso ajudar: temos Vitrine Bio (R$ 97), Landing Pages (R$ 550), Sites 2 páginas (R$ 700), Institucional (R$ 1.000), E-commerce sob consulta…"
      ]
    },
    {
      name: 'preco',
      patterns: [/pre[cç]o|quanto|custa|valor|orçamento|investimento|cobrar|barato|caro|r\$|dinheiro|taxa|tabela|planos|todos os preços|lista de preços|valores|preços|precinho|custo/i],
      responses: [
        "📋 <b>Tabela completa (pagamento único):</b><br><br>📱 <b>Vitrine Bio Simples</b> – R$ 97<br>🎯 <b>Landing Page Completa</b> – R$ 550<br>📄 <b>Site 2 páginas</b> – R$ 700<br>🏢 <b>Site Institucional (até 5 páginas)</b> – R$ 1.000<br>🛒 <b>E-commerce</b> – sob consulta<br><br>🛠️ <b>Manutenções avulsas:</b> R$ 40 a R$ 250<br>📦 <b>Pacote mensal:</b> R$ 200 (até 5 alterações)<br><br>✅ <b>Garantia de 7 dias</b> em todos os planos.<br>💳 Pagamento 50% início + 50% entrega.<br><br>Qual desses te interessa?",
        "Nossos planos: 📱 Vitrine Bio <b>R$ 97</b> | 🎯 Landing Page <b>R$ 550</b> | 📄 Site 2 páginas <b>R$ 700</b> | 🏢 Institucional <b>R$ 1.000</b> | 🛒 E-commerce sob consulta. Todos com pagamento único, hospedagem inclusa e garantia de 7 dias!",
        "Preços (pagamento único, sem mensalidades):<br>📱 Vitrine Bio: <b>R$ 97</b><br>🎯 Landing Page: <b>R$ 550</b><br>📄 Site 2 páginas: <b>R$ 700</b><br>🏢 Institucional: <b>R$ 1.000</b><br>🛒 E-commerce: sob consulta<br><br>Manutenções a partir de <b>R$ 40</b>. Posso detalhar qualquer plano!"
      ]
    },
    {
      name: 'vitrine',
      patterns: [/vitrine|bio page|bio simples|link na bio|linktree|97|r\$ ?97|página de bio|bio do instagram|página de links/i],
      responses: [
        "📱 <b>Vitrine Bio Simples (R$ 97)</b> — Bio profissional para Instagram.<br><br>✅ Página personalizada com sua identidade visual (cores, fontes, logo)<br>✅ Banner com imagem no topo<br>✅ Foto de perfil em destaque<br>✅ Até 5 botões de links (WhatsApp, Instagram, Site, etc.)<br>✅ Estatísticas visíveis (nota, horário, seguidores)<br>✅ Design responsivo (funciona em celular, tablet e computador)<br>✅ Pronta em até 48h<br>✅ Hospedagem incluída<br><br>Pagamento único! Ideal para quem precisa de uma bio profissional no Instagram.",
        "A Vitrine Bio custa <b>R$ 97</b> e inclui: página personalizada com identidade visual, banner, foto de perfil, até 5 botões de links, estatísticas e design responsivo. Pronta em 48h!",
        "Por apenas <b>R$ 97</b>, sua bio page profissional inclui: identidade visual, banner, foto de perfil, 5 botões de links, estatísticas e fica pronta em até 48h."
      ]
    },
    {
      name: 'landing',
      patterns: [/landing|landing page|página de vendas|conversão|550|r\$ ?550|página profissional|página completa/i],
      responses: [
        "🎯 <b>Landing Page Completa (R$ 550)</b> — Ideal para profissionais e empresas que querem vender ou captar clientes.<br><br>✅ Página única com design exclusivo<br>✅ Seções personalizadas: hero, sobre, serviços, diferenciais<br>✅ Mapa de localização integrado<br>✅ Galeria de imagens<br>✅ Múltiplos contatos de WhatsApp (até 3 números)<br>✅ Botão de chamada para ação (CTA)<br>✅ Integração com Instagram e outras redes<br>✅ Formulário de contato<br>✅ SEO básico configurado<br>✅ Design responsivo<br>✅ Pronta em até 72h<br>✅ Hospedagem incluída<br><br>Pagamento único!",
        "Landing Page de <b>R$ 550</b>: hero, sobre, serviços, mapa, galeria, WhatsApp (até 3 números), formulário, CTA, SEO e design responsivo. Pronta em até 72h!",
        "A Landing Page Completa custa <b>R$ 550</b> e vem com tudo que você precisa para vender: hero, mapa, galeria, múltiplos WhatsApp, formulário e SEO. Pagamento único!"
      ]
    },
    {
      name: 'site2',
      patterns: [/site 2|duas páginas|700|r\$ ?700|página extra|2 páginas|segunda página/i],
      responses: [
        "📄 <b>Site 2 páginas (R$ 700)</b> — Ideal para negócios que precisam de uma segunda página além da landing.<br><br>✅ Landing page completa (todos os itens do plano anterior)<br>✅ + 1 página extra (ex.: serviços, portfólio, blog, sobre)<br>✅ Menu de navegação entre as páginas<br>✅ Design consistente em todas as páginas<br>✅ SEO configurado em ambas as páginas<br>✅ Pronta em até 96h<br>✅ Hospedagem incluída<br><br>Pagamento único!",
        "Site 2 páginas por <b>R$ 700</b>: landing completa + página extra com menu de navegação, SEO em ambas e pronto em até 96h.",
        "O Site 2 páginas custa <b>R$ 700</b> e inclui landing page + página extra (serviços, portfólio, blog), menu, SEO e design consistente. Pagamento único!"
      ]
    },
    {
      name: 'institucional',
      patterns: [/site institucional|5 páginas|1000|r\$ ?1000|site completo|empresa|site grande|várias páginas/i],
      responses: [
        "🏢 <b>Site Institucional (R$ 1.000)</b> — Ideal para empresas, clínicas e negócios que precisam de presença digital completa.<br><br>✅ Landing page (home) completa<br>✅ Páginas: Sobre, Serviços, Contato, Blog/Portfólio<br>✅ Menu de navegação completo<br>✅ Formulário de contato em página dedicada<br>✅ Mapa, galeria e múltiplos WhatsApp<br>✅ SEO configurado em todas as páginas<br>✅ Design 100% personalizado<br>✅ Integração com redes sociais<br>✅ Pronto em até 7 dias<br>✅ Hospedagem incluída<br><br>Pagamento único!",
        "Site Institucional de <b>R$ 1.000</b>: até 5 páginas (home, sobre, serviços, contato, blog), menu, formulário, mapa, galeria, SEO e design personalizado.",
        "O plano mais completo: <b>R$ 1.000</b> por até 5 páginas, menu, formulário, mapa, galeria, múltiplos WhatsApp e SEO em todas as páginas."
      ]
    },
    {
      name: 'ecommerce',
      patterns: [/ecommerce|e-commerce|loja virtual|loja online|carrinho de compras|vender online|loja com pagamento/i],
      responses: [
        "🛒 <b>E-commerce / Loja Virtual</b><br>Faço sim! Exemplo no portfólio é a <b>Amei Cetim</b> (da Rosana) com carrinho e checkout via WhatsApp.<br><br>✅ Vitrine de produtos<br>✅ Carrinho de compras<br>✅ Integração WhatsApp<br>✅ Integração Mercado Pago / PagSeguro sob consulta como adicional<br>✅ Lightbox para imagens<br><br>Me chama no WhatsApp que te mando orçamento personalizado pra loja!",
        "Sim, crio loja virtual! Já fiz a Amei Cetim (e-commerce de acessórios). O básico é carrinho + WhatsApp, e se precisar de pagamento online integrado (Mercado Pago, PagSeguro) faço como serviço adicional."
      ]
    },
    {
      name: 'redesign',
      patterns: [/já tenho site|tenho um site|reformar|refazer|repaginar|site antigo|site existente|remodelar|melhorar meu site|redesign/i],
      responses: [
        "🔄 <b>Reformo seu site sim!</b><br>Faço análise gratuita do seu site atual, aproveito textos e imagens e refaço com foco em velocidade, SEO e conversão no WhatsApp.<br><br>Valor depende do tamanho, mas parte de <b>R$ 550</b> (mesmo valor da Landing). Me manda o link do seu site atual no WhatsApp?",
        "Faço redesign completo! Seu site fica mais rápido, responsivo e otimizado pra Google. Me envia o link atual que te digo o que dá pra melhorar."
      ]
    },
    {
      name: 'materiais',
      patterns: [/o que precisa|o que preciso|o que mandar|o que enviar|materiais|briefing|informações para começar|informacoes para comecar|como começar|como comecar|para iniciar/i],
      responses: [
        "📦 <b>Para começar preciso de:</b><br>1️⃣ Logo (se tiver)<br>2️⃣ Cores que gosta / referências<br>3️⃣ Textos sobre seu negócio / serviços<br>4️⃣ Fotos (suas ou do seu produto)<br>5️⃣ Links: WhatsApp, Instagram, endereço do Maps<br><br>Com isso já crio a primeira versão em 48h a 72h! Se não tiver texto pronto, eu te ajudo a criar.",
        "Bem simples: me manda logo, fotos, textos e seus contatos (WhatsApp, Instagram). Se não tiver texto pronto eu te ajudo a criar! Com isso já começo o design em até 48h."
      ]
    },
    {
      name: 'manutencao',
      patterns: [/manutenção|manutencao|trocar|alterar|mudar|atualizar|troca de número|troca de imagem|galeria|página extra|arrumar|consertar|mexer|modificar/i],
      responses: [
        "🛠️ <b>Tabela de manutenções avulsas:</b><br>🔧 Trocar número de WhatsApp, link ou texto curto: <b>R$ 40</b><br>🖼️ Substituir imagem ou banner: <b>R$ 50</b><br>🔘 Adicionar/remover botão ou ícone: <b>R$ 40</b><br>🖼️ Atualizar galeria (até 10 fotos): <b>R$ 100</b><br>📄 Criar nova página extra: <b>R$ 250</b><br>🌐 Configurar domínio personalizado (.com.br): <b>R$ 80</b><br><br>📦 <b>Pacote mensal</b>: até 5 pequenas alterações por <b>R$ 200/mês</b><br><br>Só paga se precisar, sem mensalidades obrigatórias!",
        "Nossos serviços de manutenção são avulsos e acessíveis:<br>🔧 Pequenas alterações: <b>R$ 40–50</b><br>🖼️ Galeria: <b>R$ 100</b><br>📄 Página extra: <b>R$ 250</b><br>🌐 Domínio: <b>R$ 80</b><br>📦 Pacote mensal: <b>R$ 200</b> (até 5 alterações)<br><br>Só cobramos quando você solicitar alterações.",
        "Manutenções avulsas:<br>🔧 WhatsApp/link: <b>R$ 40</b><br>🖼️ Imagem/banner: <b>R$ 50</b><br>🔘 Botão/ícone: <b>R$ 40</b><br>🖼️ Galeria: <b>R$ 100</b><br>📄 Página extra: <b>R$ 250</b><br>🌐 Domínio: <b>R$ 80</b><br>📦 Mensal: <b>R$ 200</b> (5 alterações)<br><br>Só paga quando precisar!"
      ]
    },
    {
      name: 'garantia',
      patterns: [/garantia|devolução|reembolso|não gostar|arrepender|7 dias|dinheiro de volta/i],
      responses: [
        "✅ <b>Garantia de 7 dias!</b> Se você não gostar do resultado, devolvo 100% do seu dinheiro. Sem burocracia! Pode ficar tranquilo.",
        "Sim, temos <b>garantia de 7 dias</b>: se não gostar do site, devolvo seu dinheiro integralmente. Sem burocracia!",
        "Oferecemos <b>garantia de 7 dias</b>. Se o site não atender suas expectativas, você recebe o valor de volta. Simples assim!"
      ]
    },
    {
      name: 'pagamento',
      patterns: [/pagamento|pagar|cartão|pix|transferência|boleto|parcela|50%|sinal|forma de pagamento|como paga/i],
      responses: [
        "💳 <b>Forma de pagamento:</b><br>• 50% no início (após fecharmos)<br>• 50% na entrega (após você aprovar)<br><br>Aceitamos Pix, transferência e outros meios. Pagamento único, sem surpresas!<br><br>✅ E você tem <b>7 dias de garantia</b>!",
        "Você paga <b>50% para começar</b> e <b>50% quando aprovar</b> o site pronto. Simples assim! Pagamento único, sem mensalidades. E com <b>garantia de 7 dias</b>.",
        "Pagamento em duas etapas: <b>50% no início</b> e <b>50% na entrega</b>, após sua aprovação. Aceitamos Pix e transferência. <b>Garantia de 7 dias</b> inclusa!",
        "Funciona assim: <b>50% de sinal</b> para iniciar, e os outros <b>50% na entrega</b>, depois que você aprovar. Sem mensalidades! E com <b>garantia de 7 dias</b>."
      ]
    },
    {
      name: 'desconto',
      patterns: [/desconto|cupom|promoção|promocao|parcelar|parcela|parcelado|parcelamento/i],
      responses: [
        "💰 Meus preços já são bem enxutos por ser <b>pagamento único e sem mensalidade</b>. Não trabalho com descontos, mas facilito em <b>50% no início + 50% na entrega</b> no Pix.<br><br>Parcelamento no cartão via link pode ser visto sob consulta.",
        "O valor já é promocional (R$ 97 a R$ 1.000 pagamento único). Por isso não aplico cupom, mas divido em 2x no Pix e posso parcelar no cartão sob consulta."
      ]
    },
    {
      name: 'prazo',
      patterns: [/prazo|demora|dias|semanas|entrega|rápido|urgente|tempo|quando fica pronto/i],
      responses: [
        "⏱️ <b>Prazos de entrega:</b><br>📱 Vitrine Bio: <b>até 48h</b><br>🎯 Landing Page: <b>até 72h</b><br>📄 Site 2 páginas: <b>até 96h</b><br>🏢 Site Institucional: <b>até 7 dias</b><br>🛒 E-commerce: <b>sob consulta</b><br><br>Sempre cumpro os prazos combinados!",
        "Depende do plano:<br>• Vitrine Bio: <b>até 48h</b><br>• Landing Page: <b>até 72h</b><br>• Site 2 páginas: <b>até 96h</b><br>• Site Institucional: <b>até 7 dias</b><br>• E-commerce: <b>sob consulta</b><br><br>Se for urgente, posso acelerar. Me fale sua necessidade!",
        "Prazos médios:<br>📱 Vitrine Bio: <b>48h</b><br>🎯 Landing Page: <b>72h</b><br>📄 Site 2 páginas: <b>96h</b><br>🏢 Institucional: <b>7 dias</b><br>🛒 E-commerce: <b>sob consulta</b><br><br>Tem pressa? Posso acelerar em alguns casos!"
      ]
    },
    {
      name: 'processo',
      patterns: [/como funciona|processo|etapas|método|como é|passo a passo/i],
      responses: [
        "🔄 <b>Como funciona:</b><br>1️⃣ Você me explica o que precisa (via WhatsApp)<br>2️⃣ Eu crio a página do zero com design exclusivo e responsivo<br>3️⃣ Você aprova e paga — pagamento único, sem mensalidade<br>4️⃣ Seu site fica no ar por tempo indeterminado<br>5️⃣ Precisou alterar algo depois? Só chamar — cobro apenas a manutenção<br><br>✅ <b>Garantia de 7 dias</b>: se não gostar, devolvo seu dinheiro!<br>💬 Suporte direto comigo via WhatsApp",
        "Processo simples: 1) Brief (entendo seu negócio e objetivos), 2) Design (crio o layout mobile-first), 3) Code (desenvolvo com código limpo e SEO), 4) Go (publico seu site no ar). Em média 48h a 7 dias dependendo do plano."
      ]
    },
    {
      name: 'dominio',
      patterns: [/domínio|domínio próprio|url|www|dns|endereço|com\.br|comprar domínio|já tenho domínio|precisa de domínio/i],
      responses: [
        "🌐 <b>Sobre domínio:</b><br>• Você pode usar um domínio que já tenha — a configuração é gratuita.<br>• Se não tiver, posso configurar um domínio personalizado (.com.br, .com, etc.) por <b>R$ 80</b>.<br>• Também podemos usar um subdomínio gratuito se preferir.<br><br>O que faz mais sentido para você?",
        "Tem domínio próprio? Ótimo, configuro de graça! Não tem? Posso registrar um para você por <b>R$ 80</b>. Se preferir, também trabalhamos com subdomínio gratuito.",
        "Domínio: se você já tem, a configuração é <b>grátis</b>. Se não tem, posso registrar um por <b>R$ 80</b>. Simples assim!"
      ]
    },
    {
      name: 'localizacao',
      patterns: [/onde fica|onde você fica|onde voce fica|localização|localizacao|trairi|ceará|ceara|atende onde|atende.*brasil|atende todo|remoto|presencial/i],
      responses: [
        "📍 Sou de <b>Trairi, Ceará</b>, mas atendo <b>100% online para todo o Brasil</b>!<br>Tudo via WhatsApp, rápido e sem burocracia. Já atendi clientes de várias cidades.",
        "Fico em Trairi/CE e trabalho remoto. Atendimento é todo online, via WhatsApp, para qualquer lugar do Brasil."
      ]
    },
    {
      name: 'posgarantia',
      patterns: [/depois dos 7 dias|após a garantia|e depois da garantia|garantia acabou|sem garantia/i],
      responses: [
        "Após os 7 dias de garantia, qualquer alteração é cobrada como manutenção avulsa (valores a partir de <b>R$ 40</b>). Mas o site continua no ar normalmente, sem custo mensal!",
        "Depois da garantia, o site permanece online sem custos. Se precisar de alterações, cobro apenas as manutenções avulsas (a partir de <b>R$ 40</b>).",
        "O site fica no ar por tempo indeterminado mesmo após a garantia. Alterações futuras são cobradas à parte, com valores acessíveis."
      ]
    },
    {
      name: 'projetos',
      patterns: [/portfólio|projetos|amei cetim|halison|vitrine bio|colegio|ágape|academia|advocacia|exemplos|trabalhos feitos/i],
      responses: [
        "📂 <b>Projetos no portfólio:</b><br>• <b>Amei Cetim</b> (da Rosana) — E-commerce de acessórios com carrinho, lightbox e WhatsApp<br>• <b>Halison Henry</b> — Site institucional com SEO<br>• <b>Vitrine Bio</b> (do Samuel CEO) — Bio page premium para Instagram<br>• <b>Colégio Ágape</b> — Landing page com mapa e WhatsApp<br>• <b>Academia FitPro</b> e <b>Advocacia Souza</b> — Em desenvolvimento<br><br>Quer saber mais sobre algum em específico?",
        "Você pode ver todos os projetos na seção <b>\"Projetos\"</b> aqui do site. Tem e-commerce, institucional, bio page e mais! Quer detalhes de algum?",
        "Nossos projetos incluem Amei Cetim (e-commerce da Rosana), Halison Henry (institucional), Vitrine Bio (bio page do Samuel) e Colégio Ágape (landing page). Todos com design exclusivo!"
      ]
    },
    {
      name: 'tecnologias',
      patterns: [/tecnologia|ferramenta|usa react|usa python|usa node|stack|linguagem|programa/i],
      responses: [
        "Trabalhamos com uma stack moderna: <b>HTML5, CSS3, JavaScript, React, Python, Node.js, PostgreSQL, Tailwind CSS</b>. Também usamos Figma para design e Render/GitHub para deploy.",
        "Nossas principais tecnologias: HTML5, CSS3, JavaScript, React, Python, Node.js, PostgreSQL e Tailwind CSS. Tudo otimizado para performance e SEO.",
        "Stack que utilizo: front-end com React e Tailwind, back-end com Python e Node.js, banco de dados PostgreSQL. Design no Figma e deploy via Render e GitHub."
      ]
    },
    {
      name: 'blog',
      patterns: [/blog|postagem|artigo|conteúdo|escrever|redação/i],
      responses: [
        "📝 <b>Sobre blog:</b> todos os sites institucionais já incluem uma página de blog pronta para uso. Se precisar de postagens regulares, podemos combinar um valor mensal para produção de conteúdo.",
        "A página de blog está inclusa no Site Institucional. Não faço postagens regulares, mas posso indicar redatores ou combinar um valor para produção de conteúdo.",
        "O blog já vem configurado no plano Institucional. Para postagens frequentes, trabalhamos com valor à parte. Quer saber mais?"
      ]
    },
    {
      name: 'integracoes',
      patterns: [/integra|mercado pago|pagseguro|picpay|hotmart|google analytics|pixel|meta/i],
      responses: [
        "Trabalhamos com integração de <b>WhatsApp, Google Maps, Instagram, Google Analytics, Meta Pixel</b> e outras ferramentas. Para pagamentos online (Mercado Pago, PagSeguro), podemos integrar conforme a necessidade do projeto.",
        "Integramos WhatsApp, Google Maps, redes sociais, Google Analytics e Meta Pixel em todos os planos. Para gateways de pagamento, é um serviço adicional.",
        "As integrações padrão (WhatsApp, Maps, Analytics, Pixel) já estão inclusas. Para integrações específicas como Mercado Pago, me consulte para um orçamento personalizado."
      ]
    },
    {
      name: 'contato',
      patterns: [/whatsapp|falar|atendente|humano|pessoa|conversar|ligar|telefone|contato|passar zap|quero falar/i],
      responses: [
        'Claro! Me chama no WhatsApp para conversarmos melhor. 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>',
        'Vamos conversar no WhatsApp! É mais rápido e posso te atender melhor. 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>',
        'Me chama no WhatsApp! 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>'
      ]
    },
    {
      name: 'agradecimento',
      patterns: [/obrigad[oa]|valeu|brigad[oa]|thanks|vlw|grato|agradecido/i],
      responses: [
        "De nada! 😊 Estou sempre à disposição no WhatsApp.",
        "Por nada! Qualquer dúvida, é só chamar no WhatsApp.",
        "Imagina! Conte comigo para o que precisar. 👋",
        "Disponha! 😊 Estou aqui quando precisar.",
        "Fico feliz em ajudar! Qualquer coisa, me chama no WhatsApp."
      ]
    },
    {
      name: 'servicos',
      patterns: [/o que você faz|serviços|quais serviços|o que oferece|tipos de site/i],
      responses: [
        "Oferecemos:<br>📱 <b>Vitrine Bio</b> (bio para Instagram) — R$ 97<br>🎯 <b>Landing Pages</b> (alta conversão) — R$ 550<br>📄 <b>Sites 2 páginas</b> — R$ 700<br>🏢 <b>Sites Institucionais</b> (até 5 páginas) — R$ 1.000<br>🛒 <b>E-commerce</b> — sob consulta<br><br>Todos com pagamento único, hospedagem inclusa e garantia de 7 dias!",
        "Nossos serviços: criação de landing pages, sites institucionais, bio pages, e-commerce e SEO local. Preços a partir de R$ 97, com garantia de 7 dias!",
        "Trabalho com sites, landing pages, bio pages, e-commerce e SEO. Planos de R$ 97 a R$ 1.000, pagamento único, hospedagem inclusa e 7 dias de garantia."
      ]
    },
    {
      name: 'seo',
      patterns: [/seo|google|ranquear|aparecer|primeira página|busca|orgânico|indexar/i],
      responses: [
        "SEO incluso em todos os planos! Otimização para Google, Google Meu Negócio e buscas locais. Seu site pronto para ranquear!",
        "Trabalho com SEO local e técnico em todos os projetos. Palavras-chave, meta tags, Google Meu Negócio — tudo configurado.",
        "Sim, SEO está incluso! Otimização completa para seu site aparecer no Google e atrair clientes da sua região."
      ]
    },
    {
      name: 'responsivo',
      patterns: [/responsivo|celular|mobile|tablet|dispositivo|adaptar|funciona no celular/i],
      responses: [
        "Todos os sites são 100% responsivos! Funcionam perfeitamente no celular, tablet e computador. É padrão em todos os planos.",
        "Responsividade é obrigatória em todos os meus projetos. Seu site ficará perfeito em qualquer dispositivo.",
        "Sim, todos os sites que crio são mobile-first e funcionam em qualquer tela!"
      ]
    },
    {
      name: 'diferenciais',
      patterns: [/diferencial|por que você|por que escolher|vantagem|diferente/i],
      responses: [
        "Nossos diferenciais:<br>✅ <b>WhatsApp Multi</b> – Múltiplos números e mensagens automáticas<br>✅ <b>Mapa integrado</b> – Google Maps com um ou vários endereços<br>✅ <b>Efeitos profissionais</b> – Animações e microinterações<br>✅ <b>Mobile + Desktop</b> – Responsivo em qualquer dispositivo<br>✅ <b>Cores do negócio</b> – Identidade visual personalizada<br>✅ <b>Foco em conversão</b> – Design pensado para vender<br>✅ <b>Fontes personalizadas</b> – Tipografia exclusiva<br>✅ <b>Performance 95+</b> – Sites rápidos e otimizados<br>✅ <b>Garantia de 7 dias</b> – Devolvo seu dinheiro se não gostar<br>✅ <b>Hospedagem inclusa</b> – Sem custo adicional",
        "O que nos diferencia:<br>✨ Design exclusivo para cada cliente<br>✨ Foco total em conversão e vendas<br>✨ SEO local incluso<br>✨ Suporte pós-entrega<br>✨ Pagamento único, sem mensalidades<br>✨ Garantia de 7 dias<br>✨ Hospedagem inclusa<br><br>Quer saber mais sobre algum desses?",
        "Diferenciais SML/PN: ✅ WhatsApp Multi, ✅ Mapas integrados, ✅ Design responsivo, ✅ Cores personalizadas, ✅ Foco em conversão, ✅ Fontes exclusivas, ✅ Performance 95+, ✅ Garantia de 7 dias, ✅ Hospedagem inclusa!"
      ]
    },
    {
      name: 'sobre',
      patterns: [/quem é|sobre você|samuel|quem faz|desenvolvedor/i],
      responses: [
        "Meu nome é <b>Samuel Pena</b>, sou desenvolvedor Full Stack em Trairi, Ceará. Crio sites rápidos, que ranqueiam bem no Google e convertem no WhatsApp. Foco em resultados reais! Ofereço <b>garantia de 7 dias</b> em todos os projetos.",
        "Sou o <b>Samuel Pena</b>, desenvolvedor Full Stack. Trabalho com criação de sites, landing pages e bio pages. Foco total em performance, SEO e conversão. Todos os projetos com <b>garantia de 7 dias</b> e <b>hospedagem inclusa</b>!",
        "Eu sou <b>Samuel Pena</b>, o fundador da SML/PN. Desenvolvo sites profissionais com foco em velocidade, SEO e resultados. Atendimento pelo WhatsApp, <b>garantia de 7 dias</b> e <b>hospedagem inclusa</b> em todos os projetos."
      ]
    },
    {
      name: 'hospedagem',
      patterns: [/hospedagem|hospedar|servidor|site no ar|publicação|publicar/i],
      responses: [
        "✅ <b>Hospedagem inclusa</b> em todos os planos! Seu site fica no ar por tempo indeterminado, sem custo mensal para você. Isso mesmo: pagamento único, sem mensalidades!",
        "A hospedagem está inclusa em todos os nossos planos! Você paga apenas uma vez e seu site permanece no ar. Sem cobranças mensais!",
        "Todos os planos incluem hospedagem gratuita. Seu site fica online 24h por dia, sem custo adicional. Pagamento único!"
      ]
    }
  ];

  const fallbackResponses = [
    "Desculpe, não entendi bem. Pode reformular? Posso ajudar com <b>preços, planos, manutenção, prazos, garantia, domínio, SEO, projetos, tecnologias, materiais necessários, e-commerce, redesign…</b>",
    "Hmm, não tenho certeza se entendi. Pode tentar perguntar de outra forma? Ex: 'quanto custa', 'o que precisa pra começar', 'você faz loja virtual?'",
    "Não consegui compreender. Que tal me dar mais detalhes ou falarmos no WhatsApp?",
    "Poxa, não entendi. Mas estou aprendendo! Pode me explicar melhor?",
    "Essa eu não peguei. 😅 Posso te ajudar com <b>planos, preços, manutenções, prazos, domínio, projetos, materiais, e-commerce e mais</b>.",
    "Não entendi completamente. Você pode me dar um exemplo ou falar de outra forma?",
    "Desculpe, ainda estou aprendendo algumas coisas. Pode tentar perguntar diferente?",
    "Hmm, essa pergunta é nova para mim. Pode me dar mais contexto?"
  ];

  const whatsappFallback = 'Parece que estamos com dificuldades. Me chama no WhatsApp que te respondo na hora 👇<br><br><a href="https://wa.me/558586121078?text=Olá!%20Vim%20pelo%20chat%20do%20site." target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>';

  // ==================== FUNÇÕES SEGURAS E COMPLETAS ====================
  function addBubble(text, type) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + type;
    if (type === 'user') {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = text;
    }
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-bubble assistant typing-dots';
    typing.innerHTML = '<span></span><span></span>';
    typing.id = 'typingIndicator';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  function findIntent(userMsg) {
    const msg = userMsg.toLowerCase();
    for (let intent of intents) {
      for (let pattern of intent.patterns) {
        if (pattern.test(msg)) return intent;
      }
    }
    return null;
  }

  function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function botReply(userMsg) {
    showTyping();
    const delay = 700 + Math.random() * 1200;
    setTimeout(() => {
      removeTyping();
      const intent = findIntent(userMsg);
      if (intent) {
        lastTopic = intent.name;
        failCount = 0;
        addBubble(getRandomResponse(intent.responses), 'assistant');
      } else {
        failCount++;
        if (failCount >= MAX_FAILS) {
          addBubble(whatsappFallback, 'assistant');
          failCount = 0;
        } else {
          addBubble(getRandomResponse(fallbackResponses), 'assistant');
        }
      }
    }, delay);
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) {
      addBubble("Mensagem muito longa! Tenta resumir em até 500 caracteres 😅", 'assistant');
      return;
    }
    addBubble(text, 'user');
    chatInput.value = '';
    chatInput.focus();
    botReply(text);
  }

  function openChat() {
    chatOverlay.classList.add('open');
    chatInput.focus();
    if (!hasGreeted && chatMessages.children.length === 0) {
      hasGreeted = true;
      const saudacaoIntent = intents.find(i => i.name === 'saudacao');
      setTimeout(() => {
        addBubble(getRandomResponse(saudacaoIntent.responses), 'assistant');
      }, 600);
    }
  }

  // ==================== EVENTOS ====================
  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', () => chatOverlay.classList.remove('open'));
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
  chatOverlay.addEventListener('click', (e) => { if (e.target === chatOverlay) chatOverlay.classList.remove('open'); });
})();
