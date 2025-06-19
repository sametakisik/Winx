import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const getAnnouncementById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/announcements?facilityId=${id}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      return [];
    }
  };

  export const addAnnouncement = async (facilityId, announcement) => {
  try {
    const response = await axios.post(`${BASE_URL}/announcements/${facilityId}`, announcement, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw error;
  }
};

export const deleteAnnouncement = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/announcements/${id}`);  
    } catch (error) {
        console.error("Hata:", error);
    }
};