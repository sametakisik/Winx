import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});


  
  // Uygulama ilk açıldığında async olarak verileri oku
  useEffect(() => {
    const loadUserData = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      const savedUserType = await AsyncStorage.getItem('userType');
      const savedUser = await AsyncStorage.getItem('user');


      if (savedToken) setToken(savedToken);
      if (savedUserType) setUserType(JSON.parse(savedUserType));
if (savedUser) setUser(JSON.parse(savedUser));

    };

    loadUserData();
  }, []);

  // Girişte çağrılacak fonksiyon
  const login = async (newToken, newUserType, newUser) => {
    setToken(newToken);
    setUserType(newUserType);
    setUser(newUser)

    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('userType', JSON.stringify(newUserType));
await AsyncStorage.setItem('user', JSON.stringify(newUser));

  };

const logout = async () => {
  setToken("");
  setUserType(null);
  setUser({});
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userType');
  await AsyncStorage.removeItem('user');
};


  return (
    <UserContext.Provider value={{ token, setToken, userType, setUserType, user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
