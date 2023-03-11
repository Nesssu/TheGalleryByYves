import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="*" element={ <NotFound /> } />
          <Route path="/admin" element={ <Login /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
