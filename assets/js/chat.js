
/* ==================== CHAT SML BOT - V9 INTELIGENTE ==================== */
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

  const L = {
    ameicetim: 'https://ameicetim.onrender.com',
    halison: 'https://halison-henry.onrender.com',
    vitrinebio: 'https://vitrinebio.onrender.com',
    showcase: 'https://vitrinebio.onrender.com/showcase.html',
    colegioagape: 'https://colegioagape.onrender.com',
    portfolio: 'https://sml-developer.onrender.com',
    whatsapp: 'https://wa.me/558586121078'
  };

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

  // ============ BOTÕES DE SUGESTÃO ============
  function quickReplyBtns() {
    return '<div class="quick-replies" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">' +
      '<button data-quick="preços" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;transition:all .2s;">💰 Preços</button>' +
      '<button data-quick="modelos" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;transition:all .2s;">🎨 Modelos</button>' +
      '<button data-quick="portfólio" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;transition:all .2s;">📂 Portfólio</button>' +
      '<button data-quick="Vitrine Bio" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;transition:all .2s;">📱 Vitrine</button>' +
      '<button data-quick="WhatsApp" style="background:rgba(37,211,102,0.2);border:1px solid rgba(37,211,102,0.3);border-radius:16px;padding:6px 12px;color:#25D366;cursor:pointer;font-size:11px;transition:all .2s;">💬 WhatsApp</button>' +
      '</div>';
  }

  // ============ DETECÇÃO DE SENTIMENTO ============
  function detectSentiment(text) {
    var positive = ['obrigado','valeu','otimo','excelente','perfeito','bom','gostei','amo','adoro','top','show','massa','bacana'];
    var negative = ['ruim','pessimo','caro','demora','lento','problema','erro','bug','travando','frustrante','cansado','nao gostei'];
    var lower = text.toLowerCase();
    var pos = positive.filter(function(w){return lower.indexOf(w)!==-1;}).length;
    var neg = negative.filter(function(w){return lower.indexOf(w)!==-1;}).length;
    if(pos > neg) return 'positive';
    if(neg > pos) return 'negative';
    return 'neutral';
  }

  var ctx = { 
    lastIntent:null, lastUserMsg:'', msgCount:0, askedPrice:false, askedPortfolio:false, 
    askedVitrine:false, history:[], sentiment:'neutral', userInterests:[], 
    lastBotResponse:'', sessionStart:Date.now()
  };

  function addHistory(u,b) {
    ctx.history.push({user:u,bot:b,time:new Date()});
    if(ctx.history.length>20) ctx.history.shift();
    var interests=['vitrine','site','landing','ecommerce','manutencao','preco','modelos','portfolio'];
    var lower=u.toLowerCase();
    interests.forEach(function(i){
      if(lower.indexOf(i)!==-1 && ctx.userInterests.indexOf(i)===-1) ctx.userInterests.push(i);
    });
  }

  function getContextual(intent, userMsg) {
    var r = intent.responses[Math.floor(Math.random()*intent.responses.length)];
    if(ctx.askedPrice && intent.id==='prazo') r+='<br><br>💡 Já que viu os preços: todos têm <b>garantia de 7 dias</b> e <b>hospedagem inclusa</b>!';
    if(ctx.askedVitrine && intent.id==='preco') r+='<br><br>💡 Você viu a Vitrine Bio. Temos 3 planos: Simples (R$97), Premium (R$247) e Empresarial (R$497)!';
    if(ctx.sentiment==='positive') r+='<br><br>😊 Fico feliz que gostou! Posso ajudar com mais alguma coisa?';
    else if(ctx.sentiment==='negative') r+='<br><br>😔 Entendo. Quer falar direto com o Samuel?'+wppBtn('Samuel, preciso de ajuda!');
    if(ctx.msgCount<=2) r+=quickReplyBtns();
    return r;
  }

  // ============ BASE DE CONHECIMENTO ============
  var kb = [
    { id:'saudacao', keywords:['oi','ola','hey','bom dia','boa tarde','boa noite','saudacoes','iae','opa','fala','salve','bao','boa','hi','hello','iniciar','comecar','ajuda','poderia','gostaria'], weight:10, gaEvent:'chat_saudacao',
      responses:[
        '👋 Olá! Sou o assistente virtual da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br><b>📱 Vitrine Bio (a partir de R$97):</b><br>• Simples: R$97 • Premium: R$247 • Empresarial: R$497<br><br><b>🌐 Sites:</b><br>🎯 Landing: R$550<br>📄 2 págs: R$700<br>🏢 Institucional: R$1.000<br>🛒 E-commerce: sob consulta<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.vitrinebio,'📱 Bio')+linkBtn(L.ameicetim,'🛒 Loja')+wppBtn('Olá Samuel!')+quickReplyBtns(),
        'Olá! 😊 Bem-vindo à SML/PN!<br><br>📱 Vitrine Bio: Simples (R$97) | Premium (R$247) | Empresarial (R$497)<br>🌐 Sites: Landing (R$550) | 2 págs (R$700) | Institucional (R$1.000)<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Quero saber mais!')+quickReplyBtns()
      ]},
    { id:'preco', keywords:['preco','quanto','custa','valor','investimento','cobrar','taxa','tabela','planos','todos os precos','lista de precos','valores','precos','precinho','custo','orcamento','quero saber os valores'], weight:15, gaEvent:'chat_intent_preco',
      responses:[
        '📋 <b>Tabela completa (pagamento único):</b><br><br><b>📱 Vitrine Bio:</b><br>🟢 <b>Simples</b> — R$ 97 (links, design clean, 48h)<br>🔵 <b>Premium</b> — R$ 247 (+visual, depoimentos, mapa, Pixel)<br>🟣 <b>Empresarial</b> — R$ 497 (+galeria, Analytics, urgência)<br><br><b>🌐 Sites:</b><br>🎯 Landing Page — R$ 550<br>📄 Site 2 págs — R$ 700<br>🏢 Institucional — R$ 1.000<br>🛒 E-commerce — sob consulta<br><br>🛠️ Manutenções: R$ 40 a R$ 250<br>📦 Pacote mensal: R$ 200<br><br>✅ Garantia 7 dias • 💳 50%+50% • 🌐 Hospedagem inclusa<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.vitrinebio,'📱 Bio Premium')+linkBtn(L.portfolio,'🌐 Sites')+wppBtn('Quero contratar!')+quickReplyBtns(),
        '💰 <b>Preços SML/PN:</b><br>📱 Vitrine: Simples <b>R$97</b> | Premium <b>R$247</b> | Empresarial <b>R$497</b><br>🌐 Sites: Landing <b>R$550</b> | 2 págs <b>R$700</b> | Institucional <b>R$1.000</b><br>🛒 E-commerce: sob consulta<br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.halison,'🏢 Exemplo')+wppBtn('Quero orçamento!')+quickReplyBtns()
      ]},
    { id:'vitrine', keywords:['vitrine','bio page','bio simples','link na bio','linktree','pagina de bio','bio do instagram','pagina de links','bio profissional','modelo bio','modelos','showcase','bio premium','bio empresarial','vitrine bio'], weight:14, gaEvent:'chat_intent_vitrine',
      responses:[
        '📱 <b>Vitrine Bio — 3 planos:</b><br><br>🟢 <b>Simples — R$ 97</b><br>✅ Links essenciais • Design clean • 48h • 1 ajuste/mês<br><br>🔵 <b>Premium — R$ 247</b> ⭐ MAIS POPULAR<br>✅ + Identidade visual • Depoimentos • Mapa • Pixel • 3 ajustes/mês<br><br>🟣 <b>Empresarial — R$ 497</b><br>✅ + Galeria • Analytics • Contador de urgência • Animações • 5 ajustes/mês • Suporte 30 dias<br><br>🔗 <b>Veja os modelos:</b><br>'+linkBtn(L.showcase,'🎨 Showcase Completo')+linkBtn(L.vitrinebio,'📱 Modelo Premium')+'<br><br>✅ +2.800 bios entregues • Garantia 7 dias • Pagamento único<br><br>'+wppBtn('Quero minha Vitrine Bio!')+quickReplyBtns(),
        '📱 <b>Vitrine Bio:</b><br>🟢 Simples: <b>R$97</b> | 🔵 Premium: <b>R$247</b> | 🟣 Empresarial: <b>R$497</b><br><br>🔗 '+linkBtn(L.showcase,'🎨 Ver Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero escolher!')+quickReplyBtns()
      ]},
    { id:'vitrine_simples', keywords:['bio simples','vitrine simples','97','plano simples','bio 97','r$ 97','bio basica','bio barata'], weight:11, gaEvent:'chat_intent_vitrine_simples',
      responses:[
        '🟢 <b>Bio Simples — R$ 97</b><br>✅ Links essenciais • Design clean • 48h • 1 ajuste/mês<br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Bio Simples!')
      ]},
    { id:'vitrine_premium', keywords:['bio premium','vitrine premium','247','plano premium','bio 247','r$ 247','premium','mais popular','identidade visual','depoimentos','pixel'], weight:11, gaEvent:'chat_intent_vitrine_premium',
      responses:[
        '🔵 <b>Bio Premium — R$ 247 ⭐</b><br>✅ Tudo do Simples + Identidade visual • Depoimentos • Mapa • Pixel • 3 ajustes/mês<br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Premium!')
      ]},
    { id:'vitrine_empresarial', keywords:['bio empresarial','vitrine empresarial','497','plano empresarial','bio 497','r$ 497','empresarial','galeria','contador','urgencia','analytics'], weight:11, gaEvent:'chat_intent_vitrine_empresarial',
      responses:[
        '🟣 <b>Bio Empresarial — R$ 497</b><br>✅ Tudo do Premium + Galeria • Analytics • Contador de urgência • Animações • Suporte 30 dias • 5 ajustes/mês<br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.vitrinebio,'📱 Exemplo')+wppBtn('Quero a Empresarial!')
      ]},
    { id:'landing', keywords:['landing','landing page','pagina de vendas','conversao','550','pagina profissional','pagina completa','pagina unica'], weight:12, gaEvent:'chat_intent_landing',
      responses:[
        '🎯 <b>Landing Page (R$ 550)</b><br>✅ Design exclusivo • Hero, Serviços, Diferenciais • Mapa, Galeria, WhatsApp Multi • CTA + formulário + SEO • 72h • Garantia 7 dias<br>🔗 '+linkBtn(L.colegioagape,'🏫 Exemplo')+linkBtn(L.portfolio,'🎯 Modelo')+wppBtn('Quero Landing!')+quickReplyBtns()
      ]},
    { id:'site2', keywords:['site 2','duas paginas','700','pagina extra','2 paginas','segunda pagina'], weight:11, gaEvent:'chat_intent_site2',
      responses:[
        '📄 <b>Site 2 páginas (R$ 700)</b><br>✅ Landing completa + 1 extra • Menu • SEO • 96h • Garantia 7 dias<br>'+wppBtn('Quero Site 2 págs!')
      ]},
    { id:'institucional', keywords:['site institucional','5 paginas','1000','site completo','empresa','site grande','varias paginas','clinica','negocio'], weight:11, gaEvent:'chat_intent_institucional',
      responses:[
        '🏢 <b>Site Institucional (R$ 1.000)</b><br>✅ Home+Sobre+Serviços+Contato+Blog • Menu • Formulário • WhatsApp Multi • SEO • 7 dias<br>🔗 '+linkBtn(L.halison,'🏢 Exemplo')+wppBtn('Quero Institucional!')
      ]},
    { id:'ecommerce', keywords:['ecommerce','e-commerce','loja virtual','loja online','carrinho','vender online','catalogo','loja'], weight:13, gaEvent:'chat_intent_ecommerce',
      responses:[
        '🛒 <b>E-commerce / Loja Virtual</b><br>Exemplo: <b>Amei Cetim</b> com carrinho e WhatsApp.<br>✅ Produtos • Carrinho • WhatsApp • Mercado Pago (adicional) • Responsivo<br>💰 Sob consulta<br>🔗 '+linkBtn(L.ameicetim,'🛍️ Ver Loja')+wppBtn('Quero orçamento!')
      ]},
    { id:'projetos', keywords:['portfolio','projetos','trabalhos','amei cetim','halison','colegio','exemplos','mostrar','ver mais','ver site','ver projeto','modelos'], weight:13, gaEvent:'chat_intent_projetos',
      responses:[
        '📂 <b>Portfólio:</b><br>🛒 Amei Cetim '+linkBtn(L.ameicetim,'Ver')+'<br>🏢 Halison Henry '+linkBtn(L.halison,'Ver')+'<br>📱 Vitrine Bio '+linkBtn(L.vitrinebio,'Ver')+'<br>🏫 Colégio Ágape '+linkBtn(L.colegioagape,'Ver')+'<br>🎨 Showcase '+linkBtn(L.showcase,'Ver Todos')+'<br>⏳ FitPro e Advocacia — Em breve<br>'+linkBtn(L.portfolio+'#projetos','📂 Portfólio Completo')+wppBtn('Quero um assim!')
      ]},
    { id:'redesign', keywords:['ja tenho site','reformar','refazer','repaginar','site antigo','redesign','modernizar'], weight:11, gaEvent:'chat_intent_redesign',
      responses:[
        '🔄 <b>Reformo seu site!</b> Análise gratuita + refaço com velocidade, SEO e WhatsApp. A partir de <b>R$ 550</b>.<br>'+wppBtn('Quero reformar!')
      ]},
    { id:'materiais', keywords:['precisa','preciso','mandar','enviar','materiais','briefing','como comecar','para iniciar'], weight:10, gaEvent:'chat_intent_materiais',
      responses:[
        '📦 <b>Preciso de:</b> 1️⃣ Logo 2️⃣ Cores 3️⃣ Textos 4️⃣ Fotos 5️⃣ Links (WhatsApp, Instagram, endereço)<br>Em 48h-72h sua versão fica pronta!<br>'+wppBtn('Vou enviar!')
      ]},
    { id:'manutencao', keywords:['manutencao','trocar','alterar','mudar','atualizar','ajuste'], weight:12, gaEvent:'chat_intent_manutencao',
      responses:[
        '🛠️ <b>Manutenções:</b><br>🔧 WhatsApp/link: R$40 • 🖼️ Imagem: R$50 • 🔘 Botão: R$40 • 🖼️ Galeria: R$100 • 📄 Página: R$250 • 🌐 Domínio: R$80<br>📦 Pacote mensal: R$200 (5 alterações)<br>'+wppBtn('Preciso de manutenção!')
      ]},
    { id:'garantia', keywords:['garantia','devolucao','reembolso','nao gostar','7 dias','dinheiro de volta'], weight:10, gaEvent:'chat_intent_garantia',
      responses:[
        '✅ <b>Garantia 7 Dias!</b> Se não amar, devolvemos 100%. O risco é todo nosso.<br>'+wppBtn('Quero saber mais!')
      ]},
    { id:'pagamento', keywords:['pagamento','pagar','cartao','pix','transferencia','parcela','50%','sinal','forma','desconto'], weight:11, gaEvent:'chat_intent_pagamento',
      responses:[
        '💳 <b>Pagamento:</b> 50% início + 50% entrega. Pix e transferência. Pagamento único!<br>✅ Garantia 7 dias • Hospedagem inclusa<br>'+wppBtn('Quero fechar!')
      ]},
    { id:'prazo', keywords:['prazo','demora','dias','entrega','rapido','urgente','tempo','quando fica pronto'], weight:11, gaEvent:'chat_intent_prazo',
      responses:[
        '⏱️ <b>Prazos:</b><br>📱 Bio Simples: 48h | Bio Premium/Empresarial: 3-5 dias<br>🎯 Landing: 72h | 📄 2 págs: 96h | 🏢 Institucional: 7 dias<br>'+wppBtn('Tenho urgência!')
      ]},
    { id:'processo', keywords:['como funciona','processo','etapas','metodo','passo a passo'], weight:10, gaEvent:'chat_intent_processo',
      responses:[
        '🔄 <b>Processo:</b> 1️⃣ Brief (WhatsApp) 2️⃣ Design 3️⃣ Code (SEO, WhatsApp) 4️⃣ Deploy! ✅ Garantia 7 dias<br>'+wppBtn('Vamos começar!')
      ]},
    { id:'dominio', keywords:['dominio','url','www','dns','com.br','registro'], weight:10, gaEvent:'chat_intent_dominio',
      responses:[
        '🌐 <b>Domínio:</b> Já tem? Configuro grátis! Não tem? Registro por R$80. Subdomínio gratuito também.<br>'+wppBtn('Quero configurar!')
      ]},
    { id:'localizacao', keywords:['onde fica','localizacao','trairi','ceara','atende','remoto','cidade'], weight:9, gaEvent:'chat_intent_localizacao',
      responses:[
        '📍 <b>Trairi, Ceará</b> — atendo <b>100% online todo o Brasil</b>!'+wppBtn('Atende minha cidade?')
      ]},
    { id:'contato', keywords:['whatsapp','falar','atendente','humano','conversar','ligar','telefone','contato','passar zap','quero falar'], weight:13, gaEvent:'chat_intent_contato',
      responses:[
        'Claro! Me chama no WhatsApp 👇'+wppBtn('Olá! Vim pelo chat.'),
        'Vamos no WhatsApp! 👇'+wppBtn('Quero falar com o Samuel!')
      ]},
    { id:'agradecimento', keywords:['obrigado','valeu','brigado','thanks','vlw','grato'], weight:7, gaEvent:'chat_intent_agradecimento',
      responses:[
        'De nada! 😊 Estou à disposição.'+wppBtn('Preciso de ajuda!'),
        'Por nada! Qualquer coisa é só chamar. 👋'
      ]},
    { id:'servicos', keywords:['servicos','o que faz','quais servicos','oferece'], weight:12, gaEvent:'chat_intent_servicos',
      responses:[
        '🚀 <b>Serviços:</b> 📱 Vitrine Bio (R$97-R$497) • 🎯 Landing (R$550) • 📄 2 págs (R$700) • 🏢 Institucional (R$1.000) • 🛒 E-commerce • 🔍 SEO<br>🔗 '+linkBtn(L.showcase,'Modelos')+linkBtn(L.portfolio+'#projetos','Portfólio')+wppBtn('Quero contratar!')
      ]},
    { id:'seo', keywords:['seo','google','ranquear','aparecer','primeira pagina','busca','organico'], weight:10, gaEvent:'chat_intent_seo',
      responses:[
        '🔍 <b>SEO incluso!</b> Google, Google Meu Negócio, buscas locais. '+linkBtn(L.colegioagape,'Exemplo')+wppBtn('Quero ranquear!')
      ]},
    { id:'sistema', keywords:['sistema','sistema web','erp','agendamento','agenda','gestao','dashboard'], weight:11, gaEvent:'chat_intent_sistema',
      responses:[
        '💻 <b>Sistema web?</b> Faço sim! Agendamento, gestão, dashboard. Sob consulta.'+wppBtn('Quero orçamento!')
      ]},
    { id:'wordpress', keywords:['wordpress','elementor','wix','template'], weight:9, gaEvent:'chat_intent_wordpress',
      responses:[
        '❌ <b>Não uso WordPress.</b> Sites código puro — mais rápidos e seguros. Performance 95+!'+linkBtn(L.ameicetim,'Exemplo')+wppBtn('Quero site rápido!')
      ]},
    { id:'parceria', keywords:['parceria','revender','socio','afiliado','comissao'], weight:9, gaEvent:'chat_intent_parceria',
      responses:[
        '🤝 <b>Parcerias:</b> indique clientes e ganhe comissão!'+wppBtn('Quero ser parceiro!')
      ]},
    { id:'trafego', keywords:['trafego','anuncio','google ads','facebook ads','trafego pago','campanha'], weight:9, gaEvent:'chat_intent_trafego',
      responses:[
        '📈 <b>Tráfego pago?</b> Indico gestores parceiros. Foco em sites que convertam!'+wppBtn('Me indica?')
      ]},
    { id:'sobre', keywords:['quem e','sobre voce','samuel','quem faz','desenvolvedor','dono'], weight:10, gaEvent:'chat_intent_sobre',
      responses:[
        '👨‍💻 <b>Samuel Pena</b>, Full Stack em Trairi-CE. Sites rápidos, que ranqueiam e convertem.<br>🔗 '+linkBtn(L.portfolio,'Site')+linkBtn(L.showcase,'Modelos')+wppBtn('Falar com Samuel!')
      ]},
    { id:'hospedagem', keywords:['hospedagem','hospedar','servidor','site no ar','publicar','online'], weight:10, gaEvent:'chat_intent_hospedagem',
      responses:[
        '✅ <b>Hospedagem inclusa</b> em todos os planos! Site 24h no ar sem custo mensal.<br>'+linkBtn(L.vitrinebio,'Exemplo')+wppBtn('Quero meu site!')
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
        if(n.indexOf(kw)!==-1){score+=intent.weight;if(n.indexOf(kw)===0)score+=3;}
        for(var k=0;k<words.length;k++){
          if(words[k].length>2&&kw.indexOf(words[k])!==-1)score+=Math.floor(intent.weight/3);
        }
      }
      if(ctx.lastIntent===intent.id)score+=5;
      var connections={'preco':['prazo','pagamento','vitrine'],'vitrine':['modelos','bio','showcase'],'site':['landing','institucional','ecommerce']};
      if(ctx.lastIntent&&connections[ctx.lastIntent]&&connections[ctx.lastIntent].indexOf(intent.id)!==-1)score+=4;
      ctx.userInterests.forEach(function(interest){if(intent.id.indexOf(interest)!==-1)score+=3;});
      if(score>bestScore){bestScore=score;best=intent;}
    }
    return bestScore<5?null:best;
  }

  function getFallback(){
    return [
      'Não entendi completamente. Posso ajudar com:<br>📱 <b>Vitrine Bio</b> (Simples R$97, Premium R$247, Empresarial R$497)<br>🌐 <b>Sites</b> (Landing R$550, 2 págs R$700, Institucional R$1.000)<br>🛒 <b>E-commerce</b> • 🛠️ <b>Manutenção</b><br><br>🔗 '+linkBtn(L.showcase,'🎨 Modelos')+linkBtn(L.portfolio+'#projetos','📂 Portfólio')+wppBtn('Preciso de ajuda!')+quickReplyBtns(),
      'Hmm, não captei. Tente: "preços", "modelos", "vitrine", "landing"?<br><br>🔗 '+linkBtn(L.showcase,'Modelos')+linkBtn(L.ameicetim,'Loja')+wppBtn('Quero falar com o Samuel!')+quickReplyBtns(),
      'Desculpe, não entendi. 😅<br>🔗 '+linkBtn(L.showcase,'Ver Modelos')+linkBtn(L.portfolio+'#projetos','Portfólio')+wppBtn('Me ajuda!')+quickReplyBtns()
    ][Math.floor(Math.random()*3)];
  }

  function getRand(arr){return arr[Math.floor(Math.random()*arr.length)];}

  function addBubble(text,type){
    var b=document.createElement('div');
    b.className='chat-bubble '+type;
    if(type==='user')b.textContent=text;
    else b.innerHTML=text;
    chatMessages.appendChild(b);
    chatMessages.scrollTop=chatMessages.scrollHeight;
    if(type==='assistant'){
      setTimeout(function(){
        // Rastreia cliques em links
        b.querySelectorAll('a').forEach(function(link){
          link.addEventListener('click',function(){
            var h=this.getAttribute('href');
            if(h&&h.indexOf('wa.me')!==-1)trackEvent('chat_whatsapp_click',{intent:ctx.lastIntent||'desconhecido'});
            else trackEvent('chat_link_click',{url:h,intent:ctx.lastIntent||'desconhecido'});
          });
        });
        // Quick reply buttons
        b.querySelectorAll('[data-quick]').forEach(function(btn){
          btn.addEventListener('click',function(){
            var txt=this.getAttribute('data-quick');
            if(txt==='WhatsApp'){window.open(L.whatsapp+'?text=Olá!','_blank');return;}
            chatInput.value='Quero saber sobre '+txt;
            sendMessage();
          });
          btn.addEventListener('mouseenter',function(){this.style.background='rgba(0,245,255,0.25)';});
          btn.addEventListener('mouseleave',function(){this.style.background='rgba(0,245,255,0.12)';});
        });
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
    var quickPhrases=['preco','quanto','custa','valor','oi','ola'];
    var delay=quickPhrases.some(function(p){return userMsg.toLowerCase().indexOf(p)!==-1;})?300+Math.random()*400:600+Math.random()*1000;
    setTimeout(function(){
      removeTyping();
      ctx.sentiment=detectSentiment(userMsg);
      var intent=findBestMatch(userMsg),resp;
      if(intent){
        ctx.lastIntent=intent.id;ctx.lastUserMsg=userMsg;ctx.msgCount++;
        if(intent.id==='preco')ctx.askedPrice=true;
        if(intent.id==='projetos')ctx.askedPortfolio=true;
        if(intent.id.indexOf('vitrine')!==-1)ctx.askedVitrine=true;
        if(intent.gaEvent)trackEvent(intent.gaEvent,{intent:intent.id,message_count:ctx.msgCount,sentiment:ctx.sentiment});
        resp=getContextual(intent,userMsg);
        ctx.lastBotResponse=resp;
        addBubble(resp,'assistant');
        addHistory(userMsg,resp);
      }else{
        ctx.msgCount++;ctx.lastUserMsg=userMsg;
        trackEvent('chat_fallback',{message_count:ctx.msgCount,user_message:userMsg.substring(0,50)});
        resp=getFallback();
        ctx.lastBotResponse=resp;
        addBubble(resp,'assistant');
        addHistory(userMsg,resp);
      }
    },delay);
  }

  function sendMessage(){
    var text=chatInput.value.trim();
    if(!text)return;
    if(text.length>500){addBubble("Mensagem muito longa! 😅 Resuma para eu ajudar melhor.",'assistant');return;}
    if(ctx.lastUserMsg===text&&ctx.msgCount>0){addBubble("Você já perguntou isso. Posso ajudar com outra coisa? 🤔",'assistant');chatInput.value='';return;}
    addBubble(text,'user');
    trackEvent('chat_message',{message_length:text.length,sentiment:detectSentiment(text)});
    chatInput.value='';
    chatInput.focus();
    botReply(text);
  }

  var hasGreeted=false;
  function openChat(){
    chatOverlay.classList.add('open');
    chatInput.focus();
    trackEvent('chat_open',{session_id:ctx.sessionStart});
    if(!hasGreeted){
      hasGreeted=true;
      setTimeout(function(){
        for(var i=0;i<kb.length;i++){
          if(kb[i].id==='saudacao'){var resp=getRand(kb[i].responses);ctx.lastBotResponse=resp;addBubble(resp,'assistant');break;}
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
