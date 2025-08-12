const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura CORS para permitir acesso do app mobile
app.use(cors());

// Configura armazenamento da imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  },
});

const upload = multer({ storage });

// Rota para upload
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  }

  res.json({ message: 'Upload realizado com sucesso!', file: req.file.filename });
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
