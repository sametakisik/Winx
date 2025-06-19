import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Chip, Text, IconButton, Button } from "react-native-paper";
import FindPlayerCard from "./FindPlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import Player from "./components/teams/Player";
import { getTeamById, getTeamMembersById } from "./utils/TeamApiService";
import { inviteUsersRoom } from "./utils/RoomApiService";

const FindPlayerScreen = () => {
    const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("teams");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const route = useRoute();
  const { teamId, teamName, roomId } = route.params;

  const [friends, setFriends] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);


  const handleAddPlayer = async () => {
  try {
    await inviteUsersRoom(roomId, selectedPlayers)
    console.log("başarılı");
   navigation.popToTop(); 
    navigation.replace("Maç Detayları", {roomId: roomId});
    
  } catch (error) {
    console.log("ekleme hatası", error)
  }
}

    useLayoutEffect(() => {
      navigation.setOptions({
        title: `Odaya Oyuncu Ekleyin`,
     headerRight: () => (
  <Button
  onPress={handleAddPlayer}
   disabled={selectedPlayers.length===0}>Ekle</Button>
  ),
  
      });
    }, [navigation, roomId, selectedPlayers]);
  

  useEffect(() => {
    const fetchRooms = async () => {
      const teamPlayer = await getTeamMembersById(teamId);
      setTeamPlayers(teamPlayer);
    };
    fetchRooms();
  }, [teamId]);

  const handleSelectPlayer = (player) => {
    if (!selectedPlayers.includes(player.userId)) {
      setSelectedPlayers((prev) => [...prev, player.userId]);
    }
  };

  const handleRemovePlayer = (userId) => {
    setSelectedPlayers((prev) => prev.filter((id) => id !== userId));
  };

  const getSelectedPlayerObjects = () => {
    const allPlayers = [...friends, ...teamPlayers];
    return selectedPlayers
      .map((userId) => allPlayers.find((player) => player.userId === userId))
      .filter(Boolean); // eşleşmeyenleri çıkar
  };
  // Clear all selected players
  const handleClearSelection = () => {
    setSelectedPlayers([]);
  };

  const getAvailablePlayers = () => {
    return activeTab === "friends"
      ? friends?.filter((f) => !selectedPlayers.includes(f.userId))
      : teamPlayers?.filter((t) => !selectedPlayers.includes(t.userId));
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
            data={getSelectedPlayerObjects()}
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

      {/* Tab Selection */}
      <View style={styles.tabContainer}>
        <Chip
          mode="outlined"
          style={[styles.chip, activeTab === "teams" && styles.activeChip]}
          textStyle={[
            styles.chipText,
            activeTab === "teams" && styles.activeChipText,
          ]}
          onPress={() => setActiveTab("teams")}
        >
          {teamName} takımındakiler
        </Chip>

        <Chip
          mode="outlined"
          style={[styles.chip, activeTab === "friends" && styles.activeChip]}
          textStyle={[
            styles.chipText,
            activeTab === "friends" && styles.activeChipText,
          ]}
          onPress={() => setActiveTab("friends")}
        >
          Arkadaşlar
        </Chip>
      </View>

      {/* Player List */}
      <FlatList
        data={getAvailablePlayers()}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <FindPlayerCard
          userId = {item.userId}
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

export default FindPlayerScreen;
