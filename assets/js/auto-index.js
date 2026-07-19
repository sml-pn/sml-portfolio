/* ==================== AUTO-INDEX: Aprende com o conteúdo da página ==================== */
(function() {
  // Espera a página carregar
  window.addEventListener('DOMContentLoaded', function() {
    
    // Coleta todo texto visível da página
    var pageText = document.body.innerText || '';
    
    // Extrai informações importantes
    var dados = {
      titulo: document.title || '',
      descricao: document.querySelector('meta[name="description"]')?.content || '',
      h1: document.querySelector('h1')?.innerText || '',
      servicos: [],
      contato: '',
      sobre: ''
    };
    
    // Pega a seção de serviços
    var servicosSection = document.querySelector('#servicos');
    if (servicosSection) {
      var cards = servicosSection.querySelectorAll('.service-card');
      cards.forEach(function(card) {
        dados.servicos.push(card.innerText.trim());
      });
    }
    
    // Pega a seção sobre
    var sobreSection = document.querySelector('#sobre');
    if (sobreSection) {
      dados.sobre = sobreSection.innerText.trim().substring(0, 500);
    }
    
    // Pega links de contato
    var whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    if (whatsappLinks.length > 0) {
      dados.contato = whatsappLinks[0].href;
    }
    
    console.log('📚 Conteúdo indexado da página:', {
      servicos: dados.servicos.length + ' serviços',
      sobre: dados.sobre.length + ' caracteres',
      contato: dados.contato ? 'WhatsApp encontrado' : 'Não encontrado'
    });
    
    // Disponibiliza para o SMLEngine usar
    window.pageData = dados;
  });
})();
