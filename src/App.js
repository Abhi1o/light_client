
import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Navbar from './pages/navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
