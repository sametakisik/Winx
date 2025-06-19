import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator
} from "react-native";
import {
  PaperProvider,
  TextInput,
  MD3LightTheme,
  Card,
  Title,
  Paragraph,
  Portal,
  FAB,
} from "react-native-paper";
import { getAllTeams, getTeamsByCity, getTeamsByName } from "../../utils/TeamApiService";
import { Colors } from "../../constants/Colors";

const TeamList = () => {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const theme = {
    ...MD3LightTheme,
    roundness: 20,
  };
console.log(teams);

  // Fetch teams with debounce
  const fetchTeams = useCallback(async (query = "") => {
    setLoading(true);
    try {
      let result;
      if (!query) {
        result = await getAllTeams();
      } else {
        // Try searching by both city and name
        const [cityResults, nameResults] = await Promise.all([
          getTeamsByCity(query),
          getTeamsByName(query)
        ]);
        
        // Merge and deduplicate results
        const merged = [...cityResults, ...nameResults];
        result = merged.filter((team, index, self) => 
          index === self.findIndex(t => t.id === team.id)
        );
      }
      setTeams(result);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTeams(searchText);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchText, fetchTeams]);

  const renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
      <Pressable
        onPress={() =>
          navigation.navigate("TeamStack", {
            screen: "Takım Detayları",
            params: { teamId: item.id },
          })
        }
      >
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image
              source={item.logoUrl}
              style={styles.logo}
            />
            <Title style={styles.teamName}>{item.name}</Title>
            <Paragraph style={{ color: "#333" }}>
              📍 {item.city} / {item.town}
            </Paragraph>
            
            <View style={{ flexDirection: "row" }}>
              <Paragraph style={{ color: "#333" }}>
                👑{item.captain || 'Bilinmiyor'}
              </Paragraph>
              <Paragraph style={{ color: "#333", marginLeft: 10 }}>
                👥 {item?.members?.length || 0}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          left={<TextInput.Icon icon="magnify" />}
          outlineColor="#D1D5DB"
          activeOutlineColor={Colors.primary} 
          mode="outlined"
          label="Takım, konum veya kaptan ara..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        ) : teams.length === 0 ? (
          <Text style={styles.noResults}>Takım bulunamadı</Text>
        ) : (
          <FlatList
            data={teams}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      <Portal>
        <FAB.Group
          open={fabOpen}
          icon={fabOpen ? "close" : "plus"}
          actions={[
            {
              icon: "home-plus",
              label: "Takım Oluştur",
              onPress: () => navigation.navigate("TeamStack"),
              color: "#388e3c",
              labelTextColor: "#1b5e20",
              style: { backgroundColor: "#e7f2e2" },
            },
            {
              icon: "soccer-field",
              label: "Üyesi Olduğum Takımlar",
              onPress: () =>
                navigation.navigate("TeamStack", {
                  screen: "Üyesi Olduğum Takımlar",
                }),
              color: "#388e3c",
              labelTextColor: "#1b5e20",
              style: { backgroundColor: "#e7f2e2" },
            },
          ]}
          fabStyle={{
            backgroundColor: "#81c784",
          }}
          onStateChange={({ open }) => setFabOpen(open)}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 24,
  },
  itemWrapper: {
    width: "50%",
    padding: 8,
  },
  card: {
    height: 200,
    backgroundColor: "#e0e4d6"
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  }
});

export default TeamList;