import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import TrainSelectionPage from "./pages/TrainSelectionPage/TrainSelectionPage";
import SeatSelectionPage from "./pages/SeatSelectionPage/SeatSelectionPage";
import PassangersPage from "./pages/PassangersPage/PassangersPage";


function App() {
  return (
    <BrowserRouter basename="/diplom">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trains" element={<TrainSelectionPage />} />
        <Route path="/seat" element={<SeatSelectionPage />} />
        <Route path="/passangers" element={<PassangersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;