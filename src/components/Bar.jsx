import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const BarChart = () => {
    const [alcoholData, setAlcoholData] = useState({
        labels: [],
        datasets: [{
            label: "Number of Ingredients per Alcohol",
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const fetchAlcohols = async () => {
            try {
                const response = await fetch('http://localhost:8081/alcools/all');                const alcohols = await response.json();
                const labels = alcohols.map(alcohol => alcohol.name);
                const ingredientCounts = alcohols.map(alcohol => alcohol.ingredients ? alcohol.ingredients.length : 0);

                setAlcoholData(prevState => ({
                    ...prevState,
                    labels: labels,
                    datasets: [{
                        ...prevState.datasets[0],
                        data: ingredientCounts
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
                text: 'Number of Ingredients per Alcohol'
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <Bar options={options} data={alcoholData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}