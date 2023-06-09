import { useContext, createContext, useState, useEffect } from "react";

interface ThemeContextProps {
    theme: string;
    setTheme: (newTheme: string) => void;
  }
  
  const ThemeContext = createContext(({} as ThemeContextProps));

export default function ThemeContextProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") !== "dark" ? "light" : "dark");
    
        useEffect(() => {
            const root = window.document.documentElement
            const removeOldTheme =  theme === "dark" ? "light" : "dark";
            root.classList.remove(removeOldTheme);
            root.classList.add(theme)
            localStorage.setItem("theme", theme);
        }, [theme]);
    
        return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext);
}