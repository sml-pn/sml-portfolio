const API_URL = 'https://sml-api.onrender.com'; // SUBSTITUA pela URL real da API no Render

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        setTimeout(() => lucide.createIcons(), 500);
    }

    const container = document.getElementById('projetos-container');
    if (!container) return;

    fetch(API_URL + '/api/projetos')
        .then(r => r.json())
        .then(projetos => {
            if (!Array.isArray(projetos) || projetos.length === 0) return;
            container.innerHTML = projetos.map(proj => {
                const techs = (proj.tecnologias || '').split(',').map(t => t.trim()).filter(t => t);
                const cores = {
                    'saúde': 'bg-red-500/20 text-red-400',
                    'automotivo': 'bg-blue-500/20 text-blue-400',
                    'ecommerce': 'bg-yellow-500/20 text-yellow-400',
                    'educação': 'bg-purple-500/20 text-purple-400',
                    'tecnologia': 'bg-cyan-500/20 text-cyan-400',
                    'financeiro': 'bg-emerald-500/20 text-emerald-400',
                    'delivery': 'bg-orange-500/20 text-orange-400',
                    'marketing': 'bg-pink-500/20 text-pink-400',
                    'imobiliário': 'bg-amber-500/20 text-amber-400',
                    'landing page': 'bg-indigo-500/20 text-indigo-400'
                };
                const catRaw = (proj.categoria || '').trim();
                const catKey = catRaw.toLowerCase().replace(/\s+/g, '');
                const corCat = cores[catKey] || 'bg-gray-500/20 text-gray-400';
                const categoriaTag = catRaw ? `<span class="px-3 py-1 ${corCat} rounded-full text-xs font-bold border uppercase tracking-wider"><i data-lucide="tag" class="inline w-4 h-4 mr-1"></i>${catRaw}</span>` : '';
                let topo = '';
                if (proj.tipo === 'imagem' && proj.imagem_url) {
                    topo = `<div class="relative"><img src="${proj.imagem_url}" alt="${proj.titulo}" class="w-full h-48 object-cover rounded-lg" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="h-48 bg-gradient-to-br ${proj.gradient} rounded-lg items-center justify-center" style="display:none"><i data-lucide="${proj.icone || 'image'}" class="text-white w-12 h-12"></i></div>${categoriaTag ? `<div class="absolute -top-8 left-3">${categoriaTag}</div>` : ''}</div>`;
                } else {
                    topo = `<div class="relative h-48 bg-gradient-to-br ${proj.gradient} rounded-lg flex items-center justify-center"><i data-lucide="${proj.icone || 'box'}" class="text-white w-12 h-12"></i>${categoriaTag ? `<div class="absolute -top-8 left-3">${categoriaTag}</div>` : ''}</div>`;
                }
                return `<div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">${topo}<h3 class="text-lg md:text-xl font-bold mt-4 mb-3 text-white">${proj.titulo}</h3><p class="text-gray-400 text-sm md:text-base mb-4">${proj.descricao || ''}</p>${techs.length ? `<div class="flex flex-wrap gap-2 mb-4">${techs.map(t => `<span class="px-3 py-1 ${proj.bg_tag || 'bg-neon/20'} rounded-full text-xs">${t}</span>`).join(' ')}</div>` : ''}${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1 text-sm"><i data-lucide="arrow-right" class="w-4 h-4"></i> Acessar projeto</a>` : ''}</div>`;
            }).join('');
            lucide.createIcons();
        })
        .catch(err => console.error('Erro ao carregar projetos', err));
});
