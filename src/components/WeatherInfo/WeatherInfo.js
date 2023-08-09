import React, { useEffect, useState } from 'react'
import backArrow from '../../assets/back__arrow.png'
import { countries } from 'country-data'
import './WeatherInfo.css'
import rainy from '../../assets/Rainy.png'
import cloudy from '../../assets/cloudy.png'
import feel_like from '../../assets/feels_like.png'
import humid from '../../assets/humidity.png'
import sunny from '../../assets/Sunny.png'
import pin from '../../assets/pin.png'
import cloudySun from '../../assets/illustrations/cloudy.png'
import HeavyRain from '../../assets/illustrations/rainy.png'
import FunnySun from '../../assets/illustrations/sunny.png'


const WeatherInfo = (props) => {

  const [Data, setData] = useState()

  const { name } = Data || {};
  const { description } = Data?.weather[0] || {};
  const { temp, humidity, feels_like } = Data?.main || {};
  const { country } = Data?.sys || {};

  const api = "https://api.openweathermap.org/data/2.5/weather?q=" + props.cityName + "&units=metric&appid=" + "9d1d1a75d11921268116079e8fd2087b";
  const countryData = countries[country]?.name;

  const fetchData = async () => {
    const res = await fetch(api)
    const response = await res.json();
    console.log(response)
    setData(response)
    if (response.cod !== 200) {
      console.log(response.cod)
      props.showToastMessage();
      props.setShowWeather(false)
      props.setCityName("")
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = async () => {
    props.setShowWeather(false)
    props.setCityName("")
  }

  return (
    <div className='weather-container ${}'>
      <div className="weather-illustrations">
      </div>
      <div className="weather-card">
        <div className="card-heading">
          <img src={backArrow} alt="image loading"
            onClick={() => handleClick()}
          />
          <h5>Weather App</h5>
        </div>

        <hr />

        <div className="weather-icon">
          <img src={temp > 30 ? FunnySun : temp < 20 ? cloudySun : HeavyRain} alt="" />
        </div>

        <div className="weather-temperature">
          {Math.floor(temp)}&deg;C
        </div>

        <div className="weather-description">
          {description}
        </div>

        <div className="weather-city">
          <img src={pin} alt="" />
          {name}, {countryData}
        </div>
        <hr />
        <div className="weather-forecast">
          <div className="weather-feel-like">
            <img src={feel_like} alt="" />
            <div className="weather-temp">
              <span>{Math.floor(feels_like)}&deg;C</span>
              <span>Feels like</span>
            </div>
          </div>
          <div className="weather-humidity">
            <img src={humid} alt="" />
            <div className="weather-humidity-text">
              <span>{humidity}%</span>
              <span>Humidity</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WeatherInfo
