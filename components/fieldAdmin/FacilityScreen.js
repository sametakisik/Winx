import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import FieldBanner from "../field/FieldBanner";
import FieldFeaturesCard from "../field/FieldFeaturesCard";
import FacilityLocation from "../field/FacilityLocation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CommentScreen from "../others/CommentScreen";
import { useEffect, useState } from "react";
import { getFacilityById } from "../../utils/FacilityApiService";
import AnnouncementScreen from "./AnnouncementScreen";
import CustomTabBar from "../others/CustomTabBar";
import EquipmentScreen from "./EquipmentScreen";
import FacilityBanner from "./FacilityBanner";

const Tab = createMaterialTopTabNavigator();

const Features = ({
  facilityId,
  fetchFacility,
  fields,
  hasCafeteria,
  hasToilet,
  hasShower,
  hasTransportService,
  hasLockerRoom,
  hasFirstAid,
  hasSecurityCameras,
  hasShoeRental,
  hasGlove,
  hasParking,
  hasLockableCabinet,
  hasRefereeService,
}) => {
  const navigation = useNavigation();
  
  const renderFieldItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Saha Detayları", { fieldId: item.id })
      }
      style={styles.fieldItem}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/saha.jpg")}
          style={styles.fieldImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.rating}>
            <Text style={styles.fieldName}>{item.name}</Text>
            <>
              <Ionicons name="star" size={20} color="#f2ab19" />
              <Text style={styles.ratingText}>4.2</Text>
            </>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.fieldContainer}>
  <ScrollView showsVerticalScrollIndicator={false}>
        <FieldFeaturesCard
        facilityId={facilityId}
        fetchFacility={fetchFacility}
        hasCafeteria={hasCafeteria}
        hasToilet={hasToilet}
        hasShower={hasShower}
        hasTransportService={hasTransportService}
        hasLockerRoom={hasLockerRoom}
        hasFirstAid={hasFirstAid}
        hasSecurityCameras={hasSecurityCameras}
        hasShoeRental={hasShoeRental}
        hasGlove={hasGlove}
        hasLockableCabinet={hasLockableCabinet}
        hasParking={hasParking}
        hasRefereeService={hasRefereeService}
      />
      <View style={styles.fieldDirection}>
        <Text style={styles.fieldText}>Sahalar</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Yeni Saha Oluştur", { facilityId: facilityId })
          }
        >
          <Text style={styles.createFieldButton}>Saha Oluştur</Text>
        </TouchableOpacity>
      </View>

      {fields?.length > 0 ? (
        <FlatList
          data={fields}
          renderItem={renderFieldItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
      ) : (
        <Text style={styles.notFieldText}>
          Tesise bağlı saha bulunmamaktadır.
        </Text>
      )}
  </ScrollView>
    </View>
  );
};

const FacilityScreen = () => {
  const route = useRoute();
  const { facilityId } = route.params;

  const [facility, setFacility] = useState({});
  const [fields, setFields] = useState([]);
  const id = 1;



  useEffect(() => {
    const fetchFacility = async () => {
      const facility = await getFacilityById(facilityId);
      setFacility(facility);
      setFields(facility.fields);
    };
    fetchFacility();
  }, []);

    const fetchFacility = async () => {
      const facility = await getFacilityById(facilityId);
      setFacility(facility);
    };

  return (
    <>
      <View style={styles.banner}>
        <FacilityBanner name={facility.name} />
      </View>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Tesis Özellikleri"
          component={() => (
            <Features
              facilityId={facilityId}
              fetchFacility={fetchFacility}
              fields={fields}
              hasCafeteria={facility.hasCafeteria}
              hasToilet={facility.hasToilet}
              hasShower={facility.hasShower}
              hasTransportService={facility.hasTransportService}
              hasLockerRoom={facility.hasLockerRoom}
              hasFirstAid={facility.hasFirstAid}
              hasSecurityCameras={facility.hasSecurityCameras}
              hasShoeRental={facility.hasShoeRental}
              hasGlove={facility.hasGlove}
              hasLockableCabinet={facility.hasLockableCabinet}
              hasParking={facility.hasParking}
              hasRefereeService={facility.hasRefereeService}
            />
          )}
          options={{ tabBarLabel: "Özellikler" }}
        />
        <Tab.Screen
          name="Duyurular"
          component={() => <AnnouncementScreen facilityId={facilityId} />}
          options={{ tabBarLabel: "Duyurular" }}
        />
        <Tab.Screen
          name="Ekipmanlar"
          component={() => (
            <EquipmentScreen
              //     equipments={facility.equipments}
              facilityId={facilityId}
              screenType="facilityPage"
            />
          )}
          options={{ tabBarLabel: "Ekipmanlar" }}
        />
        <Tab.Screen
          name="İletişim"
          component={() => (
            <FacilityLocation
              facilityId={facilityId}
              fetchFacility={fetchFacility}
              addressDetails={facility.addressDetails}
              city={facility.city}
              town={facility.town}
              phone={facility.phone}
              email={facility.email}
              latitude={facility.latitude}
              longtitude={facility.longtitude}
            />
          )}
          options={{ tabBarLabel: "İletişim" }}
        />
        <Tab.Screen
          name="Yorumlar"
          component={CommentScreen}
          options={{ tabBarLabel: "Yorumlar" }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 12,
  },
  listContent: {
    paddingVertical: 10,
  },
  fieldDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createFieldButton: {
    paddingRight: 12,
    fontSize: 18,
    fontWeight: 500,
    color: "#346eeb",
  },
  fieldText: {
    fontSize: 18,
    fontWeight: 600,
  },
  notFieldText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  fieldContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  fieldItem: {
    width: 270,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
  },
  fieldImage: {
    height: 170,
    width: "100%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "start",
    paddingHorizontal: 8,
    marginTop: 2,
  },
  fieldName: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "left",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 17,
    color: "#f2ab19",
    marginLeft: 5,
    fontWeight: "700",
  },
});

export default FacilityScreen;
