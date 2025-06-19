import React, { createContext, useContext, useRef, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext();

export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomOverlaySheetProvider = ({ children }) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const open = () => sheetRef.current?.expand();
  const close = () => sheetRef.current?.close();

  return (
    <BottomSheetContext.Provider value={{ open, close }}>
      {children}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        {/* İçerik buraya */}
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
