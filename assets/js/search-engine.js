var SMLEngine = (function() {
  
  var docs = [];
  var salesStage = 'inicio';

  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;text-decoration:none;font-size:14px;"><i class="fab fa-whatsapp" style="margin-right:6px;"></i> Chamar no WhatsApp</a>';
  }

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  // ============ BASE DE CONHECIMENTO MANUAL (MAIS PRECISA) ============
  function buildFromPage() {
    docs = [];
    
    // ORDEM IMPORTA: intenções mais específicas primeiro
    
    docs.push({ id:'saudacao', keywords:'oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello', resposta:'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena.<br><br>📱 <b>Vitrine Bio</b> a partir de R$ 97,90<br>🌐 <b>Sites</b> a partir de R$ 547,90<br>🤖 <b>Chat RAG</b> para automatizar atendimento<br><br>Me conta: qual seu interesse?' });
    
    docs.push({ id:'precos', keywords:'preco quanto custa valor investimento tabela planos orcamento precos', resposta:'📋 <b>Precos SML/PN:</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$ 97,90 | Premium R$ 247,90 | Empresarial R$ 497,90<br>🌐 <b>Sites:</b> Landing R$ 547,90 | 2 pags R$ 697,90 | Institucional R$ 997,90<br>🛒 <b>E-commerce:</b> sob consulta<br>🤖 <b>Chat RAG:</b> R$ 197,90<br><br>✅ Garantia 7 dias • Hospedagem inclusa' });
    
    docs.push({ id:'modelos_bio', keywords:'modelos bio modelos vitrine quais modelos tipos bio exemplos bios showcase', resposta:'📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 Simples — R$ 97,90 (links essenciais, 48h)<br>🔵 Premium — R$ 247,90 (identidade visual, depoimentos, Pixel) ⭐<br>🟣 Empresarial — R$ 497,90 (galeria, Analytics, urgencia)<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase ao vivo</a>' });
    
    docs.push({ id:'vitrine_bio', keywords:'vitrine bio page link bio instagram linktree', resposta:'📱 <b>Vitrine Bio</b> — Pagina profissional para Instagram.<br><br>🟢 Simples: R$ 97,90<br>🔵 Premium: R$ 247,90 ⭐<br>🟣 Empresarial: R$ 497,90<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver modelos</a>' });
    
    docs.push({ id:'landing_page', keywords:'landing page pagina venda conversao landing page', resposta:'🎯 <b>Landing Page — R$ 547,90</b><br>Pagina unica de conversao. Hero, servicos, mapa, galeria, WhatsApp Multi. 72h.<br>🔗 <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver exemplo</a>' });
    
    docs.push({ id:'institucional', keywords:'site institucional 5 paginas completo empresa clinica negocio corporativo', resposta:'🏢 <b>Site Institucional — R$ 997,90</b><br>Ate 5 paginas. Menu, blog, formulario, WhatsApp Multi. 7 dias.<br>🔗 <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver exemplo</a>' });
    
    docs.push({ id:'ecommerce', keywords:'ecommerce e-commerce loja virtual loja online carrinho vender produtos catalogo', resposta:'🛒 <b>E-commerce</b> — Loja virtual com carrinho e WhatsApp. Sob consulta.<br>🔗 <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver exemplo: Amei Cetim</a>' });
    
    // SITE - DEVE VIR DEPOIS DOS ESPECÍFICOS
    docs.push({ id:'site', keywords:'site quero site preciso site criar site fazer site site para', resposta:'🌐 <b>Sites profissionais:</b><br><br>🎯 <b>Landing Page — R$ 547,90</b> (pagina unica, 72h)<br>📄 <b>Site 2 pags — R$ 697,90</b> (landing + extra, 96h)<br>🏢 <b>Institucional — R$ 997,90</b> (ate 5 pags, 7 dias)<br>🛒 <b>E-commerce</b> (sob consulta)<br><br>Qual tipo se encaixa no seu projeto?' });
    
    docs.push({ id:'chat_rag', keywords:'chat rag bot assistente virtual ia inteligencia artificial chat inteligente', resposta:'🤖 <b>Chat RAG Inteligente — R$ 197,90</b><br><br>✅ Responde clientes 24h<br>✅ Treinado com SEU conteudo<br>✅ Integrado ao WhatsApp e GA4<br>✅ Instalacao incluida<br>✅ Pagamento unico, sem mensalidade<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver demonstracao</a>' + wppBtn('Quero Chat RAG no meu site!') });
    
    docs.push({ id:'portfolio', keywords:'portfolio projetos trabalhos exemplos mostre ver fez criou ja fez', resposta:'📂 <b>Projetos:</b><br>🛒 Amei Cetim <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏢 Halison Henry <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>📱 Vitrine Bio <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏫 Colegio Agape <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a>' });
    
    docs.push({ id:'seo', keywords:'seo google ranquear aparecer busca organico melhorar seo como melhorar', resposta:'🔍 <b>SEO Local incluso em todos os planos!</b><br><br>✅ Otimizacao para Google<br>✅ Google Meu Negocio<br>✅ Palavras-chave locais<br>✅ Meta tags e sitemap<br>✅ Performance 95+<br><br>Quer aparecer nas buscas de Trairi e regiao?' + wppBtn('Quero SEO!') });
    
    docs.push({ id:'contato', keywords:'whatsapp falar conversar ligar telefone contato zap chamar', resposta:'📞 Vamos conversar?' + wppBtn('Ola Samuel!') });
    docs.push({ id:'sobre', keywords:'quem samuel desenvolvedor dono fundador sobre', resposta:'👨‍💻 <b>Samuel Pena</b> — Full Stack em Trairi-CE.' });
    docs.push({ id:'prazos', keywords:'prazo demora dias entrega rapido urgente tempo pronto', resposta:'⏱️ <b>Prazos:</b> Bio Simples 48h | Premium 3-5 dias | Landing 72h | 2 pags 96h | Institucional 7 dias' });
    docs.push({ id:'garantia', keywords:'garantia devolucao reembolso 7 dias', resposta:'✅ <b>Garantia de 7 dias.</b> Se nao gostar, devolvo 100%.' });
    docs.push({ id:'pagamento', keywords:'pagamento pagar cartao pix transferencia parcela', resposta:'💳 <b>Pagamento:</b> 50% inicio + 50% entrega. Pix.' });
    
    console.log('📚 Engine: ' + docs.length + ' intencoes precisas');
  }

  buildFromPage();

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
      
      // Match exato da frase inteira (maior peso)
      if (doc.keywords.indexOf(query) !== -1) score += 30;
      
      // Match de tokens
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
