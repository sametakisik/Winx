import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const UpcomingMatchCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("MatchStack", { screen: "Maç Detayları" })
      }
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Yaklaşan maç</Text>
          <Ionicons name="chevron-forward" size={24} color="#bdc3c7" />
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.team}>
            <Image
              source={require("../../assets/team-logo/1.png")}
              style={styles.logo}
            />
            <Text style={styles.teamName}>GALATASARAY</Text>
          </View>

          <Text style={styles.vsText}>VS</Text>

          <View style={styles.team}>
            <Image
              source={require("../../assets/team-logo/2.png")}
              style={styles.logo}
            />
            <Text style={styles.teamName}>FENERBAHÇE</Text>
          </View>
        </View>

        <View style={styles.matchInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={18} color="#2ecc71" />
            <Text style={styles.infoText}>Barankaya</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={18} color="#e74c3c" />
            <Text style={styles.infoText}>Bugün 19:00</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#34495e",
    width: "90%",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#3d566e",
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ecf0f1",
    letterSpacing: 0.5,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  team: {
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ecf0f1",
    textAlign: "center",
    textTransform: "uppercase",
  },
  vsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#bdc3c7",
    marginHorizontal: 10,
  },
  matchInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#3d566e",
    paddingTop: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#ecf0f1",
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default UpcomingMatchCard;
