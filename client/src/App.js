import './App.css';
import Artists from './pages/Artists';
import Exhibitions from './pages/Exhibitions';
import Contact from './pages/Contact';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function App() {
  return (
    <div className="App">
      <div className="TopArea">
        <Contact />
        <div className="HomeBackground">
          
          <h1 className='HomeHeader'>The Gallery By Yves</h1>
          <h3 className='LocationHeaderOne'>Helsinki</h3>
          <h3 className='LocationHeaderTwo'>Finland</h3>
          <h2 className='NextOpeningHeader'>Next Opening Friday February 17</h2>
          
          <div className="BuyTicketButton">
            Buy Tickets
          </div>

          <div className="ContactLinkArea">
            <IoIosArrowBack className='LinkArrow' />
            <p className="LinkText">Contact</p>
          </div>

          <div className="ExhibitionsLinkArea">
            <p className="LinkText">Exhibitions</p>
            <IoIosArrowDown className='LinkArrow' />
          </div>

          <div className="ArtistsLinkArea">
            <p className="LinkText">Artists</p>
            <IoIosArrowForward className='LinkArrow' />
          </div>

        </div>
        <Artists />
      </div>
      <div className="BottomArea">
        <Exhibitions />
      </div>
    </div>
  );
}

export default App;
