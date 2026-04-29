// ============================================
// CONFIGURAÇÕES AJUSTÁVEIS
// ============================================
const CONFIG = {
    typingSpeed: 25,          // ms por caractere
    linePause: 150,           // pausa entre linhas
    restartDelay: 8000,       // tempo até reiniciar
    maxLines: 15,             // máximo de linhas visíveis
    fadeLines: true,          // fade nas linhas antigas
    cursorBlink: true,        // cursor piscante
    onlyDesktop: true,        // só aparece em desktop
    opacityOnScroll: true     // reduz opacidade ao rolar
};

// ============================================
// MENU MOBILE (mantido)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const cursorGlow = document.getElementById('cursor-glow');
    const codeContainer = document.getElementById('code-lines');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        menuBtn?.classList.add('active');
        mobileMenu?.classList.remove('hidden');
        mobileMenu?.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOpen = false;
        menuBtn?.classList.remove('active');
        mobileMenu?.classList.add('hidden');
        mobileMenu?.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    menuBtn?.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    closeMenuBtn?.addEventListener('click', closeMenu);
    document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

    // Cursor glow (desktop)
    if (cursorGlow && window.innerWidth >= 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursorGlow.style.opacity = '1');
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
                if (menuOpen) closeMenu();
            }
        });
    });

    // ============================================
    // VS CODE OVERLAY MELHORADO
    // ============================================
    if (codeContainer && (!CONFIG.onlyDesktop || window.innerWidth >= 768)) {
        const codeToType = [
            '// SML Developer - Portfolio Profissional',
            '// Desenvolvedor Web Full Stack | Trairi-CE',
            '',
            'import { WebDeveloper } from "./modules/skills.js";',
            '',
            'const sml = new WebDeveloper({',
            '    nome: "SML Developer",',
            '    localizacao: "Trairi-CE",',
            '    cargo: "Web Developer Full Stack",',
            '    tecnologias: [',
            '        "HTML5", "CSS3", "JavaScript",',
            '        "React", "Node.js", "Tailwind"',
            '    ],',
            '    status: "Disponível para projetos"',
            '});',
            '',
            'console.log("🚀 Portfólio carregado com sucesso!");'
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let lineElements = []; // guarda os elementos das linhas

        // Cursor piscante
        let cursorElement = null;
        if (CONFIG.cursorBlink) {
            cursorElement = document.createElement('span');
            cursorElement.className = 'cursor-blink';
            cursorElement.textContent = '|';
            cursorElement.style.cssText = 'color: #00ffff; animation: blink 1s step-end infinite;';
            // Adiciona animação se não existir
            if (!document.getElementById('blink-style')) {
                const style = document.createElement('style');
                style.id = 'blink-style';
                style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
                document.head.appendChild(style);
            }
        }

        function highlightSyntax(text) {
            return text
                .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
                .replace(/\b(const|let|class|function|return|new|import|export|default)\b/g, '<span class="keyword">$1</span>')
                .replace(/(".*?")/g, '<span class="string">$1</span>')
                .replace(/\b(console|log|iniciarPortfolio)\b/g, '<span class="function">$1</span>')
                .replace(/\b(nome|localizacao|cargo|tecnologias|status)\b/g, '<span class="property">$1</span>');
        }

        function typeLine() {
            if (lineIndex >= codeToType.length) {
                // Remove cursor ao final
                if (cursorElement) cursorElement.remove();
                // Reinicia após pausa
                setTimeout(() => {
                    codeContainer.innerHTML = '';
                    lineElements = [];
                    lineIndex = 0;
                    charIndex = 0;
                    typeLine();
                }, CONFIG.restartDelay);
                return;
            }

            const targetLine = codeToType[lineIndex];

            // Cria novo elemento de linha se necessário
            if (charIndex === 0) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.id = `line-${lineIndex}`;
                codeContainer.appendChild(lineDiv);
                lineElements.push(lineDiv);

                // Remove linhas antigas para manter apenas maxLines
                while (lineElements.length > CONFIG.maxLines) {
                    const old = lineElements.shift();
                    if (CONFIG.fadeLines) {
                        old.style.transition = 'opacity 0.5s';
                        old.style.opacity = '0';
                        setTimeout(() => old.remove(), 500);
                    } else {
                        old.remove();
                    }
                }
            }

            if (charIndex < targetLine.length) {
                const lineDiv = document.getElementById(`line-${lineIndex}`);
                if (lineDiv) {
                    const currentText = targetLine.substring(0, charIndex + 1);
                    lineDiv.innerHTML = highlightSyntax(currentText);
                    // Adiciona cursor piscante na última linha sendo digitada
                    if (cursorElement && lineIndex === codeToType.indexOf(targetLine)) {
                        // Remove cursor de outras linhas
                        document.querySelectorAll('.cursor-blink').forEach(el => { if (el !== cursorElement) el.remove(); });
                        lineDiv.appendChild(cursorElement);
                    }
                }
                charIndex++;
                setTimeout(typeLine, CONFIG.typingSpeed);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeLine, CONFIG.linePause);
            }
        }

        // Opacidade dinâmica ao rolar (apenas desktop)
        if (CONFIG.opacityOnScroll && window.innerWidth >= 768) {
            const overlay = document.getElementById('code-overlay');
            if (overlay) {
                window.addEventListener('scroll', () => {
                    const scrollY = window.scrollY;
                    const maxScroll = document.body.scrollHeight - window.innerHeight;
                    const opacity = Math.max(0.05, 0.2 - (scrollY / maxScroll) * 0.15);
                    overlay.style.opacity = opacity;
                }, { passive: true });
            }
        }

        setTimeout(typeLine, 1000);
    }

    // Log de carregamento
    console.log('%c✅ SML Developer Portfolio %ccarregado!', 'color: #00ffff; font-size: 16px;', 'color: #ff00ff;');
    console.log('%c🚀 Site: %chttps://sml-developer.onrender.com', 'color: #ff00ff;', 'color: #00ffff;');
    console.log('%c💻 Pronto para novos projetos!', 'color: #50fa7b;');
});
