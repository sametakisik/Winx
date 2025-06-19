import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import AnnouncementCard from "./AnnouncementCard";
import { useBottomSheet } from "../../BottomSheetContext";
import AnnouncementCreate from "./AnnouncementCreate";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "../../utils/AnnouncementsApiService";
import { Colors } from "../../constants/Colors";

const data = [
  {
    title: "Sular akmıyor",
    content:
      "Sular kesik olduğu için akmıyor. Lütfen su kullanımında tasarruflu olunuz. Suyun tekrar verilmesiyle ilgili bilgi verilecektir.",
    endTime: "15/05/2025",
    photoFile: require("../../assets/saha.jpg"),
  },
  {
    title: "Elektrik yok",
    content:
      "Bakım nedeniyle elektrikler kesildi. Tahmini çalışma süresi 3 saattir.",
    endTime: "15/05/2025",
  },
  {
    title: "Yol çalışması",
    content:
      "Asfalt yenileme çalışmaları başladı. 15 Mayıs - 20 Mayıs tarihleri arasında alternatif yolları kullanınız.",
    endTime: "20/05/2025",
  },
  {
    title: "Su arızası giderildi",
    content:
      "Su tekrar verilmeye başlandı. İlk başlarda suyun renginde bulanıklık olabilir, bir süre akıttıktan sonra normale dönecektir.",
    endTime: "15/05/2025",
    photoFile: require("../../assets/saha.jpg"),
  },
];

const AnnouncementScreen = ({ facilityId }) => {
  const { openSheet } = useBottomSheet();
  const [announcements, setAnnouncements] = useState([]);


  useEffect(() => {
    const fetchAnnouncement = async () => {
      const announcement = await getAnnouncementById(facilityId);
      setAnnouncements(announcement);
    };
    fetchAnnouncement();
  }, [facilityId]);

  const fetchAnnouncement = async () => {
    const announcement = await getAnnouncementById(facilityId);
    setAnnouncements(announcement);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tesis Duyuruları</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() =>
            openSheet(<AnnouncementCreate facilityId={facilityId} fetchAnnouncement={fetchAnnouncement}/>, [
              "65%",
              "80%",
              "85%",
            ])
          }
        >
          <Text style={styles.newButtonText}>Yeni Duyuru</Text>
  
      
        </TouchableOpacity>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <AnnouncementCard
            id={item.id}
            title={item.title}
            content={item.content}
            endTime={item.endTime}
            photoFile={item.bannerUrl}
            fetchAnnouncement={fetchAnnouncement}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  newButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default AnnouncementScreen;
