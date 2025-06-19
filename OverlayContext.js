import React, { createContext, useRef, useState, useContext } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, Text } from 'react-native';
import CreateMatch from './components/match/CreateMatch';

const BottomSheetOverlayContext = createContext();

export const BottomSheetOverlayProvider = ({ children }) => {
  const bottomSheetRef1 = useRef(null); // CreateMatch için
  const bottomSheetRef2 = useRef(null); // CreateFastTeam için
  const [sheet1Content, setSheet1Content] = useState(null); // Dinamik içerik
  const [sheet2Content, setSheet2Content] = useState(null);

  // Sheet1'i aç (içerik parametresi alır)
  const openSheet1 = (content) => {
    if (content) setSheet1Content(content); // İçerik geçilmişse güncelle
    bottomSheetRef1.current?.snapToIndex(0); // 0 -> '70%'

  };

  // Sheet2'i aç (içerik parametresi alır)
  const openSheet2 = (content) => {
    if (content) setSheet2Content(content);
    bottomSheetRef2.current?.expand();
  };

  const closeSheet1 = () => bottomSheetRef1.current?.close();
  const closeSheet2 = () => bottomSheetRef2.current?.close();

  return (
    <BottomSheetOverlayContext.Provider
      value={{
        openSheet1,
        closeSheet1,
        openSheet2,
        closeSheet2,
      }}
    >
      {children}

      {/* Sheet 1 - Varsayılan: CreateMatch, ama dinamik içerik geçilebilir */}
      <BottomSheet
        ref={bottomSheetRef1}
        index={-1}
        snapPoints={['70%', '88%']}
        enableDynamicSizing={false}
        enablePanDownToClose= {true}
      >
        <View style={{ flex: 1 }}>
          {sheet1Content || <Text>1. sheet</Text>} {/* Geçilmediyse varsayılan */}
        </View>
      </BottomSheet>

      {/* Sheet 2 - Varsayılan: CreateFastTeam, dinamik içerik geçilebilir */}
      <BottomSheet
        ref={bottomSheetRef2}
        index={-1}
        snapPoints={['50%']}
        enableDynamicSizing={false}
        enablePanDownToClose
      >
        <View style={{ flex: 1, padding: 20 }}>
          {sheet2Content || <Text>2. sheet</Text>}
        </View>
      </BottomSheet>
    </BottomSheetOverlayContext.Provider>
  );
};

export const useOverlayBottomSheet = () => useContext(BottomSheetOverlayContext);