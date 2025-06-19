import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import {
  getFieldCommentsById,
  getTeamCommentsById,
  getUserCommentsById,
} from "../../utils/CommentApiService";
import { FAB } from "react-native-paper";
import { useBottomSheet } from "../../BottomSheetContext";
import RatingScreen from "../../Comment";

const CommentScreen = ({ id, commentType, myProfile = false }) => {
  const [comments, setComments] = useState([]);

  const { openSheet } = useBottomSheet();

  useEffect(() => {
    fetchComments();
  }, [id, commentType]);

  const fetchComments = async () => {
    let commentData = [];

    if (commentType === "Team") {
      commentData = await getTeamCommentsById(id);
    } else if (commentType === "Field") {
      commentData = await getFieldCommentsById(id);
    } else if (commentType === "User")
      commentData = await getUserCommentsById(id);

    // Sort comments by date (newest first)
    const sortedComments = [...commentData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Descending order (newest first)
    });

    setComments(sortedComments);
  };

  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return "0.0";

    const totalRating = comments.reduce((sum, comment) => {
      return sum + parseFloat(comment.rating);
    }, 0);

    const averageRating = totalRating / comments.length;
    return averageRating.toFixed(1);
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const handleComment = () => {
    openSheet(
      <RatingScreen
        toId={id}
        fetchComments={fetchComments}
        commentType={commentType}
      />
    );
  };

  return (
    <View style={styles.containerComment}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={18} color="#f2ab19" />
          <Text style={styles.averageRating}>
            {calculateAverageRating(comments)}
          </Text>
          <Text style={styles.commentCount}>({comments.length} yorum)</Text>
        </View>
      </View>

      <FlatList
        data={comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CommentCard
            firstName={item.firstName}
            lastName={item.lastName}
            userPhotoUrl={item.userPhotoUrl}
            fromUserId={item.fromUserId}
            commentText={item.content}
            rating={item.rating}
            date={formatDate(item.createdAt)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz yorum bulunmamaktadır.</Text>
        }
      />

      {!myProfile && (
        <FAB style={styles.fab} icon="pencil" onPress={handleComment} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerComment: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  averageRating: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 4,
    marginRight: 4,
  },
  commentCount: {
    fontSize: 14,
    color: "#666",
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#888",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});

export default CommentScreen;
