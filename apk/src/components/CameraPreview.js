import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function CameraPreview({ image, navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />
      <TouchableOpacity onPress={() => navigation.navigate("ResultScreen", { image })} style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}>
        <Text style={{ color: "white" }}>🔍 Extraire Texte</Text>
      </TouchableOpacity>
    </View>
  );
}
