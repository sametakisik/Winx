import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Chip, Text, IconButton, Button } from "react-native-paper";
import FindPlayerCard from "../../FindPlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import Player from "./Player";
import { addMemberTeam, getTeamById } from "../../utils/TeamApiService";

const friends = [
  {
    userId: 2,
    userName: "aliduru",
    name: "Ali Duru",
    position: "Forvet",
    location: "Üsküdar",
  },
  {
    userId: 3,
    userName: "@mehmetk",
    name: "Mehmet Kaya",
    position: "Kaleci",
    location: "Kadıköy",
  },
  {
    userId: 4,
    userName: "@aysegul",
    name: "Ayşegül Demir",
    position: "Defans",
    location: "Beşiktaş",
  },
  {
    userId: 22,
    userName: "@berkayg",
    name: "Berkay Güneş",
    position: "Orta Saha",
    location: "Maltepe",
  },
  {
    userId: 26,
    userName: "@nurcank",
    name: "Nurcan Kaya",
    position: "Forvet",
    location: "Ümraniye",
  },
];

const AddPlayerScreen = () => {


  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const route = useRoute();
  const { teamData, teamId, teamName, screenType } = route.params;
  const navigation = useNavigation();

  console.log(teamData);

  const addPlayer = async () => {
      navigation.navigate("Takımınızı Onaylayın", {
      teamData: {...teamData}, selectedPlayers: [...selectedPlayers]
      })
  };

    const addPlayerTeamScreen = async () => {
        const result = selectedPlayers.map((id) => ({
          userId: id,
          isCaptain: false,
          isAdmin: false,
        }));
    
       await addMemberTeam(teamId, result);
           navigation.popToTop(); 
  navigation.replace("Takım Detayları", { teamId:teamId });
  };

useLayoutEffect(() => {
  navigation.setOptions({
    title: `${teamData?.name || teamName}  takımına oyuncu ekleyin`,
    headerRight: () => (
      screenType === "TeamScreen" ? (
        <Button onPress={addPlayerTeamScreen} disabled={selectedPlayers.length === 0}>
          Ekle
        </Button>
      ) : (
        <Button onPress={addPlayer}>
          {selectedPlayers.length > 0 ? "Ekle" : "Atla"}
        </Button>
      )
    ),
  });
}, [navigation, selectedPlayers, teamData]);



  const handleSelectPlayer = (player) => {
    if (!selectedPlayers.includes(player.userId)) {
      setSelectedPlayers((prev) => [
        ...prev,
        player.userId,
      ]);
    }
  };

  const handleRemovePlayer = (userId) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.userId !== userId));
  };

  // Clear all selected players
  const handleClearSelection = () => {
    setSelectedPlayers([]);
  };

  return (
    <View style={styles.container}>
      {/* Selected Players Section */}
      {selectedPlayers.length > 0 && (
        <View style={styles.selectedContainer}>
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedTitle}>
              Seçilenler ({selectedPlayers.length})
            </Text>
            <IconButton
              icon="close"
              size={16}
              onPress={handleClearSelection}
              style={styles.clearButton}
            />
          </View>

          <FlatList
            data={selectedPlayers}
            keyExtractor={(item) => item.userId}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedList}
            renderItem={({ item }) => (
              <View style={styles.playerWrapper}>
                <Player name={item.name} userName={item.userName} />
                <IconButton
                  icon="close"
                  size={12}
                  style={styles.removeButton}
                  onPress={() => handleRemovePlayer(item.userId)}
                />
              </View>
            )}
          />
        </View>
      )}

      {/* Player List */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <FindPlayerCard
            userId={item.userId}
            photoUrl={item.userPhotoUrl}
            userName={item.userName}
            name={`${item.firstName} ${item.lastName}`}
            position={item.position}
            location={`${item.city}/${item.town}`}
            isSelected={false}
            addPlayer={() => handleSelectPlayer(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tüm oyuncular seçildi</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  selectedContainer: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    margin: 0,
  },
  selectedList: {
    paddingVertical: 4,
  },
  playerWrapper: {
    position: "relative",
    marginRight: 12,
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
  },
  activeChip: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
  },
  chipText: {
    color: "#6200ee",
  },
  activeChipText: {
    color: "white",
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  pressedCard: {
    backgroundColor: "#f7f7f7",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default AddPlayerScreen;
