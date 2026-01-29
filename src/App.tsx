import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { MainLayout } from "./layout/MainLayout";
import {Stock} from "./pages/Stock/Stock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stock" element={ <Stock/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
