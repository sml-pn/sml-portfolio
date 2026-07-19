var SMLEngine = (function() {
  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  
  function wppBtn(t) {
    return '<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  function linkBtn(u, t) {
    return ' <a href="' + u + '" target="_blank" style="display:inline-block;background:var(--cyan);color:#04111a;padding:8px 14px;border-radius:999px;font-weight:600;text-decoration:none;margin:4px 4px 4px 0;font-size:12px;"><i class="fas fa-external-link-alt"></i> ' + t + '</a>';
  }

  var docs = [
    {
      id: 'saudacao',
      keywords: 'oi ola hey bom dia boa tarde boa noite iae opa fala salve boa hi hello',
      resposta: 'Ola! Aqui e o <b>Samuel Pena</b>, desenvolvedor Full Stack em Trairi-CE.<br><br>📱 <b>Vitrine Bio</b> — link da bio do Instagram a partir de <b>R$ 97</b><br>🌐 <b>Sites</b> — landing pages e sites completos a partir de <b>R$ 550</b><br><br>No que posso te ajudar?' + wppBtn('Ola Samuel! Vim pelo chat.')
    },
    {
      id: 'preco_geral',
      keywords: 'preco quanto custa valor investimento tabela planos orcamento cobrar taxas precos',
      resposta: '<b>Tabela de precos — pagamento unico:</b><br><br>📱 <b>Vitrine Bio:</b><br>🟢 Simples: R$ 97 (48h)<br>🔵 Premium: R$ 247 (3-5 dias) ⭐<br>🟣 Empresarial: R$ 497 (3-5 dias)<br><br>🌐 <b>Sites:</b><br>🎯 Landing: R$ 550 (72h)<br>📄 2 pags: R$ 700 (96h)<br>🏢 Institucional: R$ 1.000 (7 dias)<br>🛒 E-commerce: sob consulta<br><br>✅ Garantia 7 dias • 50% inicio + 50% entrega • Hospedagem inclusa<br><br>Qual te interessa?' + linkBtn('https://vitrinebio.onrender.com/showcase.html', 'Ver modelos') + wppBtn('Quero contratar!')
    },
    {
      id: 'orcamento',
      keywords: 'orcamento quero orcamento me faz orcamento solicitar orcamento pedir orcamento',
      resposta: 'Claro! Para te enviar um orcamento personalizado, so me chamar no WhatsApp. Respondo em ate 2h.' + wppBtn('Quero um orcamento!') + '<br><br>Me conta la qual seu tipo de negocio e qual plano te interessa mais que ja preparo tudo pra voce.'
    },
    {
      id: 'quero_contratar',
      keywords: 'quero contratar quero fechar quero comprar quero pedir bora vamos fazer quero ter quero criar',
      resposta: 'Otimo! Bora colocar seu projeto no ar! 🚀<br><br>📱 <b>Vitrine Bio:</b> Simples R$97 | Premium R$247 | Empresarial R$497<br>🌐 <b>Sites:</b> Landing R$550 | 2 pags R$700 | Institucional R$1.000<br><br>Qual desses se encaixa no que voce precisa?' + wppBtn('Quero contratar!')
    },
    {
      id: 'vitrine_bio',
      keywords: 'vitrine bio page link bio instagram linktree pagina links bio profissional modelo modelos showcase',
      resposta: '📱 <b>Vitrine Bio</b> — Pagina profissional para o link da bio do Instagram. Transforma cliques em clientes 24h por dia.<br><br>🟢 <b>Simples — R$ 97:</b> links essenciais, 48h<br>🔵 <b>Premium — R$ 247:</b> identidade visual, depoimentos, mapa, Pixel ⭐<br>🟣 <b>Empresarial — R$ 497:</b> galeria, Analytics, contador de urgencia<br><br>✅ +2.800 bios entregues • Garantia 7 dias<br><br>Veja os modelos:' + linkBtn('https://vitrinebio.onrender.com/showcase.html', 'Showcase') + linkBtn('https://vitrinebio.onrender.com', 'Modelo Premium') + wppBtn('Quero minha Vitrine Bio!')
    },
    {
      id: 'landing_page',
      keywords: 'landing page pagina venda conversao 550 pagina profissional simples barato basico',
      resposta: '🎯 <b>Landing Page — R$ 550</b><br>Pagina unica focada em conversao. Design exclusivo, hero, servicos, mapa, galeria, WhatsApp Multi, formulario e SEO. Pronta em 72h.' + linkBtn('https://colegioagape.onrender.com', 'Ver exemplo') + wppBtn('Quero Landing Page!')
    },
    {
      id: 'site_2paginas',
      keywords: 'site 2 paginas duas 700 segunda pagina extra',
      resposta: '📄 <b>Site 2 paginas — R$ 700</b><br>Landing completa + pagina extra (servicos, portfolio, blog). Menu de navegacao, SEO em ambas. Pronto em 96h.' + wppBtn('Quero Site 2 pags!')
    },
    {
      id: 'institucional',
      keywords: 'site institucional 5 paginas 1000 completo empresa clinica negocio corporativo grande',
      resposta: '🏢 <b>Site Institucional — R$ 1.000</b><br>Ate 5 paginas: Home, Sobre, Servicos, Contato, Blog. Menu completo, formulario, mapa, galeria, WhatsApp Multi. Design 100% personalizado. 7 dias.' + linkBtn('https://halison-henry.onrender.com', 'Ver exemplo') + wppBtn('Quero Institucional!')
    },
    {
      id: 'ecommerce',
      keywords: 'ecommerce e-commerce loja virtual loja online carrinho vender online catalogo produtos',
      resposta: '🛒 <b>E-commerce / Loja Virtual</b><br>Vitrine de produtos, carrinho de compras, checkout via WhatsApp. Mercado Pago/PagSeguro como adicional. Valor sob consulta.' + linkBtn('https://ameicetim.onrender.com', 'Ver loja Amei Cetim') + wppBtn('Quero orcamento!')
    },
    {
      id: 'projetos',
      keywords: 'portfolio projetos trabalhos exemplos amei cetim halison colegio agape mostre fez criou',
      resposta: '📂 <b>Projetos entregues:</b><br><br>🛒 <b>Amei Cetim</b> — E-commerce com carrinho' + linkBtn('https://ameicetim.onrender.com', 'Ver site') + '<br>🏢 <b>Halison Henry</b> — Institucional com SEO' + linkBtn('https://halison-henry.onrender.com', 'Ver site') + '<br>📱 <b>Vitrine Bio</b> — Bio Premium' + linkBtn('https://vitrinebio.onrender.com', 'Ver modelo') + '<br>🏫 <b>Colegio Agape</b> — Landing page' + linkBtn('https://colegioagape.onrender.com', 'Ver site') + '<br>🎨 <b>Showcase</b> — Todos os modelos' + linkBtn('https://vitrinebio.onrender.com/showcase.html', 'Ver todos') + '<br><br>⏳ Academia FitPro e Advocacia Souza — Em breve<br><br>' + wppBtn('Quero um site como esses!')
    },
    {
      id: 'manutencao',
      keywords: 'manutencao trocar alterar mudar atualizar ajuste arrumar consertar modificar mexer',
      resposta: '🛠️ <b>Manutencoes avulsas:</b><br>🔧 WhatsApp/link/texto: R$ 40<br>🖼️ Imagem/banner: R$ 50<br>🔘 Botao/icone: R$ 40<br>🖼️ Galeria (10 fotos): R$ 100<br>📄 Pagina extra: R$ 250<br>🌐 Dominio: R$ 80<br><br>📦 <b>Pacote mensal:</b> R$ 200 (ate 5 alteracoes)<br><br>So paga quando precisar!' + wppBtn('Preciso de manutencao!')
    },
    {
      id: 'prazo',
      keywords: 'prazo demora dias entrega rapido urgente tempo quando fica pronto agilidade',
      resposta: '⏱️ <b>Prazos de entrega:</b><br>📱 Bio Simples: 48h<br>📱 Bio Premium/Empresarial: 3-5 dias<br>🎯 Landing: 72h<br>📄 2 pags: 96h<br>🏢 Institucional: 7 dias<br>🛒 E-commerce: sob consulta<br><br>Se for urgente, me avisa que vejo como acelerar!' + wppBtn('Tenho urgencia!')
    },
    {
      id: 'garantia',
      keywords: 'garantia devolucao reembolso nao gostar arrepender 7 dias dinheiro volta',
      resposta: '✅ <b>Garantia de 7 dias.</b> Se nao gostar do resultado, devolvo 100% do seu dinheiro. Sem burocracia. O risco e todo meu.' + wppBtn('Quero saber mais!')
    },
    {
      id: 'pagamento',
      keywords: 'pagamento pagar cartao pix transferencia parcela sinal forma 50%',
      resposta: '💳 <b>Forma de pagamento:</b> 50% no inicio e 50% na entrega (apos aprovar). Aceito Pix e transferencia. Pagamento unico, sem mensalidades.' + wppBtn('Quero fechar!')
    },
    {
      id: 'processo',
      keywords: 'como funciona processo etapas metodo passo fluxo como e',
      resposta: '🔄 <b>Processo em 4 etapas:</b><br>1️⃣ Brief — Entendo seu negocio (WhatsApp, 30min)<br>2️⃣ Design — Layout mobile-first aprovado por voce<br>3️⃣ Code — Codigo limpo, SEO, WhatsApp<br>4️⃣ Go — Deploy, dominio e site no ar!<br><br>✅ Garantia 7 dias • Suporte 15 dias' + wppBtn('Vamos comecar!')
    },
    {
      id: 'dominio',
      keywords: 'dominio url www dns com.br registro dominio proprio',
      resposta: '🌐 <b>Dominio:</b> Se ja tiver, configuro <b>gratis</b>! Se nao tiver, registro por <b>R$ 80</b> (.com.br, .com). Tambem pode usar subdominio gratuito.' + wppBtn('Quero configurar dominio!')
    },
    {
      id: 'hospedagem',
      keywords: 'hospedagem hospedar servidor site ar publicar online fica ar',
      resposta: '✅ <b>Hospedagem inclusa</b> em todos os planos. Seu site fica no ar 24h por dia, sem custo mensal. Pagamento unico.' + wppBtn('Quero meu site no ar!')
    },
    {
      id: 'seo',
      keywords: 'seo google ranquear aparecer primeira pagina busca organico indexar pesquisa',
      resposta: '🔍 <b>SEO incluso em todos os planos.</b> Otimizacao para Google, Google Meu Negocio e buscas locais. Palavras-chave, meta tags, sitemap — tudo configurado.' + wppBtn('Quero ranquear no Google!')
    },
    {
      id: 'sobre',
      keywords: 'quem samuel desenvolvedor dono fundador sobre voce quem faz contato instagram github',
      resposta: '👨‍💻 <b>Samuel Pena</b> — Full Stack em Trairi-CE. Sites rapidos, que ranqueiam e convertem.<br><br>📞 WhatsApp: ' + wppBtn('Ola Samuel!') + '<br>📸 Instagram: <a href="https://instagram.com/sml_developer" target="_blank" style="color:var(--cyan);">@sml_developer</a><br>💻 GitHub: <a href="https://github.com/sml-pn" target="_blank" style="color:var(--cyan);">sml-pn</a><br>🌐 Site: <a href="https://sml-developer.onrender.com" target="_blank" style="color:var(--cyan);">sml-developer.onrender.com</a>'
    },
    {
      id: 'localizacao',
      keywords: 'onde fica localizacao trairi ceara atende remoto cidade estado brasil',
      resposta: '📍 Fico em <b>Trairi, Ceara</b>, mas atendo <b>100% online para todo o Brasil</b>. Tudo via WhatsApp, rapido e sem burocracia.' + wppBtn('Atende minha cidade?')
    },
    {
      id: 'contato',
      keywords: 'whatsapp falar conversar ligar telefone contato zap chamar humano pessoa atendente',
      resposta: '📞 Me chama no WhatsApp que respondo em ate 2h:' + wppBtn('Ola! Vim pelo chat.') + '<br><br>📸 Instagram: <a href="https://instagram.com/sml_developer" target="_blank" style="color:var(--cyan);">@sml_developer</a><br>💻 GitHub: <a href="https://github.com/sml-pn" target="_blank" style="color:var(--cyan);">sml-pn</a>'
    },
    {
      id: 'wordpress',
      keywords: 'wordpress elementor wix template cms site pronto',
      resposta: '❌ Nao trabalho com WordPress, Elementor ou Wix. Faco tudo em <b>codigo puro</b> — mais rapido, mais seguro e sem plugins. Performance 95+!' + linkBtn('https://ameicetim.onrender.com', 'Exemplo') + wppBtn('Quero site rapido!')
    },
    {
      id: 'sistema',
      keywords: 'sistema web erp agendamento agenda gestao dashboard painel controle',
      resposta: '💻 <b>Sistemas web:</b> Crio sistemas de agendamento, gestao e dashboards. Exemplo: Academia FitPro (em desenvolvimento). Valor sob consulta.' + wppBtn('Quero orcamento de sistema!')
    },
    {
      id: 'servicos',
      keywords: 'servicos oferece tipos trabalha quais sao o que faz',
      resposta: '🚀 <b>Servicos SML/PN:</b><br>📱 Vitrine Bio (R$97 a R$497)<br>🎯 Landing Pages (R$550)<br>📄 Sites 2 pags (R$700)<br>🏢 Institucionais (R$1.000)<br>🛒 E-commerce (sob consulta)<br>🔍 SEO Local<br>🛠️ Manutencao<br><br>Todos com hospedagem inclusa e garantia de 7 dias.' + linkBtn('https://vitrinebio.onrender.com/showcase.html', 'Ver modelos') + wppBtn('Quero contratar!')
    },
    {
      id: 'diferenciais',
      keywords: 'diferencial vantagem por que escolher diferente',
      resposta: '✨ <b>Diferenciais SML/PN:</b><br>• WhatsApp Multi (ate 3 numeros)<br>• Mapa de localizacao<br>• Efeitos profissionais<br>• Design responsivo<br>• Cores personalizadas<br>• Fontes exclusivas<br>• Performance 95+<br>• SEO Local<br>• Hospedagem inclusa<br>• Garantia 7 dias<br>• Pagamento unico' + wppBtn('Quero saber mais!')
    },
    {
      id: 'agradecimento',
      keywords: 'obrigado valeu brigado thanks vlw grato obrigada',
      resposta: 'Disponha! 😊 Estou a disposicao no WhatsApp quando precisar.' + wppBtn('Preciso de mais ajuda!')
    }
  ];

  function tokenize(text) {
    return text.toLowerCase()
      .replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e')
      .replace(/[ìíîï]/g,'i').replace(/[òóôõö]/g,'o')
      .replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c')
      .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()
      .split(' ').filter(function(w){ return w.length > 1; });
  }

  function search(query) {
    var qTokens = tokenize(query);
    var bestScore = 0, bestDoc = null;
    
    for (var i = 0; i < docs.length; i++) {
      var doc = docs[i];
      var kTokens = tokenize(doc.keywords);
      var score = 0;
      
      for (var j = 0; j < qTokens.length; j++) {
        for (var k = 0; k < kTokens.length; k++) {
          if (qTokens[j] === kTokens[k]) {
            score += 10;
          } else if (kTokens[k].indexOf(qTokens[j]) !== -1 && qTokens[j].length > 2) {
            score += 5;
          }
        }
      }
      
      if (doc.keywords.indexOf(query.toLowerCase()) !== -1) {
        score += 20;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestDoc = doc;
      }
    }
    
        if (bestDoc && bestScore > 3) {
      trackEvent('chat_intent_' + bestDoc.id, { intent: bestDoc.id, score: bestScore });
      return bestDoc.resposta;
    }
    return null;
  }

  return { search: search, docs: docs };
})();
