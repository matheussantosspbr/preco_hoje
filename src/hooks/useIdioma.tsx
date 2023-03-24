import { useContext, createContext, useState, useEffect } from "react";

interface IdiomaContextProps {
    idioma: string;
    setIdioma: (newTheme: string) => void;
  }
  
  const IdiomaContext = createContext(({} as IdiomaContextProps));

export default function IdiomaContextProvider({children}: {children: React.ReactNode}) {
    const [idioma, setIdioma] = useState<string>(localStorage.getItem("idioma") || 'PT');
    
        useEffect(() => {
            localStorage.setItem("idioma", idioma);
        }, [idioma]);
    
        return (
            <IdiomaContext.Provider value={{ idioma, setIdioma }}>
                {children}
            </IdiomaContext.Provider>
    )
}

export function useIdioma(){
    return useContext(IdiomaContext);
}