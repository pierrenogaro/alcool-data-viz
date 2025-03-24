import Navbar from './components/Navbar'
import { LineGraph } from './components/Line'
import { BarChart } from './components/Bar'
import { PieChart } from './components/Pie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx";

function App() {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <div className="container mt-5 pt-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/line" element={<LineGraph />} />
                        <Route path="/bar" element={<BarChart />} />
                        <Route path="/pie" element={<PieChart />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
