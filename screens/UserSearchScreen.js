import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from "react-native";
import { Divider, List, TextInput } from "react-native-paper";
import { searchUser } from "../utils/FriendshipApiService";
import { BASE_URL_PHOTOS } from "../utils/FieldApiService";
import { useUser } from "../context/UserContext";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const UserSearchScreen = () => {
  const { token } = useUser();

  const navigation = useNavigation()

  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const field = await searchUser(searchText, token);
      setUserList(field);
    };

    fetchUsers();
  }, [searchText]);

  const renderItem = ({ item }) => {
    return (
<TouchableOpacity
  onPress={() =>
    navigation.navigate("ProfileStack", {
      screen: "Profil Bilgileri",
      params: { userId: item.id },
    })
  }
>
        <List.Item
          title={`@${item.userName}`}
          description={item.fullName}
          left={() => (
            <Image
              source={{ uri: BASE_URL_PHOTOS + item.photoUrl }}
              style={styles.userImage}
            />
          )}
        />
        <Divider />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        left={<TextInput.Icon icon="magnify" />}
        outlineColor="#D1D5DB" 
        activeOutlineColor={Colors.primary} 
        mode="outlined"
        label="Kullanıcı Ara..."
        value={searchText}
        onChangeText={(value) => setSearchText(value)}
      />

      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Kişi bulunamadı.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  fullName: {
    color: "#555",
  },
  input: {
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default UserSearchScreen;
