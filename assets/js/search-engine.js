var SMLEngine = (function() {
  
  var docs = [];

  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;text-decoration:none;font-size:14px;"><i class="fab fa-whatsapp" style="margin-right:6px;"></i> Chamar no WhatsApp</a>';
  }

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  // ============ LÊ TUDO DA PÁGINA ============
  function buildFromPage() {
    docs = [];
    
    // 1. Cards de serviço
    var cards = document.querySelectorAll('.service-card');
    cards.forEach(function(card) {
      var title = card.querySelector('h3')?.textContent?.trim() || '';
      var desc = card.querySelector('p')?.textContent?.trim() || '';
      if (title) {
        docs.push({
          id: 'pg_' + title.toLowerCase().replace(/\s+/g,'_'),
          keywords: (title + ' ' + desc).toLowerCase(),
          resposta: '<b>' + title + '</b><br>' + desc + wppBtn('Quero saber mais!')
        });
      }
    });
    
    // 2. Features/diferenciais
    var features = document.querySelectorAll('.feature-card');
    features.forEach(function(card) {
      var title = card.querySelector('h3')?.textContent?.trim() || '';
      var desc = card.querySelector('p')?.textContent?.trim() || '';
      if (title) {
        docs.push({
          id: 'ft_' + title.toLowerCase().replace(/\s+/g,'_'),
          keywords: (title + ' ' + desc).toLowerCase(),
          resposta: '<b>' + title + '</b><br>' + desc
        });
      }
    });
    
    // 3. FAQ
    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function(faq) {
      var q = faq.querySelector('.faq-question')?.textContent?.trim() || '';
      var a = faq.querySelector('.faq-answer')?.textContent?.trim() || '';
      if (q) {
        docs.push({
          id: 'faq_' + q.toLowerCase().replace(/\s+/g,'_').substring(0,30),
          keywords: q.toLowerCase(),
          resposta: '<b>' + q + '</b><br>' + a
        });
      }
    });
    
    // 4. Sobre
    var sobre = document.querySelector('#sobre');
    if (sobre) {
      var sobreText = sobre.textContent?.trim().substring(0, 500) || '';
      docs.push({
        id: 'sobre',
        keywords: 'quem samuel desenvolvedor dono fundador sobre contato',
        resposta: sobreText + wppBtn('Quero falar com o Samuel!')
      });
    }
    
    // 5. Intenções manuais
    docs.push({ id:'precos', keywords:'preco quanto custa valor investimento tabela planos orcamento precos', resposta:'📋 <b>Precos SML/PN:</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$ 97,90 | Premium R$ 247,90 | Empresarial R$ 497,90<br>🌐 <b>Sites:</b> Landing R$ 547,90 | 2 pags R$ 697,90 | Institucional R$ 997,90<br>🛒 <b>E-commerce:</b> sob consulta<br>🤖 <b>Chat RAG:</b> R$ 197,90<br><br>✅ Garantia 7 dias • Hospedagem inclusa' });
    docs.push({ id:'saudacao', keywords:'oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello', resposta:'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena.<br><br>📱 <b>Vitrine Bio</b> a partir de R$ 97,90<br>🌐 <b>Sites</b> a partir de R$ 547,90<br>🤖 <b>Chat RAG</b> — R$ 197,90<br><br>Me conta: qual seu interesse?' });
    docs.push({ id:'portfolio', keywords:'portfolio projetos trabalhos exemplos mostre ver fez criou ja fez', resposta:'📂 <b>Projetos:</b><br>🛒 Amei Cetim <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏢 Halison Henry <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>📱 Vitrine Bio <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏫 Colegio Agape <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a>' });
    docs.push({ id:'contato', keywords:'whatsapp falar conversar ligar telefone contato zap chamar', resposta:'📞 Vamos conversar?' + wppBtn('Ola Samuel!') });
    docs.push({ id:'garantia', keywords:'garantia devolucao reembolso 7 dias', resposta:'✅ <b>Garantia de 7 dias.</b> Se nao gostar, devolvo 100%.' });
    docs.push({ id:'pagamento', keywords:'pagamento pagar cartao pix transferencia parcela', resposta:'💳 <b>Pagamento:</b> 50% inicio + 50% entrega. Pix.' });
    docs.push({ id:'prazos', keywords:'prazo demora dias entrega rapido urgente tempo pronto', resposta:'⏱️ <b>Prazos:</b> Bio Simples 48h | Premium 3-5 dias | Landing 72h | 2 pags 96h | Institucional 7 dias' });
    docs.push({ id:'modelos_bio', keywords:'modelos bio modelos vitrine quais modelos tipos bio exemplos bios showcase', resposta:'📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 Simples R$ 97,90<br>🔵 Premium R$ 247,90<br>🟣 Empresarial R$ 497,90<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase</a>' });
    docs.push({ id:'chat_rag', keywords:'chat rag bot assistente virtual ia inteligencia artificial', resposta:'🤖 <b>Chat RAG — R$ 197,90</b><br>Atendimento 24h treinado com seu conteudo. Integrado WhatsApp e GA4.' + wppBtn('Quero Chat RAG!') });
    
    console.log('📚 Engine: ' + docs.length + ' itens indexados');
  }

  buildFromPage();

  // ============ BUSCA EXTERNA (Vitrine Bio) ============
  function fetchVitrineMain() {
    fetch('https://vitrinebio.onrender.com/')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var text = (doc.body?.innerText || '').substring(0, 2000);
        var precos = text.match(/R\$\s?[\d,.]+/g) || [];
        docs.push({
          id: 'vitrine_main',
          keywords: 'vitrine bio principal pagina inicial ' + text.substring(0,200).toLowerCase(),
          resposta: '📱 <b>Vitrine Bio:</b><br><br>' + text.substring(0,400) + '...<br><br>💰 ' + precos.slice(0,3).join(', ') + '<br><br>🔗 <a href="https://vitrinebio.onrender.com/" target="_blank" style="color:var(--cyan);">Acessar</a>' + wppBtn('Quero minha Vitrine Bio!')
        });
        console.log('📚 Vitrine Bio principal carregada');
      }).catch(function() {});
  }
  
  function fetchShowcase() {
    fetch('https://vitrinebio.onrender.com/showcase.html')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var titulos = doc.querySelectorAll('h1, h2, h3');
        var precos = (doc.body?.innerText || '').match(/R\$\s?[\d,.]+/g) || [];
        var info = [];
        titulos.forEach(function(t) {
          var text = t.textContent.trim();
          if (text && text.length > 5) info.push(text);
        });
        if (info.length > 0) {
          docs.push({
            id: 'vitrine_showcase',
            keywords: 'showcase modelos vitrine ' + info.join(' ').toLowerCase(),
            resposta: '🎨 <b>Showcase Vitrine Bio:</b><br><br>' + info.slice(0,6).map(function(i){return '• '+i;}).join('<br>') + '<br><br>💰 ' + precos.slice(0,3).join(', ') + '<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase</a>' + wppBtn('Quero igual!')
          });
          console.log('📚 Showcase carregado');
        }
      }).catch(function() {});
  }

  fetchVitrineMain();
  fetchShowcase();

  // ============ BUSCA ============
  function fixTypos(text) {
    var fixes = {'char':'chat','prco':'preco','stie':'site','portflio':'portfolio','vitrne':'vitrine','landng':'landing'};
    var words = text.split(' ');
    for (var i = 0; i < words.length; i++) { if (fixes[words[i]]) words[i] = fixes[words[i]]; }
    return words.join(' ');
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    query = fixTypos(query.toLowerCase().trim());
    var qTokens = tokenize(query);
    var bestScore = 0, bestDoc = null;
    
    for (var i = 0; i < docs.length; i++) {
      var doc = docs[i], score = 0, kTokens = tokenize(doc.keywords);
      if (doc.keywords.indexOf(query) !== -1) score += 30;
      for (var j = 0; j < qTokens.length; j++) {
        for (var k = 0; k < kTokens.length; k++) {
          if (qTokens[j] === kTokens[k]) score += 10;
          else if (kTokens[k].indexOf(qTokens[j]) !== -1 && qTokens[j].length > 2) score += 5;
        }
      }
      if (score > bestScore) { bestScore = score; bestDoc = doc; }
    }
    
    if (bestDoc && bestScore > 5) {
      trackEvent('chat_intent_' + bestDoc.id, { intent: bestDoc.id });
      return bestDoc.resposta;
    }
    return null;
  }

  return { search: search };
})();
