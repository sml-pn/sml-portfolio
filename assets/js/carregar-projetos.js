document.addEventListener('DOMContentLoaded', () => {
  fetch('https://sml-api.onrender.com/api/projetos')
    .then(r => r.json())
    .then(projetos => {
      const container = document.getElementById('projetos-container');
      if (!container || !Array.isArray(projetos) || projetos.length === 0) return;
      container.innerHTML = projetos.map(p => {
        const techs = (p.tecnologias || []).join(', ') || '';
        return `<div class="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon transition">
          <div class="h-48 bg-gradient-to-br ${p.gradient || 'from-neon to-neon-pink'} rounded-lg flex items-center justify-center">
            <i data-lucide="${p.icone || 'box'}" class="text-white w-16 h-16"></i>
          </div>
          <h3 class="text-xl font-bold mt-4 mb-2 text-white">${p.titulo}</h3>
          <p class="text-gray-400 text-sm mb-4">${p.descricao || ''}</p>
          <div class="flex flex-wrap gap-2 mb-4">${techs.split(',').map(t => `<span class="px-3 py-1 bg-neon/20 rounded-full text-xs">${t.trim()}</span>`).join(' ')}</div>
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="text-neon hover:underline inline-flex items-center gap-1"><i data-lucide="arrow-right" class="w-4 h-4"></i> Acessar projeto</a>` : ''}
        </div>`;
      }).join('');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    })
    .catch(e => console.error('Erro ao carregar projetos', e));
});
