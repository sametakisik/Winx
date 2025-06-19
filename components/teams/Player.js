import { Image, StyleSheet, Text, View } from "react-native";

const Player = ({image, name, userName}) => {
    return    <View style={styles.playerCard}>
    <Image source={require("../../assets/pp.png")} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.username}>{userName}</Text>
  </View>
}

const styles = StyleSheet.create({
  playerCard: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 130
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
});

export default Player