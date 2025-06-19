import { Image, Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { teamJoinRequest } from "../../utils/TeamApiService";
import { useUser } from "../../context/UserContext";

const MyTeam = ({teamId, name, logoUrl, city, town, playerCount, avgRating, userStatus }) => {
  const {token} = useUser()
  
  const joinRequest = async () => {
    await teamJoinRequest(token, teamId)
    console.log("başarılı");
  }
    const joinRequestCancel = async () => {
    await teamJoinRequest(token, teamId)
    console.log("başarılı");
  }
  return (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        <Image source={logoUrl} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View>
                      <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>
            {city} / {town}
          </Text>
            </View>
            <View>
            {userStatus === "NotMember" && <Button onPress={joinRequest}>Takıma Katıl</Button>}
            {userStatus === "JoinRequestPending" && <Button onPress={joinRequestCancel}>İsteği Geri Al</Button>}
 {["Member", "Captain", "CaptainAndAdmin", "Admin"].includes(userStatus) && (
    <Button onPress={joinRequest}>Üyesiniz</Button>
  )}
            </View>
          </View>
  
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerCount}</Text>
              <Text style={styles.statLabel}>Oyuncu</Text>
            </View>
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
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    margin: 10,
    marginBottom: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 20,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#3a3b3b",
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: "center",
    minWidth: 60,
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "800",
  },
});

export default MyTeam;
