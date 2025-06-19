import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const getFieldCommentsById = async (fieldId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/comments/fields/${fieldId}`
    );
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const commentOnTheField = async (token, comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments/field-comments`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("yorum gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const getTeamCommentsById = async (teamId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/comments/teams/${teamId}`
    );
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const commentOnTheTeam = async (token, comment) => {
  try {
    console.log(comment);
    
    const response = await axios.post(`${BASE_URL}/comments/team-comments`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("yorum gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const getUserCommentsById = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/comments/users/to/${userId}`
    );    
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const commentOnTheUser = async (token, comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments/user-comments`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("yorum gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};