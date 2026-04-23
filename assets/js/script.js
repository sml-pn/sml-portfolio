// Cursor personalizado
const cursor = document.getElementById('cursor-glow');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Menu mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });
});

// Animação fade-in ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação nos elementos
document.querySelectorAll('#projetos .bg-white\\/5, #sobre, #contato, .grid > div').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    }
});

// Formulário de contato
const form = document.getElementById('form-contato');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pegar valores
        const nome = form.querySelector('input[placeholder="Seu nome"]').value;
        const email = form.querySelector('input[placeholder="Seu e-mail"]').value;
        const mensagem = form.querySelector('textarea').value;
        
        // Simular envio
        if (nome && email && mensagem) {
            alert(`🚀 Obrigado ${nome}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
            form.reset();
        } else {
            alert('⚠️ Por favor, preencha todos os campos.');
        }
    });
}

// Efeito de digitação no título (opcional)
const titulo = document.querySelector('.animate-pulse');
if (titulo) {
    const textoOriginal = titulo.innerText;
    titulo.innerText = '';
    let i = 0;
    
    function typeWriter() {
        if (i < textoOriginal.length) {
            titulo.innerText += textoOriginal.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Descomente se quiser o efeito de digitação
    // typeWriter();
}

// Scroll suave para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Detectar quando o usuário sai da página (para analytics)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Usuário saiu da página');
    } else {
        console.log('Usuário voltou para a página');
    }
});
