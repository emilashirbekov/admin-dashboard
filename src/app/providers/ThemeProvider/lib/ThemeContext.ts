import { createContext } from "react";

export const THEME = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextProps>({
  theme: THEME.LIGHT,
  setTheme: () => {},
});

export const LOCAL_STORAGE_THEME_KEY = "theme";
