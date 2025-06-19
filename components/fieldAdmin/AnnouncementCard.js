import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // İstediğiniz ikon setini seçebilirsiniz (FontAwesome, Ionicons vb.)
import { deleteAnnouncement } from "../../utils/AnnouncementsApiService";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";
import { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";

const AnnouncementCard = ({
  id,
  title,
  content,
  endTime,
  photoFile,
  fetchAnnouncement,
}) => {
  const [visible, setVisible] = useState(false);

  const delete_Announcement = async () => {
    await deleteAnnouncement(id);
    await fetchAnnouncement();
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setVisible(true)
          }}
          activeOpacity={0.5}
        >
          <Icon name="delete" size={18} color="#e74c3c" />
          <Text style={styles.deleteButtonText}> Sil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{content}</Text>
      <Text style={styles.endTime}>Bitiş: {endTime}</Text>
      {photoFile && (
        <Image
          source={{ uri: BASE_URL_PHOTOS + photoFile }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Duyuruyu Silin</Dialog.Title>
          <Dialog.Content>
            <Text>Bu duyuruyu silmek istiyor musunuz?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>İptal</Button>
            <Button onPress={delete_Announcement}>Sil</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  content: {
    fontSize: 14,
    color: "#34495e",
    marginBottom: 10,
    lineHeight: 20,
  },
  endTime: {
    fontSize: 12,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default AnnouncementCard;
