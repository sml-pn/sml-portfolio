(function() {
  var chatFab = document.getElementById('chatFab');
  var chatOverlay = document.getElementById('chatOverlay');
  var chatClose = document.getElementById('chatClose');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  var conversationHistory = [];
  var userInterests = [];

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  function getConversationSummary() {
    if (conversationHistory.length === 0) return 'Ola Samuel! Um cliente abriu o chat no site SML/PN.';
    var msg = 'Ola Samuel! Cliente veio pelo chat SML/PN. ';
    if (userInterests.length > 0) msg += 'Interesse em ' + userInterests.join(', ') + '. ';
    msg += 'Gostaria de tirar mais duvidas.';
    return msg.substring(0, 250);
  }

  function detectInterest(text) {
    var interests = {
      'vitrine':'Vitrine Bio','preco':'Precos','landing':'Landing Page',
      'site':'Site','ecommerce':'E-commerce','loja':'E-commerce',
      'chat':'Chat RAG','manutencao':'Manutencao','portfolio':'Portfolio',
      'modelo':'Vitrine Bio','institucional':'Site Institucional'
    };
    var lower = text.toLowerCase();
    for (var key in interests) {
      if (lower.indexOf(key) !== -1 && userInterests.indexOf(interests[key]) === -1) {
        userInterests.push(interests[key]);
      }
    }
  }

  function addBubble(text, type) {
    var b = document.createElement('div');
    b.className = 'chat-bubble ' + type;
    if (type === 'user') { b.textContent = text; conversationHistory.push({type:'user',text:text}); detectInterest(text); }
    else { b.innerHTML = text; conversationHistory.push({type:'assistant',text:text}); }
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

  function removeTyping() { var t = document.getElementById('typingIndicator'); if(t) t.remove(); }

  function botReply(msg) {
    showTyping();
    setTimeout(function() {
      removeTyping();
      var resp = (typeof SMLEngine !== 'undefined') ? SMLEngine.search(msg) : null;
      if (resp) { addBubble(resp, 'assistant'); }
      else {
        addBubble('Desculpe, nao entendi. Posso ajudar com precos, planos ou portfolio.<br><br><a href="https://wa.me/558586121078?text=' + encodeURIComponent(getConversationSummary()) + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>', 'assistant');
      }
    }, 500 + Math.random() * 800);
  }

  function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) { addBubble("Mensagem muito longa! Resuma.", 'assistant'); return; }
    addBubble(text, 'user');
    trackEvent('chat_message', { message_length: text.length });
    chatInput.value = ''; chatInput.focus();
    botReply(text);
  }

  function openChat() { chatOverlay.classList.add('open'); chatFab.classList.add('hidden'); chatInput.focus(); trackEvent('chat_open'); }
  function closeChat() { chatOverlay.classList.remove('open'); chatFab.classList.remove('hidden'); }

  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', closeChat);
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
})();

// Persistência entre páginas (adicionado com segurança)
(function() {
  var ov = document.getElementById('chatOverlay');
  var fab = document.getElementById('chatFab');
  var close = document.getElementById('chatClose');
  if (!ov || !fab) return;

  // Restaurar estado ao carregar
  if (sessionStorage.getItem('chatOpen') === 'true') {
    ov.classList.add('open');
    fab.classList.add('hidden');
  }

  // Salvar estado ao interagir
  fab.addEventListener('click', function() {
    sessionStorage.setItem('chatOpen', 'true');
  });
  if (close) {
    close.addEventListener('click', function() {
      sessionStorage.setItem('chatOpen', 'false');
    });
  }
})();
