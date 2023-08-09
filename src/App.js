import './App.css';
import React from 'react';
import { useState } from 'react';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import InputPage from './components/InputPage/InputPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const showToastMessage = () => {
    toast.error('Enter valid city name!',
      {
        toastId: 'success1',
      },
      {
        position: toast.POSITION.TOP_CENTER
      });
  };
  const [showWeather, setShowWeather] = useState(false);
  const [cityName, setCityName] = useState("")
  const [validCity, setValidCity] = useState(true)

  return (
    <div className="App">
      <ToastContainer />
      {
        showWeather ?
          <WeatherInfo
            cityName={cityName}
            setCityName={setCityName}
            setShowWeather={setShowWeather}
            showToastMessage={showToastMessage}
          />
          :
          <InputPage
            setShowWeather={setShowWeather}
            setCityName={setCityName}
            cityName={cityName}
          />
      }
    </div>
  );
}

export default App;
