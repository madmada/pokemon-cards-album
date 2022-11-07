import { Roboto } from '@next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#33691e" },
    secondary: { main: "#004d40" },
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#26a69a" },
    mode: "dark",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    theme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

