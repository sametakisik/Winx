import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchAnnouncements from '../screens/MatchAnnouncementsScreen';
import FindPlayerScreen from '../FindPlayerScreen';
import MatchDetail from '../components/match/MatchDetail';
import MatchScreen from '../screens/MatchScreen';
import FieldEdit from '../components/fieldAdmin/FieldEdit';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();  // Stack Navigator'ı burada oluşturuyoruz

const MatchStack = () => {
    const { colors } = useTheme();
  return (
     <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.tabbar, // Burada istediğiniz rengi kullanın
                },
            
            }}
        >
      <Stack.Screen name="Maç İlanları" component={MatchAnnouncements} />
      <Stack.Screen name="Maç Detayları" component={MatchScreen} />
      <Stack.Screen name="Oyuncu Bul" component={FindPlayerScreen} />


    </Stack.Navigator>
  );
};

export default MatchStack;
