import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const createRoom = async (teamId, body, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms?creatorTeamId=${teamId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("oda oluşturuldu");
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await axios.get(BASE_URL + `/rooms`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const getRoomById = async (roomId, token) => {
  try {
    const response = await axios.get(BASE_URL + `/rooms/${roomId}` ,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const joinRoomWithTeam = async (roomId, teamId) => {
  try { 
    const response = await axios.post(`${BASE_URL}/rooms/${roomId}/join?teamId=${teamId}`);
    console.log("odaya katılındı");
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const joinRoomWithTeamCode = async (code, teamId) => {
  try { 
    const response = await axios.post(`${BASE_URL}/rooms/join?code=${code}&teamId=${teamId}`);
    console.log("odaya katılındı");
    return response.data;
  } catch (error) {
  //  console.error("Error adding room:", error);
    throw error;
  }
};

export const getParticipantsById = async (roomId) => {
  try {
    const response = await axios.get(BASE_URL + `/rooms/${roomId}/participants`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const inviteUsersRoom = async (roomId, users) => {
  try { 
    const response = await axios.post(`${BASE_URL}/rooms/${roomId}/invite/users`, users);
    console.log("odaya katılındı");
    return response.data;
  } catch (error) {
  //  console.error("Error adding room:", error);
    throw error;
  }
};

export const readyTeams = async (roomId, teamId) => {
  try { 
    const response = await axios.post(`${BASE_URL}/rooms/${roomId}/ready/team/${teamId}`);
    console.log("hazır verildi");
    return response.data;
  } catch (error) {
  //  console.error("Error adding room:", error);
    throw error;
  }
};

export const leaveRoom = async (roomId, token) => {
  try {
    const response = await axios.delete(BASE_URL + `/rooms/${roomId}/leave` ,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};