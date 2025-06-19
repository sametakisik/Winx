import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBottomSheet } from "../../BottomSheetContext";
import ProfileScreenOpenSheet from "../profile/ProfileScreenOpenSheet";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";

const CommentCard = ({
  fromUserId,
  firstName,
  lastName,
  userPhotoUrl,
  commentText,
  rating,
  date,
}) => {
  const { openSheet } = useBottomSheet();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          openSheet(<ProfileScreenOpenSheet userId={fromUserId} />, [
            "50%",
          
          ])
        }
      >
        <Image
          source={
            userPhotoUrl
              ? { uri: BASE_URL_PHOTOS + userPhotoUrl }
              : require("../../assets/avatar.jpg")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {firstName} {lastName}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{Number(rating).toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.comment}>{commentText}</Text>

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    width: "100%",

    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFEEBA",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9500",
    marginLeft: 4,
  },
  comment: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
});

export default CommentCard;
