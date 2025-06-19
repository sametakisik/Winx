import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addField } from "../../utils/FieldApiService";

const CreateFacility3 = () => {
  const route = useRoute();
  const { facilityData } = route.params;
  const navigation = useNavigation();

  const [form, setForm] = useState({
    features: [
      { id: 1, text: "Kafeterya", key: "hasCafeteria", available: false }, //
      { id: 2, text: "Duş", key: "hasShower", available: false }, //
      { id: 3, text: "Servis", key: "hasTransportService", available: false }, //
      { id: 4, text: "Tuvalet", key: "hasToilet", available: false }, //
      { id: 5, text: "Otopark", key: "hasParking", available: false }, //
      { id: 6, text: "Soyunma Odası", key: "hasLockerRoom", available: false },
      { id: 7, text: "İlk Yardım Müdahalesi", key: "hasFirstAid", available: false }, //
      { id: 8, text: "Kilitlenebilir Dolap", key: "hasLockableCabinet", available: false },
      { id: 9, text: "Güvenlik Kameraları", key: "hasSecurityCameras", available: false },
      { id: 10, text: "Hakem Hizmeti", key: "hasRefereeService", available: false },
    ],
  });

  const toggleAvailability = (id) => {
    setForm((prevForm) => ({
      ...prevForm,
      features: prevForm.features.map((f) =>
        f.id === id ? { ...f, available: !f.available } : f
      ),
    }));
  };

  const FeatureItem = ({ feature }) => {
    return (
      <View style={styles.featureItem}>
        <TouchableOpacity onPress={() => toggleAvailability(feature.id)}>
          <Ionicons
            name={feature.available ? "checkmark-circle" : "close-circle"}
            size={20}
            color={feature.available ? "#4CAF50" : "#F44336"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.featureText,
            !feature.available && styles.unavailableText,
            !feature.available && { textDecorationLine: "line-through" },
          ]}
        >
          {feature.text}
        </Text>
      </View>
    );
  };

  const handleSubmit = async () => {
    const updatedFacilityData = { ...facilityData };

    form.features.forEach((feature) => {
      if (feature.key) {
        updatedFacilityData[feature.key] = feature.available;
      }
    });

    console.log("Yeni facilityData:", updatedFacilityData);

    // Burada updatedFacilityData'yı bir sonraki ekrana gönderiyoruz
    navigation.navigate("Logo ve Fotoğrafları Ekleyin", {
      facilityData: updatedFacilityData,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Tesisinizde bulunan imkanları aşağıdan seçiniz.
      </Text>
      <View style={styles.containerFeatures}>
        <View style={styles.header}>
          <Text style={styles.title}>Tesis Özellikleri</Text>
        </View>

        <View style={styles.divider} />

        <ScrollView
          contentContainerStyle={styles.featuresGrid}
          showsVerticalScrollIndicator={false}
        >
          {form.features.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.submitButtonText}>İleri</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 15,
    color: "#424242",
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
  unavailableText: {
    color: "#aaa",
  },
  containerFeatures: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginBottom: 12,
  },
});

export default CreateFacility3;
