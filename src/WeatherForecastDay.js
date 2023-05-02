import React from "react";
import "./WeatherForecast.css";

export default function WeatherForecastDay(props){
   
        function maxTemperature(){
            let temperature = Math.round(props.data.temperature.maximum);
            return`${temperature}`;
        }

         function minTemperature(){
            let temperature = Math.round(props.data.temperature.minimum);
            return`${temperature}`;
        }


        function day(){
            let date = new Date(props.data.time * 1000);
            let day = date.getDay();

            let days =["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]
            return days[day];
        }
 return(
  <div>
    <div className="weatherForecast-day">{day()}</div>
    <div className="weatherForecast-icon"> <img src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.data.condition.icon}.png`} alt={props.data.description}  /></div>
<div className="weatherForecast-temperatures">
<span className="weatherForecast-temperature-max">{maxTemperature()}°</span>
<span className="weatherForecast-temperature-min">{minTemperature()}°</span>
</div>
</div>
  );
}
 