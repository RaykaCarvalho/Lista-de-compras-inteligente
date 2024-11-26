const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/lista_de_compras', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use('/api/items', require('./routes/items'));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/meu-projeto-frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/meu-projeto-frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
