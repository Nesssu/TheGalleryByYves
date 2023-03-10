import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Tickets from './pages/Tickets';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path='/tickets' element={ <Tickets /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
