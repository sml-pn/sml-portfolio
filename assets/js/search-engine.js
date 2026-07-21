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
      if (title) {
        docs.push({
          id: 'pg_' + title.toLowerCase().replace(/\s+/g,'_'),
          keywords: (title + ' ' + desc).toLowerCase(),
          resposta: '<b>' + title + '</b><br>' + desc + wppBtn('Quero saber mais!')
        });
      }
    });
    
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
    
    var sobre = document.querySelector('#sobre');
    if (sobre) {
      var sobreText = sobre.textContent?.trim().substring(0, 500) || '';
      docs.push({ id:'sobre', keywords:'quem samuel desenvolvedor dono fundador sobre contato', resposta: sobreText + wppBtn('Quero falar com o Samuel!') });
    }
    
    // Intenções manuais completas
    docs.push({ id:'precos', keywords:'preco quanto custa valor investimento tabela planos orcamento precos valores todos precos', resposta:'📋 <b>Precos SML/PN (pagamento unico):</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$ 97,90 | Premium R$ 247,90 | Empresarial R$ 497,90<br>🌐 <b>Sites:</b> Landing R$ 547,90 | 2 pags R$ 697,90 | Institucional R$ 997,90<br>🛒 <b>E-commerce:</b> sob consulta<br>🤖 <b>Chat RAG:</b> R$ 197,90<br><br>✅ Garantia 7 dias • Hospedagem inclusa • 50% inicio + 50% entrega' });
    docs.push({ id:'saudacao', keywords:'oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello chat ajuda poderia gostaria', resposta:'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena, Full Stack em Trairi-CE.<br><br>📱 <b>Vitrine Bio</b> a partir de R$ 97,90<br>🌐 <b>Sites</b> a partir de R$ 547,90<br>🤖 <b>Chat RAG</b> — R$ 197,90<br><br>No que posso te ajudar?' });
    docs.push({ id:'portfolio', keywords:'portfolio projetos trabalhos exemplos mostre ver fez criou ja fez o que ja fez', resposta:'📂 <b>Projetos entregues:</b><br><br>🛒 <b>Amei Cetim</b> — E-commerce<br>🔗 <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a><br><br>🏢 <b>Halison Henry</b> — Institucional<br>🔗 <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a><br><br>📱 <b>Vitrine Bio</b> — Bio Premium<br>🔗 <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver modelo</a><br><br>🏫 <b>Colegio Agape</b> — Landing<br>🔗 <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver site</a>' });
    docs.push({ id:'contato', keywords:'whatsapp falar conversar ligar telefone contato zap chamar humano pessoa atendente', resposta:'📞 Vamos conversar pelo WhatsApp?' + wppBtn('Ola Samuel!') + '<br><br>📸 Instagram: <a href="https://instagram.com/sml_developer" target="_blank" style="color:var(--cyan);">@sml_developer</a>' });
    docs.push({ id:'garantia', keywords:'garantia devolucao reembolso nao gostar arrepender 7 dias dinheiro volta seguro confiavel', resposta:'✅ <b>Garantia de 7 dias.</b> Se nao gostar do resultado, devolvo 100% do seu dinheiro. O risco e todo meu!' });
    docs.push({ id:'pagamento', keywords:'pagamento pagar cartao pix transferencia parcela sinal forma como paga', resposta:'💳 <b>Pagamento:</b> 50% no inicio + 50% na entrega. Aceito Pix e transferencia. Pagamento unico!' });
    docs.push({ id:'prazos', keywords:'prazo demora dias entrega rapido urgente tempo pronto quando fica agilidade', resposta:'⏱️ <b>Prazos de entrega:</b><br>📱 Bio Simples: 48h<br>📱 Premium/Empresarial: 3-5 dias<br>🎯 Landing: 72h<br>📄 2 pags: 96h<br>🏢 Institucional: 7 dias' });
    docs.push({ id:'modelos_bio', keywords:'modelos bio vitrine quais modelos tipos bio exemplos bios showcase', resposta:'📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 <b>Simples R$ 97,90</b> — Links essenciais, 48h<br>🔵 <b>Premium R$ 247,90</b> — Identidade visual, depoimentos, Pixel<br>🟣 <b>Empresarial R$ 497,90</b> — Galeria, Analytics, urgencia<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase ao vivo</a>' });
    docs.push({ id:'chat_rag', keywords:'chat rag bot assistente virtual ia inteligencia artificial automacao atendimento', resposta:'🤖 <b>Chat RAG Inteligente — R$ 197,90</b><br><br>✅ Atendimento 24h automatizado<br>✅ Treinado com SEU conteudo<br>✅ Responde clientes automaticamente<br>✅ Integrado ao WhatsApp e GA4<br>✅ Pagamento unico, sem mensalidade<br><br>💡 <b>Exemplo:</b> este chat que voce esta usando agora e um Chat RAG! Ele foi treinado com o conteudo do site SML/PN e responde automaticamente sobre todos os servicos.<br><br>Quer um igual para o seu site?' + wppBtn('Quero Chat RAG!') });
    docs.push({ id:'responsivo', keywords:'responsivo responsiva mobile celular tablet pc desktop computador notebook funciona serve adapta dispositivo tela qualquer', resposta:'📱 <b>Todos os meus sites sao 100% responsivos!</b><br><br>✅ Funcionam perfeitamente no celular, tablet, notebook e computador<br>✅ Design mobile-first (pensado primeiro para celular)<br>✅ Layout adaptavel a qualquer tamanho de tela<br>✅ Imagens otimizadas para carregar rapido no 4G<br>✅ Testado em iOS e Android<br><br>Nao importa o dispositivo, seu site vai ficar lindo!' + wppBtn('Quero site responsivo!') });
    docs.push({ id:'gerenciavel', keywords:'gerenciavel gerenciaveis administrar painel dashboard controle atualizar sozinho', resposta:'📝 <b>Sites gerenciáveis</b> significa que voce mesmo pode atualizar o conteudo do site sem precisar de programador.<br><br>✅ Alterar textos e imagens<br>✅ Adicionar produtos/servicos<br>✅ Trocar fotos da galeria<br>✅ Atualizar precos e promocoes<br>✅ Tudo por um painel simples e intuitivo<br><br>Voce tem o controle total!' + wppBtn('Quero site gerenciavel!') });
    docs.push({ id:'dominio', keywords:'dominio url www dns com.br registro dominio proprio', resposta:'🌐 <b>Sobre dominio:</b><br><br>• Ja tem? Configuro <b>gratis</b>!<br>• Nao tem? Registro por <b>R$ 80</b><br>• Pode usar subdominio gratuito tambem<br><br>Ex: seudominio.com.br' + wppBtn('Quero meu dominio!') });
    docs.push({ id:'hospedagem', keywords:'hospedagem hospedar servidor site ar publicar online fica ar', resposta:'✅ <b>Hospedagem inclusa</b> em todos os planos!<br><br>Seu site fica no ar 24h por dia, sem custo mensal. Pagamento unico.' + wppBtn('Quero meu site no ar!') });
    docs.push({ id:'seo', keywords:'seo google ranquear aparecer busca organico indexar pesquisa melhor posicao', resposta:'🔍 <b>SEO incluso em todos os planos!</b><br><br>✅ Otimizacao para Google<br>✅ Google Meu Negocio configurado<br>✅ Palavras-chave estrategicas<br>✅ Meta tags e sitemap<br>✅ Performance 95+ (ranking melhor)<br><br>Seu site pronto para aparecer nas buscas!' + wppBtn('Quero ranquear!') });
    docs.push({ id:'processo', keywords:'como funciona processo etapas metodo passo fluxo trabalho', resposta:'🔄 <b>Processo em 4 etapas:</b><br><br>1️⃣ <b>Brief</b> — Entendo seu negocio e objetivos (WhatsApp, 30min)<br>2️⃣ <b>Design</b> — Layout mobile-first aprovado por voce<br>3️⃣ <b>Code</b> — Codigo limpo, rapido, com SEO e WhatsApp<br>4️⃣ <b>Go</b> — Deploy, dominio e site no ar!<br><br>✅ Garantia 7 dias • Suporte incluso' + wppBtn('Vamos comecar!') });
    
    console.log('📚 Engine: ' + docs.length + ' itens indexados');
  }

  buildFromPage();

  function fetchVitrineMain() {
    fetch('https://vitrinebio.onrender.com/')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var text = (doc.body?.innerText || '').substring(0, 2000);
        var precos = text.match(/R\$\s?[\d,.]+/g) || [];
        docs.push({
          id: 'vitrine_main',
          keywords: 'vitrine bio principal ' + text.substring(0,200).toLowerCase(),
          resposta: '📱 <b>Vitrine Bio:</b><br><br>' + text.substring(0,400) + '...<br><br>💰 ' + precos.slice(0,3).join(', ') + '<br><br>🔗 <a href="https://vitrinebio.onrender.com/" target="_blank" style="color:var(--cyan);">Acessar</a>' + wppBtn('Quero minha Vitrine Bio!')
        });
        console.log('📚 Vitrine Bio carregada');
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
            resposta: '🎨 <b>Showcase:</b><br><br>' + info.slice(0,6).map(function(i){return '• '+i;}).join('<br>') + '<br><br>💰 ' + precos.slice(0,3).join(', ') + '<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase</a>' + wppBtn('Quero igual!')
          });
          console.log('📚 Showcase carregado');
        }
      }).catch(function() {});
  }

  fetchVitrineMain();
  fetchShowcase();

  function detectIntent(query) {
    var q = query.toLowerCase().trim();
    
    // NLP com compromise.js
    if (typeof window.nlp !== 'undefined' && q.length > 3) {
      try {
        var doc = window.nlp(q);
        var verbs = doc.verbs().out('array');
        var nouns = doc.nouns().out('array');
        if (verbs.some(function(v) { return /quero|preciso|gostaria|contratar|comprar|pedir|queria/.test(v); })) {
          if (nouns.some(function(n) { return /site|pagina|web|landing/.test(n); })) return 'site';
          if (nouns.some(function(n) { return /vitrine|bio|instagram|link/.test(n); })) return 'vitrine_bio';
          if (nouns.some(function(n) { return /loja|ecommerce|vender|produto/.test(n); })) return 'ecommerce';
        }
        if (q.match(/quanto|custa|preco|valor|orcamento/)) return 'precos';
        if (verbs.some(function(v) { return /mostra|ver|exemplo|conhecer/.test(v); })) return 'portfolio';
      } catch(e) {}
    }
    
    // Intenções explícitas
    if (q === 'sim' || q === 'quero' || q === 'bora' || q === 'vamos') return 'quero_contratar';
    
    // Responsivo - CAPTURA TUDO sobre dispositivo/tela
    if (q.match(/responsiv|celular|mobile|tablet|pc|desktop|computador|notebook|serve para|serve no|serve em|funciona no|funciona em|funciona para|adapt|tela|qualquer dispositivo/)) return 'responsivo';
    
    // Explicações
    if (q.match(/como assim|o que significa|o que quer dizer|explica|o que e|oq e|que isso|nao entendi/)) {
      if (q.match(/gerenciav|administr|painel|dashboard/)) return 'gerenciavel';
      if (q.match(/responsiv|mobile|celular|pc|desktop|computador/)) return 'responsivo';
      if (q.match(/seo|ranquear|google|busca/)) return 'seo';
      if (q.match(/rag|chat|bot|ia|inteligencia/)) return 'chat_rag';
      return 'explicar';
    }
    
    // Gerenciável
    if (q.match(/gerenciav|administr|painel|dashboard|controle|atualizar sozinho|mexer sozinho/)) return 'gerenciavel';
    
    // Contexto "e para"
    if (q.match(/e para|e o|e no|para site|para o site|do site/)) {
      if (q.match(/site|pagina|web/)) return 'site';
    }
    
    // Compra/ação
    if (q.match(/quero|preciso|gostaria|contratar/)) {
      if (q.match(/site|pagina|web/)) return 'site';
      if (q.match(/vitrine|bio|instagram/)) return 'vitrine_bio';
      if (q.match(/loja|ecommerce|vender/)) return 'ecommerce';
      if (q.match(/chat|bot|ia|rag/)) return 'chat_rag';
      if (q.match(/orcamento|falar|conversar/)) return 'contato';
    }
    
    // Preço
    if (q.match(/quanto|custa|preco|valor|orcamento/)) return 'precos';
    
    // Portfólio
    if (q.match(/mostra|ver|exemplo|portfolio|projeto|trabalho|fez|criou|entregou/)) return 'portfolio';
    
    // Prazo
    if (q.match(/prazo|demora|entrega|urgente|tempo|quando fica|quanto tempo/)) return 'prazos';
    
    // Garantia
    if (q.match(/garantia|devolucao|reembolso|seguro|confiavel|confiar/)) return 'garantia';
    
    // Pagamento
    if (q.match(/pagamento|pagar|cartao|pix|parcela|sinal|forma/)) return 'pagamento';
    
    // Contato
    if (q.match(/whatsapp|falar|contato|chamar|conversar|ligar|telefone/)) return 'contato';
    
    // Domínio
    if (q.match(/dominio|url|www|dns|com.br|endereco/)) return 'dominio';
    
    // Hospedagem
    if (q.match(/hospedagem|hospedar|servidor|site ar|publicar|online|ficar ar/)) return 'hospedagem';
    
    // SEO
    if (q.match(/seo|google|ranquear|aparecer|busca|pesquisa|primeira pagina|posicao/)) return 'seo';
    
    // Processo
    if (q.match(/como funciona|processo|etapas|metodo|passo|fluxo|trabalho/)) return 'processo';
    
    // Sobre
    if (q.match(/quem e|samuel|desenvolvedor|dono|fundador|sobre voce|quem faz/)) return 'sobre';
    
    // Bio
    if (q.match(/bio|vitrine|linktree|instagram/)) return 'modelos_bio';
    
    // Chat RAG
    if (q.match(/chat|bot|ia|rag|inteligencia|assistente|automat/)) return 'chat_rag';
    
    // Site genérico
    if (q.match(/site|pagina|web/)) return 'site';
    
    return null;
  }

  function fixTypos(text) {
    var fixes = {
      'char':'chat','chst':'chat','prco':'preco','orcmento':'orcamento',
      'stie':'site','portflio':'portfolio','vitrne':'vitrine','landng':'landing',
      'bill':'bio','celular':'mobile','responsiva':'responsivo','responsivas':'responsivo',
      'gerenciavei':'gerenciavel','descktop':'desktop','not':'notebook','pc':'pc'
    };
    var words = text.split(' ');
    for (var i = 0; i < words.length; i++) { if (fixes[words[i]]) words[i] = fixes[words[i]]; }
    return words.join(' ');
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    query = fixTypos(query.toLowerCase().trim());
    
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
