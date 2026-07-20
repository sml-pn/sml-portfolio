/* ==================== SML ENGINE - COMPLETO ==================== */
var SMLEngine = (function() {
  
  var docs = [];
  var salesStage = 'inicio';

  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  function generateVariations(text) {
    var words = text.toLowerCase().split(/\s+/);
    var variations = [text.toLowerCase()];
    words.forEach(function(w) { if (w.length > 3) variations.push(w); });
    var synonyms = {
      'site': 'site pagina web website homepage',
      'landing': 'landing page pagina venda captura conversao lead',
      'vitrine': 'vitrine bio page link bio instagram linktree modelos bios exemplos',
      'ecommerce': 'ecommerce loja virtual loja online carrinho vender produtos catalogo',
      'institucional': 'institucional empresa negocio clinica escritorio corporativo completo',
      'chat': 'chat bot assistente virtual ia inteligencia artificial rag',
      'preco': 'preco quanto custa valor investimento orcamento tabela',
      'prazo': 'prazo demora dias entrega tempo pronto urgencia',
      'whatsapp': 'whatsapp zap whats contato falar conversar telefone',
      'portfolio': 'portfolio projetos trabalhos exemplos mostre ver fez criou'
    };
    for (var key in synonyms) {
      if (text.toLowerCase().indexOf(key) !== -1) {
        variations = variations.concat(synonyms[key].split(' '));
      }
    }
    return variations.join(' ');
  }

  function getSalesFollowUp(intentId) {
    if (intentId === 'precos' && salesStage === 'inicio') {
      salesStage = 'precos';
      return '<br><br>💡 <b>Quer ver alguns projetos que ja fiz?</b> Eles podem te ajudar a decidir! (digite "sim" ou "portfolio")';
    }
    if ((intentId === 'portfolio') && (salesStage === 'precos' || salesStage === 'inicio')) {
      salesStage = 'portfolio';
      return '<br><br>🎯 <b>Gostou de algum?</b> Me chama no WhatsApp que preparo um orcamento para voce!' + wppBtn('Quero um orcamento!');
    }
    if (intentId === 'saudacao') {
      salesStage = 'inicio';
      return '<br><br>Me conta: voce esta pensando em uma 📱 <b>Vitrine Bio</b>, um 🌐 <b>Site</b> ou um 🛒 <b>E-commerce</b>?';
    }
    if (intentId === 'modelos_bio' || intentId === 'vitrine_bio') {
      salesStage = 'precos';
      return '<br><br>💡 <b>Quer saber os precos detalhados de cada plano?</b> Posso te mostrar tambem exemplos ao vivo!';
    }
    return '';
  }

  function buildFromPage() {
    docs = [];
    
    // Lê cards de serviço da página
    var serviceSection = document.querySelector('#servicos');
    if (serviceSection) {
      var cards = serviceSection.querySelectorAll('.service-card');
      cards.forEach(function(card) {
        var title = card.querySelector('h3')?.innerText || '';
        var desc = card.querySelector('p')?.innerText || '';
        if (title && desc) {
          docs.push({
            id: title.toLowerCase().replace(/\s+/g,'_'),
            keywords: generateVariations(title + ' ' + desc),
            resposta: '<b>' + title + '</b><br>' + desc
          });
        }
      });
    }
    
    // Preços
    docs.push({
      id: 'precos',
      keywords: generateVariations('preco quanto custa valor investimento tabela planos orcamento precos'),
      resposta: '📋 <b>Precos SML/PN (pagamento unico):</b><br><br>📱 <b>Vitrine Bio:</b><br>🟢 Simples: R$97 (48h)<br>🔵 Premium: R$247 (3-5 dias) ⭐<br>🟣 Empresarial: R$497 (3-5 dias)<br><br>🌐 <b>Sites:</b><br>🎯 Landing: R$550 (72h)<br>📄 2 pags: R$700 (96h)<br>🏢 Institucional: R$1.000 (7 dias)<br>🛒 E-commerce: sob consulta<br><br>✅ Garantia 7 dias • Hospedagem inclusa • 50% inicio + 50% entrega'
    });
    
    // Modelos de Vitrine Bio
    docs.push({
      id: 'modelos_bio',
      keywords: generateVariations('modelos bio modelos vitrine quais modelos tipos bio exemplos bios showcase'),
      resposta: '📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 <b>Simples — R$ 97</b><br>✓ Links essenciais<br>✓ Design limpo<br>✓ Entrega em 48h<br><br>🔵 <b>Premium — R$ 247</b> ⭐ MAIS VENDIDO<br>✓ Identidade visual personalizada<br>✓ Depoimentos<br>✓ Mapa de localizacao<br>✓ Pixel Facebook/Google<br>✓ Entrega em 3-5 dias<br><br>🟣 <b>Empresarial — R$ 497</b><br>✓ Tudo do Premium<br>✓ Galeria de fotos<br>✓ Google Analytics<br>✓ Contador de urgencia<br>✓ Suporte 30 dias<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver todos os modelos ao vivo</a>'
    });
    
    // Portfolio
    docs.push({
      id: 'portfolio',
      keywords: generateVariations('portfolio projetos trabalhos exemplos mostre ver fez criou ja fez'),
      resposta: '📂 <b>Projetos entregues:</b><br><br>🛒 <b>Amei Cetim</b> — E-commerce<br>🔗 <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a><br><br>🏢 <b>Halison Henry</b> — Institucional<br>🔗 <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a><br><br>📱 <b>Vitrine Bio</b> — Bio Premium<br>🔗 <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver modelo</a><br><br>🏫 <b>Colegio Agape</b> — Landing<br>🔗 <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a><br><br>🎨 <b>Showcase</b><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver todos</a>'
    });
    
    // Saudação
    docs.push({
      id: 'saudacao',
      keywords: generateVariations('oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello chat ajuda'),
      resposta: 'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br>📱 <b>Vitrine Bio</b> a partir de R$97<br>🌐 <b>Sites</b> a partir de R$550<br>🤖 <b>Chat RAG</b> para automatizar atendimento'
    });
    
    // Contato
    docs.push({
      id: 'contato',
      keywords: generateVariations('whatsapp falar conversar ligar telefone contato zap chamar'),
      resposta: '📞 Vamos conversar pelo WhatsApp? Assim entendo melhor seu projeto!' + wppBtn('Ola Samuel! Quero falar sobre um projeto.')
    });
    
    // Sobre
    docs.push({
      id: 'sobre',
      keywords: generateVariations('quem samuel desenvolvedor dono fundador sobre'),
      resposta: '👨‍💻 <b>Samuel Pena</b> — Full Stack em Trairi-CE. Sites rapidos que ranqueiam e convertem.<br>📸 <a href="https://instagram.com/sml_developer" target="_blank" style="color:var(--cyan);">@sml_developer</a><br>💻 <a href="https://github.com/sml-pn" target="_blank" style="color:var(--cyan);">sml-pn</a>'
    });
    
    // Prazos
    docs.push({ id: 'prazos', keywords: generateVariations('prazo demora dias entrega rapido urgente tempo pronto'), resposta: '⏱️ <b>Prazos:</b><br>📱 Bio Simples: 48h<br>📱 Premium/Empresarial: 3-5 dias<br>🎯 Landing: 72h<br>📄 2 pags: 96h<br>🏢 Institucional: 7 dias' });
    
    // Garantia
    docs.push({ id: 'garantia', keywords: generateVariations('garantia devolucao reembolso nao gostar 7 dias'), resposta: '✅ <b>Garantia de 7 dias.</b> Se nao gostar, devolvo 100%. O risco e todo meu!' });
    
    // Pagamento
    docs.push({ id: 'pagamento', keywords: generateVariations('pagamento pagar cartao pix transferencia parcela sinal'), resposta: '💳 <b>Pagamento:</b> 50% inicio + 50% entrega. Pix e transferencia. Pagamento unico!' });
    
    // Sim (follow-up)
    docs.push({ id: 'sim', keywords: 'sim quero positivo ok yes claro bora', resposta: 'Otimo! ' + getSalesFollowUp('portfolio') });
    
    console.log('📚 SML Engine: ' + docs.length + ' intencoes prontas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFromPage);
  } else {
    buildFromPage();
  }

  function fixTypos(text) {
    var fixes = {
      'char':'chat','chst':'chat','prco':'preco','orcmento':'orcamento',
      'vitrne':'vitrine','landng':'landing','stie':'site','portflio':'portfolio',
      'projto':'projeto','mnutencao':'manutencao','granta':'garantia',
      'pgamento':'pagamento','przo':'prazo','domnio':'dominio','contto':'contato',
      'sobr':'sobre','servco':'servico','rag':'chat inteligente','modelo':'modelos'
    };
    var words = text.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (fixes[words[i]]) words[i] = fixes[words[i]];
    }
    return words.join(' ');
  }

  function tokenize(text) {
    return text.toLowerCase()
      .replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e')
      .replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o')
      .replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c')
      .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()
      .split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    if (docs.length === 0) buildFromPage();
    
    query = fixTypos(query);
    var qTokens = tokenize(query);
    var bestScore = 0, bestDoc = null;
    
    for (var i = 0; i < docs.length; i++) {
      var doc = docs[i];
      var kTokens = tokenize(doc.keywords);
      var score = 0;
      
      for (var j = 0; j < qTokens.length; j++) {
        for (var k = 0; k < kTokens.length; k++) {
          if (qTokens[j] === kTokens[k]) score += 10;
          else if (kTokens[k].indexOf(qTokens[j]) !== -1 && qTokens[j].length > 2) score += 5;
        }
      }
      
      if (doc.keywords.indexOf(query.toLowerCase()) !== -1) score += 20;
      
      if (score > bestScore) { bestScore = score; bestDoc = doc; }
    }
    
    if (bestDoc && bestScore > 3) {
      trackEvent('chat_intent_' + bestDoc.id, { intent: bestDoc.id, score: bestScore });
      var followUp = getSalesFollowUp(bestDoc.id);
      return bestDoc.resposta + followUp;
    }
    return null;
  }

  return { search: search };
})();
