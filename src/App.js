import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MapWithSearch from './components/MapView';
import BusSchedule from './components/BusSchedule'; // Import your Bus Schedule component
import DiningOptions from './components/DiningOptions'; // Import your Dining Options component
import Faq from './components/Faq'; // Import your FAQ component
import Resources from './components/Resources'
//import SearchPage from './components/Search';
import MapPage from './components/Mapping';

console.log('Current environment:', process.env.NODE_ENV);

function App() {
  return (
    <Router basename='/RaiderNav'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BusSchedule" element={<BusSchedule />} />
        <Route path="/dining" element={<DiningOptions />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/map" element={<MapWithSearch />} />
        <Route path="/map_page" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
