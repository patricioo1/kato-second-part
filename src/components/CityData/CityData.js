import React, { useEffect, useState, useCallback } from 'react'
import useInterval from '../useInterval';
import './CityData.css'

const CityData = () => {
    const [city, setCity] = useState();
    const [data, setData] = useState([])
    const [value, setValue] = useState()
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY)
    const [errorMessage, setErrorMessage] = useState()


    const loadData = useCallback(() => {
        if (city) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
                .then(response => response.json())
                .then((data) => {
                    setData([data])
                    console.log(data.message);
                    setErrorMessage(data.message)
                })
        }
    }, [city, key])

    useEffect(() => {
        loadData();
    }, [city, loadData])

    useInterval(loadData, 10000)

    const setCityValue = (e) => {
        setCity(e.target.value)
    }

    const setAPIValue = (e) => {
        setValue(e.target.value)
        console.log(e.target.value);
    }

    const getAPIKey = () => {
        setKey(value)
        console.log(value);
    }

    const getFormattedDateFromTimestamp = (timestamp) => {
        let date = new Date(timestamp * 1000)
        let hours = date.getHours()
        let minutes = '0' + date.getMinutes()
        let seconds = '0' + date.getSeconds()

        let formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
        return formattedTime;
    }


    return (
        <div className="city-wrapper">

      <div className='selectCity'>
          <select name="cities" onChange={(e) => {setCityValue(e); loadData()}}>
              <option value=''>Choose your city</option>
              <option value="London">London</option>
              <option value="München">München</option>
          </select>
          <input type="text" placeholder="Enter your API Key" onChange={setAPIValue} />
          <button onClick={getAPIKey}>Enter your API Key</button>
      </div>
      <p className="error">{errorMessage ? `${errorMessage} Otherwise - refresh page.` : null}</p>
        <div className="cityData-wrapper">
            <div className="info-data">
                <p>Date</p>
                <p>Humidity</p>
                <p>Temp</p>
            </div>
            {data.map((item, index) => {
                return (
                    <div key={index} className="cityData">
                        <p>{getFormattedDateFromTimestamp(item?.dt)}</p>
                        <p>{item?.main?.humidity} %</p>
                        <p>{item?.main?.temp} &deg;C</p>
                    </div>
                )
            })}
        </div>
    </div>
    );
};

export default CityData;