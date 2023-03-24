import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMoeda1 } from '../../hooks/useMoeda1';
import { useMoeda2 } from '../../hooks/useMoeda2';

export default function DataDay(){
    const [response, setResponse] = useState(null);
    const {moeda1} = useMoeda1();
    const {moeda2} = useMoeda2();
    let moeda =`${moeda1}_${moeda2}`

        //Consulta na API
    const fetchQuotes = async () => {
        try {
            const res = await axios.get("https://api-precohoje.matheussantos.tech/dia",{
                headers: {},
                params: {}
            })
            setResponse(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchQuotes()
      },[])

    let dados = response || [];
    let datas: never[] = []
    let USD_BRL: GLfloat[] = []
    let BRL_USD: GLfloat[] = []
    let EUR_BRL: GLfloat[] = []
    let BRL_EUR: GLfloat[] = []
    let EUR_USD: GLfloat[] = []
    let USD_EUR: GLfloat[] = []

    dados.forEach(dado => {
        datas.push(dado['updated_at'])
        USD_BRL.push(parseFloat(parseFloat(dado['USD_BRL']).toFixed(2)))
        BRL_USD.push(parseFloat(parseFloat(dado['BRL_USD']).toFixed(2)))
        EUR_BRL.push(parseFloat(parseFloat(dado['EUR_BRL']).toFixed(2)))
        BRL_EUR.push(parseFloat(parseFloat(dado['BRL_EUR']).toFixed(2)))
        EUR_USD.push(parseFloat(parseFloat(dado['EUR_USD']).toFixed(2)))
        USD_EUR.push(parseFloat(parseFloat(dado['USD_EUR']).toFixed(2)))
    });
    

    return{
        datas : datas,
        USD_BRL : USD_BRL,
        BRL_USD : BRL_USD,
        EUR_BRL : EUR_BRL,
        BRL_EUR : BRL_EUR,
        EUR_USD : EUR_USD,
        USD_EUR : USD_EUR
    }
}