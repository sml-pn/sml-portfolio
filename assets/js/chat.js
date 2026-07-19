/* ==================== CHAT SML BOT - V10 PROFISSIONAL ==================== */
(function() {
  var chatFab = document.getElementById('chatFab');
  var chatOverlay = document.getElementById('chatOverlay');
  var chatClose = document.getElementById('chatClose');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  var L = {
    ameicetim: 'https://ameicetim.onrender.com',
    halison: 'https://halison-henry.onrender.com',
    vitrinebio: 'https://vitrinebio.onrender.com',
    showcase: 'https://vitrinebio.onrender.com/showcase.html',
    colegioagape: 'https://colegioagape.onrender.com',
    portfolio: 'https://sml-developer.onrender.com',
    whatsapp: 'https://wa.me/558586121078'
  };

  function wppBtn(t) {
    var msg = t || 'Olá Samuel, vim pelo chat do site.';
    return '<br><br><a href="' + L.whatsapp + '?text=' + encodeURIComponent(msg) + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  function linkBtn(u, t) {
    return '<a href="' + u + '" target="_blank" style="display:inline-block;background:var(--cyan);color:#04111a;padding:10px 16px;border-radius:999px;font-weight:600;text-decoration:none;margin:4px 6px 4px 0;font-size:13px;"><i class="fas fa-external-link-alt"></i> ' + t + '</a>';
  }

  function quickBtns() {
    return '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">' +
      '<button class="qr-btn" data-q="Quanto custa?" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Ver preços</button>' +
      '<button class="qr-btn" data-q="Me mostra os modelos" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Ver modelos</button>' +
      '<button class="qr-btn" data-q="Quais projetos você já fez?" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Portfólio</button>' +
      '<button class="qr-btn-wpp" style="background:rgba(37,211,102,0.2);border:1px solid rgba(37,211,102,0.3);border-radius:16px;padding:6px 12px;color:#25D366;cursor:pointer;font-size:11px;">WhatsApp</button>' +
      '</div>';
  }

  var ctx = { lastIntent: null, count: 0, askedPrice: false };

  function normalize(t) {
    t = t.toLowerCase();
    t = t.replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c');
    t = t.replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
    return t;
  }

  var kb = [
    {
      id: 'saudacao',
      kw: ['oi','ola','hey','bom dia','boa tarde','boa noite','iae','opa','fala','salve','boa','hi','hello','iniciar','comecar','ajuda','poderia'],
      w: 10,
      r: [
        'Olá! Aqui é o <b>Samuel Pena</b>, desenvolvedor Full Stack em Trairi-CE.<br><br>Trabalho com criação de sites profissionais e bios para Instagram. Valores a partir de <b>R$ 97</b>, com hospedagem inclusa e garantia de 7 dias.<br><br>Me diz: você precisa de uma <b>Vitrine Bio</b> para Instagram, um <b>site</b> para seu negócio, ou quer dar uma olhada nos <b>modelos</b> que tenho prontos?' + quickBtns(),
        'Oi! Sou o Samuel, da SML/PN. Crio sites e bios que convertem visitantes em clientes.<br><br>Tenho 3 planos de Vitrine Bio: <b>Simples (R$97)</b>, <b>Premium (R$247)</b> e <b>Empresarial (R$497)</b>. E sites a partir de <b>R$550</b>.<br><br>No que posso te ajudar?' + quickBtns()
      ]
    },
    {
      id: 'preco',
      kw: ['preco','quanto','custa','valor','investimento','tabela','planos','precos','custo','orcamento'],
      w: 15,
      r: [
        'Aqui estão meus valores — todos com <b>pagamento único</b>, sem mensalidade:<br><br><b>📱 Vitrine Bio (link da bio do Instagram):</b><br>• <b>Simples — R$ 97</b>: links essenciais, design limpo, entrega em 48h<br>• <b>Premium — R$ 247</b>: identidade visual, depoimentos, mapa, Pixel (o mais pedido)<br>• <b>Empresarial — R$ 497</b>: galeria, Analytics, contador de urgência, animações<br><br><b>🌐 Sites:</b><br>• Landing Page — <b>R$ 550</b><br>• Site 2 páginas — <b>R$ 700</b><br>• Site Institucional (até 5 págs) — <b>R$ 1.000</b><br>• E-commerce — <b>sob consulta</b><br><br>✅ Garantia de 7 dias • Hospedagem inclusa • 50% no início + 50% na entrega<br><br>Qual desses se encaixa no que você precisa?' + linkBtn(L.showcase, 'Ver modelos') + linkBtn(L.portfolio, 'Ver site') + wppBtn('Quero contratar!') + quickBtns(),
        'Meus preços são diretos, sem surpresas:<br><br>📱 <b>Vitrine Bio:</b> Simples R$97 | Premium R$247 | Empresarial R$497<br>🌐 <b>Sites:</b> Landing R$550 | 2 págs R$700 | Institucional R$1.000<br>🛒 <b>E-commerce:</b> sob consulta<br><br>Todos com hospedagem inclusa e 7 dias de garantia. Se não gostar, devolvo 100%.<br><br>Qual te interessa mais?' + linkBtn(L.showcase, 'Modelos') + wppBtn('Quero orçamento!') + quickBtns()
      ]
    },
    {
      id: 'vitrine',
      kw: ['vitrine','bio page','bio simples','link na bio','linktree','pagina de bio','bio instagram','pagina de links','bio profissional','modelo bio','modelos','showcase','bio premium','bio empresarial','vitrine bio'],
      w: 14,
      r: [
        'A <b>Vitrine Bio</b> é uma página profissional para o link da bio do Instagram. Transforma cliques em clientes no WhatsApp 24h por dia.<br><br><b>3 planos disponíveis:</b><br><br>🟢 <b>Simples — R$ 97</b><br>Links essenciais, design limpo, entrega em 48h<br><br>🔵 <b>Premium — R$ 247</b> (o mais vendido)<br>Identidade visual, depoimentos, mapa de localização, Pixel do Facebook/Google<br><br>🟣 <b>Empresarial — R$ 497</b><br>Galeria de fotos, Analytics, contador de urgência, animações premium, suporte 30 dias<br><br>Já entreguei mais de <b>2.800 bios</b>. Dá uma olhada nos modelos:' + linkBtn(L.showcase, 'Ver showcase completo') + linkBtn(L.vitrinebio, 'Ver modelo Premium') + '<br><br>' + wppBtn('Quero minha Vitrine Bio!') + quickBtns(),
        'A Vitrine Bio é o que você coloca no link do Instagram — mas uma versão que realmente vende.<br><br>🟢 <b>Simples: R$97</b> | 🔵 <b>Premium: R$247</b> | 🟣 <b>Empresarial: R$497</b><br><br>Todas com hospedagem inclusa, garantia de 7 dias e pagamento único.' + linkBtn(L.showcase, 'Ver modelos') + wppBtn('Escolher plano') + quickBtns()
      ]
    },
    {
      id: 'vitrine_simples',
      kw: ['bio simples','vitrine simples','97','plano simples','bio 97','r$ 97','bio basica'],
      w: 11,
      r: [
        '🟢 <b>Bio Simples — R$ 97</b><br>Ideal para começar com profissionalismo. Links essenciais, design clean, pronta em 48h. Hospedagem inclusa por 1 ano.<br>' + linkBtn(L.showcase, 'Ver modelos Simples') + wppBtn('Quero a Simples!')
      ]
    },
    {
      id: 'vitrine_premium',
      kw: ['bio premium','vitrine premium','247','plano premium','bio 247','r$ 247','premium','mais popular','identidade visual','depoimentos','pixel'],
      w: 11,
      r: [
        '🔵 <b>Bio Premium — R$ 247</b> (o plano mais escolhido)<br>Inclui tudo do Simples + identidade visual personalizada, seção de depoimentos, mapa de localização e Pixel do Facebook/Google. Pronta em 3-5 dias.<br>' + linkBtn(L.vitrinebio, 'Ver exemplo Premium') + wppBtn('Quero a Premium!')
      ]
    },
    {
      id: 'vitrine_empresarial',
      kw: ['bio empresarial','vitrine empresarial','497','plano empresarial','bio 497','r$ 497','empresarial','galeria','contador','urgencia','analytics'],
      w: 11,
      r: [
        '🟣 <b>Bio Empresarial — R$ 497</b><br>O plano mais completo. Inclui tudo do Premium + galeria de fotos/produtos, Google Analytics integrado, contador de urgência, animações premium e suporte prioritário por 30 dias.<br>' + linkBtn(L.showcase, 'Ver modelos Empresariais') + wppBtn('Quero a Empresarial!')
      ]
    },
    {
      id: 'landing',
      kw: ['landing','landing page','pagina de vendas','conversao','550','pagina profissional','pagina completa'],
      w: 12,
      r: [
        '🎯 <b>Landing Page — R$ 550</b><br>Página única focada em conversão. Design exclusivo, seções de serviços, mapa, galeria, WhatsApp Multi e formulário de contato. Pronta em até 72h.<br>' + linkBtn(L.colegioagape, 'Ver exemplo') + wppBtn('Quero Landing Page!') + quickBtns()
      ]
    },
    {
      id: 'ecommerce',
      kw: ['ecommerce','e-commerce','loja virtual','loja online','carrinho','vender online','catalogo','loja'],
      w: 13,
      r: [
        '🛒 <b>E-commerce / Loja Virtual</b><br>Já criei lojas como a <b>Amei Cetim</b>, com vitrine de produtos, carrinho e checkout via WhatsApp. Integração com Mercado Pago disponível como adicional.<br><br>Valor sob consulta, dependendo do número de produtos e funcionalidades.' + linkBtn(L.ameicetim, 'Ver loja Amei Cetim') + wppBtn('Quero orçamento!')
      ]
    },
    {
      id: 'projetos',
      kw: ['portfolio','projetos','trabalhos','amei cetim','halison','colegio','exemplos','mostrar','ver mais','ver site','ver projeto','modelos'],
      w: 13,
      r: [
        'Aqui estão alguns projetos que já entreguei:<br><br>🛒 <b>Amei Cetim</b> — E-commerce com carrinho e WhatsApp ' + linkBtn(L.ameicetim, 'Ver site') + '<br>🏢 <b>Halison Henry</b> — Site institucional ' + linkBtn(L.halison, 'Ver site') + '<br>📱 <b>Vitrine Bio</b> — Modelo Premium ' + linkBtn(L.vitrinebio, 'Ver bio') + '<br>🏫 <b>Colégio Ágape</b> — Landing page ' + linkBtn(L.colegioagape, 'Ver site') + '<br><br>Veja mais modelos no showcase:' + linkBtn(L.showcase, 'Showcase completo') + '<br><br>' + wppBtn('Quero um site como esses!')
      ]
    },
    {
      id: 'redesign',
      kw: ['ja tenho site','reformar','refazer','repaginar','site antigo','redesign','modernizar'],
      w: 11,
      r: ['🔄 Reformo seu site atual sim. Faço uma análise gratuita e recrio com foco em velocidade, SEO e conversão no WhatsApp. A partir de <b>R$ 550</b>.' + wppBtn('Quero reformar meu site!')]
    },
    {
      id: 'materiais',
      kw: ['precisa','preciso','mandar','enviar','materiais','briefing','como comecar','para iniciar'],
      w: 10,
      r: ['Para começar, eu preciso de: logo (se tiver), cores de preferência, textos sobre seu negócio, fotos e seus links (WhatsApp, Instagram, endereço). Com isso em mãos, entrego a primeira versão em 48h a 72h.' + wppBtn('Vou te enviar!')]
    },
    {
      id: 'manutencao',
      kw: ['manutencao','trocar','alterar','mudar','atualizar','ajuste'],
      w: 12,
      r: ['🛠️ <b>Manutenções avulsas:</b><br>• Trocar WhatsApp/link/texto: <b>R$ 40</b><br>• Substituir imagem/banner: <b>R$ 50</b><br>• Atualizar galeria (até 10 fotos): <b>R$ 100</b><br>• Criar página extra: <b>R$ 250</b><br>• Configurar domínio: <b>R$ 80</b><br><br>Também tenho pacote mensal: <b>R$ 200</b> para até 5 alterações.' + wppBtn('Preciso de manutenção!')]
    },
    {
      id: 'garantia',
      kw: ['garantia','devolucao','reembolso','nao gostar','7 dias','dinheiro de volta'],
      w: 10,
      r: ['✅ <b>Garantia de 7 dias.</b> Se não gostar do resultado, devolvo 100% do seu dinheiro. Simples assim. O risco é todo meu.' + wppBtn('Quero saber mais!')]
    },
    {
      id: 'pagamento',
      kw: ['pagamento','pagar','cartao','pix','transferencia','parcela','50%','sinal','forma','desconto'],
      w: 11,
      r: ['💳 <b>Forma de pagamento:</b> 50% no início e 50% na entrega (após aprovar). Aceito Pix e transferência. Pagamento único, sem mensalidades.' + wppBtn('Quero fechar!')]
    },
    {
      id: 'prazo',
      kw: ['prazo','demora','dias','entrega','rapido','urgente','tempo','quando fica pronto'],
      w: 11,
      r: ['⏱️ <b>Prazos de entrega:</b><br>📱 Bio Simples: 48h<br>📱 Bio Premium/Empresarial: 3 a 5 dias<br>🎯 Landing Page: 72h<br>📄 Site 2 páginas: 96h<br>🏢 Institucional: 7 dias<br>🛒 E-commerce: sob consulta<br><br>Se for urgente, me avisa que vejo como posso acelerar.' + wppBtn('Tenho urgência!')]
    },
    {
      id: 'contato',
      kw: ['whatsapp','falar','atendente','humano','conversar','ligar','telefone','contato','passar zap','quero falar'],
      w: 13,
      r: [
        'Claro! Me chama no WhatsApp que eu respondo rápido:' + wppBtn('Olá Samuel! Vim pelo chat.'),
        'Pode me chamar no WhatsApp! Respondo em até 2h:' + wppBtn('Quero falar com o Samuel!')
      ]
    },
    {
      id: 'agradecimento',
      kw: ['obrigado','valeu','brigado','thanks','vlw','grato'],
      w: 7,
      r: ['Disponha! 😊 Qualquer dúvida é só me chamar no WhatsApp.', 'Por nada! Estou à disposição. 👋']
    },
    {
      id: 'servicos',
      kw: ['servicos','o que faz','quais servicos','oferece'],
      w: 12,
      r: ['🚀 Eu crio:<br>📱 Vitrine Bio (a partir de R$97)<br>🎯 Landing Pages (R$550)<br>📄 Sites 2 páginas (R$700)<br>🏢 Sites Institucionais (R$1.000)<br>🛒 E-commerce (sob consulta)<br>🔍 SEO Local<br>🛠️ Manutenção<br><br>Todos com hospedagem inclusa e garantia de 7 dias.' + linkBtn(L.showcase, 'Ver modelos') + wppBtn('Quero contratar!')]
    },
    {
      id: 'seo',
      kw: ['seo','google','ranquear','aparecer','primeira pagina','busca','organico'],
      w: 10,
      r: ['🔍 SEO incluso em todos os planos. Otimização para Google, Google Meu Negócio e buscas locais. Seu site pronto para ranquear.' + wppBtn('Quero ranquear!')]
    },
    {
      id: 'sistema',
      kw: ['sistema','sistema web','erp','agendamento','agenda','gestao','dashboard'],
      w: 11,
      r: ['💻 Crio sistemas web também: agendamento, gestão, dashboard. Valor sob consulta, dependendo da complexidade.' + wppBtn('Quero orçamento!')]
    },
    {
      id: 'wordpress',
      kw: ['wordpress','elementor','wix','template'],
      w: 9,
      r: ['Não trabalho com WordPress nem construtores de site. Faço tudo em <b>código puro</b> — mais rápido, mais seguro e sem plugins.' + linkBtn(L.ameicetim, 'Exemplo') + wppBtn('Quero site rápido!')]
    },
    {
      id: 'sobre',
      kw: ['quem e','sobre voce','samuel','quem faz','desenvolvedor','dono'],
      w: 10,
      r: ['Sou <b>Samuel Pena</b>, desenvolvedor Full Stack em Trairi-CE. Crio sites e bios que carregam rápido, ranqueiam no Google e convertem no WhatsApp.' + linkBtn(L.portfolio, 'Meu site') + wppBtn('Falar com Samuel!')]
    },
    {
      id: 'hospedagem',
      kw: ['hospedagem','hospedar','servidor','site no ar','publicar','online'],
      w: 10,
      r: ['✅ <b>Hospedagem inclusa</b> em todos os planos. Seu site fica no ar 24h por dia, sem custo mensal. Pagamento único.' + wppBtn('Quero meu site no ar!')]
    }
  ];

  function findMatch(msg) {
    var n = normalize(msg);
    var words = n.split(' ').filter(function(w){return w.length > 1;});
    var best = null, bestScore = 0;
    for (var i = 0; i < kb.length; i++) {
      var intent = kb[i], score = 0;
      for (var j = 0; j < intent.kw.length; j++) {
        var kw = intent.kw[j];
        if (n.indexOf(kw) !== -1) { score += intent.w; if (n.indexOf(kw) === 0) score += 3; }
        for (var k = 0; k < words.length; k++) {
          if (words[k].length > 2 && kw.indexOf(words[k]) !== -1) score += Math.floor(intent.w / 3);
        }
      }
      if (ctx.lastIntent === intent.id) score += 5;
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    return bestScore < 5 ? null : best;
  }

  function getFallback() {
    var fbs = [
      'Desculpe, não entendi bem. Posso ajudar com:<br><br>📱 <b>Vitrine Bio</b> (Simples R$97, Premium R$247, Empresarial R$497)<br>🌐 <b>Sites</b> (Landing R$550, Institucional R$1.000)<br>🛒 <b>E-commerce</b> (sob consulta)<br><br>' + linkBtn(L.showcase, 'Ver modelos') + wppBtn('Preciso de ajuda!') + quickBtns(),
      'Não peguei o que você quis dizer. Tenta perguntar de outro jeito? Por exemplo: "quanto custa?", "me mostra os modelos", "quero um site institucional"...' + quickBtns()
    ];
    return fbs[Math.floor(Math.random() * fbs.length)];
  }

  function addBubble(text, type) {
    var b = document.createElement('div');
    b.className = 'chat-bubble ' + type;
    if (type === 'user') b.textContent = text;
    else b.innerHTML = text;
    chatMessages.appendChild(b);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (type === 'assistant') {
      setTimeout(function() {
        var links = b.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function() {
            var h = this.getAttribute('href');
            if (h && h.indexOf('wa.me') !== -1) trackEvent('chat_whatsapp_click', { intent: ctx.lastIntent || 'desconhecido' });
            else trackEvent('chat_link_click', { url: h, intent: ctx.lastIntent || 'desconhecido' });
          });
        }
        var qrBtns = b.querySelectorAll('.qr-btn');
        for (var j = 0; j < qrBtns.length; j++) {
          qrBtns[j].addEventListener('click', function() {
            chatInput.value = this.getAttribute('data-q');
            sendMessage();
          });
        }
        var wppBtns = b.querySelectorAll('.qr-btn-wpp');
        for (var k = 0; k < wppBtns.length; k++) {
          wppBtns[k].addEventListener('click', function() {
            window.open(L.whatsapp + '?text=Olá!', '_blank');
          });
        }
      }, 100);
    }
  }

  function showTyping() {
    var t = document.createElement('div');
    t.className = 'chat-bubble assistant typing-dots';
    t.innerHTML = '<span></span><span></span><span></span>';
    t.id = 'typingIndicator';
    chatMessages.appendChild(t);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('typingIndicator');
    if (t) t.remove();
  }

  function botReply(msg) {
    showTyping();
    setTimeout(function() {
      removeTyping();
      var intent = findMatch(msg);
      var resp;
      if (intent) {
        ctx.lastIntent = intent.id;
        ctx.count++;
        if (intent.id === 'preco') ctx.askedPrice = true;
        resp = intent.r[Math.floor(Math.random() * intent.r.length)];
        if (ctx.count <= 2 && intent.id !== 'saudacao') resp += quickBtns();
        addBubble(resp, 'assistant');
      } else {
        ctx.count++;
        resp = getFallback();
        addBubble(resp, 'assistant');
      }
    }, 500 + Math.random() * 800);
  }

  function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) {
      addBubble("Mensagem muito longa! Resuma para que eu possa te ajudar melhor.", 'assistant');
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
        for (var i = 0; i < kb.length; i++) {
          if (kb[i].id === 'saudacao') {
            addBubble(kb[i].r[Math.floor(Math.random() * kb[i].r.length)], 'assistant');
            break;
          }
        }
      }, 500);
    }
  }

  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', function() { chatOverlay.classList.remove('open'); });
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
  chatOverlay.addEventListener('click', function(e) { if (e.target === chatOverlay) chatOverlay.classList.remove('open'); });
})();
