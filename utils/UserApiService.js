import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const getUserById = async (id, token) => {
    
  try {
    const response = await axios.get(`${BASE_URL}/Auth/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};
  export const registerCustomer = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/register-customer`, data, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/login`, user);
    return response.data;
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};
