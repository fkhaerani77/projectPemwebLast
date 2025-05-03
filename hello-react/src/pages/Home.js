import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.js";
import logoTengah from "../assets/logo2.png"
import Product from "./Product.js";

function Home() {
  useEffect(() => {
    // Salju
    const style = document.createElement("style");
    style.innerHTML = `
      .snowflake {
        position: fixed;
        top: -10px;
        z-index: 9999;
        animation: fall 15s linear infinite;
        pointer-events: none;
        color: white;
      }
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDelay = Math.random() * 5 + "s";
      snowflake.style.opacity = Math.random() + 0.5;
      snowflake.style.fontSize = Math.random() * 20 + 10 + "px";
      snowflake.innerHTML = "❄";
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 15000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content">
      
      <iframe 
        width="0" 
        height="0" 
        src="https://www.youtube.com/embed/FbScaiYQPtQ?autoplay=1&loop=1&playlist=FbScaiYQPtQ" 
        title="YouTube audio player" 
        frameborder="0" 
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin">
      </iframe>

      <p>Welcome to</p>
      <h1>Aqua Flora</h1>
      <p>Nusantara</p>
      <div className="logoTengah">
        <img src={logoTengah} alt="Logo Aqua Flora" height="358" />
      </div>
      <div>
        <Link to="/Product">
          <button className="btn-product">Mulai Menjelajah</button>
        </Link>
      </div>
      <div className="teksBawah">
        <p>~Ikan menari tanaman berseri~</p>
        <div className="p2">
          <p>
            Aqua Floris Nusantara menyediakan ikan hidup segar dan sehat untuk
            hobi
          </p>
          <p>dan budidaya. Siap kirim dengan aman ke seluruh Indonesia.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
