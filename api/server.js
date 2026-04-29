const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Txje28HvEAGU@ep-winter-frog-amud4rkl-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

pool.query(`CREATE TABLE IF NOT EXISTS projetos (
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

app.post('/api/projetos', async (req, res) => {
  const p = req.body;
  try {
    const tecnologiasArray = p.tecnologias ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}' : null;
    await pool.query(
      'INSERT INTO projetos (icone, titulo, descricao, tecnologias, link, gradient, bg_tag, categoria, tipo, imagem_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [p.icone, p.titulo, p.descricao, tecnologiasArray, p.link, p.gradient, p.bgTag, p.categoria, p.tipo, p.imagem_url]
    );
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projetos', async (req, res) => {
  try {
    const tecnologiasArray = p.tecnologias ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}' : null;
    const { rows } = await pool.query('SELECT * FROM projetos ORDER BY criado_em DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/projetos/:id', async (req, res) => {
  try {
    const tecnologiasArray = p.tecnologias ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}' : null;
    const { rows } = await pool.query('SELECT * FROM projetos WHERE id = $1', [req.params.id]);
    res.json(rows[0] || { error: 'Not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/projetos/:id', async (req, res) => {
  try {
    const tecnologiasArray = p.tecnologias ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}' : null;
    await pool.query('DELETE FROM projetos WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/health', async (req, res) => {
  try {
    const tecnologiasArray = p.tecnologias ? '{' + p.tecnologias.split(',').map(t => '"' + t.trim() + '"').join(',') + '}' : null;
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch (err) { res.status(500).send('ERROR'); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
