import React from 'react'

function CurrentWeatherCard({ data }) {
    return (
        <div className='p-5 bg-light'>
            <img src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
            <h2>Current weather in {data.name}</h2>
            <p>{data.main.temp}°C</p>
            <p>{data.weather[0].main}</p>
            <p>Humidity: {data.main.humidity}</p>
            <p>Feels Like: {data.main.feels_like}</p>
        </div>
    )
}

export default CurrentWeatherCard