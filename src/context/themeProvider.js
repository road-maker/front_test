// import {
//   fontSizes,
//   colors,
//   deviceSizes,
//   device,
//   paddings,
//   margins,
//   interval,
//   verticalInterval,
// } from "@theme/theme";
// import { createContext, useState, useContext, useCallback } from "react";
// import { ThemeProvider as StyledProvider } from "styled-components";
// const ThemeContext = createContext({});

// const ThemeProvider = ({ children }) => {
//   const LocalTheme = window.localStorage.getItem("theme") || "light";
//   const [ThemeMode, setThemeMode] = useState(LocalTheme);
//   let addThemeObject = Object.assign(
//     {},
//     fontSizes,
//     colors,
//     deviceSizes,
//     device,
//     paddings,
//     margins,
//     interval,
//     verticalInterval,
//     { theme: ThemeMode }
//   );
//   // var addThemeObject = Object.assign({}, fontSizes, colors, deviceSizes, device, paddings, margins, interval, verticalInterval, {theme: ThemeMode})

//   return (
//     <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
//       <StyledProvider theme={addThemeObject}> {children}</StyledProvider>
//     </ThemeContext.Provider>
//   );
// };

// function useTheme() {
//   const context = useContext(ThemeContext);
//   const { ThemeMode, setThemeMode } = context;

//   const toggleMediaQuery = useCallback(() => {
//     if (ThemeMode === "device_mobileS") {
//       setThemeMode("device_mobileS");
//       window.localStorage.setItem("theme", "device_mobileS");
//       return;
//     } else if (ThemeMode === "device_mobileM") {
//       setThemeMode("device_mobileM");
//       window.localStorage.setItem("theme", "device_mobileM");
//       return;
//     } else if (ThemeMode === "device_mobileL") {
//       setThemeMode("device_mobileL");
//       window.localStorage.setItem("theme", "device_mobileL");
//       return;
//     } else if (ThemeMode === "device_tablet") {
//       setThemeMode("device_tablet");
//       window.localStorage.setItem("theme", "device_tablet");
//       return;
//     } else if (ThemeMode === "device_tabletL") {
//       setThemeMode("device_tabletL");
//       window.localStorage.setItem("theme", "device_tabletL");
//       return;
//     }
//   }, [ThemeMode]);

//   return [ThemeMode, toggleMediaQuery];
// }

// export { ThemeProvider, useTheme };

// 원본
import { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

import {
  colors,
  device,
  deviceSizes,
  fontSizes,
  interval,
  margins,
  paddings,
  verticalInterval,
} from '../theme/theme';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const LocalTheme = window.localStorage.getItem('theme') || 'light';
  const [ThemeMode, setThemeMode] = useState(LocalTheme);
  let addThemeObject = Object.assign(
    {},
    fontSizes,
    colors,
    deviceSizes,
    device,
    paddings,
    margins,
    interval,
    verticalInterval,
    { theme: ThemeMode },
  );
  // var addThemeObject = Object.assign({}, fontSizes, colors, deviceSizes, device, paddings, margins, interval, verticalInterval, {theme: ThemeMode})

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={addThemeObject}> {children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === 'light') {
      setThemeMode('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light');
      window.localStorage.setItem('theme', 'light');
    }
  }, [ThemeMode]);

  return [ThemeMode, toggleTheme];
}

export { ThemeProvider, useTheme };
