import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { extractTextFromImage } from '../services/OcrService'; // Assure-toi que le chemin est correct

export default function CameraScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [ocrResult, setOcrResult] = useState("");

  // Vérifier les permissions dès que le composant est monté
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Fonction pour prendre une photo
  async function takePhoto() {
    if (hasPermission === false) {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la caméra dans les paramètres.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      processImage(result.assets[0].uri); // Appel pour extraire le texte de l'image
    }
  }

  // Fonction pour extraire le texte de l'image
// Fonction pour envoyer l'image à l'API Flask et récupérer le texte
async function processImage(uri) {
  try {
    let formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    const response = await fetch("http://192.168.0.121:5000/ocr", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const result = await response.json();
    setOcrResult(result.text.join("\n")); // Affiche le texte extrait
  } catch (error) {
    console.error("Erreur OCR:", error);
    Alert.alert("Erreur OCR", "Impossible d'extraire le texte.");
  }
}


  return (
    <View style={styles.vue}>
      <TouchableOpacity style={styles.buttonContainer} onPress={takePhoto}>
        <Text style={styles.buttonText}>📷 Prendre une photo</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {/* Affichage du texte extrait */}
      {ocrResult !== "" && (
        <View style={styles.ocrResultContainer}>
          <Text style={styles.ocrText}>Texte extrait :</Text>
          <Text style={styles.ocrResult}>{ocrResult}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vue: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonContainer: {
    backgroundColor: "grey",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    marginTop: 10,
  },
  ocrResultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  ocrText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ocrResult: {
    fontSize: 14,
    marginTop: 10,
    color: "#333",
  },
});
