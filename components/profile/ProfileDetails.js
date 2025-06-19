import { View, Text, StyleSheet } from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const ProfileDetails = ({
  city,
  playingPosition,
  weight,
  height,
  birthday,
  footPreference,
}) => {
  function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Eğer doğum günü bu yıl henüz geçmediyse yaş bir eksik olmalı
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  function convertHeightToMeters(heightCm) {
    // Sayıyı stringe çevir, ardından virgülden önce ve sonra parçala
    const heightStr = heightCm?.toString();

    if (heightStr?.length < 2) return "0," + heightStr; // Örn: 5 -> "0,5"

    const meters = heightStr?.slice(0, -2); // İlk kısmı: 1
    const centimeters = heightStr?.slice(-2); // Son iki rakam: 75

    return `${meters},${centimeters}`;
  }
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.row}>
        <View style={styles.detailItem}>
          <MaterialIcons name="location-on" size={20} color="#1E88E5" />
          <Text style={styles.detailText}>{city}</Text>
        </View>

        <View style={[styles.detailItem, { marginLeft: 15 }]}>
          <FontAwesome5 name="birthday-cake" size={18} color="#FF7043" />
          <Text style={styles.detailText}>
            {calculateAge(birthday)} yaşında
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.detailItem}>
          <FontAwesome5 name="tshirt" size={18} color="#43A047" />
          <Text style={styles.detailText}>{playingPosition}</Text>
        </View>

        <View style={[styles.detailItem, { marginLeft: 15 }]}>
          <Ionicons name="football" size={20} color="#5E35B1" />
          <Text style={styles.detailText}>
            {footPreference === "Left"
              ? "Sol"
              : footPreference === "Right"
              ? "Sağ"
              : "Bilinmiyor"}{" "}
            ayak
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.detailItem}>
          <Feather name="activity" size={20} color="#E53935" />
          <Text style={styles.detailText}>
            {convertHeightToMeters(height)}8m / {weight}kg
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingStart: 50,
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 1,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    flex: 1,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileDetails;
