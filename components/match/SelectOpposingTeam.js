import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TextButton2 from "../UI/TextButton2";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useState } from "react";

const DUMMY_TEAMS = [
  {
    id: 1,
    name: "Galatasaray",
    logo: "../../assets/team-logo/takim.png",
    captain: "@aliduru",
    playerCount: 11,
    city: "İstanbul",
    district: "Sarıyer",
  },
  {
    id: 2,
    name: "Fenerbahçe",
    logo: "",
    captain: "@aliduru",
    playerCount: 8,
    city: "İstanbul",
    district: "Bakırköy",
  },
  {
    id: 3,
    name: "Beşiktaş",
    logo: "",
    captain: "@aliduru",
    playerCount: 9,
    city: "İstanbul",
    district: "Kadıköy",
  },
  {
    id: 4,
    name: "Trabzonspor",
    logo: "",
    captain: "@aliduru",
    playerCount: 12,
    city: "Trabzon",
    district: "Ortahisar",
  },
  {
    id: 5,
    name: "Başakşehir",
    logo: "",
    captain: "@aliduru",
    playerCount: 10,
    city: "İstanbul",
    district: "Başakşehir",
  },
];
const SelectOpposingTeam = ({setScreen}) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleSelectTeam(item)}>
      <View style={[styles.card, item.selected && styles.selectedCard]}>
        <Image
          source={require("../../assets/team-logo/takim.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.teamName}>{item.name}</Text>
          <Text style={styles.captain}>👑 Kaptan: {item.captain}</Text>
          <Text style={styles.playerCount}>
            👥 Oyuncu sayısı: {item.playerCount}
          </Text>
          <Text style={styles.location}>
            📍 {item.city} / {item.district}
          </Text>
        </View>
        {item.selected && (
          <View style={styles.selectionIndicator}>
            <Text style={{ color: "white" }}>✓</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = DUMMY_TEAMS.filter(
        (team) =>
          team.name.toLowerCase().includes(text.toLowerCase()) ||
          team.district.toLowerCase().includes(text.toLowerCase()) ||
          team.captain.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTeams(
        filtered.map((team) => ({
          ...team,
          selected: team.id === selectedTeam?.id,
        }))
      );
    } else {
      setFilteredTeams(
        DUMMY_TEAMS.map((team) => ({
          ...team,
          selected: team.id === selectedTeam?.id,
        }))
      );
    }
  };
  const handleSelectTeam = (team) => {
    const updatedTeams = filteredTeams.map((t) => ({
      ...t,
      selected: t.id === team.id,
    }));
    setFilteredTeams(updatedTeams);
    setSelectedTeam(team);
  };

  const [filteredTeams, setFilteredTeams] = useState(
    DUMMY_TEAMS.map((team) => ({ ...team, selected: false }))
  );

  return (
    <View style={styles.container}>
      <View style={styles.next}>
        <Text style={styles.text}>Rakip Takımınızı Seçin</Text>
        <TextButton2
          title="İleri"
          onPress={() => setScreen("screen2")}
          disabled={!selectedTeam}
        />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Takım, konum veya kaptan ara..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <BottomSheetFlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    position: "relative",
  },
  selectedCard: {
    backgroundColor: "#e6f0ff",
    borderLeftColor: "#e6f0ff",
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
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "#4caf50",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectOpposingTeam;
