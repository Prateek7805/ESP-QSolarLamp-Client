import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './Pages/Welcome/Welcome';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/dashboard' element={<></>} />
          <Route path='/controls/:name' element={<></>} />
          <Route path='/settings' element={<></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
