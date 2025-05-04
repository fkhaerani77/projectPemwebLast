import React, { useState } from 'react';
import video1 from '../assets/vid-1.mp4'
import video2 from '../assets/vid-2.mp4'
import video3 from '../assets/vid-3.mp4'
import video4 from '../assets/vid-4.mp4'
import video5 from '../assets/vid-5.mp4'
import video6 from '../assets/vid-6.mp4'

const Tips = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
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
    { id: 3,
      title: 'Cara Ternak Ikan Nila untuk Pemula',
      video: video3,
      isFeatured: true,
     }, 
     { id: 4,
      title: "Langkah-langkah Budidaya Ikan Gurame dari Awal sampe Panen",
      video: video4,
      isFeatured: true,
      },
     { id: 5,
      title: "Cara Mudah Agar Cabai Berbuah Lebat",
      video: video5,
      isFeatured: true,
      },
     { id: 6,
      title: "Cara Pemangkasan Tomat Agar Berbuah Lebat",
      video: video6,
      isFeatured: true,
      },
  ];

  const handleWatchClick = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="tips-section">
      <div className="tips-grid">
        {tips.map((tip) =>
          tip.isFeatured ? (
            <div key={tip.id} className="tip-card featured">
              <video src={tip.video} alt="Tips" className="tip-video" controls />
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <button 
                    className="watch-btn" 
                    onClick={() => handleWatchClick(tip.video)}>Tonton
                </button>
              </div>
            </div>
          ) : (
            <div key={tip.id} className="tip-card placeholder">
              <video className="placeholder-video" controls>
                <source src={tip.video} type="video/mp4" />
                Browser tidak mendukung video.
              </video>
            </div>
          )
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>x</span>
            <video src={currentVideo} controls autoPlay className="modal-video" />
          </div>
        </div>
      )}

    </div>
  );
};

export default Tips;
