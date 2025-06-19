import axios from "axios";
import { BASE_URL, BASE_URL_PHOTOS } from "./FieldApiService";
import { useUser } from "../context/UserContext";

export const searchUser = async (username, token) => {
  try {
    const response = await axios.get(
      BASE_URL + `/friendships/search?q=${username}`,
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
    z;
  }
};

export const getUserInfos = async (id, token) => {
  try {
    const response = await axios.get(BASE_URL_PHOTOS + `/user/info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
    z;
  }
};

export const friendRequest = async (token, toUserId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/friendships`,
      { toUserId: toUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("arkadaşlık isteği gönderildi");

    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const friendCancelRequest = async (fromId, toUserId, token) => {
  try {
    console.warn(toUserId);

    const response = await axios.delete(
      `${BASE_URL}/friendships/${fromId}/${toUserId}/cancel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("arkadaşlık isteği geri çekildi");

    return response.data;
  } catch (error) {
    console.error("Error adding cancel:", error);
    throw error;
  }
};

export const pendingFriendRequests = async (userId, token) => {
  try {
    //girilern useridnin istek attığı kişiler
    const response = await axios.get(
      BASE_URL + `/friendships/users/${userId}/pending`,
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

export const outgoingFriendRequests = async (userId, token) => {
  try {
    const response = await axios.get(
      BASE_URL + `/friendships/users/${userId}/outgoing`,
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

export const getFriendsById = async (id, token) => {
  try {
    const response = await axios.get(BASE_URL + `/friendships/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    return [];
    z;
  }
};

export const putFriendship = async (userA, userB, status, token) => {
  try {
    const response = await axios.put(
      BASE_URL + `/friendships/${userA}/${userB}`,
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

export const rejectFriendship = async (userA, userB, token) => {
  try {
    const response = await axios.delete(
      BASE_URL + `/friendships/${userA}/${userB}`,
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
