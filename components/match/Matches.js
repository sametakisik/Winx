import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Matches = ({ navigation }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("MatchStack", { screen: "Maç İlanları" })}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Maç Bul</Text>
          <Ionicons name="chevron-forward" size={24} color="#bdc3c7" />
        </View>
        
        <Text style={styles.subtitle}>Bölgende 5 aktif maç ilanı var</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={18} color="#2ecc71" />
            <Text style={styles.infoText}>3'ü 7x7</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={18} color="#e74c3c" />
            <Text style={styles.infoText}>2'si bugün</Text>
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
    borderColor: "#3d566e"
  },
  content: {
    padding: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ecf0f1",
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 15,
    color: "#bdc3c7",
    marginBottom: 15
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoText: {
    fontSize: 14,
    color: "#ecf0f1",
    marginLeft: 6,
    fontWeight: "500"
  }
});

export default Matches;