var SMLEngine = (function() {
  var docs = [];
  var isLoaded = false;

  function loadKnowledge() {
    fetch('/api/knowledge.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.faq) {
          data.faq.forEach(function(item) {
            var keywords = item.perguntas.join(' ') + ' ' + item.id;
            docs.push({
              id: item.id,
              keywords: keywords.toLowerCase(),
              resposta: item.resposta
            });
          });
          isLoaded = true;
          console.log('📚 Knowledge carregado: ' + docs.length + ' intenções.');
        }
      })
      .catch(function() {
        console.warn('⚠️ knowledge.json indisponível. Usando fallback.');
        buildFallback();
      });
  }

  function buildFallback() {
    docs = [
      { id:'saudacao', keywords:'oi ola', resposta:'<b>Olá!</b> Sou o assistente da SML/PN.<br>Como posso ajudar?' },
      { id:'precos', keywords:'preco', resposta:'<b>Preços:</b><br>Landing Page R$549,90<br>Site Institucional R$997,90<br>Bio a partir de R$97,90' }
    ];
    isLoaded = true;
  }

  function trackEvent(n, p) {
    if (typeof gtag !== 'undefined') gtag('event', n, p || {});
  }

  function fixTypos(text) {
    var fixes = {'char':'chat','prco':'preco','stie':'site','portflio':'portfolio','vitrne':'vitrine','landng':'landing','bill':'bio','celular':'mobile','responsiva':'responsivo','gerenciavei':'gerenciavel','institucional':'institucional'};
    return text.split(' ').map(function(w){ return fixes[w] || w; }).join(' ');
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[áàãâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i').replace(/[óòõôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    if (!isLoaded) return '📚 <b>Aguarde um instante...</b><br>Estou carregando minha base de conhecimento.';

    query = fixTypos(query.toLowerCase().trim());
    if (!query || query.length < 2) return null;

    var qTokens = tokenize(query);
    var bestScore = 0, bestDoc = null;

    for (var i = 0; i < docs.length; i++) {
      var doc = docs[i], score = 0, kTokens = tokenize(doc.keywords);
      if (doc.keywords.indexOf(query) !== -1) score += 40;
      for (var j = 0; j < qTokens.length; j++) {
        for (var k = 0; k < kTokens.length; k++) {
          if (qTokens[j] === kTokens[k]) score += 15;
          else if (kTokens[k].indexOf(qTokens[j]) !== -1 && qTokens[j].length > 2) score += 7;
        }
      }
      if (score > bestScore) { bestScore = score; bestDoc = doc; }
    }

    if (bestDoc && bestScore > 5) {
      trackEvent('chat_intent', { intent: bestDoc.id });
      return bestDoc.resposta;
    }

    return '🤔 <b>Não encontrei uma resposta específica.</b><br><br>Que tal falar diretamente comigo no WhatsApp?<br><br><a href="https://wa.me/558586121078?text=Olá, tenho uma dúvida!" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;text-decoration:none;font-size:14px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  loadKnowledge();

  return { search: search };
})();
