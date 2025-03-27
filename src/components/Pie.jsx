import { useState, useEffect } from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieChart = () => {
    const [alcoholData, setAlcoholData] = useState({
        labels: [],
        datasets: [{
            label: "Alcohol Distribution",
            data: [],
            backgroundColor: [],
            borderColor: []
        }]
    });

    useEffect(() => {
        const fetchAlcohols = async () => {
            try {
                const response = await fetch('https://alcool-api.pierrenogaro.com/alcools/all');                const alcohols = await response.json();
                const typeCount = {};
                alcohols.forEach(alcohol => {
                    const type = alcohol.name.split(' ')[0] || 'Other';
                    typeCount[type] = (typeCount[type] || 0) + 1;
                });

                const labels = Object.keys(typeCount);
                const counts = Object.values(typeCount);

                const backgroundColor = labels.map(() =>
                    `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.6)`
                );
                const borderColor = backgroundColor.map(color => color.replace('0.6', '1'));

                setAlcoholData(prevState => ({
                    ...prevState,
                    labels: labels,
                    datasets: [{
                        ...prevState.datasets[0],
                        data: counts,
                        backgroundColor,
                        borderColor
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
                text: 'Distribution of Alcohol Types'
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12 d-flex justify-content-center">
                    <div className="chart-container" style={{
                        width: '600px',
                        height: '600px'
                    }}>
                        <Pie options={options} data={alcoholData} />
                    </div>
                </div>
            </div>
        </div>
    )
}