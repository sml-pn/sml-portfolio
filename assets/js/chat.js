(function() {
  var chatFab = document.getElementById('chatFab');
  var chatOverlay = document.getElementById('chatOverlay');
  var chatClose = document.getElementById('chatClose');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');

  if (!chatFab || !chatOverlay || !chatMessages || !chatInput || !chatSend || !chatClose) return;

  function trackEvent(n, p) {
    p = p || {};
    if (typeof gtag !== 'undefined') gtag('event', n, p);
  }

  var L = {
    showcase: 'https://vitrinebio.onrender.com/showcase.html',
    vitrinebio: 'https://vitrinebio.onrender.com',
    ameicetim: 'https://ameicetim.onrender.com',
    halison: 'https://halison-henry.onrender.com',
    colegioagape: 'https://colegioagape.onrender.com',
    portfolio: 'https://sml-developer.onrender.com',
    whatsapp: 'https://wa.me/558586121078'
  };

  function wppBtn(t) {
    return '<br><br><a href="' + L.whatsapp + '?text=' + encodeURIComponent(t || 'Ola Samuel!') + '" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:14px 24px;border-radius:999px;font-weight:600;text-decoration:none;margin-top:8px;font-size:15px;"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>';
  }

  function quickBtns() {
    return '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">' +
      '<button class="qr-btn" data-q="Quanto custa?" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Precos</button>' +
      '<button class="qr-btn" data-q="Me mostra os modelos" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Modelos</button>' +
      '<button class="qr-btn" data-q="Quero ver o portfolio" style="background:rgba(0,245,255,0.12);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:6px 12px;color:var(--cyan);cursor:pointer;font-size:11px;">Portfolio</button>' +
      '<button class="qr-btn-wpp" style="background:rgba(37,211,102,0.2);border:1px solid rgba(37,211,102,0.3);border-radius:16px;padding:6px 12px;color:#25D366;cursor:pointer;font-size:11px;">WhatsApp</button>' +
      '</div>';
  }

  var ctx = { count: 0 };

  function addBubble(text, type) {
    var b = document.createElement('div');
    b.className = 'chat-bubble ' + type;
    if (type === 'user') b.textContent = text;
    else b.innerHTML = text;
    chatMessages.appendChild(b);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (type === 'assistant') {
      setTimeout(function() {
        b.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            var h = this.getAttribute('href');
            if (h && h.indexOf('wa.me') !== -1) trackEvent('chat_whatsapp_click');
            else trackEvent('chat_link_click', { url: h });
          });
        });
        b.querySelectorAll('.qr-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            chatInput.value = this.getAttribute('data-q');
            sendMessage();
          });
        });
        b.querySelectorAll('.qr-btn-wpp').forEach(function(btn) {
          btn.addEventListener('click', function() {
            window.open(L.whatsapp + '?text=Ola!', '_blank');
          });
        });
      }, 100);
    }
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

  function botReply(msg) {
    showTyping();
    setTimeout(function() {
      removeTyping();
      
      // Usa o motor de busca local
      var resp = SMLEngine.search(msg);
      
      if (resp) {
        ctx.count++;
        if (ctx.count <= 2) resp += quickBtns();
        addBubble(resp, 'assistant');
      } else {
        ctx.count++;
        addBubble(
          'Desculpe, nao encontrei essa informacao. Posso ajudar com:<br><br>📱 <b>Vitrine Bio</b> (R$97-R$497)<br>🌐 <b>Sites</b> (R$550-R$1.000)<br>🛒 <b>E-commerce</b><br><br>' + wppBtn('Preciso de ajuda!') + quickBtns(),
          'assistant'
        );
      }
    }, 500 + Math.random() * 800);
  }

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

  function openChat() {
    chatOverlay.classList.add('open');
    chatInput.focus();
    trackEvent('chat_open');
  }

  chatFab.addEventListener('click', openChat);
  chatClose.addEventListener('click', function() { chatOverlay.classList.remove('open'); });
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
  chatOverlay.addEventListener('click', function(e) { if (e.target === chatOverlay) chatOverlay.classList.remove('open'); });
})();
