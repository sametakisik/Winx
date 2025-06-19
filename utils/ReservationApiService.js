import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const createReservation = async (reservation) => {
    try {
      const response = await axios.post(`${BASE_URL}/reservations`, reservation);
      return response.data;
    } catch (error) {
      console.error("Rezervasyon oluşturulurken bir hata oluştu:", error);
      throw error;
    }
  };
  
export const getReservationByFieldId = async (fieldId, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/Reservations?fieldId=${fieldId}&date=${date}&period=all`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};