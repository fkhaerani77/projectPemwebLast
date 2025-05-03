import React from "react";
import whatsappIcon from "../assets/whatsapp.png"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left"> <p>Aqua <br/> Flora</p></div>
      <div className="footer-sosmed">
        <p>Ikuti Kami di</p>
        <a href="https://wa.me/628815109269" target="_blank" rel="noopener noreferrer">
            <button className="btn-sosmed">
            <img src={whatsappIcon} alt="WhatsApp" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            WhatsApp
            </button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
