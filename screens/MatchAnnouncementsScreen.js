import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import RecentMatchCard from "../components/match/RecentMatchCard";

import MatchScreen from "./MatchScreen";
import JoinMatchModal from "../components/match/JoinMatchModal";
import { useBottomSheet } from "../BottomSheetContext";

const DUMMY_MATCHES = [
  {
    id: "1",
    location: "KADIKÖY ",
    field: "Barankaya",
    dateTime: "20 Mayıs 22:00",
    creative: "@aliduru",
  },
  {
    id: "2",
    location: "KADIKÖY",
    field: "Barankaya",
    dateTime: "20 Mayıs 22:00",
    creative: "@aliduru",
  },
  {
    id: "3",
    location: "KADIKÖY",
    field: "Barankaya",
    dateTime: "20 Mayıs 22:00",
    creative: "@aliduru",
  },
  {
    id: "4",
    location: "KADIKÖY",
    field: "Barankaya",
    dateTime: "20 Mayıs 22:00",
    creative: "@aliduru",
  },
  {
    id: "5",
    location: "KADIKÖY",
    field: "Barankaya",
    dateTime: "20 Mayıs 22:00",
    creative: "@aliduru",
  },
];

const MatchAnnouncements = () => {
  const { openSheet } = useBottomSheet();

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_MATCHES}
        keyExtractor={(item) => item.id} // Her öğe için benzersiz key
        renderItem={({ item }) => (
          <RecentMatchCard
            location={item.location}
            field={item.field}
            dateTime={item.dateTime}
            creative={item.creative}
          />
        )}
      />
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default MatchAnnouncements;
