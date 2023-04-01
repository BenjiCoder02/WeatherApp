'use client';
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useCallback, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});

  const handleInputChange = useCallback((event: KeyboardEvent) => {
    const { value } = event?.target;
    setCity(value);
  }, [setCity]);

  const getWeatherForCity = async () => {
    const cityName = city.toLocaleLowerCase();
    const res = await fetch(`/api/weather?city=${cityName}`);
    const data = await res.json();
    setWeatherData(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeatherData({});
    getWeatherForCity();
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.locationForm}>
          <div className={styles.card}>
            <h2 className={styles.heading}>Welcome to the Weather App!</h2>
            <div className={styles.flexColumnCenter}>
              <input type='text' onChange={handleInputChange} />
              <button onClick={handleSubmit}>Let's Go</button>
            </div>
          </div>
        </div>
        {weatherData.name &&
          <div className={styles.locationForm}>
            <div className={styles.card}>
              <p>{weatherData.name}</p>
            </div>
          </div>
        }
      </div>
    </main>
  )
}
