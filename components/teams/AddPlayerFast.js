import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FindPlayerCard from "../../FindPlayerCard";

import Player from "./Player";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import FindPlayerFastCard from "../others/FindPlayerFastCard";


const AddPlayerFast = ({ teamName }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [data, setData] = useState([
    {
      id: "1",
      userName: "@aliduru",
      name: "Ali Duru",
      position: "Forvet",
      location: "Üsküdar",
    },
    {
      id: "2",
      userName: "@mehmetk",
      name: "Mehmet Kaya",
      position: "Kaleci",
      location: "Kadıköy",
    },
    {
      id: "3",
      userName: "@aysegul",
      name: "Ayşegül Demir",
      position: "Defans",
      location: "Beşiktaş",
    },
    {
      id: "4",
      userName: "@berkayg",
      name: "Berkay Güneş",
      position: "Orta Saha",
      location: "Maltepe",
    },
    {
      id: "5",
      userName: "@nurcank",
      name: "Nurcan Kaya",
      position: "Forvet",
      location: "Ümraniye",
    },
  ])
  const handleSelectPlayer = (player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) return;
    setSelectedPlayers((prev) => [...prev, player]);
    setData((prev) =>
      prev.filter((p) => p.id !== player.id))
    
  };

  const handleRemovePlayer = (player) => {
    setSelectedPlayers((prev) =>
      prev.filter((p) => p.id !== player.id)
    );
    setData((prev) => [...prev, player]);
  }


  return (
    <View>
      {selectedPlayers.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Seçilen Oyuncular:</Text>
          <BottomSheetFlatList
            data={selectedPlayers}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=> handleRemovePlayer(item)}>
                <Player name={item.name} userName={item.userName} />
              </TouchableOpacity>
              
            )}
          />
        </View>
      )}

      <BottomSheetFlatList
        style={{ maxHeight: 500, marginTop: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        renderItem={({ item }) => (
          <FindPlayerFastCard
            userName={item.userName}
            name={item.name}
            position={item.position}
            location={item.location}
            onPress={() => handleSelectPlayer(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  playerCard: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 100,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
});

export default AddPlayerFast;
