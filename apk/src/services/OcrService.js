import * as ImageManipulator from "expo-image-manipulator";
import Tesseract from "tesseract.js";

export const extractTextFromImage = async (imageUri) => {
  // Redimensionner et convertir en Base64
  const processedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 1000 } }], { base64: true });

  // OCR avec Tesseract.js
  return new Promise((resolve, reject) => {
    Tesseract.recognize(`data:image/jpeg;base64,${processedImage.base64}`, "eng")
      .then(({ data: { text } }) => resolve(text))
      .catch(reject);
  });
};
