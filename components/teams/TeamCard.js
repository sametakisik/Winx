// components/TeamCard.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TeamCard = ({ teamName, logoUrl, isSelect }) => {
    console.log(isSelect)
  return (
    <View style={[styles.card, isSelect && styles.selectedCard]}>
      <Image
        source={require("../../assets/team-logo/takim2.png")}
        style={styles.logo}
      />
      <Text style={styles.teamName}>{teamName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 8,
  },
  logo: {
    width: 70,
    height: 70,
    marginEnd: 20,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedCard: {
    borderColor: 'blue',
    backgroundColor: '#e6f0ff',
  }
});

export default TeamCard;
