const Tesseract = require("tesseract.js");
const fs = require("fs");

const processImage = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), // Logger para acompanhar o progresso
    });

    // Após o processamento, remova o arquivo local
    fs.unlinkSync(imagePath);

    return text;
  } catch (error) {
    throw new Error("Erro ao processar imagem: " + error.message);
  }
};

module.exports = { processImage };
