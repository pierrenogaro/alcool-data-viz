import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">🥃 Data-viz</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/bar">📊 Bar Chart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/line">📈 Line Chart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pie">🍕 Pie Chart</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/other">⚙️ Other</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;