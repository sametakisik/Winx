import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import CommentCard from "../components/others/CommentCard";
import { FlatList } from "react-native";
import FieldBanner from "../components/field/FieldBanner";
import FieldFeaturesCard from "../components/field/FieldFeaturesCard";
import FieldCalendar from "../components/field/FieldCalendar";
import Button from "../components/UI/Button";

import FieldComment from "../components/field/FieldComment";
import IconButton from "../components/UI/IconButton";
import React, { useEffect, useState } from "react";
import Mappp from "../map";
import Map from "../components/others/Map";
import FacilityLocation from "../components/field/FacilityLocation";
import FieldDimensionsCard from "../components/field/FieldDimensionsCard";
import { useBottomSheet } from "../BottomSheetContext";
import { useUser } from "../context/UserContext";
import CommentScreen from "../components/others/CommentScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFieldById } from "../utils/FieldApiService";
import CustomTabBar from "../components/others/CustomTabBar";

const Tab = createMaterialTopTabNavigator();
const Features = ({
  fetchField,
  fieldId,
  openingDays,
  width,
  height,
  floorType,
  capacity,
  isIndoor,
  hasCamera,
  hasTribune,
  hasScoreBoard,
  lightingAvailable,
}) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <FieldDimensionsCard
        fetchField={fetchField}
        fieldId={fieldId}
        openingDays={openingDays}
        width={width}
        height={height}
        floorType={floorType}
        capacity={capacity}
        hasCamera={hasCamera}
        isIndoor={isIndoor}
        lightingAvailable={lightingAvailable}
        hasScoreBoard={hasScoreBoard}
        hasTribune={hasTribune}
      />
    </View>
  );
};

const FacilityFeatures = (
  facilityId,
  fetchFacility,
  hasCafeteria,
  hasToilet,
  hasShower,
  hasTransportService,
  hasLockerRoom,
  hasFirstAid,
  hasSecurityCameras,
  hasShoeRental,
  hasGlove,
  hasLockableCabinet,
  hasParking,
  hasRefereeService
) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
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
    </View>
  );
};

const FieldScreen = () => {
  const { userType, user, token } = useUser();

  const route = useRoute();

  const { fieldId } = route.params;

  const [field, setField] = useState({});

  useEffect(() => {
    const fetchField = async () => {
      const field = await getFieldById(fieldId);
      console.log(field);

      setField(field);
    };

    fetchField();
  }, []);

  const fetchField = async () => {
    const field = await getFieldById(fieldId);
    setField(field);
  };

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FieldStack", {
              screen: "Tesis Detayları",
              params: { facilityId: field.facilityId },
            })
          }
        >
          <Text style={{ paddingRight: 12, fontSize: 18 }}>
            Tesisi Görüntüle
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, field]);

  const ReservationCalendar = ({ capacity, weeklyOpenings, price }) => {
    return (
      <FieldCalendar
        fieldId={fieldId}
        capacity={capacity}
        price={price}
        weeklyOpenings={weeklyOpenings}
      />
    );
  };
console.log(field);

  return (
    <>
      <View style={styles.banner}>
        <FieldBanner name={field.name} avgRating={field.avgRating} photoUrls={field.photoUrls}/>
      </View>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Rezervasyon"
          component={() => (
            <ReservationCalendar
            price={field.pricePerHour}
              capacity={field.capacity}
              weeklyOpenings={field.weeklyOpenings}
            />
          )}
          options={{ tabBarLabel: "Rezervasyon" }}
        />
        <Tab.Screen
          name="Halı Saha Detayları"
          component={() => (
            <Features
              fetchField={fetchField}
              fieldId={field.id}
              openingDays={field.weeklyOpenings}
              width={field.width}
              height={field.height}
              floorType={field.floorType}
              capacity={field.capacity}
              hasCamera={field.hasCamera}
              isIndoor={field.isIndoor}
              hasScoreBoard={field.hasScoreBoard}
              lightingAvailable={field.lightingAvailable}
              hasTribune={field.hasTribune}
            />
          )}
          options={{ tabBarLabel: "Detaylar" }}
        />
        <Tab.Screen
          name="Tesis Detayları"
          component={() => (
            <FacilityFeatures
              facilityId={field.facilityId}
              // fetchFacility={fetchFacility}
              hasCafeteria={field.hasCafeteria}
              hasToilet={true}
              hasShower={field.hasShower}
              hasTransportService={field.hasTransportService}
              hasLockerRoom={field.hasLockerRoom}
              hasFirstAid={field.hasFirstAid}
              hasSecurityCameras={field.hasSecurityCameras}
              hasShoeRental={field.hasShoeRental}
              hasGlove={field.hasGlove}
              hasLockableCabinet={field.hasLockableCabinet}
              hasParking={field.hasParking}
              hasRefereeService={field.hasRefereeService}
            />
          )}
          options={{ tabBarLabel: "Tesis" }}
        />
        {userType === "player" && (
          <Tab.Screen
            name="İletişim"
            component={FacilityLocation}
            options={{ tabBarLabel: "İletişim" }}
          />
        )}
        <Tab.Screen
          name="Yorumlar"
          component={() => <CommentScreen id={fieldId} commentType="Field" />}
          options={{ tabBarLabel: "Yorumlar" }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  banner: {
    paddingHorizontal: 12,
  },
});
export default FieldScreen;
