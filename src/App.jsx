import "./App.css";
import {useState} from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const[forecast, setForecast] = useState([]);

const apiKey = "401a61ae312f303a2361792850b05ad3";

const getWeather = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  setWeather(data);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();
  console.log(forecastData);
  setForecast(forecastData.list);
}
catch(error){
  console.log(error);
}
};
  return (
    <div className="app">
      <div className="dashboard">

        <div className="top-bar">
          <input 
            type="text" 
            placeholder="Search city..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>Get Weather</button>
        </div>

        
        
        <div className="main-content">

          <div className="left-panel">
          
            <div className="card">
             <h2> Current Weather ⛅</h2>
             <h1>{weather?.main.temp}°C 🌡</h1>
             <p>{weather?.weather[0].main}</p>
             <p>{weather?.name}📍</p>
              </div>

            
            <div className="card">
             <h2> Air Conditions ⛈</h2>
             <p>Humidity: {weather?.main.humidity}%</p>
             <p>Wind Speed:{weather?.wind.speed} m/s</p>
              </div>

            
            <div className="card">
            <h2>Today's Forecast 🌞</h2>  
            <p>Min Temp:{weather?.main.temp_min}°C</p>
            <p>Max temp:{weather?.main.temp_max}°C</p>

              </div>
          </div>

          <div className="right-panel">
            <div className="card big-card">
            <h2> Weekly Forecast 🌞🌈🌀☂</h2> 
            {forecast
             .filter((_, index) => index % 8 == 0)
             .slice(0,6)
             .map((item, index) => (
              
            <div className="forecast-item" key={index}>
              <span>{new Date(item.dt_txt).toLocaleDateString("en-US",{
                weekday: "short"
              })}</span>
              
              <span>
                 {{
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
  }[item.weather[0].main] || "🌍"}

  {" "}
                {item.weather[0].main}</span>
              <span>🌡{Math.round(item.main.temp)}°C</span>
            </div>    
            ))
          }
            
              </div>
          </div>

        </div>
        

      </div>
    </div>

  );
}

export default App;