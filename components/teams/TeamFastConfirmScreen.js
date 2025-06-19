import { useNavigation, useRoute } from "@react-navigation/native";
import {  FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Player from "./Player";
import { useLayoutEffect } from "react";
import Button from "../UI/Button";

const TeamFastConfirmScreen = ({teamName, selectedPlayers}) => {
 
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.teamName}>{teamName}</Text>

      <Image
        source={require("../../assets/team-logo/takim2.png")}
        style={styles.image}
        resizeMode="contain"
      />

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
  playersContainer: {
    flex: 1,
    padding: 12,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    margin: 15,
    color: "#333"
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

export default TeamFastConfirmScreen;
