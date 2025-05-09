import axios from 'axios';

// Fungsi untuk mengambil daftar kota
export const getKotaList = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/kota');
    return response.data.rajaongkir.results; // Daftar kota
  } catch (err) {
    console.error('Gagal mengambil daftar kota:', err);
    return [];
  }
};

// Fungsi untuk menghitung ongkos kirim
export const getOngkir = async (origin, destination, weight, courier) => {
  try {
    const response = await axios.post('http://localhost:5000/api/ongkir', {
      origin,
      destination,
      weight,
      courier,
    });
    return response.data.cost; // Ongkos kirim
  } catch (err) {
    console.error('Gagal menghitung ongkir:', err);
    return null;
  }
};
