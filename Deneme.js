import React, { createContext, useContext, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetStackContext = createContext();

export const BottomOverlaySheetProvider = ({ children }) => {
  const [sheets, setSheets] = useState([]);
  const idCounter = useRef(0);

  const openSheet = (Component, props = {}) => {
    const id = idCounter.current++;
    setSheets(prev => [...prev, { id, Component, props }]);
    return id;
  };

  const closeSheet = (id) => {
    setSheets(prev => prev.filter(sheet => sheet.id !== id));
  };

  return (
    <BottomSheetStackContext.Provider value={{ openSheet, closeSheet }}>
      {children}

      {sheets.map(({ id, Component, props }, index) => (
        <BottomSheet
          key={id}
          index={0}
          snapPoints={['50%']}
          onClose={() => closeSheet(id)}
          enablePanDownToClose
        >
          <Component {...props} />
        </BottomSheet>
      ))}
    </BottomSheetStackContext.Provider>
  );
};

export const useBottomSheetStack = () => useContext(BottomSheetStackContext);
