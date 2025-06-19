import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const NotificationsScreen = () => {
  const [notificationsData, setNotificationsData] = useState([
    {
      id: "1",
      title: "Yeni bir takıma eklendiniz",
      description: "Yeni bir mesajınız var.",
      date: "2025-04-26",
      read: false,
      response: null, // kabul/reddet durumu
    },
    {
      id: "2",
      title: "@aliduru sizi arkadaş olarak ekledi.",
      description: "Uygulamanız güncellendi.",
      date: "2025-04-25",
      read: true,
      response: null,
    },
    {
      id: "3",
      title: "Bir maça davet edildiniz.",
      description: "Bugün yapılacak bir etkinlik var.",
      date: "2025-04-24",
      read: false,
      response: null,
    },
  ]);

  const handleResponse = (id, userResponse) => {
    setNotificationsData((prevNotifications) =>
      prevNotifications.map((item) =>
        item.id === id
          ? { ...item, response: userResponse, read: true }
          : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
    >
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.expandedArea}>
        <Text style={styles.description}>{item.description}</Text>

        {item.response ? (
          <Text style={styles.responseText}>
            {item.response === "accepted" ? "Kabul edildi." : "Reddedildi."}
          </Text>
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleResponse(item.id, "accepted")}
            >
              <Text style={styles.buttonText}>Kabul Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => handleResponse(item.id, "rejected")}
            >
              <Text style={styles.buttonText}>Reddet</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  notificationItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  unreadNotification: {
    backgroundColor: "#d1e7dd",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  expandedArea: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 0.48,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  responseText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default NotificationsScreen;
