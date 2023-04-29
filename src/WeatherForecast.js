import React, {useState} from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";


export default function WeatherForecast(props){

    let[loaded, setLoaded] = useState(false);
     let[forecast, setForecast] = useState(null);

    function handleResponse(response){
setForecast(response.data.daily);
setLoaded (true);
    }
if (loaded){

console.log(forecast);
    return (
<div className="weatherForecast">
<div className="row">

<div className="col">
    <WeatherForecastDay data={forecast[0]} />
    
</div>
</div>
</div>

    );
    } else{
        let apiKey="cad4a7b2655c670bbf4e9139ebd662ce";
        let longitude = props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${apiKey}$units=metric`
    axios.get(apiUrl).then(handleResponse);
    return null;
    
    }
    }