document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  fetch('https://sml-api.onrender.com/api/projetos')
    .then(r => r.json())
    .then(projetos => {
      if (!Array.isArray(projetos) || projetos.length === 0) return;

      container.innerHTML = projetos.map(proj => {
        const techs = Array.isArray(proj.tecnologias)
          ? proj.tecnologias
          : (proj.tecnologias || '').split(',').map(t => t.trim()).filter(t => t);

        const cores = {
          'saúde': 'bg-red-500 text-white',
          'automotivo': 'bg-blue-500 text-white',
          'ecommerce': 'bg-yellow-500 text-black',
          'educação': 'bg-purple-500 text-white',
          'tecnologia': 'bg-cyan-500 text-black',
          'financeiro': 'bg-emerald-500 text-white',
          'delivery': 'bg-orange-500 text-white',
          'marketing': 'bg-pink-500 text-white',
          'imobiliário': 'bg-amber-500 text-black',
          'landing page': 'bg-indigo-500 text-white',
          'pet shop': 'bg-teal-500 text-white',
          'restaurante': 'bg-orange-500 text-white',
          'advocacia': 'bg-amber-500 text-black',
          'academia': 'bg-lime-500 text-black',
          'estética': 'bg-rose-500 text-white',
          'construção': 'bg-stone-500 text-white',
          'turismo': 'bg-sky-500 text-black',
          'cursos': 'bg-violet-500 text-white',
          'transporte': 'bg-slate-500 text-white',
          'eventos': 'bg-fuchsia-500 text-white',
          'serviços': 'bg-zinc-500 text-white'
        };

        const catRaw = (proj.categoria || '').trim();
        const catKey = catRaw.toLowerCase().replace(/\s+/g, '');
        const corCat = cores[catKey] || 'bg-gray-500 text-white';

        const categoriaTag = catRaw
          ? `<span class="px-3 py-1 ${corCat} rounded-full text-xs font-bold border uppercase tracking-wider absolute -top-8 left-3 z-20">
               <i data-lucide="tag" class="inline w-4 h-4 mr-1"></i>${catRaw}
             </span>`
          : '';

        let topo = '';
        if (proj.tipo === 'imagem' && proj.imagem_url) {
          topo = `<div class="relative overflow-visible">
            <img src="${proj.imagem_url}" alt="${proj.titulo}" class="w-full h-48 object-cover rounded-lg"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
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

        return `<div class="overflow-visible bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
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
