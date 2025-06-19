import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MatchDetail from "../components/match/MatchDetail.js";
import PersonLabel from "../components/others/PersonLabel.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  getParticipantsById,
  getRoomById,
  joinRoomWithTeam,
  leaveRoom,
  readyTeam,
  readyTeams,
} from "../utils/RoomApiService.js";
import TeamListProfile from "../components/teams/TeamListProfile.js";
import { Dialog, IconButton, Menu, Portal, Button } from "react-native-paper";
import { useUser } from "../context/UserContext.js";

const HOME_TEAM = [
  {
    userId: 1,
    userName: "futbolcu01",
    fullName: "Ali Yılmaz",
    positions: [],
    isReady: true,
  },
  {
    userId: 2,
    userName: "saha_kaplan",
    fullName: "Mert Çelik",
    positions: [],
    isReady: false,
  },
  {
    userId: 3,
    userName: "angaramesi",
    fullName: "Anıl Karmançorman",
    positions: [],
    isReady: true,
  },
  {
    userId: 4,
    userName: "kralgolcu",
    fullName: "Burak Demir",
    positions: [],
    isReady: true,
  },
  {
    userId: 5,
    userName: "asistcanavari",
    fullName: "Can Aydın",
    positions: [],
    isReady: false,
  },
  {
    userId: 6,
    userName: "defans_abi",
    fullName: "Ömer Sağlam",
    positions: [],
    isReady: true,
  },
  {
    userId: 7,
    userName: "kaleci61",
    fullName: "Serkan Yıldız",
    positions: [],
    isReady: true,
  },
  {
    userId: 8,
    userName: "topcu08",
    fullName: "Emre Altun",
    positions: [],
    isReady: false,
  },
];

const AWAY_TEAM = [
  {
    userId: 9,
    userName: "golkrali22",
    fullName: "Taylan Koç",
    positions: [],
    isReady: true,
  },
  {
    userId: 10,
    userName: "orta_saha10",
    fullName: "Yusuf Aksoy",
    positions: [],
    isReady: true,
  },
  {
    userId: 11,
    userName: "fırtına7",
    fullName: "Cem Gürbüz",
    positions: [],
    isReady: false,
  },
  {
    userId: 12,
    userName: "taktik_usta",
    fullName: "Faruk Güneş",
    positions: [],
    isReady: true,
  },
  {
    userId: 13,
    userName: "yedek_parca",
    fullName: "Selim Taş",
    positions: [],
    isReady: false,
  },
  {
    userId: 14,
    userName: "beko1903",
    fullName: "Baran Kılıç",
    positions: [],
    isReady: true,
  },
];

const MatchScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { roomId } = route.params;
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleLeave, setVisibleLeave] = useState(false);

  const { token } = useUser();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Menu
            visible={visibleMenu}
            onDismiss={() => setVisibleMenu(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={24}
                onPress={() => setVisibleMenu(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setVisibleMenu(false);
                // Paylaş işlemi
              }}
              title="Paylaş"
            />
            <Menu.Item
              onPress={() => {
                setVisibleMenu(false);
                // Bildir işlemi
              }}
              title="Bildir"
            />
            <Menu.Item
              onPress={async () => {
                setVisibleLeave(true);
              }}
              title="Odadan Ayrıl"
            />
          </Menu>
        </View>
      ),
    });
  }, [navigation, visibleMenu]);

  const [room, setRoom] = useState({});
  useEffect(() => {
    const fetchRooms = async () => {
      const room = await getRoomById(roomId, token);
      setRoom(room);
    };

    fetchRooms();
  }, [roomId]);
  console.log(room);

  const [homeTeam, setHomeTeam] = useState([]);
  const [awayTeam, setAwayTeam] = useState([]);
  useEffect(() => {
    const fetchParticipants = async () => {
      const part = await getParticipantsById(roomId);
      setHomeTeam(part.homeTeam.members);
      setAwayTeam(part.awayTeam.members);
    };

    fetchParticipants();
  }, [roomId]);
  console.log(homeTeam);
  console.log(awayTeam);

  const [visible, setVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const joinRoom = async () => {
    try {
      await joinRoomWithTeam(roomId, selectedTeam);
      console.log("başarılı");
      setVisible(false);
    } catch (error) {
      console.log("Hata", error);
    }
  };

  const formatDateToTurkish = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const readyTeam = async (teamId) => {
    try {
      await readyTeams(roomId, teamId);
      console.log("başarılı");
      setVisible(false);
    } catch (error) {
      console.log("Hata", error);
    }
  };

  const leaveRooms = async () => {
    setVisibleMenu(false);
    await leaveRoom(roomId, token);
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <MatchDetail
          homeTeamName={room.homeTeamName}
          awayTeamName={room.awayTeamName}
          fieldName={room.fieldName}
          fieldId={room.fieldId}
          dateTime={formatDateToTurkish(room.slotStart)}
        />
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.teams}>
            {HOME_TEAM.slice(0, room.maxPlayers / 2).map((item, index) => (
              <View key={item.id || index}>
                <PersonLabel isReady={item.isReady} userName={item.userName} />
              </View>
            ))}

            {HOME_TEAM.length < room.maxPlayers / 2 && (
              <Text>{room.maxPlayers / 2 - HOME_TEAM.length} oyuncu eksik</Text>
            )}

            {room.maxPlayers / 2 - HOME_TEAM.length > 0 &&
              room.status === "HomeTeamAdmin" && (
                <Button
                  onPress={() =>
                    navigation.navigate("Oyuncu Bul", {
                      teamId: room.homeTeamId,
                      teamName: room.homeTeamName,
                      roomId: room.roomId,
                      screenType: "Room",
                    })
                  }
                >
                  Oyuncu bul
                </Button>
              )}

            {room.status === "HomeTeamAdmin" &&
              room.maxPlayers / 2 - HOME_TEAM.length > 0 && (
                <Button
                  mode="contained"
                  onPress={() => readyTeam(room.homeTeamId)}
                >
                  Hazır Ver
                </Button>
              )}
          </View>

          {room.awayTeamId ? (
            <View style={styles.teams}>
              {AWAY_TEAM.slice(0, room.maxPlayers / 2).map((item, index) => (
                <View key={item.id || index}>
                  <PersonLabel
                    isReady={item.isReady}
                    userName={item.userName}
                  />
                </View>
              ))}
              {AWAY_TEAM.length < room.maxPlayers / 2 && (
                <View>
                  <Text>
                    {room.maxPlayers / 2 - AWAY_TEAM.length} oyuncu eksik
                  </Text>
                  {room.maxPlayers / 2 - AWAY_TEAM.length > 0 &&
                    room.status === "AwayTeamAdmin" && (
                      <Button
                        onPress={() =>
                          navigation.navigate("Oyuncu Bul", {
                            teamId: room.awayTeamId,
                            teamName: room.awayTeamName,
                            roomId: room.roomId,
                            screenType: "Room",
                          })
                        }
                      >
                        Oyuncu bul
                      </Button>
                    )}

                  {room.status === "AwayTeamAdmin" && (
                    <Button
                      mode="contained"
                      onPress={() => readyTeam(room.awayTeamId)}
                    >
                      Hazır Ver
                    </Button>
                  )}
                </View>
              )}
            </View>
          ) : (
            <Button onPress={() => setVisible(true)}>Takımınla Katıl</Button>
          )}
        </View>
      </ScrollView>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Takım Seçin</Dialog.Title>
          <Dialog.Content>
            <Text>Aşağıda yöneticisi olduğunuz takımlardan birini seçin.</Text>
            <TeamListProfile
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>İptal</Button>
            <Button onPress={joinRoom}>Onayla</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visibleLeave} onDismiss={() => setVisibleLeave(false)}>
          <Dialog.Title>Odadan Ayrılmak Üzeresiniz</Dialog.Title>
          <Dialog.Content>
            <Text>Onaylıyor musunuz musunuz?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleLeave(false)}>İptal</Button>
            <Button onPress={leaveRooms}>Evet</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  teams: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "45%",
  },
});

export default MatchScreen;
