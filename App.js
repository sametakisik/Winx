import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons"; // Eğer IconButton kullanıyorsanız
import HomeScreen from "./screens/HomeScreen"; // Home ekranı
import MatchAnnouncements from "./screens/MatchAnnouncementsScreen";
import IconButton from "./components/UI/IconButton";
import FieldScreen from "./screens/FieldScreen";

import FieldCalendar from "./components/field/FieldCalendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "./BottomSheetContext";
import PitchFilterScreen from "./components/field/FieldFilter";
import FindPlayerScreen from "./FindPlayerScreen";
import CreateMatch from "./components/match/CreateMatch";
import Tabs from "./navigation/TabNavigator";
import FieldStack from "./navigation/FieldStack";
import MatchStack from "./navigation/MatchStack";
import TeamStack from "./navigation/TeamStack";
import LoginScreen from "./components/login/LoginScreen";
import LoginStack from "./navigation/LoginStack";
import ProfileStack from "./navigation/ProfileStack";
import { BottomSheetOverlayProvider } from "./OverlayContext";
import { UserProvider, useUser } from "./context/UserContext";
import TabsOwner from "./navigation/TabNavigatorOwner";
import { DefaultTheme, PaperProvider } from "react-native-paper";

// Stack ve Tab navigator'lar
const RootStack = createNativeStackNavigator();

// Stack Navigator
export default function App() {
  const { userType } = useUser();

  const theme = {
 ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#388e3c',    // ana yeşil (#388e3c: koyu yeşil)
    accent: '#81c784',     // açık yeşil ton (buton vurgusu gibi)
  tabbar: "#e7f2e2",
    card: "#e0e4d6",
       background: '#fcfdf7', // açık yeşil arka plan
    surface: '#ffffff',    // kartlar ve modallar için yüzey rengi
    text: '#1b5e20',       // koyu yeşil metin
    placeholder: '#66bb6a',// input içi metinler
    disabled: '#a5d6a7',   // devre dışı buton/metin
  },
  roundness: 8, // köşeler biraz yuvarlak
};
  return (
    <PaperProvider theme={theme}>
       <GestureHandlerRootView>
      <BottomSheetProvider>
        <BottomSheetOverlayProvider>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                headerTintColor: "black",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            >
              <RootStack.Screen name="LoginStack" component={LoginStack} />
              <RootStack.Screen
                name="Ana sayfa"
                component={userType === "Owner" ? TabsOwner : Tabs}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="FieldStack"
                component={FieldStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="MatchStack"
                component={MatchStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="TeamStack"
                component={TeamStack}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </BottomSheetOverlayProvider>
      </BottomSheetProvider>
    </GestureHandlerRootView>
    </PaperProvider>
   
  );
}

const styles = StyleSheet.create({
  image: { width: 40, height: 40, resizeMode: "contain", borderRadius: 20 },
});
