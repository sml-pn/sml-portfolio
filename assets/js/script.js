document.addEventListener('DOMContentLoaded', () => {
    // Função para inicializar ícones
    function initLucide() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Inicializa múltiplas vezes para garantir
    initLucide();
    setTimeout(initLucide, 100);
    setTimeout(initLucide, 500);
    setTimeout(initLucide, 1000);

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const cursorGlow = document.getElementById('cursor-glow');
    const codeContainer = document.getElementById('code-lines');
    const formContato = document.getElementById('form-contato');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        menuBtn?.classList.add('active');
        mobileMenu?.classList.remove('hidden');
        mobileMenu?.classList.add('flex');
        document.body.style.overflow = 'hidden';
        setTimeout(initLucide, 100);
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

    if (cursorGlow && window.innerWidth >= 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursorGlow.style.opacity = '1');
    }

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

    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = formContato.querySelector('input[type="text"]')?.value || '';
            const email = formContato.querySelector('input[type="email"]')?.value || '';
            const mensagem = formContato.querySelector('textarea')?.value || '';
            if (nome && email && mensagem) {
                const btn = formContato.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Enviando...';
                btn.disabled = true;
                initLucide();
                setTimeout(() => {
                    alert('🚀 Obrigado ' + nome + '!\n\nSua mensagem foi enviada com sucesso.\nEntrarei em contato em breve pelo e-mail: ' + email);
                    formContato.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    initLucide();
                }, 1500);
            } else {
                alert('⚠️ Por favor, preencha todos os campos corretamente.');
            }
        });
    }

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    if (codeContainer) {
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
            '        "React", "Node.js", "Tailwind",',
            '        "MongoDB", "Express", "TypeScript"',
            '    ],',
            '    status: "Disponível para projetos"',
            '});',
            '',
            'sml.iniciarPortfolio();',
            '',
            'console.log("🚀 Portfólio carregado com sucesso!");',
            'console.log("💻 Vamos construir algo incrível!");',
            'console.log("📩 Contato: sml-developer.onrender.com");'
        ];
        let lineIndex = 0, charIndex = 0, isTyping = false;

        function highlightSyntax(text) {
            return text
                .replace(/(\/\/.*$)/gm, m => '<span class="comment">' + m + '</span>')
                .replace(/\b(const|let|class|function|return|new|import|export|default)\b/g, m => '<span class="keyword">' + m + '</span>')
                .replace(/(["'`].*?["'`])/g, m => '<span class="string">' + m + '</span>')
                .replace(/\b(console|log|iniciarPortfolio)\b/g, m => '<span class="function">' + m + '</span>')
                .replace(/\b(nome|localizacao|cargo|tecnologias|status)\b/g, m => '<span class="property">' + m + '</span>');
        }

        function typeCode() {
            if (!codeContainer || isTyping) return;
            isTyping = true;
            if (lineIndex >= codeToType.length) {
                setTimeout(() => { codeContainer.innerHTML = ''; lineIndex = 0; charIndex = 0; isTyping = false; typeCode(); }, 5000);
                return;
            }
            const targetLine = codeToType[lineIndex];
            if (charIndex === 0) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.id = 'line-' + lineIndex;
                codeContainer.appendChild(lineDiv);
                // scrollIntoView removido para evitar scroll automático
            }
            if (charIndex < targetLine.length) {
                const lineDiv = document.getElementById('line-' + lineIndex);
                if (lineDiv) lineDiv.innerHTML = highlightSyntax(targetLine.substring(0, charIndex + 1));
                charIndex++;
                setTimeout(() => { isTyping = false; typeCode(); }, 30);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(() => { isTyping = false; typeCode(); }, 200);
            }
        }
        setTimeout(typeCode, 1000);
    }

    console.log('%c✅ SML Developer Portfolio %ccarregado!', 'color: #00ffff; font-size: 16px;', 'color: #ff00ff;');
    console.log('%c🚀 Site: %chttps://sml-developer.onrender.com', 'color: #ff00ff;', 'color: #00ffff;');
    console.log('%c💻 Pronto para novos projetos!', 'color: #50fa7b;');
});

// ============================================
// SINCRONIZAR PROJETOS DO PAINEL
// ============================================
function carregarProjetosDoPainel() {
    const container = document.getElementById('projetos-container');
    if (!container) return;
    
    // Buscar projetos do localStorage do painel
    const projetos = JSON.parse(localStorage.getItem('sml-projetos') || '[]');
    
    // Se não houver projetos cadastrados, manter os padrões
    if (projetos.length === 0) {
        container.innerHTML = `
            <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
                <div class="h-48 bg-gradient-to-br from-neon to-neon-pink rounded-lg mb-4 flex items-center justify-center">
                    <i data-lucide="box" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2"><i data-lucide="folder-git-2" class="inline w-5 md:w-6 h-5 md:h-6 mr-2 text-neon"></i>Portfolio 3D Interativo</h3>
                <p class="text-gray-400 text-sm md:text-base mb-4">Site com efeitos 3D e animações fluidas</p>
                <div class="flex flex-wrap gap-2 mb-4"><span class="px-3 py-1 bg-neon/20 rounded-full text-xs">Three.js</span><span class="px-3 py-1 bg-neon/20 rounded-full text-xs">Tailwind</span><span class="px-3 py-1 bg-neon/20 rounded-full text-xs">GSAP</span></div>
                <a href="#" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1">Ver mais <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
            </div>
            <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
                <div class="h-48 bg-gradient-to-br from-neon-pink to-neon-purple rounded-lg mb-4 flex items-center justify-center">
                    <i data-lucide="cloud-cog" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2"><i data-lucide="folder-git-2" class="inline w-5 md:w-6 h-5 md:h-6 mr-2 text-neon"></i>API REST Completa</h3>
                <p class="text-gray-400 text-sm md:text-base mb-4">Backend com autenticação JWT e Swagger</p>
                <div class="flex flex-wrap gap-2 mb-4"><span class="px-3 py-1 bg-neon-pink/20 rounded-full text-xs">Node.js</span><span class="px-3 py-1 bg-neon-pink/20 rounded-full text-xs">Express</span><span class="px-3 py-1 bg-neon-pink/20 rounded-full text-xs">MongoDB</span></div>
                <a href="#" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1">Ver mais <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }
    
    // Gerar cards a partir dos projetos cadastrados
    container.innerHTML = projetos.map(proj => `
        <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
            <div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg mb-4 flex items-center justify-center">
                <i data-lucide="${proj.icone}" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
            </div>
            <h3 class="text-lg md:text-xl font-bold mb-2">
                <i data-lucide="folder-git-2" class="inline w-5 md:w-6 h-5 md:h-6 mr-2 text-neon"></i>${proj.titulo}
            </h3>
            <p class="text-gray-400 text-sm md:text-base mb-4">${proj.descricao}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${proj.tecnologias.split(',').map(t => `<span class="px-3 py-1 ${proj.bg_tag} rounded-full text-xs">${t.trim()}</span>`).join('')}
            </div>
            <a href="${proj.link || '#'}" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1">
                Ver mais <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Carregar ao iniciar
document.addEventListener('DOMContentLoaded', carregarProjetosDoPainel);
