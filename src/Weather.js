import React, {useState} from "react";
import axios from "axios";

import Weatherinfo from "./Weatherinfo";
import "./Weather.css";

export default function Weather(props){

const [weatherData, setWeatherData] = useState({ready: false });
const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response){
    
        setWeatherData({
            ready: true,
            temperature:response.data.main.temp,
            wind:response.data.wind.speed,
            city:response.data.name,
            date:new Date(response.data.dt * 1000),
            description:response.data.weather[0].description,
            iconUrl:`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            humidity:response.data.main.humidity,
        });
    }


    function search(){
 const apiKey="cad4a7b2655c670bbf4e9139ebd662ce";
       let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
       
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
                <div className="row">
                    <div className="col-9">
                <input type="search" placeholder="Enter a city..." className="form-control" outFocus="on" onChange={handleCityChange}/>
            </div>
            <div className="col-3">
            <input type="submit" value="search" className="btn btn-primary" />
            </div>
            </div>
            </form>

            <Weatherinfo data={weatherData} />

           </div>
);
     } else{
        search();
      return "Loading...";
}
 }
