import axios from 'axios';

const API_KEY = 'jhkb4kW845e47fb376aaba5bC6KaXRZv'; // Ganti dengan API Key Anda
const BASE_URL = 'https://api.rajaongkir.com/starter';

// Mendapatkan daftar provinsi
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/province`, {
      headers: { key: API_KEY },
    });
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

// Mendapatkan daftar kota berdasarkan ID provinsi
export const getCities = async (provinceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/city`, {
      headers: { key: API_KEY },
      params: { province: provinceId },
    });
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Menghitung ongkos kirim dan mengembalikan nilai ongkir (angka)
export const getCost = async (origin, destination, weight, courier) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cost`,
      new URLSearchParams({
        origin,
        destination,
        weight,
        courier,
      }), // ⬅️ gunakan URLSearchParams agar sesuai format x-www-form-urlencoded
      {
        headers: {
          key: API_KEY,
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const results = response.data.rajaongkir.results;
    if (
      results &&
      results[0] &&
      results[0].costs &&
      results[0].costs[0] &&
      results[0].costs[0].cost[0]
    ) {
      return results[0].costs[0].cost[0].value; // ⬅️ Kembalikan hanya angka ongkir
    } else {
      console.warn("Data ongkir tidak ditemukan.");
      return 0;
    }
  } catch (error) {
    console.error('Error fetching cost:', error);
    return 0;
  }
};
