import { useEffect, useState, useCallback } from "react";

import { 
  ActivityIndicator, 
  FlatList, 
  Image, 
  RefreshControl, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import {
  friendCancelRequest,
  outgoingFriendRequests,
  pendingFriendRequests,
  putFriendship,
  rejectFriendship,
} from "../utils/FriendshipApiService";
import { useUser } from "../context/UserContext";
import { Chip, Divider, List } from "react-native-paper";
import { BASE_URL } from "../utils/FieldApiService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FriendRequestsScreen = () => {
  const { token, user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequest] = useState([]);
  const [outgoingRequests, setOutgoingRequest] = useState([]);

   const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const [pending, outgoing] = await Promise.all([
        pendingFriendRequests(user.id, token),
        outgoingFriendRequests(user.id, token),
      ]);
      setPendingRequest(pending);
      setOutgoingRequest(outgoing);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [user.id, token]);

    useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

    const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRequests();
  }, [fetchRequests]);

  const handleAcceptRequest = async  (fromUserId) => {
    try {
        await putFriendship(  user.id, fromUserId, {status: 1}, token)
        console.log("başarılı");
        
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleRejectRequest = async (fromUserId) => {
    // Reddetme işlevselliği buraya eklenecek

     try {
        await rejectFriendship( user.id, fromUserId,   token)
        console.log("başarılı");
        
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleCancelRequest = async (toUserId) => {
   try {
        await friendCancelRequest( user.id, toUserId,   token)
        console.log("başarılı");
        
    } catch (error) {
      console.log(error);
      
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItem}>
        <Image
          source={{ uri: BASE_URL + (activeTab === "pending" ? item?.user1Info?.photoUrl : item?.photoUrl) }}
          style={styles.image}
          onError={() => console.log("Image load error")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {activeTab === "pending" ? item.user1Info.fullName : item.fullName}
          </Text>
          <Text style={styles.username} numberOfLines={1}>{`@${
            activeTab === "pending" ? item.user1Info.userName : item.userName
          }`}</Text>
        </View>
      </View>
      {activeTab === "pending" ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAcceptRequest(item.userId1)}
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
      ) : (
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={() => handleCancelRequest(item.id)}
        >
          <Icon name="close" size={18} color="#6200ee" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon 
        name={activeTab === "pending" ? "account-clock" : "account-arrow-right"} 
        size={60} 
        color="#e0e0e0" 
      />
      <Text style={styles.emptyText}>
        {activeTab === "pending" 
          ? "Gelen arkadaşlık isteği bulunmuyor" 
          : "Gönderilen arkadaşlık isteği bulunmuyor"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arkadaşlık İstekleri</Text>
      
      <View style={styles.tabContainer}>
        <Chip
          mode="outlined"
          style={[styles.chip, activeTab === "pending" && styles.activeChip]}
          textStyle={[
            styles.chipText,
            activeTab === "pending" && styles.activeChipText
          ]}
          selected={activeTab === "pending"}
          onPress={() => setActiveTab("pending")}
        >
          Gelen İstekler
        </Chip>

        <Chip
          mode="outlined"
          style={[styles.chip, activeTab === "outgoing" && styles.activeChip]}
          textStyle={[
            styles.chipText,
            activeTab === "outgoing" && styles.activeChipText
          ]}
          selected={activeTab === "outgoing"}
          onPress={() => setActiveTab("outgoing")}
        >
          Gönderilen İstekler
        </Chip>
      </View>

         {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color="#4CAF50" size="large" />
        </View>
      ) : (
        <FlatList
          data={activeTab === "pending" ? pendingRequests : outgoingRequests}
          renderItem={renderItem}
          keyExtractor={(item) =>
            activeTab === "pending" ? item.userId1.toString() : item.id.toString()
          }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          showsVerticalScrollIndicator={false}
          // Add pull-to-refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#4CAF50']}  // Green refresh spinner
              tintColor="#4CAF50"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
    chip: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      backgroundColor: 'white',
    },
    activeChip: {
      backgroundColor: '#4CAF50',  // Green primary color
      borderColor: '#4CAF50',
    },
    chipText: {
      color: '#4CAF50',  // Green text for inactive
      fontSize: 14,
    },
    activeChipText: {
      color: 'white',
    },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    flex: 1,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  divider: {
    marginHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default FriendRequestsScreen;