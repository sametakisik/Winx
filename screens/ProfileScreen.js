import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import ProfileDetails from "../components/profile/ProfileDetails";

import ProfileComment from "../components/profile/ProfileComment";
import { useUser } from "../context/UserContext";
import { friendCancelRequest, friendRequest, getUserInfos, rejectFriendship } from "../utils/FriendshipApiService";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "../components/others/CustomTabBar";
import { Button, Divider, List } from "react-native-paper";
import CommentScreen from "../components/others/CommentScreen";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const Tab = createMaterialTopTabNavigator();

  const {user, token } = useUser();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfos(userId, token);
      setUserProfile(user);
    };
    fetchUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userProfile.userName,
    });
  }, [navigation, userProfile, userId]);

  const sendFriendRequest = async () => {
  try {
    await friendRequest(token, userId);
    console.log("başarılı");

    // Durumu güncelle
    setUserProfile((prev) => ({
      ...prev,
      status: "pending",
    }));
  } catch (error) {
    console.error(error);
  }
};


const withdrawFriendRequest = async () => {
  try {
    await friendCancelRequest( user.id, userId,token,);
    console.log("başarılı");

    // Durumu güncelle
    setUserProfile((prev) => ({
      ...prev,
      status: "unfriend",
    }));
  } catch (error) {
    console.error(error);
  }
};

const removeFriend = async () => {
  try {
    await rejectFriendship( user.id, userId, token);
    console.log("başarılı");

    // Durumu güncelle
    setUserProfile((prev) => ({
      ...prev,
      status: "unfriend",
    }));
  } catch (error) {
    console.error(error);
  }
};

  const Teams = () => {
    return (
      <View>
        {!userProfile.teams || userProfile.teams.length === 0 ? (
          <Text style={styles.emptyText}>
            Kullanıcının üye olduğu takım bulunmamaktadır.
          </Text>
        ) : (
          <FlatList
            data={userProfile.teams}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.itemContainer}
                >
                  <List.Item
                    title={item.name}
                    titleStyle={styles.title}
                    description={"şehir adı gelecek"}
                    descriptionStyle={styles.description}
                    left={() => (
                      <Image source={item.photoUrl} style={styles.image} />
                    )}
                  />
                </TouchableOpacity>
                {index < userProfile.teams.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </View>
            )}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <ProfileCard
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
        photoUrl={userProfile.photoUrl}
      />
      <View style={styles.buttonContainer}>
        <Text>{userProfile.status}</Text>
        {(() => {
          switch (userProfile.status) {
            case "unfriend":
              return (
                <Button onPress={sendFriendRequest} mode="contained">
                  Arkadaş Ekle
                </Button>
              );
            case "userPending": // bana gelen istekler userPending 
              return (
                <Button onPress={withdrawFriendRequest}  mode="contained">
                  xxxx
                </Button>
              );
                 case "pending": // benim gönderdiğim pending 
              return (
                <Button onPress={withdrawFriendRequest}  mode="contained">
                  İsteği İptal Et
                </Button>
              );
              case "friend" : 
                return (
                   <Button onPress={removeFriend}  mode="contained">
                  Arkadaşlar
                </Button>
                )
            default:
              return null;
          }
        })()}

        <Button>Maç isteği gönder</Button>
      </View>
      <ProfileDetails
        city={userProfile.city}
        playingPosition={userProfile.playingPosition}
        weight={userProfile.weight}
        height={userProfile.height}
        birthday={userProfile.birthday}
        footPreference={userProfile.footPreference}
      />
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Takımlar"
          component={() => <Teams />}
          options={{ tabBarLabel: `Takımlar (${userProfile?.teams?.length})` }}
        />
        <Tab.Screen
          name="Yorumlar"
          component={() => <CommentScreen id={userId} commentType="User"/>}
          options={{ tabBarLabel: "Yorumlar" }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },

  containerTeams: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemContainer: {
    borderRadius: 8,
    marginVertical: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  selectedTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    marginHorizontal: 16,
    height: 1,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#7f8c8d",
  },
});

export default ProfileScreen;
