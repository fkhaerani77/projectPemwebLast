import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import tanaman1 from '../assets/BibitPisangAmbon.jpeg';
import tanaman2 from '../assets/kangkung.png';
import tanaman3 from '../assets/wortel.png';
import tanaman4 from '../assets/BunganMatahari.jpeg';
import tanaman5 from '../assets/MawarMerah.jpeg';
import tanaman6 from '../assets/KambojaJepang.jpeg';
import tanaman7 from '../assets/ManggaMerah.jpeg';
import tanaman8 from '../assets/Kaktus.jpeg';
import tanaman9 from '../assets/DaunBawang.jpeg';
import tanaman10 from '../assets/CabaiHias.jpeg';
import tanaman11 from '../assets/BuahJeruk.jpeg';
import tanaman12 from '../assets/TomatCeri.jpeg';

const PlantProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [keranjang, setKeranjang] = useState([]); // State untuk keranjang
  const { addToCart } = useContext(CartContext);

  const produkList = [
    { id: 1, nama: 'Pisang Ambon', deskripsi: 'Bibit unggul, siap tanam.', deskripsiLengkap: 'Bibit Pisang Ambon adalah tanaman muda yang siap dipindah tanam ke lahan. Dikenal dengan pertumbuhan cepat dan hasil buah manis berukuran besar. Cocok untuk budidaya skala rumahan maupun komersial.', tinggi: '25 cm', berat: '0.5 kg', gambar: tanaman1, kategori: 'konsumsi', price: 10000, qty: 1 },
    { id: 2, nama: 'Kangkung', deskripsi: 'Padi berkualitas tinggi.', deskripsiLengkap: 'Tanaman Padi Siap Panen merupakan varietas unggul yang menghasilkan bulir padat dan bernas. Cocok untuk budidaya di lahan sawah dengan hasil panen maksimal.', tinggi: '90 cm', berat: '1.2 kg', gambar: tanaman2, kategori: 'konsumsi', price: 15000, qty: 1 },
    { id: 3, nama: 'Wortel', deskripsi: 'Jagung manis berkualitas.', deskripsiLengkap: 'Tanaman Jagung Siap Panen menghasilkan tongkol besar dan padat biji. Cocok untuk konsumsi langsung, pakan ternak, maupun bahan baku industri pangan.', tinggi: '180 cm', berat: '2 kg', gambar: tanaman3, kategori: 'konsumsi', price: 12000, qty: 1 },
    { id: 4, nama: 'Bunga Matahari', deskripsi: 'Hiasan cantik, mudah dirawat.', deskripsiLengkap: 'Tanaman Bunga Matahari Mini cocok dijadikan hiasan rumah atau kantor. Ukurannya mungil, tumbuh cepat, dan membutuhkan perawatan yang sederhana. Dapat tumbuh subur di pot maupun di taman.', tinggi: '35 cm', berat: '0.4 kg', gambar: tanaman4, kategori: 'hias', price: 18000, qty: 1 },
    { id: 5, nama: 'Mawar Merah', deskripsi: 'Simbol cinta, harum memikat.', deskripsiLengkap: 'Tanaman Mawar Merah adalah bunga hias klasik yang dikenal sebagai simbol cinta dan keindahan. Cocok ditanam di pot atau taman, menghasilkan bunga merah cerah dengan aroma khas yang memikat.', tinggi: '40 cm', berat: '0.5 kg', gambar: tanaman5, kategori: 'hias', price: 20000, qty: 1 },
    { id: 6, nama: 'Kamboja Jepang', deskripsi: 'Eksotis dan tahan panas.', deskripsiLengkap: 'Tanaman Kamboja Jepang (Adenium) dikenal dengan batang menggembung dan bunga mencolok. Cocok untuk iklim tropis, mudah dirawat, dan sering digunakan sebagai tanaman hias di taman atau pot.', tinggi: '45 cm', berat: '0.6 kg', gambar: tanaman6, kategori: 'hias', price: 22000, qty: 1 },
    { id: 7, nama: 'Buah Mangga Merah', deskripsi: 'Buah manis dan menyegarkan.', deskripsiLengkap: 'Tanaman Buah Mangga Merah menghasilkan buah berwarna merah dengan rasa manis dan segar. Cocok ditanam di pekarangan rumah, perawatannya mudah dan tahan terhadap cuaca tropis.', tinggi: '80 cm', berat: '2.5 kg', gambar: tanaman7, kategori: 'buah', price: 35000, qty: 1 },
    { id: 8, nama: 'Kaktus Pereskia Sabulata', deskripsi: 'Kaktus berdaun unik.', deskripsiLengkap: 'Kaktus Pereskia Sabulata adalah jenis kaktus langka yang memiliki daun hijau lebar, tidak seperti kaktus biasa. Tahan panas, mudah tumbuh, dan sering digunakan sebagai tanaman koleksi atau pagar hidup.', tinggi: '50 cm', berat: '0.8 kg', gambar: tanaman8, kategori: 'hias', price: 25000, qty: 1 },
    { id: 9, nama: 'Daun Bawang', deskripsi: 'Bumbu dapur segar.', deskripsiLengkap: 'Tanaman Daun Bawang merupakan sayuran aromatik yang umum digunakan sebagai bumbu dapur. Tumbuh cepat, cocok ditanam di pot atau lahan sempit, dan sering dipanen untuk keperluan masakan sehari-hari.', tinggi: '35 cm', berat: '0.3 kg', gambar: tanaman9, kategori: 'konsumsi', price: 5000, qty: 1 },
    { id: 10, nama: 'Cabai Hias Bulgarian Carrot', deskripsi: 'Unik, pedas, dan dekoratif.', deskripsiLengkap: 'Cabai Hias Bulgarian Carrot adalah varietas cabai langka dengan bentuk memanjang dan warna oranye terang menyerupai wortel. Memiliki rasa pedas kuat, cocok untuk penghobi tanaman dan dapur eksotis.', tinggi: '40 cm', berat: '0.4 kg', gambar: tanaman10, kategori: 'hias', price: 15000, qty: 1 },
    { id: 11, nama: 'Buah Jeruk', deskripsi: 'Segar, kaya vitamin C.', deskripsiLengkap: 'Tanaman Buah Jeruk merupakan tanaman buah tropis yang menghasilkan buah segar kaya vitamin C. Cocok ditanam di pekarangan rumah atau kebun, perawatan mudah dan tahan terhadap cuaca panas.', tinggi: '75 cm', berat: '2 kg', gambar: tanaman11, kategori: 'buah', price: 30000, qty: 1 },
    { id: 12, nama: 'Tomat Ceri', deskripsi: 'Mini dan manis.', deskripsiLengkap: 'Tanaman Tomat Ceri menghasilkan buah kecil berwarna merah cerah dengan rasa manis dan segar. Ideal untuk ditanam di pot atau kebun kecil, sangat produktif dan cocok untuk salad serta hiasan makanan.', tinggi: '60 cm', berat: '1 kg', gambar: tanaman12, kategori: 'konsumsi', price: 12000, qty: 1 },
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
            placeholder="Cari tanaman..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter('semua')}>Semua</button>
          <button onClick={() => setFilter('hias')}>Tanaman Hias</button>
          <button onClick={() => setFilter('konsumsi')}>Tanaman Konsumsi</button>
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
              <span>Tinggi: {selectedProduct.tinggi}</span>
              <span>Berat: {selectedProduct.berat}</span>
            </div>
            <button className="add-btn" onClick={() => addToCart(selectedProduct)}>
              Tambah Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantProduct;
