import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const getEquipmentById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/${id}/equipments`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      return [];
    }
  };


export const addEquipment = async (facilityId, equipment) => {
  try {
    const response = await axios.post(`${BASE_URL}/facilities/${facilityId}/equipments`, equipment, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding equipment:", error);
    throw error;
  }
};

export const deleteEquipment = async (facilityId, equipmentId) => {
    try {
        await axios.delete(`${BASE_URL}/facilities/${facilityId}/equipments/${equipmentId}`);  
    } catch (error) {
        console.error("Hata:", error);
    }
};