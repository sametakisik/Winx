import axios from "axios";
import { BASE_URL } from "./FieldApiService";

export const createTeam = async (team, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/teams`, team, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};

export const getAllTeams = async () => {
  try {
    const response = await axios.get(BASE_URL + `/Teams`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const getTeamById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/teams/${id}` ,{
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

export const getTeamsByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/teams?city=${city}`);
  return response.data;
};

export const getTeamsByName = async (teamName) => {
  const response = await axios.get(`${BASE_URL}/teams?teamName=${teamName}`);
  return response.data;
};

export const deleteTeam = async (teamId) => {
  try {
    await axios.delete(`${BASE_URL}/Teams/${teamId}`);
    console.log("silindi");
  } catch (error) {
    console.error("Hata:", error);
  }
};

export const changeAdminCaptainTeam = async (teamId, userId) => {
  try {
    const response = await axios.put(`${BASE_URL}/teams`, team, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};

export const teamJoinRequest = async (token, teamId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/teams/${teamId}/join-requests`,
      teamId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("takıma katılma isteği gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding team request:", error);
    throw error;
  }
};

export const teamRequestPut = async  (teamId, requestId, status, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Teams/${teamId}/join-requests/${requestId}`,
      {status: status},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("takıma katılma isteği gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding team request:", error);
    throw error;
  }
};

export const getTeamJoinRequestsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Teams/${id}/join-requests`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const editTeam = async (teamId, body) => {
  try {
    console.log(body);
    
    const response = await axios.put(`${BASE_URL}/Teams/${teamId}`, body);
    return response.data;
  } catch (error) {
    console.error("Error editing team:", error);
    throw error;
  }
};

export const addMemberTeam = async (teamId, body) => {
  try {
    const response = await axios.post(`${BASE_URL}/teams/${teamId}/members`,  body);
    return response.data;
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};

export const removeMemberTeam = async (teamId, userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/teams/${teamId}/members/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error remove member team:", error);
    throw error;
  }
};

export const getTeamMembersById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/teams/${id}/members`);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const putTeamJoinRequest = async (teamId, requestId, status, token) => {
  try {
    const response = await axios.put(
      BASE_URL + `/teams/${teamId}/join-requests/${requestId}`,
      status,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};