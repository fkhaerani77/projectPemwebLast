// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// RajaOngkir API Key dan URL
const API_KEY = 'YOUR_RJAONGKIR_API_KEY'; // Ganti dengan API Key Anda
const BASE_URL = 'https://api.rajaongkir.com/starter'; // URL API RajaOngkir

// Middleware untuk mengizinkan CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json()); // Untuk parsing JSON request

// Endpoint untuk menghitung ongkos kirim
app.post('/api/rajaongkir/cost', async (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  try {
    const response = await axios.post(
      `${BASE_URL}/cost`,
      new URLSearchParams({
        origin,
        destination,
        weight,
        courier,
      }),
      {
        headers: {
          key: API_KEY,
        },
      }
    );

    // Mengirimkan hasil ongkos kirim ke frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cost:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data ongkos kirim' });
  }
});

// Jalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
