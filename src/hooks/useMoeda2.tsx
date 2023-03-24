import { useContext, createContext, useState, useEffect } from "react";

interface Moeda2ContextProps {
    moeda2: string;
    setMoeda2: (newTheme: string) => void;
  }
  
  const Moeda2Context = createContext(({} as Moeda2ContextProps));

export default function Moeda2ContextProvider({children}: {children: React.ReactNode}) {
    const [moeda2, setMoeda2] = useState<string>(localStorage.getItem("moeda2") || 'USD');
    
        useEffect(() => {
            localStorage.setItem("moeda2", moeda2);
        }, [moeda2]);
    
        return (
            <Moeda2Context.Provider value={{ moeda2, setMoeda2 }}>
                {children}
            </Moeda2Context.Provider>
    )
}

export function useMoeda2(){
    return useContext(Moeda2Context);
}