import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MapWithSearch from './components/MapView';
import BusSchedule from './components/BusSchedule'; // Import your Bus Schedule component
import Faq from './components/Faq'; // Import your FAQ component
import MapWithDirections from './components/Directions';
import Services from './components/Services';
import Dining from './components/Dining';
import BuildingInfo from './components/Buildings';

console.log('Current environment:', process.env.NODE_ENV);

function App() {
  return (
    <Router basename='/RaiderNav'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BusSchedule" element={<BusSchedule />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/map" element={<MapWithSearch />} />
        <Route path="/directions" element={<MapWithDirections />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/buildinginfo" element={<BuildingInfo />} />
      </Routes>
    </Router>
  );
}

export default App;