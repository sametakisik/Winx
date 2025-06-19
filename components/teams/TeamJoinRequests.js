import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import { List } from "react-native-paper";
import {
  getTeamJoinRequestsById,
  putTeamJoinRequest,
} from "../../utils/TeamApiService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../../context/UserContext";

const TeamJoinRequests = ({ teamId, fetchMembers }) => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useUser();

  const fetchRequests = async () => {
    try {
      const request = await getTeamJoinRequestsById(teamId);
      setRequests(request);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRequests();
    setRefreshing(false);
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      await putTeamJoinRequest(teamId, requestId, { status: 1 }, token);


      
      await fetchRequests();
      await fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await putTeamJoinRequest(teamId, requestId, { status: 2 }, token);
      await fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      key={item.id}
      title={`${item.firstName} ${item.lastName}`}
      description={item.userName}
      right={() => (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAcceptRequest(item.id)}
          >
            <Icon name="check" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleRejectRequest(item.id)}
          >
            <Icon name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      )}
      left={() => (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
    />
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>Takımınıza Gelen Katılma İstekleri</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 8,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
});

export default TeamJoinRequests;
