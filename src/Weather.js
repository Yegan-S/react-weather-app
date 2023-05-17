import React, {useState} from "react";
import axios from "axios";
import Weatherinfo from "./Weatherinfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

export default function Weather(props){

const [weatherData, setWeatherData] = useState({ready: false });
const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response){
    
        setWeatherData({
            ready: true,
            coordinates:response.data.coordinates,
            temperature:response.data.temperature.current,
            wind:response.data.wind.speed,
            city:response.data.city,
            date:new Date(response.data.time * 1000),
            description:response.data.condition.description,
            iconUrl:`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
            humidity:response.data.temperature.humidity,
        });
    }


    function search(){
 const apiKey="tb5f08b166ada0ab28a3f4o4dec6c3e0";
       let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
       
       axios.get(apiUrl).then(handleResponse);
    }

function handleSubmit(event){
event.preventDefault();
search();
}

function handleCityChange(event){
setCity(event.target.value);
}

     if(weatherData.ready){
return(

        <div className="weather">
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-9">
                <input type="search" placeholder="Enter a city..." className="form-control" outFocus="on" onChange={handleCityChange}/>
            </div>
            <div className="col-3">
            <input type="submit" value="search" className="search-engine btn btn-primary" />
            </div>
            </div>
            </form>

            <Weatherinfo data={weatherData} />
            <WeatherForecast coordinates={weatherData.coordinates} />
           </div>
);

     } else{
        search();
      return "Loading...";
}
 }
