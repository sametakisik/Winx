import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import { Colors } from "../../constants/Colors";
import TeamCard from "../teams/TeamCard";
import FastMatch from "./FastMatch";
import { useOverlayBottomSheet } from "../../OverlayContext";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CreateTeamMatch from "./CreateTeamMatch";

const CreateMatch = () => {
  const [selectedOption, setSelectedOption] = useState("team");

  const myTeams = [
    {
      id: 1,
      name: "A takımı",
    },

    {
      id: 2,
      name: "B takımı",
    },
    {
      id: 3,
      name: "B takımı",
    },

  ];
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { openSheet2 } = useOverlayBottomSheet();
  
  const Team = () => (
    <View style={styles.componentContainer}>
    <CreateTeamMatch />
    {/* Geçici maç ayarları buraya */}
  </View>
  );

  const Fast = () => (
    <View style={styles.componentContainer}>
      <FastMatch />
      {/* Geçici maç ayarları buraya */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Maç Oluştur</Text>

      <View style={styles.buttonContainer}>
        <Button
          textStyle={
            selectedOption === "team"
              ? { color: "white" }
              : { color: Colors.primary }
          }
          style={[
            styles.button,
            selectedOption === "team" && styles.selectedButton,
          ]}
          onPress={() => setSelectedOption("team")}
        >
          Takımım Adına Oluştur
        </Button>

        <Button
          style={[
            styles.button,
            selectedOption === "temporary" && styles.selectedButton,
          ]}
          textStyle={
            selectedOption === "temporary"
              ? { color: "white" }
              : { color: Colors.primary }
          }
          onPress={() => setSelectedOption("temporary")}
        >
          Hızlı Maç Oluştur
        </Button>
      </View>

      {selectedOption === "team" && <Team />}
      {selectedOption === "temporary" && <Fast />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: Colors.primary,
  },
  componentContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: 550,
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
});

export default CreateMatch;
