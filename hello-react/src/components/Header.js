import React from "react";
import logoTengah from "./assets/logoTengah.png";


function Header() {
  return (
    <header>
      <div className="logoPojok">
        <img src={logoTengah} alt="Logo Aqua Flora" />
      </div>
      <nav>
        <a href="#">Lacak Pesanan
          <img src={require('./assets/lacakPesanan.png')} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Tips
          <img src={require('./assets/tips.png')} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Keranjang
          <img src={require('./assets/keranjang.png')} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Produk
          <img src={require('./assets/produk.png')} alt="Lacak Icon" className="nav-icon" />
        </a>
        <a href="#">Home
          <img src={require('./assets/beranda.png')} alt="Lacak Icon" className="nav-icon" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
