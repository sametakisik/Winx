import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";
import { useNavigation } from "@react-navigation/native";


const ProfileCard = ({userId,userName, firstName, lastName, photoUrl, avgRating }) => {
  const navigation = useNavigation()

  return (
 <View style={[styles.card,]} >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: BASE_URL_PHOTOS + photoUrl }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={()=>
               navigation.navigate("ProfileStack" , {
                screen: "Arkadaşlar",
                params: {userId: userId, userName: userName}
               })}>
              <Text style={styles.statValue}>35</Text>
              <Text style={styles.statLabel}>Arkadaş</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>Maç</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{avgRating}</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
   backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    minWidth: 60,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
});

export default ProfileCard;
