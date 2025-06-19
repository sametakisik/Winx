import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Avatar, Divider, Text } from "react-native-paper";
import { getFriendsById } from "../../utils/FriendshipApiService";
import { useUser } from "../../context/UserContext";

const FriendList = () => {
  const route = useRoute();
  const { userId, userName } = route.params;

  const {token} = useUser()

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `@${userName}'ın Arkadaşları`,
    });
  }, [navigation, userName, userId]);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const friend = await getFriendsById(userId, token);
      console.error("aaa" , friend.user1Info)
      setFriends(friend.user1Info);
    };
    fetchFriends();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.listItem}>
        <Avatar.Text
          size={48}
          label={`${item.firstname[0]}${item.lastname[0]}`}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text
            style={styles.name}
          >{`${item.firstname} ${item.lastname}`}</Text>
          <Text style={styles.username}>{`@${item.userName}`}</Text>
        </View>
      </View>
      <Divider />
    </View>
  );

  return (
    <FlatList
      data={friends}
      renderItem={renderItem}
      keyExtractor={(item) => item?.userId?.toString()}
      contentContainerStyle={styles.container}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  avatar: {
    backgroundColor: "#6200ee",
    marginRight: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
});

export default FriendList;
