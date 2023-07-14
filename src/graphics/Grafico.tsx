import ApexChart from 'react-apexcharts';
import { useTheme } from '../hooks/useTheme';
import { useMoeda1 } from "../hooks/useMoeda1";
import { useMoeda2 } from "../hooks/useMoeda2";

interface props{
  titulo: string;
  serieText: string;
  dados: Array<number>;
  datas: Array<string>;
}

export default function Grafico({titulo,serieText, dados, datas}: props) {

  const {theme} = useTheme() || 'light';
  const { moeda1 } = useMoeda1()
  const { moeda2 } = useMoeda2()

  const data = {
    options: {
      chart: {
        id:'area',
        height: 50,
        background: 'transparent',
        foreColor: theme === 'light' ? 'black': 'white',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: window.screen.width <= 768 ?false : true,
            zoomin: true,
            zoomout: true,
            pan: false,
          },
      },
    },
      
      title: {
        text: titulo,
        margin: 10,
        offsetX: 7,
        offsetY: 0,
        floating: false,
      },
      subtitle: {
        text: `${moeda1} ➔ ${moeda2}`,
        offsetX: 7,
        offsetY: 20,
      },
      tooltip:{
        theme: theme,
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
      
      dataLabels: {
        enabled: false
      },
      fill: {
        colors: ['#00BAEC'],
        opacity: 0.4,
      },
      xaxis:{
        categories: datas.map(data => data.substring(11))
      }
    },
    series:[
      {
        name: serieText,
        data: dados
      }
    ]
  }

  return(
    <div className='w-full p-4 border border-cyan-500 rounded'>
      <ApexChart options={data.options} series={data.series} height={280} type='area' />
    </div>
  )
}