import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import ModalContext from './Components/Context/Modal_Context';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <ModalContext>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/settings' element={<></>} />
        </Routes>
      </Router>
    </div>
    </ModalContext>
  );
}

export default App;
