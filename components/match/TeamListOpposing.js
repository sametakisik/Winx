import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import Button from "../UI/Button";
import TextButton2 from "../UI/TextButton2";
import SelectOpposingTeam from "./SelectOpposingTeam";



const TeamListOpposing = () => {
  const [screen, setScreen] = useState("screen1");









  return (
    <>
      {screen === "screen1" && <SelectOpposingTeam setScreen={setScreen}/>}
      {screen === "screen2" && (
       <Text>fddsfsd</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
    backgroundColor: "#fff",
  },
  text: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
  },
  next: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderLeftWidth: 6,
    borderLeftColor: "#c8102e",
    position: 'relative',
  },
  selectedCard: {
    backgroundColor: '#e6f0ff',
    borderLeftColor: '#e6f0ff',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#eee",
  },
  textContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c8102e",
    marginBottom: 4,
  },
  captain: {
    fontSize: 14,
    color: "#555",
  },
  playerCount: {
    fontSize: 14,
    color: "#333",
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  selectionIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#4caf50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  confirmationText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TeamListOpposing;