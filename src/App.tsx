import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { MainLayout } from "./layout/MainLayout";
import {Stock} from "./pages/Stock/Stock";
import Credit from "./pages/Credit/Credit";
import Personnel from "./pages/Personnel/Personnel";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stock" element={ <Stock/> } />
          <Route path="/dept" element={ <Credit/> } />
          <Route path="/personnel" element={<Personnel />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
