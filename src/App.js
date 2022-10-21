import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
