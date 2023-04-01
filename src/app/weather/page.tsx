'use client';
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useCallback, useState } from 'react';
import { cities } from '../../../allCities';
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [searchData, setSearchData] = useState([]);

  const handleInputChange = useCallback((event: KeyboardEvent) => {
    const { value } = event?.target;
    if (city.length >= 2) {
      const searchFilter = cities.filter((c) => c.includes(city)).slice(0, 6);
      setSearchData(searchFilter);
    }
    setCity(value);
    console.log(searchData, city, value)
  }, [setCity, city]);

  const handleOptionClick = (e) => {
    setCity(e.target.value);
  }

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
      <div className={styles.weatherPage}>
        <div className={styles.locationForm}>
          <div className={styles.bar}>
            <h2 className={styles.heading}>Enter the name of your city!</h2>
            <div className={styles.flexColumnCenter}>
              <div className={styles.searchBar}>
                <input type='text' onChange={handleInputChange} value={city} />
                <div className={styles.options}>
                  {searchData.map((data) => {
                    return (
                      <option key={data} onClick={handleOptionClick}>{data}</option>
                    );
                  })}
                </div>
              </div>
              <button onClick={handleSubmit}>Let's Go</button>
            </div>
          </div>
        </div>
      </div>
      {weatherData.name &&
        <div className={styles.locationForm}>
          <div className={styles.card}>
            <h2 className={styles.heading}>{weatherData.name}</h2>
          </div>
        </div>
      }
    </main>
  )
}
