import React from 'react';
import { useNavigate } from 'react-router-dom';

const chartTypes = [
    {
        id: 'bar',
        title: '\n' + '📊 Bar Chart',
        description: 'Visualize comparative data with vertical bars.',
        color: 'rgb(54, 162, 235)',
        path: '/bar',
        icon: 'bi-bar-chart'
    },
    {
        id: 'line',
        title: '📈 Line Chart',
        description: 'Track changes and trends over time with connected data points.',
        color: 'rgb(255, 99, 132)',
        path: '/line',
        icon: 'bi-graph-up'
    },
    {
        id: 'pie',
        title: '🍕 Pie Chart',
        description: 'Display proportional data as slices of a complete circle.',
        color: 'rgb(255, 206, 86)',
        path: '/pie',
        icon: 'bi-pie-chart'
    },
    {
        id: 'other',
        title: '⚙️ Other',
        description: 'View additional statistics.',
        color: 'rgb(75, 192, 192)',
        path: '/other',
        icon: 'bi-bar-chart-fill'
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
                    <h1 className="display-4 fw-bold">Alcool Dashboard</h1>
                    <p className="lead mb-4">Select a Chart Type or View Other Statistics</p>
                    <a href="https://frontend-alcool.pierrenogaro.com/"
                       className="btn btn-primary mb-4 px-4 py-2 rounded-pill shadow"
                       target="_blank"
                       rel="noopener noreferrer">
                        🍷 Explore Alcool Collection
                    </a>
                    <hr className="mx-auto" style={{ width: '50px', height: '3px', opacity: '1' }} />
                </div>
            </div>

            <div className="row justify-content-center g-4">
                {chartTypes.map((chart) => (
                    <div className="col-md-6 col-lg-3" key={chart.id}>
                        <div
                            className="card h-100 shadow rounded-3 border-0"
                            onClick={() => handleCardClick(chart.path)}
                            style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div
                                className="card-header text-white rounded-top"
                                style={{ backgroundColor: chart.color }}
                            >
                                <h3 className="fs-4 mb-0 d-flex align-items-center justify-content-center">
                                    <i className={`bi ${chart.icon || ''} me-2 fs-3`}></i>
                                    {chart.title}
                                </h3>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <p className="card-text flex-grow-1">{chart.description}</p>
                                <div className="d-grid mt-auto">
                                    <button
                                        className="btn btn-lg rounded-pill"
                                        style={{ backgroundColor: chart.color, color: 'white' }}
                                    >
                                        {chart.id === 'other' ? 'View Statistics' : 'View Chart'}
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