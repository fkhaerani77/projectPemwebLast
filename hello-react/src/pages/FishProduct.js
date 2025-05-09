import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ikan1 from '../assets/gabus.jpeg';
import ikan2 from '../assets/gurame.jpeg';
import ikan3 from '../assets/lele.jpeg';
import ikan4 from '../assets/patin.jpeg';
import ikan5 from '../assets/koi.jpeg';
import ikan6 from '../assets/guppy.jpeg';
import ikan7 from '../assets/mas.jpeg';
import ikan8 from '../assets/mujaer.jpeg';
import ikan9 from '../assets/nila.jpeg';
import ikan10 from '../assets/belut.jpeg';
import ikan11 from '../assets/arwana.jpeg';

const FishProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const { keranjang, addToCart } = useContext(CartContext);


  const produkList = [
    { id: 1, nama: 'Ikan Gabus 1Kg', deskripsi: 'Tinggi protein, bantu pemulihan.', deskripsiLengkap: 'Ikan Gabus 1Kg adalah ikan air tawar yang dikenal dengan nilai gizi tinggi, terutama kandungan proteinnya yang dapat membantu pemulihan tubuh. Cocok untuk konsumsi sehat atau dipelihara.', panjang: '30 cm', berat: '1 kg', gambar: ikan1, kategori: 'konsumsi', price: 27000, qty: 1 },
    { id: 2, nama: 'Ikan Gurame 1Kg', deskripsi: 'Daging tebal dan lezat.', deskripsiLengkap: 'Ikan Gurame memiliki daging yang tebal dan lezat, menjadikannya pilihan utama untuk hidangan spesial. Ikan ini juga kaya akan nutrisi penting yang baik untuk kesehatan tubuh.', panjang: '25 cm', berat: '0.8 kg', gambar: ikan2, kategori: 'konsumsi', price: 75000, qty: 1 },
    { id: 3, nama: 'Ikan Lele 1Kg', deskripsi: 'Ikan hias kecil dengan warna menarik.', deskripsiLengkap: 'Ikan Lele merupakan ikan air tawar yang sering dikonsumsikan karena mudah dipelihara. Selain itu, ikan ini juga memiliki tekstur daging yang lezat dan kaya akan protein.', panjang: '28 cm', berat: '1 kg', gambar: ikan3, kategori: 'konsumsi', price: 19000, qty: 1 },
    { id: 4, nama: 'Ikan Patin', deskripsi: 'Daging lembut dan protein.', deskripsiLengkap: 'Ikan Patin dikenal dengan daging yang lembut dan kaya akan protein. Ikan ini sangat cocok untuk dijadikan hidangan yang lezat dan bergizi.', panjang: '27 cm', berat: 1000, gambar: ikan4, kategori: 'konsumsi', price: 35000, qty: 1 },
    { id: 5, nama: 'Ikan Koi', deskripsi: 'Ikan hias kecil dengan warna menarik.', deskripsiLengkap: 'Ikan Koi adalah ikan hias yang memiliki corak warna cerah dan menarik. Ikan ini sering dipelihara di kolam hias karena keindahannya yang mempesona.', panjang: '30 cm', berat: 1000, gambar: ikan5, kategori: 'hias' , price: 50000, qty: 1},
    { id: 6, nama: 'Ikan Guppy', deskripsi: 'Ikan hias kecil dengan warna menarik.', deskripsiLengkap: 'Ikan Guppy adalah ikan hias kecil dengan warna yang cerah dan bervariasi. Ikan ini mudah dipelihara dan sering digunakan untuk mempercantik akuarium.', panjang: '26 cm', berat: 0.850, gambar: ikan6, kategori: 'hias', price: 2000, qty: 1 },
    { id: 7, nama: 'Ikan Nila 1Kg', deskripsi: 'Daging empuk dan kaya gizi.', deskripsiLengkap: 'Ikan Nila dikenal dengan daging yang empuk dan kaya akan gizi. Ikan ini sangat cocok untuk konsumsi sehari-hari dan memiliki kandungan protein yang baik untuk kesehatan.', panjang: '29 cm', berat: 1000, gambar: ikan7, kategori: 'konsumsi', price: 47000, qty: 1 },
    { id: 8, nama: 'Ikan Mas 1Kg', deskripsi: 'Daging lembut dan nikmat.', deskripsiLengkap: 'Ikan Mas memiliki daging yang lembut dan rasa yang nikmat, membuatnya sangat disukai dalam berbagai hidangan. Selain itu, ikan ini kaya akan nutrisi yang baik untuk tubuh.', panjang: '25 cm', berat: 0.800, gambar: ikan8, kategori: 'hias', price: 35000, qty: 1  },
    { id: 9, nama: 'Ikan Mujair', deskripsi: 'Daging kenyal dan bergizi.', deskripsiLengkap: 'Ikan Mujair memiliki daging yang kenyal dan kaya akan gizi. Ikan ini mudah dipelihara dan sering dikonsumsikan karena pertumbuhannya yang cepat serta rasanya yang lezat.', panjang: '26 cm', berat: 0.850, gambar: ikan9, kategori: 'konsumsi', price: 53000, qty: 1 },
    { id: 10, nama: 'Ikan Belut', deskripsi: 'Daging kenyal dan kaya protein.', deskripsiLengkap: 'Ikan Belut dikenal dengan daging yang kenyal dan kaya akan protein. Ikan ini mudah ditemukan di perairan tawar dan sering dipelihara untuk konsumsi karena rasanya yang lezat serta manfaatnya bagi kesehatan, seperti mempercepat pemulihan tubuh.', panjang: '50 cm', berat: '1.2 kg', gambar: ikan10, kategori: 'konsumsi', price: 55000, qty: 1 },
    { id: 11, nama: 'Ikan Arwana', deskripsi: 'Ikan hias mewah, warna cerah.', deskripsiLengkap: 'Ikan Arwana dikenal dengan warnanya yang cerah dan penampilannya yang menawan. Ikan ini dianggap sebagai ikan pembawa keberuntungan dan sering dipelihara dalam akuarium besar.', panjang: '60 cm', berat: 1500, gambar: ikan11, kategori: 'hias', price: 200000, qty: 1 },
  ];

  const filteredProduk = produkList.filter((produk) => {
    const cocokKategori = filter === 'semua' || produk.kategori === filter;
    const cocokPencarian = produk.nama.toLowerCase().includes(searchTerm.toLowerCase());
    return cocokKategori && cocokPencarian;
  });

  const handleDetailClick = (produk) => {
    setSelectedProduct(produk);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (produk) => {
    const newProduct = { ...produk, qty: 1 };
    addToCart(newProduct); // Menambahkan item ke keranjang melalui CartContext
  };

  return (
    <div className="produk-section">
      <div className="filter-box">
        <div className="filter-header">
          <h2>Filter Produk</h2>
          <input
            type="text"
            placeholder="Cari ikan..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter('semua')}>Semua</button>
          <button onClick={() => setFilter('hias')}>Ikan Hias</button>
          <button onClick={() => setFilter('konsumsi')}>Ikan Konsumsi</button>
        </div>
      </div>

      <div className="produk-grid">
        {filteredProduk.map((produk) => (
          <div key={produk.id} className="produk-card">
            <img src={produk.gambar} alt={produk.nama} className="produk-img" />
            <div className="produk-info">
              <h3>{produk.nama}</h3>
              <p>{produk.deskripsi}</p>
              <button className="detail-btn" onClick={() => handleDetailClick(produk)}>
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Menampilkan Keranjang */}
      <div className="keranjang">
        <h2>Keranjang</h2>
        {keranjang.length > 0 ? (
          <ul>
            {keranjang.map((produk, index) => (
              <li key={index}>
                {produk.nama} - {produk.berat}
              </li>
            ))}
          </ul>
        ) : (
          <p>Keranjang Anda masih kosong.</p>
        )}
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closePopup}>×</button>
            <img
              src={selectedProduct.gambar}
              alt={selectedProduct.nama}
              className="modal-img"
            />
            <h3>{selectedProduct.nama}</h3>
            <p>{selectedProduct.deskripsiLengkap}</p>
            <div className="detail-info">
              <span>Panjang: {selectedProduct.panjang}</span>
              <span>Berat: {selectedProduct.berat}</span>
            </div>
            <button className="add-btn" onClick={() => handleAddToCart(selectedProduct)}>
            Tambah Item
          </button>


          </div>
        </div>
      )}
    </div>
  );
};

export default FishProduct;
