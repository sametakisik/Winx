import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
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
import UpcomingMatchCard from "../components/match/UpcomingMatchCard";
import { getAllFields } from "../utils/FieldApiService";
import { getFacilityByOwnerId } from "../utils/FacilityApiService";
import FacilityCard from "../components/field/FacilityCard";
import { useUser } from "../context/UserContext";



const HomeScreen = ({ navigation }) => {
  const { openSheet } = useBottomSheet();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);


  const [selectedView, setSelectedView] = useState("Sahalar");

  const [fields, setFields] = useState([]);
  useEffect(() => {
    const fetchFields = async () => {
      const field = await getAllFields();
      setFields(field);
    };

    fetchFields();
  }, []);

  const [facilities, setFacilities] = useState([]);
  useEffect(() => {
    const fetchFacilities = async () => {
      const facility = await getFacilityByOwnerId();
      setFacilities(facility);
    };

    fetchFacilities();
  }, []);

  const handleLocationChange = (city, district) => {
    setSelectedCity(city);
    setSelectedDistrict(district);
  };

  const clearFilters = () => {
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  // Filtreleme fonksiyonu
  const filteredFields = fields.filter((field) => {
    const cityMatch = !selectedCity || field.city === selectedCity;
    const districtMatch =
      !selectedDistrict || field.district === selectedDistrict;
    return cityMatch && districtMatch;
  });

  return (
    <View style={styles.container}>
      <Matches navigation={navigation} />

      <View style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => setSelectedView("Sahalar")}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.sahalarText,
                selectedView === "Sahalar" && { fontSize: 24, fontWeight: 700 },
              ]}
            >
              Sahalar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedView("Tesisler")}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.sahalarText,
                selectedView === "Tesisler" && {
                  fontSize: 24,
                  fontWeight: 700,
                },
              ]}
            >
              Tesisler
            </Text>
          </TouchableOpacity>
        

          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.locationButton}
              onPress={() =>
                openSheet(
                  <View style={styles.sheetContainer}>
                    <SelectLocation
                      onLocationChange={handleLocationChange}
                      selectedCity={selectedCity}
                      selectedDistrict={selectedDistrict}
                    />
                    <City />
                  </View>,
                  ["40%"]
                )
              }
            >
              <IconButton
                icon="location"
                size={20}
                onPress={() =>
                  openSheet(
                    <View style={styles.sheetContainer}>
                      <SelectLocation
                        onLocationChange={handleLocationChange}
                        selectedCity={selectedCity}
                        selectedDistrict={selectedDistrict}
                      />
                      <City />
                    </View>,
                    ["40%"]
                  )
                }
              />
              {selectedCity || selectedDistrict ? (
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationText}>
                    {selectedCity && `${selectedCity}`}
                    {selectedDistrict && `, ${selectedDistrict}`}
                  </Text>
                  <Pressable onPress={clearFilters} style={styles.clearButton}>
                    <Text style={styles.clearText}>×</Text>
                  </Pressable>
                </View>
              ) : null}
            </Pressable>

            <IconButton
              icon="funnel"
              size={20}
              onPress={() =>
                openSheet(
                  <View style={styles.sheetContainer}>
                    <PitchFilterScreen />
                  </View>,
                  ["50%"]
                )
              }
            />
          </View>
        </View>

        {selectedView === "Sahalar" && (
          <FlatList
            data={filteredFields}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FieldCard
                name={item.name}
                town={item.town}
                rating={item.rating}
                price={item.pricePerHour}

                
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
                  Seçtiğiniz kriterlere uygun saha bulunamadı.
                </Text>
              </View>
            }
          />
        )}
        {selectedView === "Tesisler" && (
          <FlatList
            data={facilities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <FacilityCard
              logo= {item.logoUrl}
                name={item.name}
                city={item.city}
                town={item.town}
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
                <Text style={styles.emptyText}>
                  Seçtiğiniz kriterlere uygun saha bulunamadı.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    width: "85%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  sahalarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    maxWidth: 120,
  },
  clearButton: {
    marginLeft: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontSize: 14,
    color: "#fff",
  },
  sheetContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
