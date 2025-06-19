import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const registerOwner = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/register-owner`, user);

    // console.log('Lecture added successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error("Error adding lecture:", error);
    throw error;
  }
};