const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// String de conexão robusta para evitar cold start
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Txje28HvEAGU@ep-winter-frog-amud4rkl-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=10';

const pool = new Pool({ connectionString });

// Função para aguardar o banco estar pronto (resolve cold start)
async function waitForDb(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('✅ Banco de dados conectado!');
      return true;
    } catch (err) {
      console.log(`⏳ Aguardando banco (tentativa ${i + 1}/${retries})...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  console.error('❌ Não foi possível conectar ao banco após várias tentativas');
  return false;
}

// Inicialização
async function init() {
  const dbReady = await waitForDb();
  if (dbReady) {
    // Criar tabela se não existir
    await pool.query(`CREATE TABLE IF NOT EXISTS projetos (
      id SERIAL PRIMARY KEY,
      icone VARCHAR(30),
      titulo VARCHAR(200) NOT NULL,
      descricao TEXT,
      tecnologias TEXT[],
      link VARCHAR(500),
      gradient VARCHAR(100),
      bg_tag VARCHAR(50),
      categoria VARCHAR(50),
      tipo VARCHAR(20),
      imagem_url TEXT,
      criado_em TIMESTAMP DEFAULT NOW()
    )`);
    console.log('✅ Tabela projetos verificada/criada');
  }
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
}

// Salvar projeto
app.post('/api/projetos', async (req, res) => {
  const p = req.body;
  console.log('📥 POST /api/projetos', p.titulo);
  try {
    // Converter tecnologias para array PostgreSQL
    const tecnologiasArray = p.tecnologias 
      ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}'
      : null;
    
    await pool.query(
      'INSERT INTO projetos (icone, titulo, descricao, tecnologias, link, gradient, bg_tag, categoria, tipo, imagem_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [p.icone, p.titulo, p.descricao, tecnologiasArray, p.link, p.gradient, p.bgTag, p.categoria, p.tipo, p.imagem_url]
    );
    console.log('✅ Projeto salvo:', p.titulo);
    res.json({ ok: true });
  } catch (err) {
    console.error('❌ Erro ao salvar:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Listar projetos
app.get('/api/projetos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projetos ORDER BY criado_em DESC');
    res.json(rows);
  } catch (err) { 
    console.error('❌ Erro ao listar:', err.message);
    res.status(500).json({ error: err.message }); 
  }
});

// Buscar projeto por ID
app.get('/api/projetos/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projetos WHERE id = $1', [req.params.id]);
    res.json(rows[0] || { error: 'Not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Deletar projeto
app.delete('/api/projetos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projetos WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Health-check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch (err) { res.status(500).send('ERROR'); }
});

init();
