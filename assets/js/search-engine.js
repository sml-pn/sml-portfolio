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
    docs.push({ id:'precos', keywords:'preco quanto custa valor investimento tabela planos orcamento precos', resposta:'📋 <b>Precos SML/PN (pagamento unico):</b><br><br>📱 <b>Vitrine Bio:</b> Simples R$ 97,90 | Premium R$ 247,90 | Empresarial R$ 497,90<br>🌐 <b>Sites (Hospedagem Render inclusa):</b><br>🎯 Landing Page: R$ 549,90<br>📄 Site 2 Páginas: R$ 689,90<br>🏢 Institucional: R$ 997,90<br>🛒 E-commerce: sob consulta<br>🤖 Chat RAG: R$ 197,90<br><br>📧 <b>E-mail:</b> Gmail Compartilhado R$ 79,90 | Google Workspace R$ 299,90<br>🌐 <b>Domínio próprio:</b> + R$ 79,90 (configuração DNS)<br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' });
    docs.push({ id:'saudacao', keywords:'oi ola hey bom dia boa tarde boa noite iae opa fala salve hi hello', resposta:'Ola! Sou o assistente da <b>SML/PN</b> — Samuel Pena.<br><br>📱 <b>Vitrine Bio</b> a partir de R$ 97,90<br>🌐 <b>Sites</b> a partir de R$ 549,90 (Render incluso)<br>🤖 <b>Chat RAG</b> — R$ 197,90<br><br>No que posso te ajudar?' });
    docs.push({ id:'portfolio', keywords:'portfolio projetos trabalhos exemplos mostre ver fez criou', resposta:'📂 <b>Projetos:</b><br>🛒 Amei Cetim <a href="https://ameicetim.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏢 Halison Henry <a href="https://halison-henry.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>📱 Vitrine Bio <a href="https://vitrinebio.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a><br>🏫 Colegio Agape <a href="https://colegioagape.onrender.com" target="_blank" style="color:var(--cyan);">Ver</a>' });
    docs.push({ id:'contato', keywords:'whatsapp falar conversar ligar telefone contato zap chamar', resposta:'📞 Vamos conversar?' + wppBtn('Ola Samuel!') });
    docs.push({ id:'garantia', keywords:'garantia devolucao reembolso 7 dias', resposta:'✅ <b>Garantia de 7 dias.</b> Se nao gostar, devolvo 100%.' });
    docs.push({ id:'pagamento', keywords:'pagamento pagar cartao pix transferencia parcela', resposta:'💳 <b>Pagamento:</b> 50% inicio + 50% entrega. Pix.' });
    docs.push({ id:'prazos', keywords:'prazo demora dias entrega rapido urgente tempo', resposta:'⏱️ <b>Prazos:</b> Bio Simples 72h (3 dias uteis) | Premium 5-7 dias uteis | Landing 5 dias uteis | 2 pags 6 dias uteis | Institucional 9 dias uteis | Gmail 2 dias uteis | Workspace 3 dias uteis' });
    docs.push({ id:'modelos_bio', keywords:'modelos bio vitrine quais modelos tipos bio exemplos', resposta:'📱 <b>Modelos de Vitrine Bio:</b><br><br>🟢 Simples R$ 97,90<br>🔵 Premium R$ 247,90<br>🟣 Empresarial R$ 497,90<br><br>🔗 <a href="https://vitrinebio.onrender.com/showcase.html" target="_blank" style="color:var(--cyan);">Ver showcase</a>' });
    docs.push({ id:'chat_rag', keywords:'chat rag bot assistente virtual ia inteligencia artificial', resposta:'🤖 <b>Chat RAG — R$ 197,90</b><br><br>✅ Atendimento 24h automatizado<br>✅ Treinado com SEU conteudo<br>✅ Responde clientes automaticamente<br>✅ Integrado ao WhatsApp e GA4<br>✅ Pagamento unico, sem mensalidade<br><br>💡 <b>Exemplo:</b> este chat que voce esta usando agora e um Chat RAG!' + wppBtn('Quero Chat RAG!') });
    docs.push({ id:'responsivo', keywords:'responsivo responsiva mobile celular tablet pc desktop computador funciona serve adapta', resposta:'📱 <b>Todos os meus sites sao 100% responsivos!</b><br><br>✅ Funcionam no celular, tablet, notebook e computador<br>✅ Design mobile-first<br>✅ Layout adaptavel a qualquer tela' + wppBtn('Quero site responsivo!') });
    docs.push({ id:'gerenciavel', keywords:'gerenciavel gerenciaveis administrar painel dashboard controle', resposta:'📝 <b>Sites gerenciáveis</b> = voce mesmo atualiza sem programador!<br><br>✅ Alterar textos e imagens<br>✅ Adicionar produtos/servicos<br>✅ Tudo por um painel simples e intuitivo' + wppBtn('Quero site gerenciavel!') });
    docs.push({ id:'dominio', keywords:'dominio url www dns com.br registro dominio proprio', resposta:'🌐 <b>Sobre dominio:</b><br><br>✅ <b>Grátis:</b> subdominio Render (ex: seuprojeto.onrender.com) incluso em todos os planos.<br>✅ <b>Domínio próprio:</b> voce compra onde preferir (HostGator, Registro.br) e eu configuro o DNS por <b>R$ 79,90</b>.' });
    docs.push({ id:'hospedagem', keywords:'hospedagem hospedar servidor site ar publicar online', resposta:'✅ <b>Hospedagem Render inclusa</b> em todos os planos. Site 24h no ar sem custo mensal.' + wppBtn('Quero meu site no ar!') });
    docs.push({ id:'seo', keywords:'seo google ranquear aparecer busca organico indexar', resposta:'🔍 <b>SEO incluso em todos os planos!</b> Otimizacao para Google, Google Meu Negocio e buscas locais.' + wppBtn('Quero ranquear!') });
    docs.push({ id:'processo', keywords:'como funciona processo etapas metodo passo fluxo', resposta:'🔄 <b>Processo em 4 etapas:</b><br>1. Brief (WhatsApp)<br>2. Design<br>3. Code<br>4. Deploy!<br><br>✅ Garantia 7 dias • Suporte incluso' + wppBtn('Vamos comecar!') });

    // SERVIÇOS INDIVIDUAIS
    docs.push({ id:'landing_page', keywords:'landing page landing pagina de venda pagina unica landing preco preco landing', resposta:'🎯 <b>Landing Page</b><br><br>💰 <b>Valor: R$ 549,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 5 dias uteis<br>📱 1 pagina completa (hero, servicos, mapa, galeria, WhatsApp)<br><br>🌐 <b>Com domínio próprio:</b> + R$ 79,90 — <b>Total: R$ 629,80</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Landing Page!') });
    docs.push({ id:'site2', keywords:'site 2 paginas duas paginas 2 paginas site duas paginas', resposta:'📄 <b>Site 2 Páginas</b><br><br>💰 <b>Valor: R$ 689,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 6 dias uteis<br>📱 Landing + 1 pagina extra (sobre, portfolio, etc)<br><br>🌐 <b>Com domínio próprio:</b> + R$ 79,90 — <b>Total: R$ 769,80</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Site 2 paginas!') });
    docs.push({ id:'institucional', keywords:'institucional site institucional site empresa site completo 5 paginas 1000 pagina institucional plano institucional preco institucional valor institucional', resposta:'🏢 <b>Site Institucional</b><br><br>💰 <b>Valor: R$ 997,90</b> (Hospedagem Render inclusa)<br>⏱️ Entrega: 9 dias uteis<br>📱 Ate 5 paginas (Home, Sobre, Servicos, Contato, Blog)<br>✅ Painel de administracao incluso<br>✅ SEO em todas as paginas<br>✅ Blog incluso<br><br>🌐 <b>Com domínio próprio:</b> + R$ 79,90 — <b>Total: R$ 1.069,70,90</b><br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega' + wppBtn('Quero Site Institucional!') });
    docs.push({ id:'ecommerce', keywords:'ecommerce e-commerce loja virtual loja online carrinho vender online loja ecommerce preco', resposta:'🛒 <b>E-commerce / Loja Virtual</b><br><br>💰 <b>Valor: sob consulta</b> (depende do numero de produtos)<br>📱 Vitrine de produtos + carrinho + checkout WhatsApp<br>🔗 Exemplo: Amei Cetim — ameicetim.onrender.com<br><br>✅ Garantia 7 dias • Hospedagem Render inclusa • 50% inicio + 50% entrega' + wppBtn('Quero orcamento!') });
    docs.push({ id:'vitrine_bio', keywords:'vitrine bio page link bio instagram linktree pagina links modelo modelos', resposta:'📱 <b>Vitrine Bio</b> — Link da Bio Profissional<br><br>💰 <b>Valores (Hospedagem inclusa):</b><br>🟢 Simples: R$ 97,90 (72h / 3 dias uteis)<br>🔵 Premium: R$ 247,90 (5-7 dias uteis) ⭐<br>🟣 Empresarial: R$ 497,90 (5-7 dias uteis)<br><br>✅ +2.847 bios entregues<br>✅ Garantia 7 dias<br>✅ Pagamento unico<br><br>🔗 Veja modelos: vitrinebio.onrender.com/showcase.html' + wppBtn('Quero minha Vitrine Bio!') });

    // SERVIÇOS DE E-MAIL
    docs.push({ id:'email_gmail', keywords:'email compartilhado gmail compartilhado email gratuito email para equipe conta gmail compartilhada email para funcionarios', resposta:'📧 <b>Gmail Compartilhado — R$ 79,90</b> (configuração única)<br><br>✅ Uma conta Gmail para toda a equipe<br>✅ Cada funcionário cria sua própria assinatura<br>✅ Configurado em 2 dias úteis<br>✅ Sem custo mensal<br><br>⚠️ Senha compartilhada (menos seguro)<br>⚠️ E-mail @gmail.com (menos profissional)<br><br>💡 Ideal para começar. Depois pode migrar para Google Workspace.' + wppBtn('Quero configurar!') });
    docs.push({ id:'email_workspace', keywords:'google workspace email profissional email com dominio proprio email corporativo workspace gmail empresarial email dominio', resposta:'📧 <b>Google Workspace (E-mail Profissional) — R$ 299,90</b> (configuração única)<br><br>✅ E-mail com seu domínio (ex: contato@seunegocio.com.br)<br>✅ Até 6 contas individuais com senhas próprias<br>✅ Calendário, Drive e Meet compartilhados<br>✅ Segurança e auditoria<br>⏱️ Configurado em 3 dias úteis<br><br>⚠️ Requer domínio próprio (.com.br ou .com)<br>⚠️ Custo mensal do Google Workspace a partir de R$ 32,72 por usuário/mês (plano anual). Veja em: https://workspace.google.com/intl/pt-BR/pricing.html' + wppBtn('Quero Google Workspace!') });

    // INTENÇÕES DO KNOWLEDGE.JSON QUE FALTAVAM
    docs.push({ id:'precos_geral', keywords:'quanto custa preco valores tabela de precos orcamento investimento custa taxa cobrar', resposta:'📋 Preços SML/PN (pagamento único):\n\n📱 Vitrine Bio:\n🟢 Simples: R$ 97,90 (72h)\n🔵 Premium: R$ 247,90 (5-7 dias) ⭐\n🟣 Empresarial: R$ 497,90 (5-7 dias)\n\n🌐 Sites (Hospedagem Render inclusa):\n🎯 Landing Page: R$ 549,90 (5 dias)\n📄 Site 2 Páginas: R$ 689,90 (6 dias)\n🏢 Institucional: R$ 997,90 (9 dias)\n🛒 E-commerce: sob consulta\n🤖 Chat RAG: R$ 197,90\n\n📧 E-mail: Gmail Compartilhado R$ 79,90 | Google Workspace R$ 299,90\n🌐 Domínio próprio: + R$ 79,90 (configuração DNS)\n\n✅ Garantia 7 dias • 50% início + 50% entrega' + wppBtn('Quero contratar!') });
    docs.push({ id:'vitrine_simples', keywords:'vitrine simples bio simples plano simples bio barata bio 97 plano mais barato', resposta:'🟢 Bio Simples — R$ 97,90\n\n✅ Links essenciais\n✅ Design clean mobile-first\n✅ Entrega em 72h (3 dias úteis)\n✅ Hospedagem Render inclusa\n✅ 1 ajuste grátis por mês\n\nIdeal para começar com profissionalismo!' + wppBtn('Quero a Simples!') });
    docs.push({ id:'vitrine_premium', keywords:'vitrine premium bio premium plano premium bio 247 mais popular melhor plano', resposta:'🔵 Bio Premium — R$ 247,90 ⭐ MAIS VENDIDO\n\n✅ Tudo do Simples\n✅ Identidade visual personalizada\n✅ Seção de depoimentos\n✅ Mapa de localização\n✅ Botão WhatsApp otimizado\n✅ Pixel Facebook/Google\n✅ 3 ajustes grátis por mês\n✅ Entrega em 5-7 dias úteis' + wppBtn('Quero a Premium!') });
    docs.push({ id:'vitrine_empresarial', keywords:'vitrine empresarial bio empresarial plano empresarial bio 497 plano completo bio completa', resposta:'🟣 Bio Empresarial — R$ 497,90\n\n✅ Tudo do Premium\n✅ Galeria de fotos/produtos\n✅ Google Analytics integrado\n✅ Contador de urgência\n✅ Animações premium\n✅ Suporte prioritário 30 dias\n✅ 5 ajustes grátis por mês\n✅ Entrega em 5-7 dias úteis' + wppBtn('Quero a Empresarial!') });
    docs.push({ id:'vitrine_prazo', keywords:'prazo bio tempo bio quanto tempo vitrine demora bio entrega bio', resposta:'⏱️ Prazos da Vitrine Bio:\n\n🟢 Simples: 72h (3 dias úteis)\n🔵 Premium: 5-7 dias úteis\n🟣 Empresarial: 5-7 dias úteis\n\nApós envio do material (logo, fotos, textos, links).' + wppBtn('Quero minha Bio!') });
    docs.push({ id:'vitrine_alteracoes', keywords:'alterar bio mudar bio atualizar vitrine ajuste bio modificar bio trocar link bio', resposta:'🛠️ Ajustes na Vitrine Bio:\n\n🟢 Simples: 1 ajuste grátis/mês (extra: R$19 cada)\n🔵 Premium: 3 ajustes grátis/mês (extra: R$15 cada)\n🟣 Empresarial: 5 ajustes grátis/mês (extra: R$12 cada)\n\n⚠️ Mudanças estruturais (nova seção, redesign) são orçadas separadamente.' + wppBtn('Preciso de ajuste!') });
    docs.push({ id:'vitrine_mensalidade', keywords:'mensalidade bio pagar mensal custo mensal vitrine taxa mensal renovacao bio', resposta:'✅ Não tem mensalidade! Pagamento único.\n\n📱 Hospedagem inclusa no 1º ano.\n🔄 Renovação opcional de apenas R$49/ano após o primeiro ano.\n\nSem pegadinhas, sem cobranças surpresa!' + wppBtn('Quero minha Bio!') });
    docs.push({ id:'vitrine_onde_usar', keywords:'onde usar bio onde colocar vitrine funciona onde link serve para', resposta:'📱 Você pode usar sua Vitrine Bio em:\n\n✅ Instagram (link da bio)\n✅ TikTok\n✅ YouTube\n✅ WhatsApp\n✅ Cartão digital\n✅ QR Code\n\nFunciona em qualquer lugar que aceite um link!' + wppBtn('Quero uma Bio!') });
    docs.push({ id:'vitrine_linktree', keywords:'tenho linktree migrar linktree trocar linktree substituir linktree ja tenho linktree', resposta:'✅ Perfeito! Migramos seus links do Linktree e melhoramos 10x o visual sem você perder nada.\n\nSua nova bio fica muito mais profissional, rápida e focada em converter cliques em clientes no WhatsApp.' + wppBtn('Quero migrar!') });
    docs.push({ id:'vitrine_textos', keywords:'faz os textos cria copy escreve bio textos bio copy bio preciso escrever', resposta:'✅ Sim! Otimizamos sua copy para conversão baseado no seu nicho.\n\nVocê só precisa enviar:\n📸 Logo e fotos\n📝 Informações básicas do seu negócio\n🔗 Links que quer incluir\n\nO resto a gente faz!' + wppBtn('Quero minha Bio!') });
    docs.push({ id:'diferenciais', keywords:'diferencial vantagem por que escolher diferente por que voce', resposta:'✨ Diferenciais SML/PN:\n\n✅ WhatsApp Multi (até 3 números)\n✅ Mapa de localização\n✅ Efeitos e animações profissionais\n✅ Mobile + Desktop responsivo\n✅ Cores personalizadas da marca\n✅ Fontes exclusivas\n✅ Performance 95+\n✅ SEO Local incluso\n✅ Hospedagem Render inclusa\n✅ Garantia de 7 dias\n✅ Pagamento único sem mensalidade' + wppBtn('Quero saber mais!') });
    docs.push({ id:'landing_dominio', keywords:'landing page com dominio landing com dominio proprio pagina com dominio site com dominio quanto custa landing com dominio landing page dominio', resposta:'🎯 Landing Page + Domínio Próprio: R$ 629,80\n\n📱 Landing Page: R$ 549,90 (5 dias úteis)\n🌐 Configuração de domínio: R$ 79,90\n\n✅ Total: R$ 629,80\n\nO domínio (.com.br, .com) você compra onde preferir (HostGator, Registro.br) e eu configuro o DNS.' + wppBtn('Quero Landing Page com domínio!') });
    docs.push({ id:'site2_dominio', keywords:'site 2 paginas com dominio duas paginas com dominio proprio site duas paginas dominio', resposta:'📄 Site 2 Páginas + Domínio Próprio: R$ 769,80\n\n📄 Site 2 páginas: R$ 689,90 (6 dias úteis)\n🌐 Configuração de domínio: R$ 79,90\n\n✅ Total: R$ 769,80\n\nO domínio (.com.br, .com) você compra onde preferir e eu configuro o DNS.' + wppBtn('Quero Site 2 páginas com domínio!') });
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
    if (q.match(/email|gmail|workspace|e-mail|correio/)) {
      if (q.match(/workspace|profissional|dominio|corporativo|empresarial/)) return 'email_workspace';
      if (q.match(/compartilhado|gratuito|gmail|simples|equipe/)) return 'email_gmail';
      return 'email_workspace';
    }
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
