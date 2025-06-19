import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FieldComment = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      Alert.alert("Eksik Bilgi", "Lütfen yıldız verin ve yorum yazın.");
      return;
    }

    // Yorum ve yıldız gönderme işlemi (API vs)
    console.log("Yıldız:", rating);
    console.log("Yorum:", comment);

    Alert.alert("Teşekkürler", "Görüşünüz alındı!");
    setRating(0);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yorum Yap ve Değerlendir</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <FontAwesome
              name={star <= rating ? "star" : "star-o"}
              size={32}
              color="#f1c40f"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Yorumunuzu yazın..."
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FieldComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
