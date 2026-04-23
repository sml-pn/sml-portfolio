# SML Developer Portfolio

💻 **Web Developer** | 🌊 Trairi-CE

## 🛠️ Tecnologias
- Tailwind CSS
- HTML5
- JavaScript
- Font Awesome

## 🔗 Links
- Instagram: [@sml_developer](https://instagram.com/sml_developer)
- Site: [sml-developer.onrender.com](https://sml-developer.onrender.com)

## 🚀 Como rodar localmente
```bash
# Abra o arquivo index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
cat > assets/js/script.js << 'EOF'
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
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    });
});

// Animação fade-in ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('#projetos .bg-white\\/5, #sobre, #contato').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.6s';
        observer.observe(el);
    }
});

// Formulário de contato
const form = document.getElementById('form-contato');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('🚀 Mensagem enviada! Entrarei em contato em breve.');
        form.reset();
    });
}
