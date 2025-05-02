import React from "react";
import logoTengah from "../assets/logo2.png";
import lacakIcon from "../assets/lacakPesanan.png";
import tipsIcon from "../assets/tips.png";
import keranjangIcon from "../assets/keranjang.png";
import produkIcon from "../assets/produk.png";
import berandaIcon from "../assets/beranda.png";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header>
      <div className="logoPojok">
        <img src={logoTengah} alt="Logo Aqua Flora" />
      </div>
      <nav>
        <a href="#">Lacak Pesanan
          <img src={lacakIcon} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Tips
          <img src={tipsIcon} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Keranjang
          <img src={keranjangIcon} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Produk
          <img src={produkIcon} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Home
          <img src={berandaIcon} alt="Lacak Icon" className="nav-icon" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
