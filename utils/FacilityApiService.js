import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const getAllFacilities = async () => {
  try {
    const response = await axios.get(BASE_URL + `/Facilities`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const getFacilityByOwnerId = async (ownerId) => {
  try {
    const response = await axios.get(BASE_URL + `/Facilities?ownerId=${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const getFacilityById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/Facilities/${id}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      return [];
    }
  };

export const createFacility = async (facility, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/Facilities`, facility, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Tesis oluşturma hatası:", error);
    throw error;
  }
};


export const patchFacility = async (facilityId, items, token) => {
  try {
    console.warn(facilityId);
    
    const response = await axios.patch(`${BASE_URL}/Facilities/${facilityId}`, items,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Başarıyla güncellendi", response.data);
  
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};

