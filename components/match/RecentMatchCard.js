import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RecentMatchCard = ({ location, field, dateTime, creative }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Maç Detayları")}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.leftSection}>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.matchTitle}>{field}</Text>
        <Text style={styles.dateTime}>🕒 {dateTime}</Text>
        <Text style={styles.host}>{creative}'nun maç ilanı</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.players}>
          <Ionicons name="people" size={20} color="#fff" />
          <Text style={styles.playersText}>10/14</Text>
        </View>
        <Text style={styles.price}>💰 200$</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2c3e50",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
  },
  location: {
    fontSize: 12,
    color: "#f39c12",
    fontWeight: "bold",
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ecf0f1",
  },
  dateTime: {
    fontSize: 14,
    color: "#bdc3c7",
  },
  host: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#95a5a6",
    marginTop: 4,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  players: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16a085",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  playersText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: 6,
  },
});

export default RecentMatchCard;
