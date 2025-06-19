import {
  Image,
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../UI/Button";
import FieldComment from "./FieldComment";
import { useState } from "react";
import { useBottomSheet } from "../../BottomSheetContext";
import { BASE_URL_PHOTOS } from "../../utils/FieldApiService";

const FieldBanner = ({ name, photoUrls, avgRating }) => {
  const { openSheet } = useBottomSheet();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require("../../assets/saha.jpg"),
    require("../../assets/saha.jpg"),
    require("../../assets/saha.jpg"),
  ];
console.log(photoUrls);

  return (
    <>
      <View style={styles.container}>
        {/* Arka Plan Resmi */}
       <Image
  source={
    photoUrls && photoUrls.length > 0
      ? { uri: BASE_URL_PHOTOS + photoUrls[0] }
      : require("../../assets/saha.jpg")
  }
  style={styles.backgroundImage}
  blurRadius={1}
/>


        {/* Koyu Overlay */}
        <View style={styles.overlay} />

        {/* İçerik */}
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color="#f2ab19" />
              <Text style={styles.ratingText}>{avgRating}</Text>
            </View>
          </View>
        </View>

        {/* Resme tıklanabilir alan */}
        <TouchableOpacity
        disabled={ !photoUrls && !photoUrls?.length > 0}
          style={StyleSheet.absoluteFill}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Resim Modalı */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            horizontal
            pagingEnabled
            data={photoUrls}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{uri: BASE_URL_PHOTOS+ item}}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  Dimensions.get("window").width
              );
              setCurrentIndex(index);
            }}
            initialScrollIndex={currentIndex}
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Kapat</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    letterSpacing: 1.5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 18,
    color: "#f2ab19",
    marginLeft: 5,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
});

export default FieldBanner;  