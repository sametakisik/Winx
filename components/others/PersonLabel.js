import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useBottomSheet } from "../../BottomSheetContext";
import ProfileScreenOpenSheet from "../profile/ProfileScreenOpenSheet";
import { useOverlayBottomSheet } from "../../OverlayContext";

const PersonLabel = ({userName, isReady}) => {
    const {openSheet1} = useOverlayBottomSheet()

  return (
    <TouchableOpacity onPress={()=> openSheet1(<ProfileScreenOpenSheet/>, ["50%", "95%"])} activeOpacity={0.9} style={styles.container}>
      <Image source={require("../../assets/pp.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>@{userName}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.2</Text>
          </View>
          <Text style={styles.positionText}>• Orta Saha</Text>
        </View>
        <Text style={{color: "white"}}>{isReady ? "hazır" : "hazır değil"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 15,
    paddingLeft: 7,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 7,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#ecf0f1",
    marginLeft: 4,
  },
  positionText: {
    fontSize: 14,
    color: "#bdc3c7",
    fontStyle: "italic",
  },
});

export default PersonLabel;
