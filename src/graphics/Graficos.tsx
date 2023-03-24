import Grafico from "./Grafico"
import DataDay from "./data/DataDay";
import { useMoeda1 } from "../hooks/useMoeda1";
import { useMoeda2 } from "../hooks/useMoeda2";
import { useIdioma } from "../hooks/useIdioma";

export default function Graficos(){

    const dataDayDados = DataDay()
    const { moeda1 } = useMoeda1()
    const { moeda2 } = useMoeda2()
    const { idioma } = useIdioma()
    
    return(
        <div className="w-full xs:px-6 py-10">
            <h1 className="text-xl font-bold text-black dark:text-white mt-20 mb-10">{idioma === 'EN' ? 'Graphics' : 'Gráficos'}</h1>
            <div className="my-10">
                {moeda1 === 'BRL' && moeda2 === 'USD' ? (
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['BRL_USD'].reverse()} datas={dataDayDados['datas'].reverse()}/>
                ) : moeda1 === 'USD' && moeda2 === 'BRL' ?(
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['USD_BRL'].reverse()} datas={dataDayDados['datas'].reverse()}/>
                ) : moeda1 === 'BRL' && moeda2 === 'EUR'? (
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['BRL_EUR'].reverse()} datas={dataDayDados['datas'].reverse()}/>
                ) : moeda1 === 'EUR' && moeda2 === 'BRL'? (
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['EUR_BRL'].reverse()} datas={dataDayDados['datas'].reverse()}/>  
                ) : moeda1 === 'EUR' && moeda2 === 'USD'? (
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['EUR_USD'].reverse()} datas={dataDayDados['datas'].reverse()}/> 
                ) : moeda1 === 'USD' && moeda2 === 'EUR'? (
                    <Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['USD_EUR'].reverse()} datas={dataDayDados['datas'].reverse()}/> 
                ) : (<Grafico titulo="Preço nas ultimas 24 horas" dados={dataDayDados['BRL_USD'].reverse()} datas={dataDayDados['datas'].reverse()}/>)}
             
            </div>
        </div>
    )
}

