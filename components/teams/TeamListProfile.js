import * as React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const TeamListProfile = ({ selectedTeam, setSelectedTeam }) => {
  const { user } = useUser();
  const [teams, setTeams] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (user?.teams) {
      setTeams(user.teams);
    }
  }, [user]);

  return (
    <BottomSheetScrollView style={styles.container}>
  <List.Section title="Takımlar" titleStyle={styles.sectionTitle}>
    {teams.map((item, index) => (
      <View key={item.id}>
        <TouchableOpacity 
          onPress={() => setSelectedTeam(item.id)}
          style={[
            styles.itemContainer,
            selectedTeam === item.id && {
              backgroundColor: theme.colors.primaryContainer
            }
          ]}
        >
          <List.Item
            title={item.name}
            titleStyle={selectedTeam === item.id ? styles.selectedTitle : styles.title}
            description={item.description}
            descriptionStyle={styles.description}
            left={() => (
              <Image 
                source={item.photoUrl} 
                style={styles.image} 
              />
            )}
            right={() => selectedTeam === item.id && (
              <List.Icon icon="check" color={theme.colors.primary} />
            )}
          />
        </TouchableOpacity>
        {index < teams.length - 1 && (
          <Divider style={styles.divider} />
        )}
      </View>
    ))}
  </List.Section>
  {teams.length === 0 && <Text style={styles.emptyText}>Üyesi olduğunuz takım bulunmamaktadır.</Text>}
</BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    borderRadius: 8,
    marginVertical: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  selectedTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    marginHorizontal: 16,
    height: 1,
  },
   emptyText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#7f8c8d",
  },
});

export default TeamListProfile;