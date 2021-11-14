import React, { useEffect, useState } from 'react'
import { addProxyUrl } from '../proxy'
import './CityData.css'

const CityData = () => {
    const [city, setCity] = useState();
    const [API, setAPI] = useState(addProxyUrl(`https://samples.openweathermap.org/data/2.5/forecast?q=${city},us&appid=b6907d289e10d714a6e88b30761fae22`));
    // const [api, setAPI] = useState(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e7035be690cda15009e4bc1d75a4b95`)
    const [data, setData] = useState([])
    const [isTrue, setIsTrue] = useState(false)

    // let headers = new Headers()

    // headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS')
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
    // headers.append('Content-Type', 'application/json; charset=utf-8')

    useEffect(() => {
            fetch(API)
            .then(response => response.json())
            .then(({list}) => {
                setData([list[0]])
                let i = 1;
                console.log(list);
                setInterval(() => {
                    for (; i <= list.length; i++) {
                        if (i === list.length - 1) {
                            i = 0;
                            setIsTrue(false)
                            console.log('OSTATNI');
                        } else {
                            console.log(list[i]);
                            setData([list[i++]]);
                        }
                        return i;
                    }
                }, 1000);
                })
    }, [city])

    const setCityValue = (e) => {
        console.log(e.target.value);
        setCity(e.target.value)
        setIsTrue(true)
    }

    // useEffect(() => {
    //     setIsTrue(true)
    // }, [])


    return (
        <div className="city-wrapper">

      <div className='selectCity'>
          <select name="cities" onChange={setCityValue}>
              <option value=''>Choose your city</option>
              <option value="London">London</option>
              <option value="München">München</option>
          </select>
      </div>
          <div className="cityData-wrapper">
              <div className="info-data">
                  <p>Date</p>
                  <p>Humidity</p>
                  <p>Temp</p>
              </div>
            {data.map((item, index) => {
                return (
                    <div key={index} className="cityData">
                        <p>{item.dt_txt}</p>
                        <p>{item.main.humidity} %</p>
                        <p>{item.main.temp}</p>
                    </div>
                )
            })}
        </div>
    </div>
    );
};

export default CityData;