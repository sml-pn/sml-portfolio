// Código que vai ser digitado automaticamente (estilo VS Code)
const codeToType = [
    '// SML Developer - Portfolio Profissional',
    '// Desenvolvedor Web | Trairi-CE',
    '',
    'import { WebDeveloper, Projeto, Tecnologia } from "./modules/skills.js";',
    '',
    '// Minhas informações profissionais',
    'const sml = new WebDeveloper({',
    '    nome: "SML Developer",',
    '    localizacao: "Trairi-CE",',
    '    cargo: "Web Developer Full Stack",',
    '    experiencia: "3+ anos",',
    '    tecnologias: [',
    '        "HTML5", "CSS3", "JavaScript",',
    '        "React", "Node.js", "Express",',
    '        "Python", "Django", "MongoDB",',
    '        "Tailwind CSS", "Git", "GitHub"',
    '    ]',
    '});',
    '',
    '// Classe base para projetos',
    'class Portfolio {',
    '    constructor(nome, descricao, tecnologias, link) {',
    '        this.nome = nome;',
    '        this.descricao = descricao;',
    '        this.tecnologias = tecnologias;',
    '        this.link = link;',
    '        this.dataCriacao = new Date();',
    '    }',
    '',
    '    exibirInfo() {',
    '        return `',
    '            📁 Projeto: ${this.nome}',
    '            📝 Descrição: ${this.descricao}',
    '            🛠️ Tecnologias: ${this.tecnologias.join(", ")}',
    '            🔗 Link: ${this.link}',
    '        `;',
    '    }',
    '',
    '    renderizarCard() {',
    '        return `',
    '            <div class="projeto-card">',
    '                <h3>${this.nome}</h3>',
    '                <p>${this.descricao}</p>',
    '                <div class="tech-tags">',
    '                    ${this.tecnologias.map(tech => `<span>${tech}</span>`).join("")}',
    '                </div>',
    '                <a href="${this.link}">Ver projeto →</a>',
    '            </div>',
    '        `;',
    '    }',
    '}',
    '',
    '// Meus projetos reais',
    'const projetos = [',
    '    new Portfolio(',
    '        "Portfolio 3D Interativo",',
    '        "Site profissional com efeitos 3D e animações futuristas",',
    '        ["Three.js", "Tailwind CSS", "JavaScript"],',
    '        "https://github.com/sml-pn/portfolio-3d"',
    '    ),',
    '    new Portfolio(',
    '        "API REST Completa",',
    '        "Backend escalável com autenticação JWT e integração com MongoDB",',
    '        ["Node.js", "Express", "MongoDB", "JWT"],',
    '        "https://github.com/sml-pn/api-rest"',
    '    ),',
    '    new Portfolio(',
    '        "E-commerce Moderno",',
    '        "Loja virtual com carrinho de compras, pagamentos e dashboard admin",',
    '        ["React", "Redux", "Stripe", "Firebase"],',
    '        "https://github.com/sml-pn/ecommerce"',
    '    )',
    '];',
    '',
    '// Função para listar todos os projetos',
    'function listarProjetos() {',
    '    console.log("=== MEUS PROJETOS ===\\n");',
    '    projetos.forEach((projeto, index) => {',
    '        console.log(`Projeto ${index + 1}:`);',
    '        console.log(projeto.exibirInfo());',
    '        console.log("-".repeat(50));',
    '    });',
    '    console.log(`Total de projetos: ${projetos.length}`);',
    '}',
    '',
    '// Inicializar portfolio',
    'sml.init();',
    'listarProjetos();',
    '',
    '// Exportar módulos (simulação)',
    'export { sml, projetos, Portfolio };',
    '',
    '// Status de desenvolvimento',
    'console.log("✅ Portfólio carregado com sucesso!");',
    'console.log("🚀 Site disponível em: https://sml-developer.onrender.com");',
    'console.log("📧 Contato: sml.developer@email.com");'
];

// Variáveis de controle da digitação
let lineIndex = 0;
let charIndex = 0;
let currentLine = '';
const container = document.getElementById('code-lines');
let isTyping = true;

// Função principal de digitação
function typeCode() {
    if (!isTyping || !container) return;
    
    if (lineIndex >= codeToType.length) {
        // Quando terminar, esperar 8 segundos e recomeçar
        setTimeout(() => {
            container.innerHTML = '';
            lineIndex = 0;
            charIndex = 0;
            typeCode();
        }, 8000);
        return;
    }
    
    const targetLine = codeToType[lineIndex];
    
    if (charIndex === 0) {
        currentLine = '';
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        lineDiv.id = `line-${lineIndex}`;
        container.appendChild(lineDiv);
        // Scroll automático para a última linha
        lineDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    if (charIndex < targetLine.length) {
        currentLine += targetLine[charIndex];
        const lineDiv = document.getElementById(`line-${lineIndex}`);
        if (lineDiv) {
            // Destacar sintaxe de código
            let highlighted = currentLine;
            
            // Destaque para comentários
            highlighted = highlighted.replace(/(\/\/.*)$/gm, match => `<span class="comment">${match}</span>`);
            
            // Destaque para palavras-chave
            const keywords = ['class', 'const', 'let', 'function', 'return', 'new', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'extends', 'super', 'this', 'typeof', 'instanceof'];
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
            });
            
            // Destaque para funções
            highlighted = highlighted.replace(/(\w+(?=\())/g, match => `<span class="function">${match}</span>`);
            
            // Destaque para strings
            highlighted = highlighted.replace(/(["'].*?["'])/g, match => `<span class="string">${match}</span>`);
            
            // Destaque para números
            highlighted = highlighted.replace(/\b(\d+)\b/g, match => `<span class="number">${match}</span>`);
            
            // Destaque para propriedades de objeto
            highlighted = highlighted.replace(/(\w+)(?=\s*:)/g, match => `<span class="property">${match}</span>`);
            
            lineDiv.innerHTML = highlighted;
        }
        charIndex++;
        // Velocidade variável para parecer mais humano
        const delay = 30 + Math.random() * 40;
        setTimeout(typeCode, delay);
    } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 150);
    }
}

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
            // Fechar menu mobile se estiver aberto
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Formulário de contato
const form = document.getElementById('form-contato');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = form.querySelector('input[placeholder="Seu nome"]').value;
        const email = form.querySelector('input[placeholder="Seu e-mail"]').value;
        const mensagem = form.querySelector('textarea').value;
        
        if (nome && email && mensagem) {
            alert(`🚀 Obrigado ${nome}! Sua mensagem foi enviada com sucesso.\n\nEntrarei em contato em breve no e-mail: ${email}`);
            form.reset();
        } else {
            alert('⚠️ Por favor, preencha todos os campos.');
        }
    });
}

// Iniciar a digitação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        typeCode();
    }, 500);
});

// Adicionar classe de visibilidade nas seções ao scroll
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

// Efeito de digitação no título principal (opcional)
const mainTitle = document.querySelector('.animate-pulse');
if (mainTitle && mainTitle.innerText === 'SML Developer') {
    // Pode ativar um efeito de digitação no título se quiser
    console.log('Título principal carregado');
}
