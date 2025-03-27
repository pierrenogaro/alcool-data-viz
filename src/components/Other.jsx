import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const Other = () => {
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Other',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [userData, setUserData] = useState({
        labels: ['Registered Users'],
        datasets: [
            {
                label: 'Number of Users',
                data: [0],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        Promise.all([
            fetchAlcoholsWithComments(),
            fetchUserCount()
        ]);
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await fetch('http://localhost:8081/auth/count');
            const data = await response.json();

            setUserData({
                labels: ['Registered Users'],
                datasets: [
                    {
                        label: 'Number of Users',
                        data: [data.count || 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching user count:', error);
            try {
                const response = await fetch('http://localhost:8081/alcools/all');
                const alcoholsData = await response.json();

                const allCommentsPromises = alcoholsData.map(alcohol =>
                    fetch(`http://localhost:8081/alcools/${alcohol._id}`)
                        .then(res => res.json())
                );

                const allAlcoholsDetails = await Promise.all(allCommentsPromises);

                const uniqueUsers = new Set();
                allAlcoholsDetails.forEach(alcoholDetail => {
                    if (alcoholDetail.comments) {
                        alcoholDetail.comments.forEach(comment => {
                            if (comment.author && comment.author._id) {
                                uniqueUsers.add(comment.author._id);
                            }
                        });
                    }
                });

                setUserData({
                    labels: ['Registered Users'],
                    datasets: [
                        {
                            label: 'Number of Users',
                            data: [uniqueUsers.size],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error getting user count from comments:', error);
            }
        }
    };

    const fetchAlcoholsWithComments = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8081/alcools/all');
            const alcoholsData = await response.json();

            const alcoholsWithComments = await Promise.all(
                alcoholsData.map(async (alcohol) => {
                    try {
                        const commentResponse = await fetch(`http://localhost:8081/alcools/${alcohol._id}`);
                        const alcoholDetails = await commentResponse.json();
                        return {
                            name: alcohol.name,
                            commentCount: alcoholDetails.comments ? alcoholDetails.comments.length : 0
                        };
                    } catch (error) {
                        return { name: alcohol.name, commentCount: 0 };
                    }
                })
            );

            const labels = alcoholsWithComments.map(a => a.name);
            const commentCounts = alcoholsWithComments.map(a => a.commentCount);

            setCommentData({
                labels,
                datasets: [
                    {
                        label: 'Number of Other',
                        data: commentCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const commentOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Other per Alcohol',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    const userOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Registered Users',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="text-center mb-4">Comments Analytics</h2>
                    <p className="text-muted text-center">View statistics about comments and users</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <Bar options={commentOptions} data={commentData} />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <Bar options={userOptions} data={userData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Other;