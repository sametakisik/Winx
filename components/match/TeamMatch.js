import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import TeamCard from "../teams/TeamCard";
import { useState } from "react";

const TeamMatch = () => {
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

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.componentTitle}>Takımlarım</Text>
      <BottomSheetFlatList
        data={myTeams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedTeam(item.id)}>
            <TeamCard
              teamName={item.name}
              isSelect={selectedTeam === item.id} // seçileni vurgulamak için
            />
          </Pressable>
        )}
      />
      <View style={{ marginTop: 4 }}>
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TeamMatch;
