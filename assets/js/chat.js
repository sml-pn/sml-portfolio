
/* ==================== CHAT SML BOT - V8 COMPLETO COM TODOS OS PLANOS ==================== */
(function() {
  const chatFab = document.getElementById('chatFab');
  const chatOverlay = document.getElementById('chatOverlay');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  function trackEvent(eventName, params) {
    params = params || {};
    if (typeof gtag !== 'undefined') { gtag('event', eventName, params); }
  }

  // ============ LINKS ============
  const L = {
    ameicetim: 'https://ameicetim.onrender.com',
    halison: 'https://halison-henry.onrender.com',
    vitrinebio: 'https://vitrinebio.onrender.com',
    showcase: 'https://vitrinebio.onrender.com/showcase.html',
    colegioagape: 'https://colegioagape.onrender.com',
    portfolio: 'https://sml-developer.onrender.com',
    whatsapp: 'https://wa.me/558586121078'
  };

  // ============ TYPOS ============
  var typos = {
    'preso':'preco','presiso':'preciso','orcsamento':'orcamento','orcamento':'orcamento',
    'manutencao':'manutencao','duvida':'duvida','obrigado':'obrigado','obrigada':'obrigado',
    'vlw':'valeu','blz':'beleza','tb':'tambem','tbm':'tambem','vc':'voce','vcs':'voces',
    'qto':'quanto','qt':'quanto','q':'que','pq':'porque','prazo':'prazo','praso':'prazo',
    'garatia':'garantia','garantia':'garantia','dominio':'dominio','hospedagem':'hospedagem',
    'responsivo':'responsivo','ecommerce':'ecommerce','e commerce':'ecommerce',
    'loja virtual':'ecommerce','landing page':'landing','landingpage':'landing',
    'bio page':'vitrine','whats':'whatsapp','zap':'whatsapp','wpp':'whatsapp',
    'celular':'mobile','site institucional':'institucional','app':'aplicativo',
    'aplicativo':'app','cartao':'cartao','pix':'pix','dinheiro':'pagamento',
    'custo':'preco','valor':'preco','investimento':'preco','cobrar':'preco',
    'taxa':'preco','catalogo':'catalogo','portfolio':'portfolio','ingles':'ingles',
    'traducao':'traducao','multi idioma':'multilingue','logo':'identidade visual',
    'logotipo':'identidade visual','marca':'identidade visual','curso':'aula',
    'ensinar':'curso','aprender':'curso','contratar':'vaga','estagio':'vaga',
    'emprego':'vaga','revender':'parceria','sociedade':'parceria','socio':'parceria',
    'urgencia':'urgencia','pra hoje':'urgencia','presente':'vale-presente',
    'gift':'vale-presente','brinde':'vale-presente','sistema':'sistema',
    'sistema web':'sistema','erp':'sistema','agendamento':'agenda','agenda':'agendamento',
    'reserva':'agendamento','wordpress':'wordpress','elementor':'wordpress',
    'wix':'wordpress','anuncio':'trafego','trafego':'trafego','google ads':'trafego',
    'facebook ads':'trafego','instagram ads':'trafego','meta ads':'trafego',
    'google meu negocio':'google business','gmb':'google business','perto de mim':'seo local',
    'procurar':'seo','buscar':'seo','botao':'botao','botao de pagamento':'pagamento online',
    'pagamento online':'pagamento online','checkout':'pagamento online',
    'manutencao site outro':'site terceiro','site de outro':'site terceiro',
    'nao fui eu que fiz':'site terceiro','outro dev':'site terceiro',
    'indicacao':'indicacao','recomendar':'indicacao','conhece':'indicacao',
    'alguem':'indicacao','outro desenvolvedor':'indicacao',
  };

  function normalize(text) {
    var n = text.toLowerCase().replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e')
      .replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u')
      .replace(/[ç]/g,'c').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
    for (var t in typos) { n = n.replace(new RegExp('\\b'+t+'\\b','g'), typos[t]); }
    return n;
  }

  function wppBtn(txt) {
    return '<br><br><a href="'+L.whatsapp+'?text='+encodeURIComponent(txt||'Olá! Vim pelo chat.')+'" target="_blank" class="whatsapp-chat-link" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</a>';
  }

  function linkBtn(url, txt) {
    return '<a href="'+url+'" target="_blank" style="display:inline-block;background:var(--cyan);color:#04111a;padding:10px 16px;border-radius:999px;font-weight:600;text-decoration:none;margin:4px 6px 4px 0;font-size:13px;"><i class="fas fa-external-link-alt"></i> '+txt+'</a>';
  }

  var ctx = { lastIntent:null, lastUserMsg:'', msgCount:0, askedPrice:false, askedPortfolio:false, askedVitrine:false, history:[] };

  function addHistory(u,b){ctx.history.push({user:u,bot:b,time:new Date()});if(ctx.history.length>10)ctx.history.shift();}

  function getContextual(intent, userMsg) {
    var r = intent.responses[Math.floor(Math.random()*intent.responses.length)];
    if(ctx.askedPrice && intent.id==='prazo') r+='<br><br>💡 Já que viu os preços: todos os planos têm <b>garantia de 7 dias</b> e <b>hospedagem inclusa</b>!';
    if(ctx.askedVitrine && intent.id==='preco') r+='<br><br>💡 Você viu a Vitrine Bio. Temos 3 planos: Simples (R$97), Premium (R$247) e Empresarial (R$497)!';
    return r;
  }

  // ============ BASE DE CONHECIMENTO COMPLETA ============
  var kb = [
    {
      id:'saudacao',
      keywords:['oi','ola','hey','bom dia','boa tarde','boa noite','saudacoes','iae','opa','fala','salve','bao','boa','hi','hello','iniciar','comecar','ajuda','poderia','gostaria'],
      weight:10, gaEvent:'chat_saudacao',
      responses:[
        '👋 Olá! Sou o assistente virtual da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br><b>📱 Vitrine Bio (a partir de R$97):</b><br>• Simples: R$97 • Premium: R$247 • Empresarial: R$497<br><br><b>🌐 Sites:</b><br>🎯 Landing Page: R$550<br>📄 Site 2 páginas: R$700<br>🏢 Institucional: R$1.000<br>🛒 E-commerce: sob consulta<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.vitrinebio,'📱 Bio')+linkBtn(L.ameicetim,'🛒 Loja')+wppBtn('Olá Samuel! Vim pelo chat.'),
        'Olá! 😊 Bem-vindo à SML/PN!<br><br>📱 <b>Vitrine Bio:</b> Simples (R$97) | Premium (R$247) | Empresarial (R$497)<br>🌐 <b>Sites:</b> Landing (R$550) | 2 págs (R$700) | Institucional (R$1.000)<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Quero saber mais!')
      ]},
    {
      id:'preco',
      keywords:['preco','quanto','custa','valor','investimento','cobrar','taxa','tabela','planos','todos os precos','lista de precos','valores','precos','precinho','custo','orcamento'],
      weight:15, gaEvent:'chat_intent_preco',
      responses:[
        '📋 <b>Tabela completa (pagamento único):</b><br><br><b>📱 Vitrine Bio (Bio do Instagram):</b><br>• <b>Simples</b> — R$ 97 (links essenciais, design clean, entrega 48h)<br>• <b>Premium</b> — R$ 247 (identidade visual, depoimentos, mapa, Pixel)<br>• <b>Empresarial</b> — R$ 497 (galeria, Analytics, contador de urgência, animações)<br><br><b>🌐 Sites:</b><br>🎯 Landing Page — R$ 550<br>📄 Site 2 páginas — R$ 700<br>🏢 Institucional (até 5 págs) — R$ 1.000<br>🛒 E-commerce — sob consulta<br><br>🛠️ Manutenções: R$ 40 a R$ 250<br>📦 Pacote mensal: R$ 200<br><br>✅ Garantia 7 dias • 💳 50%+50% • 🌐 Hospedagem inclusa<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Todos Modelos')+linkBtn(L.vitrinebio,'📱 Bio Premium')+linkBtn(L.portfolio,'🌐 Sites')+wppBtn('Quero contratar!'),
        '💰 <b>Preços SML/PN — pagamento único:</b><br><br>📱 <b>Vitrine Bio:</b><br>• Simples: <b>R$ 97</b> (links, 48h)<br>• Premium: <b>R$ 247</b> (visual, depoimentos, mapa)<br>• Empresarial: <b>R$ 497</b> (galeria, urgência, Analytics)<br><br>🌐 <b>Sites:</b><br>• Landing: <b>R$ 550</b><br>• 2 págs: <b>R$ 700</b><br>• Institucional: <b>R$ 1.000</b><br>• E-commerce: sob consulta<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.halison,'🏢 Exemplo Site')+wppBtn('Quero um orçamento!')
      ]},
    {
      id:'vitrine',
      keywords:['vitrine','bio page','bio simples','link na bio','linktree','pagina de bio','bio do instagram','pagina de links','bio profissional','modelo bio','modelos','showcase','bio premium','bio empresarial','vitrine bio'],
      weight:14, gaEvent:'chat_intent_vitrine',
      responses:[
        '📱 <b>Vitrine Bio — Planos completos:</b><br><br>🟢 <b>Bio Simples — R$ 97</b><br>✅ Página com links essenciais<br>✅ Design clean mobile-first<br>✅ Entrega em até 48h<br>✅ Hospedagem 1 ano<br><br>🔵 <b>Bio Premium — R$ 247</b> (MAIS POPULAR)<br>✅ Tudo do Simples +<br>✅ Identidade visual personalizada<br>✅ Seção de depoimentos<br>✅ Mapa de localização<br>✅ Botão WhatsApp otimizado<br>✅ Pixel Facebook/Google<br><br>🟣 <b>Bio Empresarial — R$ 497</b><br>✅ Tudo do Premium +<br>✅ Galeria de fotos/produtos<br>✅ Google Analytics<br>✅ Contador de urgência<br>✅ Animações premium<br>✅ Suporte prioritário 30 dias<br><br>🔗 <b>Veja os modelos ao vivo:</b><br>'+linkBtn(L.showcase,'🎨 Ver Todos os Modelos')+linkBtn(L.vitrinebio,'📱 Modelo Premium')+'<br><br>✅ Garantia de 7 dias • Pagamento único • +2.800 bios entregues<br><br>'+wppBtn('Quero minha Vitrine Bio!'),
        '📱 <b>Vitrine Bio:</b> transforme seu link em máquina de vendas!<br><br>🟢 <b>Simples: R$ 97</b> — Links essenciais, 48h<br>🔵 <b>Premium: R$ 247</b> — Visual, depoimentos, mapa, Pixel ⭐<br>🟣 <b>Empresarial: R$ 497</b> — Galeria, urgência, Analytics<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.vitrinebio,'📱 Abrir Exemplo')+'<br><br>✅ +2.800 bios entregues • Garantia 7 dias<br><br>'+wppBtn('Quero pedir a minha!'),
        '📱 <b>Vitrine Bio — 3 planos:</b><br><br>🟢 <b>Simples (R$ 97)</b> — Bio profissional com links<br>🔵 <b>Premium (R$ 247)</b> — + identidade visual, depoimentos, mapa<br>🟣 <b>Empresarial (R$ 497)</b> — + galeria, contador de urgência, Analytics<br><br>🔗 Modelos: '+linkBtn(L.showcase,'🎨 Showcase')+linkBtn(L.vitrinebio,'📱 Exemplo')+'<br><br>'+wppBtn('Quero escolher meu plano!')
      ]},
    {
      id:'vitrine_simples',
      keywords:['bio simples','vitrine simples','97','plano simples','bio 97','r$ 97','bio basica','bio barata'],
      weight:11, gaEvent:'chat_intent_vitrine_simples',
      responses:[
        '🟢 <b>Bio Simples — R$ 97 (pagamento único)</b><br><br>✅ Página com links essenciais<br>✅ Design clean mobile-first<br>✅ Entrega em até <b>48h</b><br>✅ Hospedagem 1 ano inclusa<br>✅ 1 ajuste mensal grátis<br><br>Ideal para começar com profissionalismo!<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Bio Simples!')
      ]},
    {
      id:'vitrine_premium',
      keywords:['bio premium','vitrine premium','247','plano premium','bio 247','r$ 247','premium','mais popular','identidade visual','depoimentos','pixel'],
      weight:11, gaEvent:'chat_intent_vitrine_premium',
      responses:[
        '🔵 <b>Bio Premium — R$ 247 (MAIS POPULAR) ⭐</b><br><br>✅ Tudo do Simples<br>✅ Identidade visual personalizada<br>✅ Seção de depoimentos<br>✅ Mapa de localização<br>✅ Botão WhatsApp otimizado<br>✅ Pixel Facebook/Google<br>✅ 3 ajustes mensais grátis<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos Premium')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Bio Premium!')
      ]},
    {
      id:'vitrine_empresarial',
      keywords:['bio empresarial','vitrine empresarial','497','plano empresarial','bio 497','r$ 497','empresarial','galeria','contador','urgencia','analytics'],
      weight:11, gaEvent:'chat_intent_vitrine_empresarial',
      responses:[
        '🟣 <b>Bio Empresarial — R$ 497</b><br><br>✅ Tudo do Premium<br>✅ Galeria de fotos/produtos<br>✅ Google Analytics integrado<br>✅ Contador de urgência<br>✅ Animações premium<br>✅ Suporte prioritário 30 dias<br>✅ 5 ajustes mensais grátis<br><br>Para quem quer o máximo de conversão!<br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Bio Empresarial!')
      ]},
    {
      id:'landing',
      keywords:['landing','landing page','pagina de vendas','conversao','550','pagina profissional','pagina completa','pagina unica'],
      weight:12, gaEvent:'chat_intent_landing',
      responses:[
        '🎯 <b>Landing Page (R$ 550)</b><br><br>✅ Design exclusivo<br>✅ Hero, Sobre, Serviços, Diferenciais<br>✅ Mapa, Galeria, WhatsApp Multi<br>✅ CTA + formulário + SEO<br>✅ Pronta em até <b>72h</b><br>✅ Hospedagem inclusa + Garantia 7 dias<br><br>🔗 '+linkBtn(L.colegioagape,'🏫 Exemplo')+linkBtn(L.portfolio,'🎯 Modelo')+linkBtn(L.showcase,'🎨 Modelos')+wppBtn('Quero Landing Page!')
      ]},
    {
      id:'site2',
      keywords:['site 2','duas paginas','700','pagina extra','2 paginas','segunda pagina','site com 2'],
      weight:11, gaEvent:'chat_intent_site2',
      responses:[
        '📄 <b>Site 2 páginas (R$ 700)</b><br><br>✅ Landing completa + 1 página extra<br>✅ Menu de navegação<br>✅ SEO em ambas<br>✅ Pronto em até <b>96h</b><br>✅ Hospedagem + Garantia 7 dias<br><br>🔗 '+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Quero Site 2 págs!')
      ]},
    {
      id:'institucional',
      keywords:['site institucional','5 paginas','1000','site completo','empresa','site grande','varias paginas','clinica','negocio'],
      weight:11, gaEvent:'chat_intent_institucional',
      responses:[
        '🏢 <b>Site Institucional (R$ 1.000)</b><br><br>✅ Home+Sobre+Serviços+Contato+Blog<br>✅ Menu, formulário, mapa, galeria<br>✅ WhatsApp Multi + SEO completo<br>✅ Pronto em até <b>7 dias</b><br><br>🔗 '+linkBtn(L.halison,'🏢 Ver Exemplo')+linkBtn(L.showcase,'🎨 Modelos')+wppBtn('Quero Institucional!')
      ]},
    {
      id:'ecommerce',
      keywords:['ecommerce','e-commerce','loja virtual','loja online','carrinho','vender online','vitrine de produtos','catalogo','loja'],
      weight:13, gaEvent:'chat_intent_ecommerce',
      responses:[
        '🛒 <b>E-commerce / Loja Virtual</b><br>Exemplo: <b>Amei Cetim</b> com carrinho e checkout WhatsApp.<br><br>✅ Vitrine de produtos<br>✅ Carrinho de compras<br>✅ Integração WhatsApp<br>✅ Mercado Pago/PagSeguro (adicional)<br>✅ Design responsivo<br><br>💰 Valor: <b>sob consulta</b><br><br>🔗 '+linkBtn(L.ameicetim,'🛍️ Ver Loja ao Vivo')+linkBtn(L.showcase,'🎨 Modelos')+wppBtn('Quero orçamento!')
      ]},
    {
      id:'projetos',
      keywords:['portfolio','projetos','trabalhos','amei cetim','halison','colegio','exemplos','trabalhos feitos','mostrar','ver mais','ver site','ver projeto','modelos'],
      weight:13, gaEvent:'chat_intent_projetos',
      responses:[
        '📂 <b>Projetos no portfólio:</b><br><br>🛒 <b>Amei Cetim</b> — E-commerce<br>'+linkBtn(L.ameicetim,'Ver Site')+'<br><br>🏢 <b>Halison Henry</b> — Institucional<br>'+linkBtn(L.halison,'Ver Site')+'<br><br>📱 <b>Vitrine Bio</b> — Bio page<br>'+linkBtn(L.vitrinebio,'Ver Modelo')+'<br><br>🏫 <b>Colégio Ágape</b> — Landing<br>'+linkBtn(L.colegioagape,'Ver Site')+'<br><br>🎨 <b>Showcase de Modelos</b><br>'+linkBtn(L.showcase,'Ver Todos')+'<br><br>⏳ Academia FitPro e Advocacia Souza — Em desenvolvimento<br><br>'+linkBtn(L.portfolio+'#projetos','📂 Ver Portfólio Completo')+wppBtn('Quero um site como esses!')
      ]},
    {
      id:'redesign',
      keywords:['ja tenho site','tenho um site','reformar','refazer','repaginar','site antigo','site existente','remodelar','redesign','modernizar'],
      weight:11, gaEvent:'chat_intent_redesign',
      responses:[
        '🔄 <b>Reformo seu site sim!</b> Análise gratuita + refaço com foco em velocidade, SEO e WhatsApp.<br><br>💰 A partir de <b>R$ 550</b>.<br><br>🔗 '+linkBtn(L.portfolio+'#projetos','Antes/Depois')+linkBtn(L.showcase,'Modelos')+wppBtn('Quero reformar!')
      ]},
    {
      id:'materiais',
      keywords:['precisa','preciso','mandar','enviar','materiais','briefing','informacoes','como comecar','para iniciar','necessario'],
      weight:10, gaEvent:'chat_intent_materiais',
      responses:[
        '📦 <b>Para começar, preciso de:</b><br>1️⃣ Logo (se tiver)<br>2️⃣ Cores / referências<br>3️⃣ Textos sobre seu negócio<br>4️⃣ Fotos<br>5️⃣ Links: WhatsApp, Instagram, endereço<br><br>Em 48h-72h sua primeira versão fica pronta!<br>🔗 '+linkBtn(L.showcase,'Ver Modelos')+wppBtn('Vou enviar!')
      ]},
    {
      id:'manutencao',
      keywords:['manutencao','trocar','alterar','mudar','atualizar','troca','galeria','arrumar','consertar','mexer','modificar','ajuste'],
      weight:12, gaEvent:'chat_intent_manutencao',
      responses:[
        '🛠️ <b>Manutenções avulsas:</b><br>🔧 WhatsApp/link/texto: <b>R$ 40</b><br>🖼️ Imagem/banner: <b>R$ 50</b><br>🔘 Botão/ícone: <b>R$ 40</b><br>🖼️ Galeria (até 10 fotos): <b>R$ 100</b><br>📄 Página extra: <b>R$ 250</b><br>🌐 Domínio: <b>R$ 80</b><br><br>📦 <b>Pacote mensal:</b> R$ 200 (até 5 alterações)<br><br>'+wppBtn('Preciso de manutenção!')
      ]},
    {
      id:'garantia',
      keywords:['garantia','devolucao','reembolso','nao gostar','arrepender','7 dias','dinheiro de volta','insatisfeito'],
      weight:10, gaEvent:'chat_intent_garantia',
      responses:[
        '✅ <b>Garantia Incondicional de 7 Dias!</b><br>Se não amar, se não ver mais cliques, se não ficar 10x mais profissional... devolvemos 100%. O risco é todo nosso.<br><br>🔗 '+linkBtn(L.portfolio+'#projetos','Ver Trabalhos')+linkBtn(L.showcase,'Modelos')+wppBtn('Quero saber mais!')
      ]},
    {
      id:'pagamento',
      keywords:['pagamento','pagar','cartao','pix','transferencia','boleto','parcela','50%','sinal','forma','como paga','parcelar','desconto'],
      weight:11, gaEvent:'chat_intent_pagamento',
      responses:[
        '💳 <b>Pagamento:</b> 50% início + 50% entrega. Pix e transferência.<br>✅ <b>Pagamento único</b>, sem mensalidades!<br>✅ Garantia 7 dias.<br>✅ Hospedagem inclusa.<br><br>'+wppBtn('Quero fechar!')
      ]},
    {
      id:'prazo',
      keywords:['prazo','demora','dias','semanas','entrega','rapido','urgente','tempo','quando fica pronto','agilidade'],
      weight:11, gaEvent:'chat_intent_prazo',
      responses:[
        '⏱️ <b>Prazos:</b><br>📱 Bio Simples: <b>até 48h</b><br>📱 Bio Premium/Empresarial: <b>3-5 dias</b><br>🎯 Landing: <b>até 72h</b><br>📄 Site 2 págs: <b>até 96h</b><br>🏢 Institucional: <b>até 7 dias</b><br>🛒 E-commerce: sob consulta<br><br>🔗 '+linkBtn(L.portfolio+'#projetos','Portfólio')+linkBtn(L.showcase,'Modelos')+wppBtn('Tenho urgência!')
      ]},
    {
      id:'processo',
      keywords:['como funciona','processo','etapas','metodo','como e','passo a passo','fluxo'],
      weight:10, gaEvent:'chat_intent_processo',
      responses:[
        '🔄 <b>Processo:</b><br>1️⃣ Brief (WhatsApp, 30min)<br>2️⃣ Design mobile-first<br>3️⃣ Code limpo, SEO, WhatsApp<br>4️⃣ Deploy e site no ar!<br><br>✅ Garantia 7 dias • Suporte incluso<br>🔗 '+linkBtn(L.halison,'Ver Exemplo')+wppBtn('Vamos começar!')
      ]},
    {
      id:'dominio',
      keywords:['dominio','url','www','dns','endereco','com.br','comprar dominio','ja tenho dominio','registro'],
      weight:10, gaEvent:'chat_intent_dominio',
      responses:[
        '🌐 <b>Domínio:</b><br>• Já tem? Configuro <b>grátis</b>!<br>• Não tem? Registro por <b>R$ 80</b><br>• Subdomínio gratuito também<br><br>🔗 '+linkBtn(L.ameicetim,'Exemplo')+wppBtn('Quero configurar!')
      ]},
    {
      id:'localizacao',
      keywords:['onde fica','localizacao','trairi','ceara','atende','remoto','presencial','cidade','estado'],
      weight:9, gaEvent:'chat_intent_localizacao',
      responses:[
        '📍 <b>Trairi, Ceará</b> — atendo <b>100% online para todo o Brasil</b>!<br>🔗 '+linkBtn(L.portfolio+'#projetos','Clientes')+wppBtn('Atende minha cidade?')
      ]},
    {
      id:'contato',
      keywords:['whatsapp','falar','atendente','humano','pessoa','conversar','ligar','telefone','contato','passar zap','quero falar'],
      weight:13, gaEvent:'chat_intent_contato',
      responses:[
        'Claro! Me chama no WhatsApp 👇'+wppBtn('Olá! Vim pelo chat.'),
        'Vamos no WhatsApp! 👇'+wppBtn('Quero falar com o Samuel!')
      ]},
    {
      id:'agradecimento',
      keywords:['obrigado','valeu','brigado','thanks','vlw','grato','agradecido','obrigada'],
      weight:7, gaEvent:'chat_intent_agradecimento',
      responses:[
        'De nada! 😊 Estou à disposição.'+wppBtn('Preciso de ajuda!'),
        'Por nada! Qualquer coisa é só chamar. 👋'
      ]},
    {
      id:'servicos',
      keywords:['servicos','o que faz','quais servicos','oferece','tipos de site','trabalhos'],
      weight:12, gaEvent:'chat_intent_servicos',
      responses:[
        '🚀 <b>Serviços SML/PN:</b><br><br>📱 <b>Vitrine Bio:</b> Simples (R$97) | Premium (R$247) | Empresarial (R$497)<br>🎯 Landing Page (R$550)<br>📄 Site 2 págs (R$700)<br>🏢 Institucional (R$1.000)<br>🛒 E-commerce (sob consulta)<br>🔍 SEO • 🛠️ Manutenção<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Quero contratar!')
      ]},
    {
      id:'seo',
      keywords:['seo','google','ranquear','aparecer','primeira pagina','busca','organico','indexar'],
      weight:10, gaEvent:'chat_intent_seo',
      responses:[
        '🔍 <b>SEO incluso em todos os planos!</b> Google, Google Meu Negócio, buscas locais.<br>🔗 '+linkBtn(L.colegioagape,'Exemplo Ranqueado')+wppBtn('Quero ranquear!')
      ]},
    {
      id:'sistema',
      keywords:['sistema','sistema web','erp','agendamento','agenda','reserva','gestao','dashboard','painel'],
      weight:11, gaEvent:'chat_intent_sistema',
      responses:[
        '💻 <b>Sistema web?</b> Faço sim! Agendamento, gestão, dashboard.<br>💰 <b>sob consulta</b>.<br><br>'+wppBtn('Quero orçamento!')
      ]},
    {
      id:'wordpress',
      keywords:['wordpress','elementor','wix','cms','site pronto','template'],
      weight:9, gaEvent:'chat_intent_wordpress',
      responses:[
        '❌ <b>Não uso WordPress.</b> Sites <b>código puro</b> — mais rápidos e seguros. Performance 95+!<br>🔗 '+linkBtn(L.ameicetim,'Exemplo Código Puro')+wppBtn('Quero site rápido!')
      ]},
    {
      id:'parceria',
      keywords:['parceria','revender','sociedade','socio','afiliado','comissao','indicar cliente'],
      weight:9, gaEvent:'chat_intent_parceria',
      responses:[
        '🤝 <b>Parcerias:</b> indique clientes e ganhe <b>comissão</b>!<br><br>'+wppBtn('Quero ser parceiro!')
      ]},
    {
      id:'trafego',
      keywords:['trafego','anuncio','google ads','facebook ads','instagram ads','trafego pago','campanha'],
      weight:9, gaEvent:'chat_intent_trafego',
      responses:[
        '📈 <b>Tráfego pago?</b> Indico gestores parceiros. Foco em criar sites que convertam!<br><br>'+wppBtn('Me indica um gestor?')
      ]},
    {
      id:'sobre',
      keywords:['quem e','sobre voce','samuel','quem faz','desenvolvedor','fundador','dono'],
      weight:10, gaEvent:'chat_intent_sobre',
      responses:[
        '👨‍💻 <b>Samuel Pena</b>, Full Stack em Trairi-CE. Sites rápidos, que ranqueiam e convertem.<br><br>🔗 '+linkBtn(L.portfolio,'Site')+linkBtn(L.showcase,'Modelos')+linkBtn(L.portfolio+'#projetos','Portfólio')+wppBtn('Quero falar com o Samuel!')
      ]},
    {
      id:'hospedagem',
      keywords:['hospedagem','hospedar','servidor','site no ar','publicacao','publicar','online'],
      weight:10, gaEvent:'chat_intent_hospedagem',
      responses:[
        '✅ <b>Hospedagem inclusa</b> em todos os planos! Site no ar 24h sem custo mensal.<br>🔗 '+linkBtn(L.vitrinebio,'Exemplo Online')+wppBtn('Quero meu site no ar!')
      ]}
  ];

  function findBestMatch(userMsg) {
    var n = normalize(userMsg);
    var words = n.split(' ').filter(function(w){return w.length>1;});
    var best=null, bestScore=0;
    for(var i=0;i<kb.length;i++){
      var intent=kb[i], score=0;
      for(var j=0;j<intent.keywords.length;j++){
        var kw=intent.keywords[j];
        if(n.indexOf(kw)!==-1) score+=intent.weight;
        for(var k=0;k<words.length;k++){
          if(kw.indexOf(words[k])!==-1&&words[k].length>2) score+=Math.floor(intent.weight/3);
        }
      }
      if(ctx.lastIntent===intent.id) score+=5;
      if(ctx.lastIntent==='preco'&&intent.id==='prazo') score+=4;
      if(ctx.lastIntent==='vitrine'&&intent.id==='preco') score+=4;
      if(score>bestScore){bestScore=score;best=intent;}
    }
    return bestScore<5?null:best;
  }

  var fallbacks=[
    'Não entendi completamente. Posso ajudar com:<br>📱 <b>Vitrine Bio</b> (Simples R$97, Premium R$247, Empresarial R$497)<br>🌐 <b>Sites</b> (Landing R$550, 2 págs R$700, Institucional R$1.000)<br>🛒 <b>E-commerce</b> • 🛠️ <b>Manutenção</b><br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Preciso de ajuda!'),
    'Hmm, não captei. Tente: "preços", "modelos", "vitrine", "landing", "e-commerce"?<br><br>🔗 '+linkBtn(L.showcase,'Modelos')+linkBtn(L.ameicetim,'Loja')+wppBtn('Quero falar com o Samuel!'),
    'Desculpe, não entendi. 😅<br>🔗 '+linkBtn(L.showcase,'Ver Modelos')+linkBtn(L.portfolio+'#projetos','Portfólio')+wppBtn('Me ajuda!')
  ];

  function getFallback(){return fallbacks[Math.floor(Math.random()*fallbacks.length)];}
  function getRand(arr){return arr[Math.floor(Math.random()*arr.length)];}

  function addBubble(text,type){
    var b=document.createElement('div');
    b.className='chat-bubble '+type;
    if(type==='user') b.textContent=text;
    else b.innerHTML=text;
    chatMessages.appendChild(b);
    chatMessages.scrollTop=chatMessages.scrollHeight;
    if(type==='assistant'){
      setTimeout(function(){
        var links=b.querySelectorAll('a');
        for(var i=0;i<links.length;i++){
          links[i].addEventListener('click',function(){
            var h=this.getAttribute('href');
            if(h&&h.indexOf('wa.me')!==-1) trackEvent('chat_whatsapp_click',{intent:ctx.lastIntent||'desconhecido'});
            else trackEvent('chat_link_click',{url:h,intent:ctx.lastIntent||'desconhecido'});
          });
        }
      },100);
    }
  }

  function showTyping(){
    var t=document.createElement('div');
    t.className='chat-bubble assistant typing-dots';
    t.innerHTML='<span></span><span></span><span></span>';
    t.id='typingIndicator';
    chatMessages.appendChild(t);
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }

  function removeTyping(){var t=document.getElementById('typingIndicator');if(t)t.remove();}

  function botReply(userMsg){
    showTyping();
    setTimeout(function(){
      removeTyping();
      var intent=findBestMatch(userMsg),resp;
      if(intent){
        ctx.lastIntent=intent.id;ctx.lastUserMsg=userMsg;ctx.msgCount++;
        if(intent.id==='preco')ctx.askedPrice=true;
        if(intent.id==='projetos')ctx.askedPortfolio=true;
        if(intent.id.indexOf('vitrine')!==-1)ctx.askedVitrine=true;
        if(intent.gaEvent)trackEvent(intent.gaEvent,{intent:intent.id,message_count:ctx.msgCount});
        resp=getContextual(intent,userMsg);
        ctx.lastBotResponse=resp;
        addBubble(resp,'assistant');
        addHistory(userMsg,resp);
      }else{
        ctx.msgCount++;ctx.lastUserMsg=userMsg;
        trackEvent('chat_fallback',{message_count:ctx.msgCount});
        resp=getFallback();
        ctx.lastBotResponse=resp;
        addBubble(resp,'assistant');
        addHistory(userMsg,resp);
      }
    },600+Math.random()*1000);
  }

  function sendMessage(){
    var text=chatInput.value.trim();
    if(!text)return;
    if(text.length>500){addBubble("Mensagem muito longa! 😅",'assistant');return;}
    addBubble(text,'user');
    trackEvent('chat_message',{message_length:text.length});
    chatInput.value='';
    chatInput.focus();
    botReply(text);
  }

  var hasGreeted=false;
  function openChat(){
    chatOverlay.classList.add('open');
    chatInput.focus();
    trackEvent('chat_open');
    if(!hasGreeted){
      hasGreeted=true;
      setTimeout(function(){
        for(var i=0;i<kb.length;i++){
          if(kb[i].id==='saudacao'){
            var resp=getRand(kb[i].responses);
            ctx.lastBotResponse=resp;
            addBubble(resp,'assistant');
            break;
          }
        }
      },500);
    }
  }

  chatFab.addEventListener('click',openChat);
  chatClose.addEventListener('click',function(){chatOverlay.classList.remove('open');});
  chatSend.addEventListener('click',sendMessage);
  chatInput.addEventListener('keydown',function(e){if(e.key==='Enter')sendMessage();});
  chatOverlay.addEventListener('click',function(e){if(e.target===chatOverlay)chatOverlay.classList.remove('open');});
})();
