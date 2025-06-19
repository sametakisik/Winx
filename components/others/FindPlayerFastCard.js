import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // ikonlar için

import Button from "../UI/Button";
import { useBottomSheet } from "../../BottomSheetContext";
import ProfileScreenOpenSheet from "../profile/ProfileScreenOpenSheet";


const FindPlayerFastCard = ({ userName, name, position, location, onPress }) => {

  const {openSheet} = useBottomSheet()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {openSheet(<ProfileScreenOpenSheet/>, ["50%" , "90%"])}}>
        <Image source={require("../../assets/pp.png")} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.position}>{position}</Text>
        </View>
        <Text style={styles.username}>{userName}</Text>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-pin" size={16} color="#777" />
          <Text style={styles.location}>{location}</Text>
        </View>
        <Button onPress={onPress}>Ekle</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    margin: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  details: {
    marginLeft: 14,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  position: {
    fontSize: 12,
    backgroundColor: "#ffe1e1",
    color: "#d11a2a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  username: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: "#777",
    marginLeft: 4,
  },
});

export default FindPlayerFastCard;
