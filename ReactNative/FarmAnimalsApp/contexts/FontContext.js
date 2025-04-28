import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

// 폰트 로딩 상태를 관리하는 Context
const FontContext = createContext();

export const useFont = () => {
  return useContext(FontContext);
};

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loaded] = useFonts({
    BMJUA: require('@/assets/fonts/BMJUA_ttf.ttf'), // 폰트 경로 설정
  });

  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true); // 폰트가 로딩되었으면 상태를 true로 설정
    }
  }, [loaded]);

  return (
    <FontContext.Provider value={fontsLoaded}>
      {fontsLoaded ? children : null}  {/* 폰트 로딩 완료 후 렌더링 */}
    </FontContext.Provider>
  );
};
