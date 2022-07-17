import { Chart } from "chart.js";
import { useEffect, useContext, useState } from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    Title, Tooltip, // Legend
} from 'chart.js';
import { SocketContext } from "../context";
import { BandType } from "../interfaces/Band";
  
ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, // Legend
);

const BandChart = () => {

    const {socket} = useContext(SocketContext)
    const [bands, setBands] = useState<BandType[]>([])

    useEffect(() => {
        socket.on('current_bands', (bands) => {
            setBands(bands)
        })

    }, [socket])

    const numberRandom = () => {
        return `rgba(${Math.floor((Math.random() * (255-80)) +80)}, ${Math.floor((Math.random() * (255-50)) +50)}, ${Math.floor((Math.random() * (255-40)) +40)}, 0.8)`
    }

    const options = {
        indexAxis: 'y' as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right' as const,
          },
          title: {
            display: true,
            text: 'Grafica de las bandas',
          },
        },
    };

    const labels = bands.map( band => band.name )

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: bands.map( band => band.votes ),
                // borderColor: bands.map( band => numberRandom()),
                backgroundColor: bands.map( band => numberRandom()),
            },
        ],
    };
    

    return (
        <div className="">
            <Bar options={options} data={data} />
        </div>
    )
}

export default BandChart