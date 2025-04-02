from flask import Flask, request, jsonify
import cv2
import easyocr
import numpy as np
import io
from PIL import Image

app = Flask(__name__)

# Initialiser EasyOCR
reader = easyocr.Reader(['en'], gpu=False)

@app.route('/ocr', methods=['POST'])
def ocr():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        # Lire l'image
        image = Image.open(io.BytesIO(file.read()))
        img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Détection de texte
        text_results = reader.readtext(img)
        
        # Extraire uniquement le texte
        extracted_texts = [text for (_, text, score) in text_results if score > 0.25]
        
        return jsonify({"text": extracted_texts}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
