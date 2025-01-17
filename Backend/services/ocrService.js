const Tesseract = require("tesseract.js");
const fs = require("fs");

const processImage = async (imagePath) => {
  try {
    // Processa a imagem utilizando o Tesseract.js
    const { data } = await Tesseract.recognize(imagePath, "por", {
      psm: 0,  // Modo automático de segmentação de página (tente psm: 0, 6, 11)
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁáÉéÍíÓóÚúÀàÇç.,!?()[]{}:;\"'",
      logger: (m) => console.log(m) // Para depuração do processo
    });

    // Exibe a resposta completa para depuração
    console.log("Resposta completa:", data);

    const { text, words, hocr, tsv, psm, oem, confidence, version } = data;

    console.log("Texto extraído:", text);
    console.log("Palavras extraídas:", words);  // Verifique se a propriedade words está presente

    if (!words || words.length === 0) {
      console.warn("Nenhuma palavra extraída. Verifique a configuração do Tesseract.");
    }

    // Remover o arquivo de imagem após o processamento
    fs.unlinkSync(imagePath);

    return { text, words, hocr, tsv, psm, oem, confidence, version }; // Retorna a resposta completa
  } catch (error) { 
    console.error("Erro ao processar imagem:", error.message);
    throw new Error("Erro ao processar imagem: " + error.message);
  }
};

module.exports = { processImage };
