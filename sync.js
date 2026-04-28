// ============================================
// SINCRONIZADOR DE PROJETOS - COM CATEGORIAS
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
            
            // Cores por categoria
            const coresCategoria = {
                'saúde': 'bg-red-500/20 text-red-400 border-red-500/30',
                'automotivo': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                'ecommerce': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                'financeiro': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                'educação': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                'delivery': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                'imobiliário': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                'tecnologia': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                'marketing': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
                'landing page': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
            };
            
            const cat = (proj.categoria || '').toLowerCase();
            const corCat = coresCategoria[cat] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            
            // Tag de categoria
            const categoriaTag = proj.categoria ? 
                `<span class="px-3 py-1 ${corCat} rounded-full text-xs font-bold border uppercase tracking-wider">🏷️ ${proj.categoria}</span>` : '';
            
            // Parte superior do card
            let topoCard = '';
            if (proj.tipo === 'imagem' && proj.imagem_url) {
                topoCard = `
                    <div class="relative">
                        <img src="${proj.imagem_url}" alt="${proj.titulo}" 
                             class="w-full h-48 object-cover rounded-lg" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                        <div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg items-center justify-center" style="display:none">
                            <i data-lucide="${proj.icone || 'image'}" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                        </div>
                        ${categoriaTag ? `<div class="absolute top-3 left-3">${categoriaTag}</div>` : ''}
                    </div>`;
            } else {
                topoCard = `
                    <div class="relative h-48 bg-gradient-to-br ${proj.gradient} rounded-lg flex items-center justify-center">
                        <i data-lucide="${proj.icone || 'box'}" class="text-white w-12 md:w-16 h-12 md:h-16"></i>
                        ${categoriaTag ? `<div class="absolute top-3 left-3">${categoriaTag}</div>` : ''}
                    </div>`;
            }
            
            const tagsHTML = techs.length > 0 ? 
                techs.map(t => `<span class="px-3 py-1 ${proj.bgTag || 'bg-neon/20'} rounded-full text-xs font-medium">${t}</span>`).join(' ') : '';
            
            return `
                <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
                    
                    ${topoCard}
                    
                    ${!proj.tipo || proj.tipo === 'icone' ? `<div class="mt-3">${categoriaTag}</div>` : ''}
                    
                    <h3 class="text-lg md:text-xl font-bold mt-4 mb-3 text-white">
                        ${proj.titulo}
                    </h3>
                    
                    <p class="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                        ${proj.descricao}
                    </p>
                    
                    ${techs.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${tagsHTML}
                    </div>` : ''}
                    
                    ${proj.link ? `
                    <a href="${proj.link}" target="_blank" rel="noopener noreferrer" 
                       class="text-neon hover:underline inline-flex items-center gap-1 font-medium text-sm">
                        🔗 Acessar projeto <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>` : ''}
                    
                </div>
            `;
        }).join('');
    }
    
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 300);
    }
})();
