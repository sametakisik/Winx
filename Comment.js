import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import { Colors } from "./constants/Colors";
import { commentOnTheField, commentOnTheTeam, commentOnTheUser } from "./utils/CommentApiService";
import { useUser } from "./context/UserContext";
import { useBottomSheet } from "./BottomSheetContext";

const RatingScreen = ({ commentType, toId, fetchComments }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { token, user } = useUser();
  const { closeSheet } = useBottomSheet();

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      Alert.alert("Eksik Bilgi", "Lütfen yıldız verin ve yorum yazın.");
      return;
    }

    const commentFieldData = {
      fieldId: toId,
      content: comment,
      rating: rating,
    };

    const commentTeamData = {
      toTeamId: toId,
      content: comment,
      rating: rating,
    };

    const commentUserData = {
      fromUserId: user.id,
      toUserId: toId,
      content: comment,
      rating: rating
    };



    try {
      if (commentType === "Team") {
        await commentOnTheTeam(token, commentTeamData);
        console.log("başarılı");
      } else if (commentType === "Field") {
        await commentOnTheField(token, commentFieldData);
      }
     else if (commentType === "User") {
        await commentOnTheUser(token, commentUserData);
      }

      console.log("yorum yapıldı");

      await fetchComments();
      closeSheet();
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("hata", error);
    }
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
        label="Yorumunuz"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
        mode="outlined"
        placeholder="Yorumunuzu yazın...."
        style={styles.input}
        activeOutlineColor={Colors.primary}
      />

      <Button
        mode="contained-tonal"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={handleSubmit}
        buttonColor={Colors.primary} // arka plan rengini özelleştirme (isteğe bağlı)
        textColor="#fff"
      >
        Yorum Yap
      </Button>
    </View>
  );
};

export default RatingScreen;

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
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
