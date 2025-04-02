import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { extractTextFromImage } from "../services/OcrService";

export default function ResultScreen({ route }) {
  const { image } = route.params;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    extractTextFromImage(image)
      .then((result) => setText(result))
      .finally(() => setLoading(false));
  }, [image]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
      {loading ? <ActivityIndicator size="large" /> : <Text>{text || "Aucun texte trouvé."}</Text>}
    </ScrollView>
  );
}
