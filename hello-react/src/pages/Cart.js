import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import logoDana from '../assets/logo-dana.png';

const Cart = () => {
  const { keranjang, updateQty, removeItem } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userData, setUserData] = useState({
    nama: "",
    alamat: "",
    telepon: "",
  });

  // 🔽 TAMBAHKAN STATE UNTUK ONGKIR
  const [ongkir, setOngkir] = useState(null);
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kurir, setKurir] = useState("jne");

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

  // 🔽 TAMBAHKAN FUNCTION getOngkir
  const getOngkir = async () => {
    const beratTotal = keranjang
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.berat * item.qty, 0); // item harus punya berat

    if (!kotaTujuan || beratTotal === 0) {
      alert("Pilih kota tujuan dan barang terlebih dahulu.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/rajaongkir/cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "501",
          destination: kotaTujuan,
          weight: beratTotal,
          courier: kurir
        }),
      });
      const data = await response.json();
      const biaya = data.rajaongkir.results[0].costs[0].cost[0];
      setOngkir(biaya);
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

            {/* 🔽 TAMBAHKAN FORM ONGKIR */}
            <div className="ongkir-form mb-4">
              <h3 className="font-semibold mb-2">Pengiriman</h3>
              <input
                type="text"
                placeholder="ID Kota Tujuan (contoh: 501)"
                value={kotaTujuan}
                onChange={(e) => setKotaTujuan(e.target.value)}
                className="input-field mb-2"
              />
              <select value={kurir} onChange={(e) => setKurir(e.target.value)} className="input-field mb-2">
                <option value="jne">JNE</option>
                <option value="pos">POS</option>
                <option value="tiki">TIKI</option>
              </select>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={getOngkir}
              >
                Cek Ongkir
              </button>
            </div>

            {/* 🔽 TOTAL + ONGKIR */}
            <div className="total">
              <p>Subtotal: Rp {total.toLocaleString()}</p>
              <p>Ongkir: Rp {ongkir ? ongkir.value.toLocaleString() : "-"}</p>
              <p className="font-bold text-lg">
                Total Bayar: Rp {(total + (ongkir?.value || 0)).toLocaleString()}
              </p>
            </div>

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
              {isUserDataComplete ? "Checkout dengan DANA" : " "}
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
