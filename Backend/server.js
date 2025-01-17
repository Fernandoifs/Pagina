const express = require("express");
const multer = require("multer");
const path = require("path");
const { processImage } = require("./services/ocrService");
const cors = require ('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // PARA TESTES LOCAL


// // PARA PRODUCAO 
// // Defina as origens permitidas (no caso, apenas o frontend que está rodando na porta 5174)
// const corsOptions = {
//   origin: 'http://localhost:5174',  // Substitua pela URL do seu frontend se for diferente
//   methods: 'GET,POST',  // Métodos permitidos
//   allowedHeaders: 'Content-Type, Authorization',  // Cabeçalhos permitidos
// };

// app.use(cors(corsOptions));

// Configuração do Multer para upload
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    // Permitir apenas imagens
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Por favor, envie apenas imagens."), false);
    }
    cb(null, true);
  },
});

// Rota de upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    // Caminho do arquivo enviado
    const filePath = path.join(__dirname, req.file.path);

    // Processa a imagem com OCR
    const text = await processImage(filePath);

    res.json({ success: true, text });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, error: err.message });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
