import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import logoDana from '../assets/logo-dana.png';
import { getCost } from "../api/RajaOngkir"; // atau './utils/rajaongkir' tergantung lokasi file
import axios from 'axios';
import CitySelector from "./CitySelector"; // Import komponen CitySelector

const Cart = () => {
  const { keranjang, updateQty, removeItem } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userData, setUserData] = useState({
    nama: "",
    alamat: "",
    telepon: "",
  });

  useEffect(() => {
    // Ambil data kota dari API
    axios.get("http://localhost:5000/api/ongkir")
      .then((response) => {
        setKotaList(response.data); // Simpan data kota
      })
      .catch((error) => {
        console.error("Gagal memuat data kota:", error);
      });
  }, []);

  const [ongkir, setOngkir] = useState(null);
  const [kotaTujuan, setKotaTujuan] = useState(""); // Diterima dari CitySelector
  const [kurir, setKurir] = useState("jne");

  const [kotaList, setKotaList] = useState([]); // Daftar kota sudah diambil oleh CitySelector

  const isUserDataComplete = userData.nama && userData.alamat && userData.telepon;

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const total = keranjang
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  // Function untuk menghitung ongkir
  const getOngkir = async () => {
    const selectedKeranjang = keranjang.filter((item) => selectedItems.includes(item.id));
    const beratTotal = selectedKeranjang.reduce((sum, item) => sum + item.berat * item.qty * 1000, 0); // kg ke gram
    
    if (!kotaTujuan || beratTotal === 0) {
      alert("Pilih kota tujuan dan barang terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/ongkir', {
        origin: '501', // ID kota asal, ganti dengan ID yang benar
        destination: kotaTujuan, // ID kota tujuan
        weight: beratTotal, // Berat total barang dalam gram
        courier: kurir, // Nama kurir (misalnya "jne", "pos", "tiki")
      });
  
      setOngkir({ value: response.data[0].cost[0].value }); // Ambil ongkir dari response
    } catch (err) {
      console.error("Gagal ambil ongkir:", err);
    }
  };

  const handleCheckout = () => {
    if (!isUserDataComplete) {
      alert('Lengkapi data diri Anda terlebih dahulu!');
      return;
    }
    alert('Melanjutkan ke pembayaran...');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const formatRupiah = (angka) => {
    if (!angka) return "Rp 0";
    return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="cart-page-horizontal flex">
      <div className="cart-items w-2/3 p-6">
        <h2 className="text-3xl font-bold mb-6">Keranjang Belanja</h2>

        {keranjang.length === 0 ? (
          <div className="empty-cart">
            <p>Keranjang Anda masih kosong. Silakan tambahkan produk.</p>
          </div>
        ) : (
          keranjang.map((item) => (
            <div key={item.id} className="cart-item flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="checkbox mr-4"
              />
              <img src={item.gambar} alt={item.name} className="cart-item-img w-20 h-20 object-cover mr-4" />
              <div className="item-info flex-grow">
                <h3 className="text-xl">{item.nama}</h3>
                <p className="price">Rp {item.price.toLocaleString()}</p>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="hapus">
                Hapus
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        {selectedItems.length > 0 ? (
          <>
            <h3 className="summary-title">Ringkasan Belanja</h3>
            <ul className="summary-list">
              {keranjang
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => (
                  <li key={item.id} className="summary-item">
                    <span>{item.nama} × {item.qty}</span>
                    <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                  </li>
                ))}
            </ul>

            {/* Pengiriman */}
            <div className="ongkir-form mb-4">
              <h3 className="font-semibold mb-2">Pengiriman</h3>

              {/* Gunakan komponen CitySelector untuk memilih kota tujuan */}
              <CitySelector 
                kotaList={kotaList}
                selectedKota={kotaTujuan}
                onCityChange={setKotaTujuan} 
              />

              <select value={kurir} onChange={(e) => setKurir(e.target.value)} className="input-field mb-2">
                <option value="jne">JNE</option>
                <option value="pos">POS</option>
                <option value="tiki">TIKI</option>
              </select>
              <button
                className="cek-ongkir-btn"
                onClick={getOngkir}
              >
                Cek Ongkir
              </button>
            </div>

            {/* Total */}
            <div className="total">
              <p>Subtotal: {formatRupiah(total)}</p>
              <p>Ongkir: {formatRupiah(ongkir ? ongkir.value : 0)}</p>
              <p className="font-bold text-lg">
                Total Bayar: {formatRupiah(total + (ongkir?.value || 0))}
              </p>
            </div>

            {/* Informasi Pemesan */}
            <div className="user-data-form">
              <h3 className="text-lg font-semibold mb-4">Informasi Pemesan</h3>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={userData.nama}
                onChange={handleInputChange}
                className="input-field mb-2"
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={userData.alamat}
                onChange={handleInputChange}
                className="input-field mb-2"
              />
              <input
                type="text"
                name="telepon"
                placeholder="Nomor Telepon"
                value={userData.telepon}
                onChange={handleInputChange}
                className="input-field mb-4"
              />
            </div>

            <p className="pay-label">Bayar sekarang :</p>

            <button
              className={`checkout-btn ${isUserDataComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isUserDataComplete}
              onClick={handleCheckout}
            >
              <img src={logoDana} alt="Dana Logo" />
              {isUserDataComplete ? "" : " "}
            </button>
          </>
        ) : (
          <div className="empty-summary">
            <p>Silakan pilih barang yang akan dibayar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
