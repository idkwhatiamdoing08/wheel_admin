
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import WheelSettings from './components/WheelSettings/WheelSettings';
import WheelPrizes from './components/WheelPrizes/WheelPrizes';
import WheelsList from './components/WheelsList/WheelsList';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import WheelUsers from './components/WheelUsers/WheelUsers';


function App() {
 

  return (
    <>
    <Router>
    <Header/>
    <BurgerMenu/>
      <Routes>
        <Route path="/" element={<WheelsList/>}/>
        {/* <Route path="/settings" element={<WheelSettings />} /> */}
        <Route path="/prizes" element={<WheelPrizes />} />
        <Route path="/users" element={<WheelUsers/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;