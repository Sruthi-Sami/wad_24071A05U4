import React from 'react'

function ForecastDay({ data }) {
    return (
        <div className="border p-3 m-2 bg-light">
            <img src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
            <p>{data.dt_text}</p>
            <p>{data.main.temp_min}°C</p>
            <p>{data.main.temp_max}°C</p>
        </div>
    )
}

export default ForecastDay