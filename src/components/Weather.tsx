import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import axios from "axios";
const Weather: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [weatherData, setWeatherData] = useState<any>(false);
  const allIcons:Record<string, string> = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }
  const Search = async(city: string | null) => {
    if(!city) alert("Enter City Name");
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      );
      if(response.status!=200){
        alert("City Not Found");
        return;
      }
      const data = response.data;
      console.log(data);
      const icon= allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    }catch{
      setWeatherData(false);
      console.log("Error");
    }
  }
  const handleSearch = () => {
    if (inputRef.current) {
      const city = inputRef.current.value;
      Search(city);  
    }
  };
  useEffect(()=>{
    Search("London");
  },[])

  return (
    <div className="flex justify-center items-center flex-col place-self-center p-10 rounded-xl bg-gradient-to-br from-[#2f4680] to-[#500ae4]">
      <div className="flex items-center gap-3">
        <input ref={inputRef}
          className="h-[50px] border-none outline-none rounded-[40px] pl-6 text-[#626262] bg-[#ebfffc] text-xl"
          type="text"
          placeholder="Search"
        />
        <FiSearch className="w-[50px] h-[50px] p-3 rounded-full bg-[#ebfffc] cursor-pointer" onClick={handleSearch}/>
      </div>
      {weatherData?<>
        <img className="w-[150px] mx-0 my-8" src={weatherData.icon} alt="" />
      <p className="text-white text-7xl leading-[1]">{weatherData.temperature}&deg;C</p>
      <p className="text-white text-4xl">{weatherData.location}</p>
      <div className="w-full mt-10 text-white flex justify-between">
        <div className="flex items-center gap-3 text-2xl">
          <img className="w-6 mt-2" src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span className="block text-sm">Humidity</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-2xl">
          <img className="w-6 mt-2" src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/hr</p>
            <span className="block text-sm">Wind Speed</span>
          </div>
        </div>
      </div>
        </>:<></>}
    
    </div>
  );
};

export default Weather;
