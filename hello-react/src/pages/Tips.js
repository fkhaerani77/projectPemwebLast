import React from 'react';
import tipsImage from '../assets/tips.png';

const Tips = () => {
  const tips = [
    {
      id: 1,
      title: 'Cara Budidaya Ikan dengan Benar',
      image: tipsImage,
      isFeatured: true,
    },
    { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
  ];

  return (
    <div className="tips-section">
      <div className="tips-grid">
        {tips.map((tip) =>
          tip.isFeatured ? (
            <div key={tip.id} className="tip-card featured">
              <img src={tipsImage} alt="Tips" className="tip-img" />
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <button className="watch-btn">Watch</button>
              </div>
            </div>
          ) : (
            <div key={tip.id} className="tip-card placeholder">
              <div className="placeholder-img"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Tips;
