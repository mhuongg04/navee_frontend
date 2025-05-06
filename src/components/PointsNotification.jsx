import React, { useState, useEffect } from 'react';
import '../styles/Points.css';

const PointsNotification = ({ points, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="points-notification">
      <div className="points-notification-content">
        <div className="points-icon">🎯</div>
        <div className="points-text">
          <span className="points-earned">+{points}</span> điểm
          <p>Chúc mừng! Bạn đã nhận được điểm thưởng.</p>
        </div>
        <button className="close-btn" onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}>×</button>
      </div>
    </div>
  );
};

export default PointsNotification; 