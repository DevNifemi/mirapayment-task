import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChartPage from './components/chart-page/ChartPage';
import HomePage from './components/homepage/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/chart-page' element={<ChartPage />} />
      </Routes>

    </Router>
  );
}

export default App;