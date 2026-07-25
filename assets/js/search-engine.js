var SMLEngine = (function() {
  var docs = [];

  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;text-decoration:none;font-size:14px;"><i class="fab fa-whatsapp" style="margin-right:6px;"></i> Chamar no WhatsApp</a>';
  }

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  function buildFromPage() {
    docs = [];

    var cards = document.querySelectorAll('.service-card');
    cards.forEach(function(card) {
      var title = card.querySelector('h3')?.textContent?.trim() || '';
      var desc = card.querySelector('p')?.textContent?.trim() || '';
      if (title) docs.push({ id: 'pg_' + title.toLowerCase().replace(/\s+/g,'_'), keywords: (title + ' ' + desc).toLowerCase(), resposta: '<b>' + title + '</b><br>' + desc + wppBtn('Quero saber mais!') });
    });

    var features = document.querySelectorAll('.feature-card');
    features.forEach(function(card) {
      var title = card.querySelector('h3')?.textContent?.trim() || '';
      var desc = card.querySelector('p')?.textContent?.trim() || '';
      if (title) docs.push({ id: 'ft_' + title.toLowerCase().replace(/\s+/g,'_'), keywords: (title + ' ' + desc).toLowerCase(), resposta: '<b>' + title + '</b><br>' + desc });
    });

    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function(faq) {
      var q = faq.querySelector('.faq-question')?.textContent?.trim() || '';
      var a = faq.querySelector('.faq-answer')?.textContent?.trim() || '';
      if (q) docs.push({ id: 'faq_' + q.toLowerCase().replace(/\s+/g,'_').substring(0,30), keywords: q.toLowerCase(), resposta: '<b>' + q + '</b><br>' + a });
    });

    var sobre = document.querySelector('#sobre');
    if (sobre) {
      var sobreText = sobre.textContent?.trim().substring(0, 500) || '';
      docs.push({ id: 'sobre', keywords: 'quem samuel desenvolvedor dono fundador sobre', resposta: sobreText + wppBtn('Quero falar com o Samuel!') });
    }

    // Preços gerais
    docs.push({ id:'precos', keywords:'preco quanto custa valor investimento tabela planos orcamento precos', resposta:'📋 <b>Precos SML/PN (pagamento unico):</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$ 97,90 | Premium R$ 247,90 | Empresarial R$ 497,90<br>🌐 <b>Sites (Hospedagem Render inclusa):</b><br>🎯 Landing Page: R$ 547,90<br>📄 Site 2 Páginas: R$ 697,90<br>🏢 Institucional: R$ 997,90<br>🛒 E-commerce: sob consulta<br>🤖 Chat RAG: R$ 197,90<br><br>🌐 <b>Domínio próprio:</b> + R$ 83,90 (configuração DNS)<br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' });
    docs.push({ id:'saudacao', keywords:'oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello', resposta:'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena.<br><br>📱 <b>Vitrine Bio</b> a partir de R$ 97,90<br>🌐 <b>Sites</b> a partir de R$ 547,90 (Render incluso)<br>🤖 <b>Chat RAG</b> — R$ 197,90<br><br>No que posso te ajudar?' });
    docs.push({ id:'portfolio', keywords:'portfolio projetos trabalhos exemplos mostre ver fez criou', resposta:'📂 <b>Projetos:</b><br>🛒 Amei Cetim <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏢 Halison Henry <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>📱 Vitrine Bio <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏫 Colegio Agape <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a>' });
    docs.push({ id:'contato', keywords:'whatsapp falar conversar ligar telefone contato zap chamar', resposta:'📞 Vamos conversar?' + wppBtn('Ola Samuel!') });
    docs.push({ id:'garantia', keywords:'garantia devolucao reembolso 7 dias', resposta:'✅ <b>Garantia de 7 dias.</b> Se nao gostar, devolvo 100%.' });
    docs.push({ id:'pagamento', keywords:'pagamento pagar cartao pix transferencia parcela', resposta:'💳 <b>Pagamento:</b> 50% inicio + 50% entrega. Pix.' });
    docs.push({ id:'prazos', keywords:'prazo demora dias entrega rapido urgente tempo', resposta:'⏱️ <b>Prazos:</b> Bio Simples 72h (3 dias uteis) | Premium 5-7 dias uteis | Landing 5 dias uteis | 2 pags 6 dias uteis | Institucional 9 dias uteis' });
    docs.push({ id:'modelos_bio', keywords:'modelos bio vitrine quais modelos tipos bio exemplos', resposta:'📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 Simples R$ 97,90<br>🔵 Premium R$ 247,90<br>🟣 Empresarial R$ 497,90<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase</a>' });
    docs.push({ id:'chat_rag', keywords:'chat rag bot assistente virtual ia inteligencia artificial', resposta:'🤖 <b>Chat RAG — R$ 197,90</b><br><br>✅ Atendimento 24h automatizado<br>✅ Treinado com SEU conteudo<br>✅ Responde clientes automaticamente<br>✅ Integrado ao WhatsApp e GA4<br>✅ Pagamento unico, sem mensalidade<br><br>💡 <b>Exemplo:</b> este chat que voce esta usando agora e um Chat RAG!' + wppBtn('Quero Chat RAG!') });
    docs.push({ id:'responsivo', keywords:'responsivo responsiva mobile celular tablet pc desktop computador funciona serve adapta', resposta:'📱 <b>Todos os meus sites sao 100% responsivos!</b><br><br>✅ Funcionam no celular, tablet, notebook e computador<br>✅ Design mobile-first<br>✅ Layout adaptavel a qualquer tela' + wppBtn('Quero site responsivo!') });
    docs.push({ id:'gerenciavel', keywords:'gerenciavel gerenciaveis administrar painel dashboard controle', resposta:'📝 <b>Sites gerenciáveis</b> = voce mesmo atualiza sem programador!<br><br>✅ Alterar textos e imagens<br>✅ Adicionar produtos/servicos<br>✅ Tudo por um painel simples e intuitivo' + wppBtn('Quero site gerenciavel!') });
    docs.push({ id:'dominio', keywords:'dominio url www dns com.br registro dominio proprio', resposta:'🌐 <b>Sobre dominio:</b><br><br>✅ <b>Grátis:</b> subdominio Render (ex: seuprojeto.onrender.com) incluso em todos os planos.<br>✅ <b>Domínio próprio:</b> voce compra onde preferir (HostGator, Registro.br) e eu configuro o DNS por <b>R$ 83,90</b>.' });
    docs.push({ id:'hospedagem', keywords:'hospedagem hospedar servidor site ar publicar online', resposta:'✅ <b>Hospedagem Render inclusa</b> em todos os planos. Site 24h no ar sem custo mensal.' + wppBtn('Quero meu site no ar!') });
    docs.push({ id:'seo', keywords:'seo google ranquear aparecer busca organico indexar', resposta:'🔍 <b>SEO incluso em todos os planos!</b> Otimizacao para Google, Google Meu Negocio e buscas locais.' + wppBtn('Quero ranquear!') });
    docs.push({ id:'processo', keywords:'como funciona processo etapas metodo passo fluxo', resposta:'🔄 <b>Processo em 4 etapas:</b><br>1. Brief (WhatsApp)<br>2. Design<br>3. Code<br>4. Deploy!<br><br>✅ Garantia 7 dias • Suporte incluso' + wppBtn('Vamos comecar!') });

    // SERVIÇOS INDIVIDUAIS (FORMATO INFORMATIVO: valor puro + valor com domínio)
    docs.push({ id:'landing_page', keywords:'landing page landing pagina de venda pagina unica landing preco preco landing', resposta:'🎯 <b>Landing Page</b><br><br>💰 <b>Valor: R$ 547,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 5 dias uteis<br>📱 1 pagina completa (hero, servicos, mapa, galeria, WhatsApp)<br><br>🌐 <b>Com domínio próprio:</b> + R$ 83,90 — <b>Total: R$ 631,90</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Landing Page!') });
    docs.push({ id:'site2', keywords:'site 2 paginas duas paginas 2 paginas site duas paginas', resposta:'📄 <b>Site 2 Páginas</b><br><br>💰 <b>Valor: R$ 697,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 6 dias uteis<br>📱 Landing + 1 pagina extra (sobre, portfolio, etc)<br><br>🌐 <b>Com domínio próprio:</b> + R$ 83,90 — <b>Total: R$ 781,90</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Site 2 paginas!') });
    docs.push({ id:'institucional', keywords:'institucional site institucional site empresa site completo 5 paginas 1000 pagina institucional plano institucional preco institucional valor institucional', resposta:'🏢 <b>Site Institucional</b><br><br>💰 <b>Valor: R$ 997,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 9 dias uteis<br>📱 Ate 5 paginas (Home, Sobre, Servicos, Contato, Blog)<br>✅ Painel de administracao incluso<br>✅ SEO em todas as paginas<br>✅ Blog incluso<br><br>🌐 <b>Com domínio próprio:</b> + R$ 83,90 — <b>Total: R$ 1.081,90</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Site Institucional!') });
    docs.push({ id:'ecommerce', keywords:'ecommerce e-commerce loja virtual loja online carrinho vender online loja ecommerce preco', resposta:'🛒 <b>E-commerce / Loja Virtual</b><br><br>💰 <b>Valor: sob consulta</b> (depende do numero de produtos)<br>📱 Vitrine de produtos + carrinho + checkout WhatsApp<br>🔗 Exemplo: Amei Cetim — ameicetim.onrender.com<br><br>✅ Garantia 7 dias • Hospedagem Render inclusa • 50% inicio + 50% entrega' + wppBtn('Quero orcamento!') });
    docs.push({ id:'vitrine_bio', keywords:'vitrine bio page link bio instagram linktree pagina links modelo modelos', resposta:'📱 <b>Vitrine Bio</b> — Link da Bio Profissional<br><br>💰 <b>Valores (Hospedagem inclusa):</b><br>🟢 Simples: R$ 97,90 (72h / 3 dias uteis)<br>🔵 Premium: R$ 247,90 (5-7 dias uteis) ⭐<br>🟣 Empresarial: R$ 497,90 (5-7 dias uteis)<br><br>✅ +2.847 bios entregues<br>✅ Garantia 7 dias<br>✅ Pagamento unico<br><br>🔗 Veja modelos: vitrinebio.onrender.com/showcase.html' + wppBtn('Quero minha Vitrine Bio!') });
  }

  buildFromPage();

  function detectIntent(query) {
    var q = query.toLowerCase().trim();
    if (!q || q.length < 2) return null;

    if (typeof window.nlp !== 'undefined') {
      try {
        var doc = window.nlp(q);
        var verbs = doc.verbs().out('array');
        var nouns = doc.nouns().out('array');
        if (verbs.some(function(v) { return /quero|preciso|gostaria|contratar|comprar|pedir/.test(v); })) {
          if (nouns.some(function(n) { return /site|pagina|web|landing/.test(n); })) return 'site';
          if (nouns.some(function(n) { return /vitrine|bio|instagram|link/.test(n); })) return 'vitrine_bio';
          if (nouns.some(function(n) { return /loja|ecommerce|vender|produto/.test(n); })) return 'ecommerce';
        }
      } catch(e) {}
    }

    if (q.match(/responsiv|celular|mobile|tablet|pc|desktop|computador|notebook|serve para|funciona no|tela/)) return 'responsivo';
    if (q.match(/gerenciav|administr|painel|dashboard|controle/)) return 'gerenciavel';
    if (q.match(/dominio|url|www|dns|com.br|registro/)) return 'dominio';
    if (q.match(/hospedagem|hospedar|servidor|site ar|publicar/)) return 'hospedagem';
    if (q.match(/seo|google|ranquear|aparecer|busca|pesquisa/)) return 'seo';
    if (q.match(/como funciona|processo|etapas|metodo|passo/)) return 'processo';
    if (q.match(/quanto|custa|preco|valor|orcamento/)) {
      if (q.match(/institucional/)) return 'institucional';
      if (q.match(/landing/)) return 'landing_page';
      if (q.match(/ecommerce|loja/)) return 'ecommerce';
      if (q.match(/vitrine|bio/)) return 'vitrine_bio';
      if (q.match(/chat|rag/)) return 'chat_rag';
      return 'precos';
    }
    if (q.match(/quero|preciso|gostaria|contratar/)) {
      if (q.match(/site|pagina|web/)) return 'site';
      if (q.match(/vitrine|bio|instagram/)) return 'vitrine_bio';
      if (q.match(/loja|ecommerce|vender/)) return 'ecommerce';
    }
    if (q.match(/mostra|ver|exemplo|portfolio|projeto|trabalho/)) return 'portfolio';
    if (q.match(/prazo|demora|entrega|urgente|tempo/)) return 'prazos';
    if (q.match(/garantia|devolucao|reembolso/)) return 'garantia';
    if (q.match(/pagamento|pagar|cartao|pix/)) return 'pagamento';
    if (q.match(/whatsapp|falar|contato|chamar/)) return 'contato';
    if (q.match(/quem e|samuel|desenvolvedor|dono|fundador|sobre/)) return 'sobre';
    if (q.match(/institucional/)) return 'institucional';
    if (q.match(/landing page|landing|pagina unica|pagina de venda/)) return 'landing_page';
    if (q.match(/ecommerce|e-commerce|loja virtual|loja online/)) return 'ecommerce';
    if (q.match(/vitrine bio|bio|link na bio|linktree/)) return 'vitrine_bio';
    if (q.match(/chat|bot|ia|rag/)) return 'chat_rag';
    return null;
  }

  function fixTypos(text) {
    var fixes = {'char':'chat','prco':'preco','stie':'site','portflio':'portfolio','vitrne':'vitrine','landng':'landing','bill':'bio','celular':'mobile','responsiva':'responsivo','gerenciavei':'gerenciavel','institucional':'institucional'};
    var words = text.split(' ');
    for (var i = 0; i < words.length; i++) { if (fixes[words[i]]) words[i] = fixes[words[i]]; }
    return words.join(' ');
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    query = fixTypos(query.toLowerCase().trim());
    if (!query || query.length < 2) return null;

    var intentId = detectIntent(query);
    if (intentId) {
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].id === intentId || docs[i].id.indexOf(intentId) !== -1) {
          trackEvent('chat_intent_' + intentId, { intent: intentId });
          return docs[i].resposta;
        }
      }
    }

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
