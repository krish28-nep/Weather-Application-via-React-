import React from "react";
import { FiSearch } from "react-icons/fi";
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
const Weather: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col place-self-center p-10 rounded-xl bg-gradient-to-br from-[#2f4680] to-[#500ae4]">
        <div className="flex items-center gap-3">
            <input className="h-[50px] border-none outline-none rounded-[40px] pl-6 text-[#626262] bg-[#ebfffc] text-xl" type="text" placeholder="Search"/>
            <FiSearch className="w-[50px] h-[50px] p-3 rounded-full bg-[#ebfffc]"/>
        </div>
        <img className="w-[150px] mx-0 my-8" src={clear_icon} alt=""/>
        <p className="text-white text-7xl leading-[1]">16&deg;C</p>
        <p className="text-white text-4xl">London</p>
    </div>
  );
};

export default Weather;
