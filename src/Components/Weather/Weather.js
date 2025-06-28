import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import axios from 'axios';
import searchIcon from '../../Assets/search.png';
import clear from '../../Assets/clear.png';
import cloud from '../../Assets/cloud.png';
import drizzle from '../../Assets/drizzle.png';
import rain from '../../Assets/rain.png';
import humidity from '../../Assets/humidity.png';
import snow from '../../Assets/snow.png';
import wind from '../../Assets/wind.png';
import cover from '../../Assets/cover.jpg'

function Weather() {

  const inputRef = useRef()

 const [Weather, setWeather] = useState(false)

 const allIcons={
  "01d" : clear,
  "01n" : clear,
  "02d" : cloud,
  "02n": cloud,
  "03d": cloud,
  "03n": cloud,
  "04d": drizzle,
  "04n": drizzle,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13" : snow,

 }
  
  const search = async(city)=>{
    if (city==="") {
      alert("Enter city name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;
      const response =await axios.get(url)
      const data= response.data;

      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(()=>{
    search("Kochi")
  },[])
  

  return (
    <div
      className="weather-container"
      style={{ backgroundImage: `url(${cover})` }}
    >
      

    <div className='weather'>
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder='Search'/>
          <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {Weather?<>
        
        <img src={Weather.icon} alt="" className='weather-icon'/>
        <p className='temp'>{Weather.temperature}°C</p>
        <p className='loc'>{Weather.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p>{Weather.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
           <div className="col">
            <img src={wind} alt="" />
            <div>
              <p>{Weather.windspeed}km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
    </div>
    </div>
  )
}

export default Weather