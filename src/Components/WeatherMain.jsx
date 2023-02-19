import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import WeatherDisplay from './WeatherDisplay'
import Style from './WeatherMain.module.css'

const WeatherMain = () => {
  const [inputValue, setInputValue] = useState('')
  const [dataWeather, setDataWeather] = useState([])

  const { sys } = dataWeather

  const APIKEY = '249a98dbac6bbd08955db7cf04c3763d'
  async function onFormSubmitHundler(e) {
    e.preventDefault()
    if (inputValue == '') {
      alert('Enter the city')
    } else {
      const fetchData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data)

      if (fetchData.cod == 200) {
        setDataWeather(fetchData)
      } else {
        alert('Enter the correct city')
      }
    }
  }
  return (
    <div>
      <div className={Style.weatherWrapper}>
        <div className={Style.citi}>
          <h2>{dataWeather?.name}</h2>
          <span>{sys?.country}</span>
        </div>

        <div>
          {dataWeather.length == 0 ? (
            <form style={{marginRight:'220px'}} onSubmit={(e) => onFormSubmitHundler(e)}>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter citi please"
                style={{width:'550px'}}
              />
              <button>
                <MdSearch className={Style.button} />
              </button>
            </form>
          ) : (
            <form onSubmit={(e) => onFormSubmitHundler(e)}>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter citi"
              />
              <button>
                <MdSearch className={Style.button} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={Style.weatherDisplay}>
        {dataWeather.length !== 0 ? (
          <WeatherDisplay dataWeather={dataWeather} inputValue={inputValue} />
        ) : null}
      </div>
    </div>
  )
}

export default WeatherMain
