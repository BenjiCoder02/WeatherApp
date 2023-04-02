'use client';
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useCallback, useEffect, useState } from 'react';
import { cities } from '../../../allCities';
const inter = Inter({ subsets: ['latin'] });

const citiesList = cities;



export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = useCallback((event: KeyboardEvent) => {
    const { value } = event?.target;
    if (city.length >= 2) {
      setShowOptions(true);
      const searchFilter = citiesList.filter((c) =>
        c.toLocaleLowerCase().includes(city.toLocaleLowerCase())).slice(0, 10);
      setSearchData(searchFilter);
    }
    setCity(value);
  }, [setCity, city]);

  useEffect(() => {
    if (city.length < 2) {
      setShowOptions(false);
    }
  }, [city]);

  const handleOptionClick = (e) => {
    setCity(e.target.value);
    setShowOptions(false);
  }

  const getWeatherForCity = async () => {
    let cityName = city.toLocaleLowerCase();
    cityName = cityName.replace(/\(.*?\)/g, "");
    const res = await fetch(`/api/weather?city=${cityName}`);
    const data = await res.json();
    setWeatherData(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeatherData({});
    setShowOptions(false);
    getWeatherForCity();
  }

  function millisToMinutesAndSeconds(millis) {
    const date = new Date(millis);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return `${hours}:${minutes}`;
  }

  return (
    <main className={styles.main}>
      <div className={styles.weatherPage}>
        <div className={styles.locationFormTop}>
          <div className={styles.bar}>
            <h2 className={styles.heading}>Enter the name of your city!</h2>
            <div className={styles.flexColumnCenter}>
              <form className={styles.searchBar}>
                <label htmlFor="search-bar">City</label>
                <input type='text' onChange={handleInputChange} value={city} id="search-bar" />
                <div className={styles.options}>
                  {showOptions && searchData.map((data) => {
                    return (
                      <option key={data} onClick={handleOptionClick}>{data}</option>
                    );
                  })}
                </div>
                <button onClick={handleSubmit}>Go</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.locationFormInfo}>
        <div className={styles.card}>
          {weatherData.name &&
            <div className={styles.gridWeather}>
              <h3 className={styles.heading}>City: {weatherData.name}</h3>
              <h3 className={styles.heading}>Country: {weatherData.sys.country}</h3>
              <h3 className={styles.heading}>Sunrise: {millisToMinutesAndSeconds(weatherData.sys.sunrise)}</h3>
              <h3 className={styles.heading}>Sunset: {millisToMinutesAndSeconds(weatherData.sys.sunrise)}</h3>
              <h3 className={styles.heading}>Current Temperature: {weatherData.main.temp} &deg;C</h3>
              <h3 className={styles.heading}>High: {weatherData.main.temp_max}&deg;C</h3>
              <h3 className={styles.heading}>Low: {weatherData.main.temp_min}&deg;C</h3>
              <img alt='weather-icon' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
            </div>
          }
        </div>
      </div>

    </main>
  )
}
