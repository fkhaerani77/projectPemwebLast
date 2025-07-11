import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const PlantProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [produkList, setProdukList] = useState([]); // Mulai kosong
  const { addToCart } = useContext(CartContext);
  const [isEdit, setIsEdit] = useState(false);

  const [newProduct, setNewProduct] = useState({
    namaP: '',
    deskripsiP: '',
    kategoriP: '',
    beratP: '',
    hargaP: '',
    gambarP: '',
  });

  useEffect(() => {
    fetch('http://localhost/backend/api/productPlant/readPlant.php')
      .then(res => res.json())
      .then(data => setProdukList(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProduk = produkList.filter((produk) => {
    const cocokKategori = filter === 'semua' || produk.kategoriP === filter;
    const cocokPencarian = produk.namaP.toLowerCase().includes(searchTerm.toLowerCase());
    return cocokKategori && cocokPencarian;
  });

  const handleDetailClick = (produk) => {
    setSelectedProduct(produk);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  // const handleAddToCart = (produk) => {
  //   const newProduct = { ...produk, qty: 1 };
  //   addToCart(newProduct);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isEdit
    ? 'http://localhost/backend/api/productPlant/updatePlant.php'
    : 'http://localhost/backend/api/productPlant/createPlant.php';

  const formData = new FormData();
  formData.append('namaP', newProduct.namaP);
  formData.append('deskripsiP', newProduct.deskripsiP);
  formData.append('kategoriP', newProduct.kategoriP);
  formData.append('beratP', newProduct.beratP);
  formData.append('hargaP', newProduct.hargaP);

  if (isEdit) {
    formData.append('id', newProduct.id);
    if (newProduct.gambarP instanceof File) {
      formData.append('gambarP', newProduct.gambarP); // jika file baru
    }
  } else {
    formData.append('gambarP', newProduct.gambarP); // untuk tambah produk
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(data.message);

    if (isEdit) {
      // Update produk di list
      setProdukList(prev =>
        prev.map((p) =>
          p.id === newProduct.id
            ? {
                ...newProduct,
                gambarP:
                  newProduct.gambarP instanceof File
                    ? newProduct.gambarP.name
                    : newProduct.gambarP,
              }
            : p
        )
      );
    } else {
      const produkBaru = {
        ...newProduct,
        gambarP: newProduct.gambarP.name,
        id: data.id,
      };
      setProdukList((prev) => [...prev, produkBaru]);
    }

    setNewProduct({
      namaP: '',
      deskripsiP: '',
      kategoriP: '',
      beratP: '',
      hargaP: '',
      gambarP: '',
    });
    setIsEdit(false);
  } catch (err) {
    console.error(err);
  }
};




const handleEdit = (produk) => {
  setNewProduct(produk);
  setIsEdit(true);
  window.scrollTo({ top: 0, behavior: 'smooth' }); // biar user lihat form di atas
};

const handleDelete = (id) => {
  if (window.confirm('Yakin mau hapus produk ini?')) {
    fetch('http://localhost/backend/api/productPlant/deletePlant.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      // Update state biar item langsung hilang di tampilan
      setProdukList(prev => prev.filter(produk => produk.id !== id));
    })
    .catch(err => console.error(err));
  }
};

  return (
  <div className="produk-section">
    <h2>Tambah Produk Plant</h2>

    <form className="form-produk" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-field"
        name="namaP"
        placeholder="Nama Produk"
        value={newProduct.namaP}
        onChange={handleInputChange}
        required
      />
      <textarea
        className="input-field"
        name="deskripsiP"
        placeholder="Deskripsi"
        value={newProduct.deskripsiP}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        className="input-field"
        name="kategoriP"
        placeholder="Kategori"
        value={newProduct.kategoriP}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        className="input-field"
        name="beratP"
        placeholder="Berat"
        value={newProduct.beratP}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        className="input-field"
        name="hargaP"
        placeholder="Harga"
        value={newProduct.hargaP}
        onChange={handleInputChange}
        required
      />
      <input
  type="file"
  className="input-field"
  name="gambarP"
  accept="image/*"
  onChange={(e) => setNewProduct((prev) => ({
    ...prev,
    gambarP: e.target.files[0] // simpan File object
  }))}
  required
/>

      <button type="submit" className="submit-btn">
  {isEdit ? 'Update Produk' : 'Simpan Produk'}
</button>

    </form>

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
        {filteredProduk.map((produk, index) => (
          <div key={index} className="produk-card">
            <img src={`http://localhost/backend/api/productPlant/upload/${produk.gambarP}`} alt={produk.namaP} />
            <div className="produk-info">
              <h3>{produk.namaP}</h3>
              <p>{produk.deskripsiP}</p>
              <button className="detail-btn" onClick={() => handleDetailClick(produk)}>
                Detail
              </button>
              <button className="edit-btn" onClick={() => handleEdit(produk)}>
                Edit
              </button>
              <button 
  className="delete-btn"
  onClick={() => handleDelete(produk.id)}
>
  Hapus
</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closePopup}>×</button>
            <img
  src={`http://localhost/backend/api/productPlant/upload/${selectedProduct.gambarP}`}
  alt={selectedProduct.namaP}
  className="modal-img"
/>

                  <h3>{selectedProduct.namaP}</h3>
      <p>{selectedProduct.deskripsiP}</p>
      <p>Harga: Rp {Number(selectedProduct.hargaP).toLocaleString()}</p> {/* ✅ Tambahkan ini */}
      <div className="detail-info">
        <span>Tinggi: {selectedProduct.tinggi || '-'}</span>
        <span>Berat: {selectedProduct.beratP}</span>
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
