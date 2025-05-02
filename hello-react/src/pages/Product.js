import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Produk from "./Produk"; // Buat atau sesuaikan file Produk.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produk" element={<Produk />} />
      </Routes>
    </Router>
  );
}
