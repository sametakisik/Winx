import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { Avatar } from "react-native-paper";

const ProfileScreen = () => {
  const { userType, user, token } = useUser();

  function formatDateToTR(isoString) {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // 0-indexli
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function getInitialsFromNames(firstName, lastName) {
    const firstInitial = firstName?.charAt(0)?.toUpperCase() || "";
    const lastInitial = lastName?.charAt(0)?.toUpperCase() || "";
    return firstInitial + lastInitial;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View style={styles.userIcon}>
          <Avatar.Text
            size={80}
            label={getInitialsFromNames(user.firstName, user.lastName)}
          />
        </View>

        <Text style={styles.username}>@{user.userName}</Text>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardItem}>
          <MaterialIcons name="email" size={24} color="#3a7bd5" />
          <View style={styles.cardText}>
            <Text style={styles.cardLabel}>E-posta</Text>
            <Text style={styles.cardValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.cardItem}>
          <MaterialCommunityIcons name="cake" size={24} color="#3a7bd5" />
          <View style={styles.cardText}>
            <Text style={styles.cardLabel}>Doğum Tarihi</Text>
            <Text style={styles.cardValue}>
              {formatDateToTR(user.birthday)}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.cardItem}>
          <MaterialIcons name="location-on" size={24} color="#3a7bd5" />
          <View style={styles.cardText}>
            <Text style={styles.cardLabel}>Adres</Text>
            <Text style={styles.cardValue}>
              {user.city} / {user.town}{" "}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  cardText: {
    marginLeft: 15,
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 3,
  },
  cardValue: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
});

export default ProfileScreen;
