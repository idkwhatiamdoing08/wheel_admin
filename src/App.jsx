import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import PhysicalPrizes from "./components/PhysicalPrizes/PhysicalPrizes";
import WheelPrizes from "./components/WheelPrizes/WheelPrizes";
import WheelsList from "./components/WheelsList/WheelsList";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import WheelUsers from "./components/WheelUsers/WheelUsers";
import Promo from "./components/Promo/Promo";
import Attempts from "./components/Attempts/Attempts";
import EmptyPrizes from "./components/EmptyPrizes/EmptyPrizes";
import Authorization from "./components/Authorization/Authorization";
import Wins from "./components/Wins/Wins";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Роут авторизации - без Header и BurgerMenu */}
          <Route path="/" element={<Authorization />} />

          {/* Все остальные роуты - с Header и BurgerMenu */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <BurgerMenu />
                <Routes>
                  <Route path="/wheels" element={<WheelsList />} />
                  <Route path="/prizes" element={<WheelPrizes />} />
                  <Route path="/users" element={<WheelUsers />} />
                  <Route path="/promo" element={<Promo />} />
                  <Route path="/physical-prizes" element={<PhysicalPrizes />} />
                  <Route path="/attempt" element={<Attempts />} />
                  <Route path="/empty-prizes" element={<EmptyPrizes />} />
                  <Route path="/wins" element={<Wins />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
