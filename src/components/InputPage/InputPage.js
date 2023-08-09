import React, { useEffect, useCallback, useState } from 'react'
import './InputPage.css'



const InputPage = (props) => {
    let val;
    const debounce = (fn, ms) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => props.setShowWeather(true), ms);
        };
    };


    const debouncedHandler = useCallback(
        debounce(props.setShowWeather, 1200),
        []
    );


    const onChange = (e) => {
        props.setCityName(e)
        debouncedHandler(e)
    }

    const handleBtnClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        async function success(position) {
            const latitude = await position.coords.latitude;
            const longitude = await position.coords.longitude;
            const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=9d1d1a75d11921268116079e8fd2087b`
            fetchData(api)
        }

        function error() {
            alert("Unable to retrieve your location");
        }

        const fetchData = async (api) => {
            const res = await fetch(api)
            const response = await res.json();
            val = response[0].name;
            props.setCityName(val)
            props.setShowWeather(true)
        }
    }


    return (
        <div className='info-card-container'>
            <div className="info-card">
                <h5>Weather App</h5>
                <hr />

                <div className="info-input">
                    <input type="text"
                        placeholder='Enter city name'
                        className="info-city-name"
                        value={props.cityName}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>

                <div className='below-city-name-hr'>
                    <hr width="48%" align="left" />
                    <span>or</span>
                    <hr width="48%" align="right" />
                </div>
                <div className="info-button">
                    <button className="btn-info"
                        onClick={() => handleBtnClick()}
                    >
                        Get Device Info
                    </button>
                </div>
            </div>
        </div >
    )
}

export default InputPage;
