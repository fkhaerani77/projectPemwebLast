import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import logoDana from '../assets/logo-dana.svg';

const Cart = () => {
  const { keranjang, updateQty, removeItem } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);

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

  return (
    <div className="cart-page-horizontal flex">
      {/* Left Section: Cart Items */}
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

      {/* Right Section: Summary */}
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
        <div className="total">
          <p>Total: Rp {total.toLocaleString()}</p>
        </div>
        <button className="checkout-btn">
          <img src={logoDana} alt="Dana Logo" />
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
