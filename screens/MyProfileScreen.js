import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import ProfileDetails from "../components/profile/ProfileDetails";
import Button from "../components/UI/Button";
import ProfileComment from "../components/profile/ProfileComment";
import { useUser } from "../context/UserContext";
import CustomTabBar from "../components/others/CustomTabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import { Divider, List } from "react-native-paper";
import CommentScreen from "../components/others/CommentScreen";

const MyProfileScreen = () => {
  const navigation = useNavigation();

  const { userType, user, token } = useUser();

  const Tab = createMaterialTopTabNavigator();

  useLayoutEffect(() => {
    navigation.setOptions({
      title:"@" + user.userName,
    });
  }, [navigation]);

  const Teams = () => {
    return (
      <View>
        {!user.teams || user.teams.length === 0 ? (
          <Text style={styles.emptyText}>
            Kullanıcının üye olduğu takım bulunmamaktadır.
          </Text>
        ) : (
          <FlatList
            data={user.teams}
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
                {index < user.teams.length - 1 && (
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
    <View style={{ flex: 1 }}>
      <ProfileCard
        userId={user.id}
        userName={user.userName}
        firstName={user.firstName}
        lastName={user.lastName}
        avgRating= {user.avgRating}
      />
      <ProfileDetails
        city={user.city}
        playingPosition={user.playingPosition}
        weight={user.weight}
        height={user.height}
        birthday={user.birthday}
        footPreference={user.footPreference}
      />
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Takımlar"
          component={() => <Teams />}
          options={{ tabBarLabel: `Takımlar (${user?.teams?.length})` }}
        />
        <Tab.Screen
          name="Yorumlar"
          component={() => (
            <CommentScreen id={user.id} commentType="User" myProfile={true} />
          )}
          options={{ tabBarLabel: "Yorumlar" }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MyProfileScreen;
