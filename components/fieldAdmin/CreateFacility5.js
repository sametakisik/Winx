import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import EquipmentManager from "./EquipmentManager";
import { useRoute } from "@react-navigation/native";
import EquipmentAdd from "./EquipmentAdd";
import { useBottomSheet } from "../../BottomSheetContext";
import EquipmentScreen from "./EquipmentScreen";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createFacility } from "../../utils/FacilityApiService";
import { useUser } from "../../context/UserContext";

const CreateFacility5 = () => {
  const [equipments, setEquipments] = useState([]);
  console.warn(equipments);

  const [newEquipment, setNewEquipment] = useState({});
  const {user, token } = useUser();
  const route = useRoute();
  const { formData } = route.params;

  useEffect(() => {
    if (newEquipment && Object.keys(newEquipment).length > 0) {
      setEquipments((prev) => [newEquipment, ...prev]);
    }
  }, [newEquipment]);

  const handleSubmit = async () => {
    formData.append("ownerId", user);
    formData.append("description", "yok");
    formData.append("equipments", equipments);

    try {
      await createFacility(formData, token);
      console.log("başarılı");
    } catch (error) {
      alert("Saha oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
  return (
    <View style={styles.container}>
      <EquipmentScreen
        equipmentsLocale={equipments}
        setEquipments={setEquipments}
        setNewEquipment={setNewEquipment}
        screenType="createFacilityPage"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.submitButtonText}>Tesisi Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});

export default CreateFacility5;
