import React from 'react';
import { useNavigate } from 'react-router-dom';

const chartTypes = [
    {
        id: 'bar',
        title: 'Bar Chart',
        description: 'Visualize comparative data with vertical bars.',
        color: 'rgb(54, 162, 235)',
        path: '/bar'
    },
    {
        id: 'line',
        title: 'Line Chart',
        description: 'Track changes and trends over time with connected data points.',
        color: 'rgb(255, 99, 132)',
        path: '/line'
    },
    {
        id: 'pie',
        title: 'Pie Chart',
        description: 'Display proportional data as slices of a complete circle.',
        color: 'rgb(255, 206, 86)',
        path: '/pie'
    }
];

export const Home = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div className="container py-5">
            <div className="row text-center mb-5">
                <div className="col">
                    <h1>Alcohol Dashboard</h1>
                    <p className="lead">Select a Chart Type:</p>
                </div>
            </div>

            <div className="row justify-content-center">
                {chartTypes.map((chart) => (
                    <div className="col-md-4 mb-4" key={chart.id}>
                        <div
                            className="card h-100 shadow-sm"
                            onClick={() => handleCardClick(chart.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="card-header text-white"
                                style={{ backgroundColor: chart.color }}
                            >
                                <h3>{chart.title}</h3>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{chart.description}</p>
                                <div className="d-grid">
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: chart.color, color: 'white' }}
                                    >
                                        View Chart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;