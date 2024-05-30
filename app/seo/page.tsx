'use client'
import { useEffect, useState } from 'react';
import styles from './SpeedIndicator.module.css';

const SpeedIndicator = ({ value }:{value:number}) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const maxAngle = 180;
    setAngle((value / 100) * maxAngle);
  }, [value]);

  return (
    <div className={styles.speedIndicator}>
      <svg viewBox="0 0 200 100" className={styles.gauge}>
        <path d="M10,90 A80,80 0 0,1 190,90" fill="none" stroke="#ff4d4d" strokeWidth="20" />
        <path d="M10,90 A80,80 0 0,1 150,10" fill="none" stroke="#ffcc00" strokeWidth="20" />
        <path d="M150,10 A80,80 0 0,1 190,90" fill="none" stroke="#66cc33" strokeWidth="20" />
        <circle
          cx="100"
          cy="90"
          r="8"
          fill="#ffffff"
          transform={`rotate(${angle}, 100, 90)`}
        />
      </svg>
      <div className={styles.value}>{value}</div>
    </div>
  );
};






const page = () => {

  return (
    <main>
    <h1>Custom Speed Indicator</h1>
    <SpeedIndicator value={50} />
  </main>
  )
}

export default page
