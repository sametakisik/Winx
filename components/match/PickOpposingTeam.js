import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TeamListOpposing from "./TeamListOpposing";
import { Colors } from "../../constants/Colors";
import AddPlayerFast from "../teams/AddPlayerFast";


const PickOpposingTeam = () => {
  const [opposingType, setOpposingType] = useState("team");

  return (
    <View style={styles.container}>
      {/* Seçim Butonları */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            opposingType === "team" && styles.activeButton,
          ]}
          onPress={() => setOpposingType("team")}
        >
          <Text
            style={[
              styles.buttonText,
              opposingType === "team" && styles.activeButtonText,
            ]}
          >
            Takım Seç
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            opposingType === "player" && styles.activeButton,
          ]}
          onPress={() => setOpposingType("player")}
        >
          <Text
            style={[
              styles.buttonText,
              opposingType === "player" && styles.activeButtonText,
            ]}
          >
            Oyuncu Seç
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {opposingType === "team" ? <TeamListOpposing /> : <AddPlayerFast/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 7
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default PickOpposingTeam;
