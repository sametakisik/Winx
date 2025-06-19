import axios from "axios";

const IP_ADDRESS = "172.21.192.1";

export const BASE_URL = `https://halisaha.up.railway.app/api`;
export const BASE_URL_PHOTOS = `https://halisaha.up.railway.app`;


export const getAllFields = async () => {
  try {
    const response = await axios.get(BASE_URL + `/facilities/fields`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const getFieldById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/facilities/fields/${id}`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const addField = async (field) => {
  try {
    const response = await axios.post(`${BASE_URL}/facilities/fields/mobil`, field, {
            headers: {
        "Content-Type": "multipart/form-data", // veya sunucunun beklediği başka bir tür
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding lecture:", error);
    throw error;
  }
};

export const patchField = async (fieldId, items) => {
  try {    
    const response = await axios.patch(`${BASE_URL}/facilities/fields/${fieldId}`, items);
    console.log("Başarıyla güncellendi", response.data);
  
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};
