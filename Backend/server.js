const express = require("express");
const multer = require("multer");
const path = require("path");
const { processImage } = require("./services/ocrService");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Para permitir CORS durante o desenvolvimento

// Configuração do Multer para upload
const upload = multer({
  dest: "uploads/", // Diretório temporário onde o arquivo será armazenado
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
      return res.status(400).json({ success: false, error: "Nenhum arquivo enviado." });
    }

    // Caminho do arquivo enviado
    const filePath = path.join(__dirname, req.file.path);

    // Processa a imagem com OCR
    const text = await processImage(filePath);

    // Envia a resposta com sucesso e o texto extraído
    res.json({
      success: true,
      text, // O texto extraído da imagem
      imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`, // URL da imagem
    });
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
