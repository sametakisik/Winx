import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchAnnouncements from '../screens/MatchAnnouncementsScreen';
import FindPlayerScreen from '../FindPlayerScreen';
import LoginScreen from '../components/login/LoginScreen';
import SignupScreen from '../components/login/SignupScreen';
import SignupScreen2 from '../components/login/SignupScreen2';
import SignupScreen3 from '../components/login/SignupScreen3';
import SignupScreen4 from '../components/login/SignupScreen4';


const Stack = createNativeStackNavigator();  // Stack Navigator'ı burada oluşturuyoruz

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Giriş" component={LoginScreen} />
      <Stack.Screen name="Kayıt1" component={SignupScreen} />
      <Stack.Screen name="Kayıt2" component={SignupScreen2} />
      <Stack.Screen name="Kayıt3" component={SignupScreen3} />
      <Stack.Screen name="Kayıt4" component={SignupScreen4} />
    </Stack.Navigator>
  );
};

export default LoginStack;
