import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const LineGraph = () => {
    const [alcoholData, setAlcoholData] = useState({
        labels: [],
        datasets: [{
            label: "Alcohol Degrees by Alcohol",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            tension: 0.4
        }]
    });

    useEffect(() => {
        const fetchAlcohols = async () => {
            try {
                const response = await fetch('https://alcool-api.pierrenogaro.com/alcools/all');                const alcohols = await response.json();
                const labels = alcohols.map(alcohol => alcohol.name);
                const degrees = alcohols.map(alcohol => parseFloat(alcohol.degree));

                setAlcoholData(prevState => ({
                    ...prevState,
                    labels: labels,
                    datasets: [{
                        ...prevState.datasets[0],
                        data: degrees
                    }]
                }));
            } catch (error) {
                console.error('Error fetching alcohols:', error);
            }
        };

        fetchAlcohols();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Alcohol Degrees by Alcohol'
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <Line options={options} data={alcoholData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}