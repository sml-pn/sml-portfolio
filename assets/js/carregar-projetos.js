document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  fetch('https://sml-api.onrender.com/api/projetos')
    .then(r => r.json())
    .then(projetos => {
      if (!Array.isArray(projetos) || projetos.length === 0) return;

      container.innerHTML = projetos.map(proj => {
        const techs = (typeof proj.tecnologias === 'string' 
          ? proj.tecnologias.split(',').map(t => t.trim()).filter(t => t) 
          : (proj.tecnologias || []));
        
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
          'landing page': 'bg-indigo-500/20 text-indigo-400',
          'pet shop': 'bg-teal-500/20 text-teal-400',
          'restaurante': 'bg-orange-500/20 text-orange-400',
          'advocacia': 'bg-amber-500/20 text-amber-400',
          'academia': 'bg-lime-500/20 text-lime-400',
          'estética': 'bg-rose-500/20 text-rose-400',
          'construção': 'bg-stone-500/20 text-stone-400',
          'turismo': 'bg-sky-500/20 text-sky-400',
          'cursos': 'bg-violet-500/20 text-violet-400',
          'transporte': 'bg-slate-500/20 text-slate-400',
          'eventos': 'bg-fuchsia-500/20 text-fuchsia-400',
          'serviços': 'bg-zinc-500/20 text-zinc-400'
        };
        
        const catRaw = (proj.categoria || '').trim();
        const catKey = catRaw.toLowerCase().replace(/\s+/g, '');
        const corCat = cores[catKey] || 'bg-gray-500/20 text-gray-400';
        const categoriaTag = catRaw 
          ? `<span class="px-3 py-1 ${corCat} rounded-full text-xs font-bold border uppercase tracking-wider absolute -top-8 left-3 z-20">
               <i data-lucide="tag" class="inline w-4 h-4 mr-1"></i>${catRaw}
             </span>` 
          : '';
        
        let topo = '';
        if (proj.tipo === 'imagem' && proj.imagem_url) {
          topo = `<div class="relative overflow-visible">
            <img src="${proj.imagem_url}" alt="${proj.titulo}" class="w-full h-48 object-cover rounded-lg" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div class="h-48 bg-gradient-to-br ${proj.gradient || 'from-neon to-neon-pink'} rounded-lg items-center justify-center" style="display:none">
              <i data-lucide="${proj.icone || 'image'}" class="text-white w-12 h-12"></i>
            </div>
            ${categoriaTag}
          </div>`;
        } else {
          topo = `<div class="relative overflow-visible h-48 bg-gradient-to-br ${proj.gradient || 'from-neon to-neon-pink'} rounded-lg flex items-center justify-center">
            <i data-lucide="${proj.icone || 'box'}" class="text-white w-16 h-16"></i>
            ${categoriaTag}
          </div>`;
        }
        
        return `<div class="card-3d overflow-visible bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
          ${topo}
          <h3 class="text-lg md:text-xl font-bold mt-4 mb-2 text-white">${proj.titulo}</h3>
          <p class="text-gray-400 text-sm mb-4">${proj.descricao || ''}</p>
          ${techs.length ? `<div class="flex flex-wrap gap-2 mb-4">${techs.map(t => `<span class="px-3 py-1 ${proj.bg_tag || 'bg-neon/20'} rounded-full text-xs">${t}</span>`).join(' ')}</div>` : ''}
          ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1"><i data-lucide="arrow-right" class="w-4 h-4"></i> Acessar projeto</a>` : ''}
        </div>`;
      }).join('');

      if (typeof lucide !== 'undefined') lucide.createIcons();
    })
    .catch(e => console.error('Erro ao carregar projetos', e));
});
