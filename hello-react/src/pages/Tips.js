import React, { useState } from 'react';
import video1 from '../assets/vid-1.mp4';
import video2 from '../assets/vid-2.mp4';
import video3 from '../assets/vid-3.mp4';
import video4 from '../assets/vid-4.mp4';
import video5 from '../assets/vid-5.mp4';
import video6 from '../assets/vid-6.mp4';

const Tips = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [isArticle, setIsArticle] = useState(false);

  const tips = [
    {
      id: 1,
      title: 'Cara Budidaya Ikan Guppy Agar Cepat Beranak dan Berkembang',
      video: video1,
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Cara Budidaya Ikan Koi Agar Cepat Besar Terbukti Berhasil! Wajib Coba !!',
      video: video2,
      isFeatured: true,
    },
    {
      id: 3,
      title: 'Cara Ternak Ikan Nila untuk Pemula',
      video: video3,
      isFeatured: true,
    },
    {
      id: 4,
      title: "Langkah-langkah Budidaya Ikan Gurame dari Awal sampe Panen",
      video: video4,
      isFeatured: true,
    },
    {
      id: 5,
      title: "Cara Mudah Agar Cabai Berbuah Lebat",
      video: video5,
      isFeatured: true,
    },
    {
      id: 6,
      title: "Cara Pemangkasan Tomat Agar Berbuah Lebat",
      video: video6,
      isFeatured: true,
    },
    {
      id: 7,
      title: "Jenis-jenis Tanaman Budidaya",
      isFeatured: true,
      isArticle: true,
      url: "https://www.gramedia.com/best-seller/jenis-jenis-tanaman-budidaya/?srsltid=AfmBOoqU-jzaUTpwp07EkFfw9xPBcFdUW5g9NSGTgipnWASj_N1X8XHv",
    },
    {
      id: 8,
      title: "7 Tips Merawat Tanaman Hias",
      isFeatured: true,
      isArticle: true,
      url: "https://www.detik.com/properti/tips-dan-panduan/d-7315317/7-tips-merawat-tanaman-hias-supaya-tumbuh-sehat-dan-kuat-di-rumah",
    },
  ];

  const handleWatchClick = (content, isArticle = false) => {
    setCurrentContent(content);
    setIsArticle(isArticle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContent(null);
    setIsArticle(false);
  };

  return (
    <div className="tips-section">
      <div className="tips-grid">
        {tips.map((tip) => (
          <div key={tip.id} className="tip-card featured">
            {!tip.isArticle ? (
              <>
                <video src={tip.video} className="tip-video" controls />
                <div className="tip-content">
                  <h3>{tip.title}</h3>
                  <button className="watch-btn" onClick={() => handleWatchClick(tip.video)}>
                    Tonton
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="tip-article-preview">
                  <h3>{tip.title}</h3>
                  <button className="watch-btn" onClick={() => handleWatchClick(tip.url, true)}>
                    Baca Artikel
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>×</span>
            {isArticle ? (
              <iframe
                src={currentContent}
                className="modal-iframe"
                title="Artikel"
                frameBorder="0"
              ></iframe>
            ) : (
              <video src={currentContent} controls autoPlay className="modal-video" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips;
