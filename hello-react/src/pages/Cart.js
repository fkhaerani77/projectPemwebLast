import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { keranjang, updateQty, removeItem } = useContext(CartContext);

  // Menghitung total harga keranjang
  const total = keranjang.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Keranjang Belanja</h2>

      {/* Jika keranjang kosong */}
      {keranjang.length === 0 ? (
        <div className="empty-cart">
          <p>Keranjang Anda masih kosong. Silakan tambahkan produk.</p>
        </div>
      ) : (
        // Menampilkan produk di dalam keranjang
        keranjang.map((item) => (
          <div key={item.id} className="cart-item flex items-center justify-between p-4 border-b">
            {/* Gambar produk */}
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

            {/* Informasi produk */}
            <div className="item-info flex-1 ml-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
              <div className="qty-control flex items-center mt-2">
                {/* Mengubah kuantitas */}
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-3">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Tombol hapus */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Hapus
            </button>
          </div>
        ))
      )}

      {/* Total Harga */}
      {keranjang.length > 0 && (
        <div className="total mt-6 text-right">
          <p className="text-2xl font-semibold">Total: Rp {total.toLocaleString()}</p>
          <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
