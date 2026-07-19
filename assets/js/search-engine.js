var SMLEngine = (function() {
  
  var docs = [];

  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  function linkBtn(u, t) {
    return ' <a href="' + u + '" target="_blank" style="display:inline-block;background:var(--cyan);color:#04111a;padding:8px 14px;border-radius:999px;font-weight:600;text-decoration:none;margin:4px 4px 4px 0;font-size:12px;"><i class="fas fa-external-link-alt"></i> ' + t + '</a>';
  }

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  // ============ GERA VARIAÇÕES AUTOMÁTICAS ============
  function generateVariations(text) {
    var words = text.toLowerCase().split(/\s+/);
    var variations = [text.toLowerCase()];
    
    // Adiciona cada palavra individualmente
    words.forEach(function(w) {
      if (w.length > 3) variations.push(w);
    });
    
    // Adiciona sinônimos comuns
    var synonyms = {
      'site': 'site pagina web website homepage',
      'landing': 'landing page pagina venda captura conversao lead',
      'vitrine': 'vitrine bio page link bio instagram linktree',
      'bio': 'bio page link bio instagram perfil',
      'ecommerce': 'ecommerce loja virtual loja online carrinho vender produtos catalogo',
      'institucional': 'institucional empresa negocio clinica escritorio corporativo completo',
      'chat': 'chat bot assistente virtual ia inteligencia artificial rag',
      'seo': 'seo google ranquear aparecer busca organico indexar',
      'manutencao': 'manutencao trocar alterar mudar atualizar ajuste arrumar consertar',
      'preco': 'preco quanto custa valor investimento orcamento tabela',
      'prazo': 'prazo demora dias entrega tempo pronto urgencia',
      'whatsapp': 'whatsapp zap whats contato falar conversar telefone',
      'samuel': 'samuel desenvolvedor dono fundador quem faz sobre',
      'hospedagem': 'hospedagem servidor site ar publicar online',
      'garantia': 'garantia devolucao reembolso 7 dias dinheiro volta',
      'pagamento': 'pagamento pagar pix cartao transferencia parcela sinal'
    };
    
    for (var key in synonyms) {
      if (text.toLowerCase().indexOf(key) !== -1) {
        variations = variations.concat(synonyms[key].split(' '));
      }
    }
    
    return variations.join(' ');
  }

  // ============ LÊ A PÁGINA E GERA BASE DE CONHECIMENTO ============
  function buildFromPage() {
    docs = [];
    
    // 1. Serviços
    var serviceSection = document.querySelector('#servicos');
    if (serviceSection) {
      var cards = serviceSection.querySelectorAll('.service-card');
      cards.forEach(function(card) {
        var title = card.querySelector('h3')?.innerText || '';
        var desc = card.querySelector('p')?.innerText || '';
        var fullText = title + ' ' + desc;
        docs.push({
          id: title.toLowerCase().replace(/\s+/g,'_'),
          keywords: generateVariations(fullText),
          resposta: '<b>' + title + '</b><br>' + desc + wppBtn('Quero saber mais!')
        });
      });
    }
    
    // 2. Diferenciais
    var diffSection = document.querySelector('#diferenciais');
    if (diffSection) {
      var features = diffSection.querySelectorAll('.feature-card');
      features.forEach(function(card) {
        var title = card.querySelector('h3')?.innerText || '';
        var desc = card.querySelector('p')?.innerText || '';
        var fullText = title + ' ' + desc;
        docs.push({
          id: 'diff_' + title.toLowerCase().replace(/\s+/g,'_'),
          keywords: generateVariations(fullText),
          resposta: '<b>' + title + '</b><br>' + desc + wppBtn('Quero esse!')
        });
      });
    }
    
    // 3. FAQ
    var faqSection = document.querySelector('#faq');
    if (faqSection) {
      var faqItems = faqSection.querySelectorAll('.faq-item');
      faqItems.forEach(function(item) {
        var q = item.querySelector('.faq-question')?.innerText || '';
        var a = item.querySelector('.faq-answer')?.innerText || '';
        docs.push({
          id: 'faq_' + q.toLowerCase().replace(/\s+/g,'_').substring(0,20),
          keywords: generateVariations(q),
          resposta: '<b>' + q + '</b><br>' + a
        });
      });
    }
    
    // 4. Sobre
    var sobreSection = document.querySelector('#sobre');
    if (sobreSection) {
      var sobreText = sobreSection.innerText.trim().substring(0, 500);
      docs.push({
        id: 'sobre',
        keywords: generateVariations('quem samuel desenvolvedor dono fundador sobre contato instagram github'),
        resposta: sobreText + wppBtn('Quero falar com o Samuel!')
      });
    }
    
    // 5. Saudação
    docs.push({
      id: 'saudacao',
      keywords: generateVariations('oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello chat char ajuda poderia gostaria'),
      resposta: 'Ola! Sou o assistente virtual da <b>SML/PN</b>.<br><br>📱 <b>Vitrine Bio</b> a partir de R$97<br>🌐 <b>Sites</b> a partir de R$550<br>🤖 <b>Chat RAG</b> disponivel<br><br>Fui treinado com o conteudo desta pagina. Pergunte a vontade!' + wppBtn('Ola Samuel!')
    });
    
    // 6. Preços
    docs.push({
      id: 'precos',
      keywords: generateVariations('preco quanto custa valor investimento tabela planos orcamento precos todos valores'),
      resposta: '📋 <b>Precos SML/PN (pagamento unico):</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$97 | Premium R$247 | Empresarial R$497<br>🌐 <b>Sites:</b> Landing R$550 | 2 pags R$700 | Institucional R$1.000<br>🛒 <b>E-commerce:</b> sob consulta<br><br>✅ Garantia 7 dias • Hospedagem inclusa<br><br>' + wppBtn('Quero contratar!')
    });
    
    // 7. Contato
    docs.push({
      id: 'contato',
      keywords: generateVariations('whatsapp falar conversar ligar telefone contato zap chamar humano chat'),
      resposta: '📞 Quer falar direto com o Samuel?' + wppBtn('Ola Samuel!') + '<br><br>📸 Instagram: <a href="https://instagram.com/sml_developer" target="_blank" style="color:var(--cyan);">@sml_developer</a><br>💻 GitHub: <a href="https://github.com/sml-pn" target="_blank" style="color:var(--cyan);">sml-pn</a>'
    });
    
    console.log('📚 Chat indexou ' + docs.length + ' itens com variacoes automaticas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFromPage);
  } else {
    buildFromPage();
  }

  // ============ CORREÇÃO DE TYPOS ============
  function fixTypos(text) {
    var fixes = {
      'char':'chat','chst':'chat','cht':'chat','prco':'preco','orcmento':'orcamento',
      'vitrne':'vitrine','landng':'landing','stie':'site','portflio':'portfolio',
      'projto':'projeto','mnutencao':'manutencao','granta':'garantia',
      'pgamento':'pagamento','przo':'prazo','domnio':'dominio','contto':'contato',
      'sobr':'sobre','servco':'servico','rag':'chat inteligente','intitucional':'institucional'
    };
    var words = text.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (fixes[words[i]]) words[i] = fixes[words[i]];
    }
    return words.join(' ');
  }

  // ============ BUSCA ============
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
      return bestDoc.resposta;
    }
    return null;
  }

  return { search: search, docs: docs };
})();
