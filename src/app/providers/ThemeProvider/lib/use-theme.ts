import { useContext } from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  THEME,
  type Theme,
  ThemeContext,
} from "./ThemeContext";

interface UseThemeProps {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): UseThemeProps => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return {
    theme,
    toggleTheme,
  };
};
