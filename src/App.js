import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Enterprise from './screens/Enterprise';
import Schedule from './screens/Schedule';
import Login from './screens/Login'
import Registration from './screens/Registration'
import BiddingPage from './screens/BiddingPage';
// import Spinner from './components/Spinner';
import TrackingPage from './components/TrackingPage';

function App() {
  return (
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/enterprise' element={<Enterprise />} />
            <Route exact path='/schedule' element={<Schedule />} />
            <Route exact path='/' element={<Login />} />
            <Route exact path='/registration' element={<Registration />} />
            <Route exact path='/bidding' element={<BiddingPage />} />
            <Route exact path='/tracking' element={<TrackingPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
