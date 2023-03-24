import { useState, useEffect } from 'react';
import axios from 'axios'
import {NumericFormat} from 'react-number-format'
import Graficos from '../graphics/Graficos';

/* ====== Hooks ====== */
import { useIdioma } from '../hooks/useIdioma';
import { useMoeda1 } from '../hooks/useMoeda1';
import { useMoeda2 } from '../hooks/useMoeda2';


export default function Home() {
  const {moeda1, setMoeda1} = useMoeda1()
  const {moeda2, setMoeda2} = useMoeda2()
  
  const {idioma, setIdioma} = useIdioma()

  /* ================= Titulo da Página ======================== */
  let Titulo =   idioma === 'PT'? 'Preço Hoje' :
                 idioma === 'EN'? 'Price Today' :
                 idioma === 'ES'? 'Precio Hoy' : 'o'

  document.title = Titulo

  /* ================= Classes ======================== */

  const classes = {
    input : 'text-lg outline-none dark:bg-gray-900 bg-[#dedede] placeholder:text-[#909090] text-[#666666] dark:text-white rounded-r w-[36rem] 2xl:w-[28rem] xs:!w-[10rem] h-16 p-2 pt-0 pb-0 flex items-center justify-start  border border-l-0 border-black dark:border-cyan-500 rounded-r',
    select :'text-lg w-24 h-16 text-[#666666] dark:text-white bg-[#dedede] dark:bg-gray-900 border border-black dark:border-cyan-500 rounded-l outline-none pl-2'
  };

  /* ================= Processo do Projeto ======================== */

  const [response, setResponse] = useState(null);
  const [valor, setValor] = useState('');
  const [result, setResult] = useState('');
  
  //Consulta na API
  const fetchQuotes = async () => {
    try {
      const res = await axios.get("https://api-precohoje.matheussantos.tech/agora",{
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
    calcular()
  },[valor,result])

  // Pegando os valores
  let USD_BRL = response?.['USD_BRL'] || 5
  let BRL_USD = response?.['BRL_USD'] || 5
  let EUR_BRL = response?.['EUR_BRL'] || 5
  let BRL_EUR = response?.['BRL_EUR'] || 5
  let EUR_USD = response?.['EUR_USD'] || 5
  let USD_EUR = response?.['USD_EUR'] || 5
  const calcular = ()=>{

    let valorParaFormatar = moeda1 == 'BRL' ? valor.replace('R$ ', '') : moeda1 == 'USD' ? valor.replace('$', '') : valor.replace(' €', '')
    let valorFormatado = moeda1 == 'USD' ? valorParaFormatar.replace(/,/g, '') : valorParaFormatar.split('.').join("");
    let valorComPonto = moeda1 != 'USD' ? valorFormatado.replace(',', '.') : valorFormatado
    
    if(moeda1 == 'BRL' && moeda2 == 'USD'){
      setResult(((parseFloat(valorComPonto) * BRL_USD).toLocaleString('en', { style: 'currency', currency: 'USD' })).toString())
    }else if(moeda1 == 'USD' && moeda2 == 'BRL'){
      setResult(((parseFloat(valorComPonto) * USD_BRL).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).toString())
    }else if(moeda1 == 'BRL' && moeda2 == 'EUR'){
      setResult(((parseFloat(valorComPonto) * BRL_EUR).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })).toString())
    }else if(moeda1 == 'EUR' && moeda2 == 'BRL'){
      setResult(((parseFloat(valorComPonto) * EUR_BRL).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).toString())
    }else if(moeda1 == 'EUR' && moeda2 == 'USD'){
      setResult(((parseFloat(valorComPonto) * EUR_USD).toLocaleString('en', { style: 'currency', currency: 'USD' })).toString())
    }else if(moeda1 == 'USD' && moeda2 == 'EUR'){
      setResult(((parseFloat(valorComPonto) * USD_EUR).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })).toString())
    }
  }
  

  const inverterMoedas = () => {
    let simbolMoeda1 = moeda1
    let simbolMoeda2 = moeda2
    let valorMoeda1 = valor
    let valorMoeda2 = result
    setMoeda1(simbolMoeda2)
    setMoeda2(simbolMoeda1)
    setValor(valorMoeda2)
    setResult(valorMoeda1)
  }
  

  const moedas = ['BRL', 'USD', 'EUR']
  const selMoeda1 = moedas.map( moeda =>
    {   
      if(moeda !== moeda2){
        if(moeda === moeda1){
          return <option value={moeda} selected>{moeda}</option>
        }else{
          return <option value={moeda}>{moeda}</option>
        }
      }
    }
    )

    const selMoeda2 = moedas.map( moeda =>
      {   
        if(moeda !== moeda1){
          if(moeda === moeda2){
            return <option value={moeda} selected>{moeda}</option>
          }else{
            return <option value={moeda}>{moeda}</option>
          }
        }
      }
      )


  return (
    <div className='flex items-center justify-center flex-col h-auto w-full'>

      {/* Conversor */}
      <div className='h-[32rem] flex items-center justify-evenly flex-row w-full xl:flex-col xl:justify-center'>
        <div className='w-full flex items-center justify-start xl:justify-center'>
          <select className={classes.select} value={moeda1} onChange={e => {setMoeda1(e.target.value); setValor('')}}>
            {selMoeda1}
          </select>
          
          <NumericFormat
              name='moeda1'
              prefix={ moeda1 == 'BRL' ? 'R$ ' : moeda1 == 'USD' ? '$' : ''}
              suffix={moeda1 == 'EUR' ? ' €' : ''} 
              decimalScale={2}
              thousandSeparator={moeda1 == 'USD' ? ',' : '.'}
              decimalSeparator={moeda1 == 'USD' ? '.' : ','}
              className={classes.input}
              value={valor}
              onChange={e => { setValor(e.target.value)}}
              placeholder={
                moeda1 === 'BRL' ?
                'R$ 0,00'
                : moeda1 === 'USD' ?
                '$0.00'
                : moeda1 == 'EUR' ?
                '0,00 €'
                : moeda1
              }
          />
        </div>
        <i className="fa-solid fa-arrows-rotate text-4xl text-gray-900 dark:text-white xl:rotate-90 xl:m-10 md:text-3xl cursor-pointer" onClick={inverterMoedas}></i>
        <div className='w-full flex items-center justify-end  xl:justify-center '>

          <select className={classes.select} value={moeda2} onChange={e => setMoeda2(e.target.value)}>
            {selMoeda2}
          </select>
          
          <input value={
              result === '$NaN' ?
              '$0.00'
              : result === 'R$ NaN' ?
                'R$ 0,00'
              : result === 'NaN €' ?
                '0,00 €'
              : result
            }
            name='moeda2'
            className={classes.input}
            disabled/>
        </div>
      </div>
      {/* GOogle Adsense */}
      <div>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1617465550802261" crossOrigin="anonymous"></script>
        <ins className="adsbygoogle"
          style={{display: 'block'}}
          data-ad-client="ca-pub-1617465550802261"
          data-ad-slot="7932461765"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
      <Graficos/>
    </div>
    
  )
}