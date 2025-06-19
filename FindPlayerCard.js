import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "./components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { useBottomSheet } from "./BottomSheetContext";
import ProfileScreenOpenSheet from "./components/profile/ProfileScreenOpenSheet";
import { BASE_URL_PHOTOS } from "./utils/FieldApiService";

const FindPlayerCard = ({
  userId,
  addPlayer,
  photoUrl,
  userName,
  name,
  position,
  location,
  onPress,
}) => {
  const { openSheet } = useBottomSheet();
const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => openSheet(<ProfileScreenOpenSheet navigation={navigation} userId={userId}/>, ["50%"])}
        activeOpacity={0.7}
      >
        <Image
          source={
            photoUrl
              ? { uri: BASE_URL_PHOTOS + photoUrl }
              : require("./assets/pp.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>4.2</Text>
          </View>
        
        </View>

        <Text style={styles.username}>@{userName}</Text>

        <View style={styles.bottomRow}>
          <View
            style={[
              styles.positionContainer,
              position === "Kaleci" && styles.goalkeeper,
            ]}
          >
            <Text style={styles.positionText}>{position}</Text>
          </View>
          <Button
            onPress={addPlayer}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            Ekle
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#F1F5F9",
  },
  details: {
    marginLeft: 16,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF9C3",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B45309",
    marginLeft: 2,
  },
  positionContainer: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  goalkeeper: {
    backgroundColor: "#FECDD3",
  },
  positionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#166534",
  },
  username: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 4,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#16A34A",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});

export default FindPlayerCard;
