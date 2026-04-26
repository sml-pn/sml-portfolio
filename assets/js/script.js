// Menu mobile com animação hambúrguer
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            menuBtn.classList.add('active');
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        } else {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });
}

// Fechar menu ao clicar nos links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto';
            menuOpen = false;
        }
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Fechar menu mobile se estiver aberto
        if (menuOpen) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'auto';
            menuOpen = false;
        }
    });
});

// Formulário de contato
const form = document.getElementById('form-contato');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = form.querySelector('input[placeholder="Seu nome"]')?.value;
        const email = form.querySelector('input[placeholder="Seu e-mail"]')?.value;
        const mensagem = form.querySelector('textarea')?.value;
        
        if (nome && email && mensagem) {
            alert(`🚀 Obrigado ${nome}! Sua mensagem foi enviada com sucesso.\n\nEntrarei em contato em breve.`);
            form.reset();
        } else {
            alert('⚠️ Por favor, preencha todos os campos.');
        }
    });
}

// Detectar seção visível no scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Log de carregamento
console.log('✅ Portfolio SML Developer carregado com sucesso!');
console.log('🚀 Site disponível em: https://sml-developer.onrender.com');
