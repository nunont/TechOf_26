import { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";

function WeatherControl(){

  const [weather, setWeather] = useState('sunny');

  function onWeatherChange(e){
    setWeather(e.target.value);
  }

  return (<div>
    <span>Choose the Weather:</span>
    <select onChange={onWeatherChange}>
      <option value="sunny">Sunny</option>
      <option value="raining">Raining</option>
      <option value="snowing">Snowing</option>
    </select>
    <WeatherDisplay weather={weather} />
  </div>)

}

export default WeatherControl;