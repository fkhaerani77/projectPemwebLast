const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Agar React frontend bisa mengakses API ini
app.use(express.json()); // Agar bisa menerima JSON body request

const RAJAONGKIR_API_KEY = "UZqqTuPX45e47fb376aaba5baC2ZrUwr"; // Ganti dengan API key Anda
const BASE_URL = "https://api.rajaongkir.com/starter/cost"; // URL untuk menghitung ongkir

// Endpoint untuk mengambil daftar kota
app.get("/api/kota", async (req, res) => {
  try {
    // Request ke API RajaOngkir untuk mendapatkan data kota
    const response = await axios.get("https://api.rajaongkir.com/starter/city", {
      headers: {
        key: RAJAONGKIR_API_KEY, // API key untuk mendapatkan daftar kota
      },
    });

    // Memeriksa apakah data berhasil diterima
    if (response.status === 200 && response.data.rajaongkir) {
      const kotaList = response.data.rajaongkir.results; // Daftar kota
      res.json(kotaList); // Mengirimkan daftar kota ke frontend
    } else {
      throw new Error("Data kota tidak ditemukan");
    }
  } catch (err) {
    console.error("Gagal mengambil data kota:", err.message); // Menampilkan error pada console
    res.status(500).json({ error: "Gagal mengambil data kota" });
  }
});

// Endpoint untuk menghitung ongkos kirim (shipping cost)
app.post("/api/ongkir", async (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  try {
    // Memastikan bahwa semua data diperlukan sudah ada
    if (!origin || !destination || !weight || !courier) {
      return res.status(400).json({ error: "Semua data harus diberikan" });
    }

    // Request ke API RajaOngkir untuk menghitung ongkir
    const response = await axios.post(BASE_URL, {
      origin: origin,
      destination: destination,
      weight: weight,
      courier: courier,
    }, {
      headers: {
        key: "UZqqTuPX45e47fb376aaba5baC2ZrUwr", // API key untuk menghitung ongkir
      },
    });

    // Memeriksa apakah data berhasil diterima
    if (response.status === 200 && response.data.rajaongkir) {
      res.json(response.data.rajaongkir.results); // Mengirimkan hasil ongkos kirim
    } else {
      throw new Error("Gagal menghitung ongkir");
    }
  } catch (err) {
    console.error("Gagal menghitung ongkir:", err.message); // Menampilkan error pada console
    res.status(500).json({ error: "Gagal menghitung ongkir" });
  }
});

app.listen(5000, () => {
  console.log("Server berjalan di port 5000");
});
