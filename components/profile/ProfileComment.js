import { View, FlatList, Text, StyleSheet } from "react-native";
import CommentCard from "../others/CommentCard";
import IconButton from "../UI/IconButton";

import RatingScreen from "../../Comment";
import { useBottomSheet } from "../../BottomSheetContext";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const ProfileComment = () => {
  const {openSheet} = useBottomSheet();

  const comments = [
    {
      id: "1",
      username: "mehmetyilmaz",
      commentText: "Çok iyi futbolcu, mükemmel pas atıyor",
      rating: 5,
      date: "10.05.2025",
    },
    {
      id: "2",
      username: "ayse_kaya",
      commentText: "Harika bir forvet oyuncusu",
      rating: 4,
      date: "08.05.2025",
    },
    {
      id: "3",
      username: "demir_futbol",
      commentText: "Takım arkadaşlarıyla uyumu mükemmel",
      rating: 5,
      date: "05.05.2025",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.title}>Yorumlar ({comments.length})</Text>
        <IconButton
          icon="pencil"
          size={20}
          paddingBottom={2}
          onPress={() => openSheet(
            <View style={{ padding: 20, flex: 1 }}>
                <RatingScreen />
            </View>
          )}
        />
      </View>

      <BottomSheetFlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard
            firstName={item.firstName}
            lastName={item.lastName}
            userPhotoUrl={item.userPhotoUrl}
            commentText={item.commentText}
            rating={item.rating}
            date={item.date}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    maxHeight: 300,
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  layout: {
    flexDirection: "row",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  separator: {
    height: 12,
  },
});

export default ProfileComment;
