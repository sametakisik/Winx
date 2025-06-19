import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Matches from "../components/match/Matches";
import FieldCard from "../components/field/FieldCard";
import IconButton from "../components/UI/IconButton";
import { useBottomSheet } from "../BottomSheetContext";
import SelectLocation from "../components/others/SelectLocation";
import { useEffect, useState } from "react";
import PitchFilterScreen from "../components/field/FieldFilter";
import FindPlayer from "../FindPlayerCard";
import City from "../components/others/City";
import FacilityCard from "../components/fieldAdmin/FacilityCard";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { getFacilityByOwnerId } from "../utils/FacilityApiService";
import FacilityCardOwner from "../components/fieldAdmin/FacilityCardOwner";
import { FAB, Portal, Provider } from "react-native-paper";

const HomeScreenOwner = () => {
   const {userId} = useUser()

  const navigation = useNavigation();

  const [fabOpen, setFabOpen] = useState(false);

  const [facilities, setFacilities] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const facilities = await getFacilityByOwnerId(userId);
      setFacilities(facilities);

      const allFields = facilities.flatMap((f) => f.fields || []);
      setFields(allFields);
    };

    fetchFacilities();
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.sahalarText}>Tesisleriniz</Text>
       

        <FlatList
          data={facilities}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          horizontal
          //showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FacilityCardOwner
              name={item.name}
              logoUrl={item.logoUrl}
              onPress={() =>
                navigation.navigate("FieldStack", {
                  screen: "Tesis Detayları",
                  params: { facilityId: item.id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tesisiniz Bulunmamaktadır.</Text>
            </View>
          }
        />

        <Text style={styles.sahalarText}>Sahalarınız</Text>
        <FlatList
          data={fields}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FieldCard
              name={item.name}
              rating={item.rating}
              price={item.price}
              city={item.city}
              district={item.district}
              onPress={() =>
                navigation.navigate("FieldStack", {
                  screen: "Saha Detayları",
                  params: { fieldId: item.id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Sahanız Bulunmamaktadır.
              </Text>
            </View>
          }
        />
        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? "close" : "plus"}
            actions={[
              {
                icon: "home-plus",
                label: "Tesis Ekle",
                onPress: () =>
                  navigation.navigate("FieldStack", {
                    screen: "Yeni Tesis Oluştur",
                  }),
              },
              {
                icon: "soccer-field",
                label: "Saha Ekle",
                onPress: () =>
                  navigation.navigate("FieldStack", {
                    screen: "Tesis Seçin",
                  }),
              },
            ]}
            onStateChange={({ open }) => setFabOpen(open)}
            onPress={() => {
              if (fabOpen) {
                // Menü açıkken ikonun üstüne basıldığında yapılacak işlemler (gerekirse)
              }
            }}
          />
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  sahalarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default HomeScreenOwner;
