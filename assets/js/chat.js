/* ==================== CHAT SML BOT - COMPLETO ==================== */
(function() {
  var chatFab = document.getElementById('chatFab');
  var chatOverlay = document.getElementById('chatOverlay');
  var chatClose = document.getElementById('chatClose');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) {
    console.log('Chat: elementos nao encontrados');
    return;
  }

  console.log('Chat SML Bot iniciado');

  // Histórico e interesses
  var conversationHistory = [];
  var userInterests = [];

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  // ============ RESUMO INTELIGENTE PARA WHATSAPP ============
  function getConversationSummary() {
    if (conversationHistory.length === 0) {
      return 'Ola Samuel! Um cliente abriu o chat no site SML/PN e gostaria de tirar algumas duvidas.';
    }
    
    var ultimaPergunta = '';
    for (var i = 0; i < conversationHistory.length; i++) {
      if (conversationHistory[i].type === 'user') {
        ultimaPergunta = conversationHistory[i].text;
      }
    }
    
    var msg = 'Ola Samuel! Cliente veio pelo chat do site SML/PN. ';
    
    if (userInterests.length === 1) {
      msg += 'Interesse em ' + userInterests[0] + '. ';
    } else if (userInterests.length > 1) {
      msg += 'Interesse em ' + userInterests.join(', ') + '. ';
    }
    
    msg += 'Gostaria de tirar mais algumas duvidas.';
    
    if (msg.length > 250) msg = msg.substring(0, 250);
    return msg;
  }

  // ============ DETECTA INTERESSES ============
  function detectInterest(text) {
    var interests = {
      'vitrine': 'Vitrine Bio',
      'preco': 'Precos',
      'quanto': 'Precos',
      'landing': 'Landing Page',
      'site': 'Site',
      'ecommerce': 'E-commerce',
      'loja': 'E-commerce',
      'chat': 'Chat RAG',
      'rag': 'Chat RAG',
      'manutencao': 'Manutencao',
      'portfolio': 'Portfolio',
      'projeto': 'Portfolio'
    };
    var lower = text.toLowerCase();
    for (var key in interests) {
      if (lower.indexOf(key) !== -1 && userInterests.indexOf(interests[key]) === -1) {
        userInterests.push(interests[key]);
      }
    }
  }

  // ============ UI ============
  function addBubble(text, type) {
    var b = document.createElement('div');
    b.className = 'chat-bubble ' + type;
    if (type === 'user') {
      b.textContent = text;
      conversationHistory.push({ type: 'user', text: text, time: new Date() });
      detectInterest(text);
    } else {
      b.innerHTML = text;
      conversationHistory.push({ type: 'assistant', text: text, time: new Date() });
    }
    chatMessages.appendChild(b);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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

  // ============ RESPOSTA ============
  function botReply(msg) {
    showTyping();
    setTimeout(function() {
      removeTyping();
      var resp = (typeof SMLEngine !== 'undefined') ? SMLEngine.search(msg) : null;
      if (resp) {
        addBubble(resp, 'assistant');
      } else {
        addBubble(
          'Desculpe, nao entendi. Posso ajudar com precos, planos, prazos ou portfolio.<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(getConversationSummary()) + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>',
          'assistant'
        );
      }
    }, 500 + Math.random() * 800);
  }

  // ============ ENVIO ============
  function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) {
      addBubble("Mensagem muito longa! Resuma para eu ajudar melhor.", 'assistant');
      return;
    }
    addBubble(text, 'user');
    trackEvent('chat_message', { message_length: text.length });
    chatInput.value = '';
    chatInput.focus();
    botReply(text);
  }

  // ============ ABRIR/FECHAR ============
  function openChat() {
    chatOverlay.classList.add('open');
    chatFab.classList.add('hidden');
    chatInput.focus();
    trackEvent('chat_open');
  }

  function closeChat() {
    chatOverlay.classList.remove('open');
    chatFab.classList.remove('hidden');
  }

  // ============ EVENTOS ============
  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', closeChat);
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
  chatOverlay.addEventListener('click', function(e) {
    if (e.target === chatOverlay) closeChat();
  });

  console.log('Chat pronto! Historico e resumo WhatsApp ativos.');
})();
