// ============================================
// SINCRONIZADOR DE PROJETOS - ORGANIZADO
// ============================================
(function() {
    const container = document.getElementById('projetos-container');
    if (!container) return;
    
    const projetos = JSON.parse(localStorage.getItem('sml-projetos') || '[]');
    
    if (projetos.length > 0) {
        container.innerHTML = projetos.map(proj => {
            const techs = typeof proj.tecnologias === 'string' ? 
                proj.tecnologias.split(',').map(t => t.trim()).filter(t => t) : 
                (Array.isArray(proj.tecnologias) ? proj.tecnologias : []);
            
            // Parte superior do card (imagem ou ícone)
            let topoCard = '';
            if (proj.tipo === 'imagem' && proj.imagem_url) {
                topoCard = `
                    <img src="${proj.imagem_url}" alt="${proj.titulo}" 
                         class="w-full h-48 object-cover rounded-lg" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg items-center justify-center" style="display:none">
                        <i data-lucide="${proj.icone || 'image'}" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                    </div>`;
            } else {
                topoCard = `
                    <div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg flex items-center justify-center">
                        <i data-lucide="${proj.icone || 'box'}" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                    </div>`;
            }
            
            // Tecnologias estilizadas
            const tagsHTML = techs.length > 0 ? 
                techs.map(t => `<span class="px-3 py-1 ${proj.bgTag || 'bg-neon/20'} rounded-full text-xs font-medium">${t}</span>`).join(' ') : 
                '';
            
            return `
                <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
                    
                    <!-- IMAGEM OU ÍCONE -->
                    ${topoCard}
                    
                    <!-- NOME DO PROJETO -->
                    <h3 class="text-lg md:text-xl font-bold mt-4 mb-3 text-white">
                        ${proj.titulo}
                    </h3>
                    
                    <!-- DESCRIÇÃO -->
                    <p class="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                        ${proj.descricao}
                    </p>
                    
                    <!-- TECNOLOGIAS -->
                    ${techs.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${tagsHTML}
                    </div>` : ''}
                    
                    <!-- LINK -->
                    ${proj.link ? `
                    <a href="${proj.link}" target="_blank" rel="noopener noreferrer" 
                       class="text-neon hover:underline inline-flex items-center gap-1 font-medium text-sm">
                        🔗 Acessar projeto <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>` : ''}
                    
                </div>
            `;
        }).join('');
    }
    
    // Reinicializar ícones Lucide
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 300);
    }
})();
