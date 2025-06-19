import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAllRooms, inviteUsersRoom } from "../../utils/RoomApiService";
import { useNavigation } from "@react-navigation/native";
import TeamListProfile from "../teams/TeamListProfile";

const RoomsScreen = () => {
  const navigation = useNavigation();
const [refreshing, setRefreshing] = useState(false);

  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="pound" onPress={() => setVisible(true)} />
      ),
    });
  }, [navigation]);

  const [rooms, setRooms] = useState([]);

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchRooms(); // odaları tekrar çek
  setRefreshing(false);
};


 
    const fetchRooms = async () => {
      const room = await getAllRooms();
      setRooms(room);
    };

  const joinCode = async () => {
    try {
      const room = await inviteUsersRoom(code, selectedTeam);
      setVisible(false);
      navigation.navigate("MatchStack", {
        screen: "Maç Detayları",
        params: { roomId: room.roomId },
      });
      setCode("")
      setSelectedTeam(null)
    } catch (error) {
 let errorMessage = "Bilinmeyen bir hata oluştu.";
  
  // Eğer error response veriyorsa
  if (error?.StatusCode && error?.Message) {
    errorMessage = error.Message;
  } else if (error?.response?.data?.Message) {
    // Axios kullanıyorsan bu yapıyı kullanabilirsin
    errorMessage = error.response.data.Message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
   Alert.alert("Hata", errorMessage);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate("MatchStack", {
            screen: "Maç Detayları",
            params: { roomId: item.roomId },
          })
        }
      >
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {item.fieldName}
          </Text>

          {/* Teams section */}
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              {item.homeTeamPhoto ? (
                <Image
                  source={{ uri: item.homeTeamPhoto }}
                  style={styles.teamPhoto}
                />
              ) : (
                <Text style={styles.photoPlaceholder}>?</Text>
              )}
              <Text style={styles.teamName}>
                {item.homeTeamName || "Takım Aranıyor"}
              </Text>
            </View>

            <Text style={styles.vsText}>vs</Text>

            <View style={styles.teamContainer}>
              {item.awayTeamPhoto ? (
                <Image
                  source={{ uri: item.awayTeamPhoto }}
                  style={styles.teamPhoto}
                />
              ) : (
                <Text style={styles.photoPlaceholder}>?</Text>
              )}
              <Text style={styles.teamName}>
                {item.awayTeamName || "Takım Aranıyor"}
              </Text>
            </View>
          </View>

          {/* Icons row */}
          <View style={styles.iconsRow}>
            {/* Date/Time */}
            <View style={styles.iconContainer}>
              <Icon name="calendar-clock" size={20} color="#555" />
              <Text style={styles.iconText}>
                {new Date(item.slotStart).toLocaleDateString("tr-TR", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {/* Max Players */}
            <View style={styles.iconContainer}>
              <Icon name="account-group" size={20} color="#555" />
              <Text style={styles.iconText}>{item.maxPlayers}</Text>
            </View>

            {/* Price */}
            <View style={styles.iconContainer}>
              <Icon name="cash" size={20} color="#555" />
              <Text style={styles.iconText}>
                {item.pricePerPlayer.toFixed(2)}€
              </Text>
            </View>

            {/* Access Type */}
            <View style={styles.iconContainer}>
              {item.accessType === "Public" ? (
                <Icon name="lock-open-variant" size={20} color="#4CAF50" />
              ) : (
                <Icon name="lock" size={20} color="#F44336" />
              )}
              <Text
                style={[
                  styles.iconText,
                  item.accessType === "Public"
                    ? styles.publicText
                    : styles.privateText,
                ]}
              >
                {item.accessType}
              </Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                item.status === "Confirmed"
                  ? styles.confirmedStatus
                  : styles.pendingStatus,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.roomId.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
          refreshing={refreshing}          // << burası önemli
  onRefresh={onRefresh}      
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Gizli Odaya Katıl</Dialog.Title>

          <Dialog.Content>
            <TextInput
              label="Oda Kodu"
              placeholder="Sizinle paylaşılan oda kodunu girin"
              value={code}
              onChangeText={setCode}
              maxLength={6}
              mode="outlined"
              style={{
                height: 60,
                fontSize: 18,
                backgroundColor: "#fff",
                marginTop: 10,
              }}
              underlineColor="transparent"
            />
            <TeamListProfile
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>İptal</Button>
            <Button onPress={joinCode}>Katıl</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 8,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: "white",
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  teamContainer: {
    alignItems: "center",
    flex: 1,
  },
  teamPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  photoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    marginBottom: 5,
    color: "#888",
  },
  teamName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    color: "#444",
  },
  vsText: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#888",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 8,
  },
  iconContainer: {
    alignItems: "center",
    flex: 1,
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
  },
  publicText: {
    color: "#4CAF50",
  },
  privateText: {
    color: "#F44336",
  },
  statusContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  confirmedStatus: {
    color: "#4CAF50",
  },
  pendingStatus: {
    color: "#FF9800",
  },
});

export default RoomsScreen;
