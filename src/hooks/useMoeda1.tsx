import { useContext, createContext, useState, useEffect } from "react";

interface Moeda1ContextProps {
    moeda1: string;
    setMoeda1: (newTheme: string) => void;
  }
  
  const Moeda1Context = createContext(({} as Moeda1ContextProps));

export default function Moeda1ContextProvider({children}: {children: React.ReactNode}) {
    const [moeda1, setMoeda1] = useState<string>(localStorage.getItem("moeda1") || 'BRL');
    
        useEffect(() => {
            localStorage.setItem("moeda1", moeda1);
        }, [moeda1]);
    
        return (
            <Moeda1Context.Provider value={{ moeda1, setMoeda1 }}>
                {children}
            </Moeda1Context.Provider>
    )
}

export function useMoeda1(){
    return useContext(Moeda1Context);
}