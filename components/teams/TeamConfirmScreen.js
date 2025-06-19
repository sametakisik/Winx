import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Player from "./Player";
import { useLayoutEffect } from "react";
import Button from "../UI/Button";
import { useUser } from "../../context/UserContext";
import { addMemberTeam, createTeam } from "../../utils/TeamApiService";

const TeamConfirmScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { teamData, selectedPlayers } = route.params;

  const { token } = useUser();
  console.log(teamData);
  console.log(selectedPlayers);

  const handleSubmit = async () => {
    try {
      const team = await createTeam(teamData, token);
      if (selectedPlayers.length > 0) {
        const result = selectedPlayers.map((id) => ({
          userId: id,
          isCaptain: false,
          isAdmin: false,
        }));

        await addMemberTeam(team.id, result);
      }

      console.log("başarılı");
      
    } catch (error) {
      console.log(error);
    }

    // navigation.replace("TeamStack", { screen: "Takımım" })
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleSubmit}>Oluştur</Button>,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.teamName}>{teamData.name}</Text>

      <Image
        source={teamData.logoUrl}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.city}>
        {teamData.city} / {teamData.town}
      </Text>
      <View style={styles.playersContainer}>
        <Text style={styles.playersTitle}>Oyuncular</Text>

        {selectedPlayers.length > 0 ? (
          <FlatList
            data={selectedPlayers}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Player name={item.name} userName={item.userName} />
            )}
          />
        ) : (
          <Text style={styles.noPlayersText}>Henüz oyuncu eklenmedi</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  city: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  playersContainer: {
    flex: 1,
    padding: 12,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    margin: 15,
    color: "#333",
  },
  listContent: {
    paddingBottom: 10,
  },
  noPlayersText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default TeamConfirmScreen;
