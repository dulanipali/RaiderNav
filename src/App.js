import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
//import Map from './components/Map';
import BusSchedule from './components/BusSchedule'; // Import your Bus Schedule component
import DiningOptions from './components/DiningOptions'; // Import your Dining Options component
import Faq from './components/Faq'; // Import your FAQ component
import Resources from './components/Resources'

console.log('Current environment:', process.env.NODE_ENV);

function App() {
  return (
    <Routes>
      <Route path="/RaiderNav" element={<Home />} />
      {/*<Route path="/map" element={<Map />} />*/}
      <Route path="/BusSchedule" element={<BusSchedule />} />
      <Route path="/dining" element={<DiningOptions />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
}

export default App;
