// ============================================
// SINCRONIZADOR – ETIQUETAS GARANTIDAS
// ============================================
(function() {
    const container = document.getElementById('projetos-container');
    if (!container) return;

    const projetos = JSON.parse(localStorage.getItem('sml-projetos') || '[]');

    if (projetos.length === 0) return;

    container.innerHTML = projetos.map(proj => {
        // Tecnologias
        const techs = typeof proj.tecnologias === 'string'
            ? proj.tecnologias.split(',').map(t => t.trim()).filter(t => t)
            : (Array.isArray(proj.tecnologias) ? proj.tecnologias : []);

        // Cores por categoria (chave minúscula e sem espaços)
        const cores = {
            'saúde':        'bg-red-500/20 text-red-400 border-red-500/30',
            'automotivo':   'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'ecommerce':    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            'financeiro':   'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            'educação':     'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'delivery':     'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'imobiliário':  'bg-amber-500/20 text-amber-400 border-amber-500/30',
            'tecnologia':   'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'marketing':    'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'landing page': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
        };

        const catRaw = (proj.categoria || '').trim();
        const catKey = catRaw.toLowerCase().replace(/\s+/g, '');
        const corCat = cores[catKey] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

        // Tag de categoria SEMPRE visível se existir categoria
        const categoriaTag = catRaw
            ? `<span class="px-3 py-1 ${corCat} rounded-full text-xs font-bold border uppercase tracking-wider">🏷️ ${catRaw}</span>`
            : '';

        // Topo do card
        let topo = '';
        if (proj.tipo === 'imagem' && proj.imagem_url) {
            topo = `
                <div class="relative">
                    <img src="${proj.imagem_url}" alt="${proj.titulo}" class="w-full h-48 object-cover rounded-lg"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg items-center justify-center" style="display:none">
                        <i data-lucide="${proj.icone || 'image'}" class="text-white w-12 h-12"></i>
                    </div>
                    ${categoriaTag ? `<div class="absolute top-3 left-3">${categoriaTag}</div>` : ''}
                </div>`;
        } else {
            topo = `
                <div class="relative h-48 bg-gradient-to-br ${proj.gradient} rounded-lg flex items-center justify-center">
                    <i data-lucide="${proj.icone || 'box'}" class="text-white w-12 h-12"></i>
                    ${categoriaTag ? `<div class="absolute top-3 left-3">${categoriaTag}</div>` : ''}
                </div>`;
        }

        // Se for ícone e não tiver categoria no topo, exibe abaixo da imagem
        const categoriaExtra = (!proj.tipo || proj.tipo === 'icone') && !categoriaTag ? '' : '';

        return `
            <div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
                ${topo}
                ${categoriaExtra}
                <h3 class="text-lg md:text-xl font-bold mt-4 mb-3 text-white">${proj.titulo}</h3>
                <p class="text-gray-400 text-sm md:text-base mb-4">${proj.descricao || ''}</p>
                ${techs.length ? `<div class="flex flex-wrap gap-2 mb-4">${techs.map(t => `<span class="px-3 py-1 ${proj.bgTag || 'bg-neon/20'} rounded-full text-xs">${t}</span>`).join(' ')}</div>` : ''}
                ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1 text-sm">🔗 Acessar projeto <i data-lucide="arrow-right" class="w-4 h-4"></i></a>` : ''}
            </div>`;
    }).join('');

    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 300);
    }
})();
