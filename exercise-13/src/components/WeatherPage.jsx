import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import "./WeatherPage.css";

import CurrentWeatherCard from './CurrentWeatherCard'
import ForecastDay from './ForecastDay'
import { set } from 'react-hook-form'

function WeatherPage() {
    const [city, setCity] = useState("Hyderabad");
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

   const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
            );
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`
            );

            const currentData = await currentRes.json();
            const forecastList = await forecastRes.json();

            setCurrentWeather(currentData);
            setForecastData(forecastList);
        } catch (err) {
            setError("Failed to fetch weather data. Please try again.");
            setCurrentWeather(null);
            setForecastData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city]);

    const handleSearch = (newCity) => {
        setCity(newCity);
        setCurrentWeather(null);
        setForecastData(null);
        setError(null);
    };

    return (
        <div className="container py-4">
            <SearchBar onSearch={handleSearch} />
            {isLoading && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" />
                </div>
            )}
            {error && (
                <div className="alert alert-danger text-center mt-3">
                    {error}
                </div>
            )}

            {currentWeather && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <CurrentWeatherCard data={currentWeather} />
                    </div>
                </div>
            )}

            {forecastData?.list?.length > 0 && (
                <div className="row justify-content-center mt-4">
                    {forecastData.list.slice(0, 10).map((forecastObj, index) => (
                        <div key={index} className="col-6 col-md-2 mb-3">
                            <ForecastDay data={forecastObj} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherPage;
