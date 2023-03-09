import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import GeoLocationUser from './GeoLocationUser'
import WeatherDisplay from './WeatherDisplay'
import Style from './WeatherMain.module.css'

const WeatherMain = () => {
  //Weather
  const [inputValue, setInputValue] = useState('')
  const [dataWeather, setDataWeather] = useState([])
  //GPS
  const [userCountryPosition, setuserCountryPosition] = useState([])
  const [latitude, setLatitude] = useState(null)
  const [longitude, setlongitude] = useState(null)

  const { sys } = dataWeather
  const { geonames } = userCountryPosition
  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude)
    setlongitude(position.coords.longitude)
  })
  // console.log(latitude, longitude)
  // console.log(geonames[0]?.name)
  //Fucn GPS
  const APIKEY1 = 'olo21442'
  const GEONAMES_USER_NAME = "olo21442";
  async function getUserCountryPosition() {
    if (latitude === null || longitude === null) {
      alert('please provide both latitude and longitude')
    } else {
      const fetchData = await fetch(
        `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${GEONAMES_USER_NAME}`
      ).then((res) => res.json());
      setuserCountryPosition(fetchData)
      console.log(fetchData)
    }
    console.log(geonames)
    /////////////////////////////////////////
    // if (!geonames[0]?.name) {
    //   console.log('we need data [geonames[0].name]')
    // } else {
    const fetchData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${geonames[0]?.name},&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data)

    if (fetchData.code === 200) {
      setDataWeather(fetchData)
    } else {
      alert('Enter the correct city')
    }
    // }
  }

  //FuncWeather

  const APIKEY = '249a98dbac6bbd08955db7cf04c3763d'
  async function onFormSubmitHundler(e) {
    e.preventDefault()
    if (inputValue === '') {
      alert('Enter the city')
    } else {
      const fetchData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data)

      if (fetchData.code === 200) {
        setDataWeather(fetchData)
      } else {
        alert('Enter the correct city')
      }
    }
  }
  return (
    <div>
      <div className={Style.weatherWrapper}>
        <div className={Style.city}>
          <h2>{dataWeather?.name}</h2>
          <span>{sys?.country}</span>
          {/* <span>{geonames[0]?.name}</span> */}
        </div>

        <div style={{ display: 'inlineFlex', justifyContent: 'center' }}>
          {dataWeather.length === 0 ? (
            <div>
              {/* <GeoLocationUser
                getUserCountryPosition={getUserCountryPosition}
              /> */}
              <form
                style={{ marginRight: '220px' }}
                onSubmit={(e) => onFormSubmitHundler(e)}
              >
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter city please"
                  style={{ width: '550px' }}
                />
                <button>
                  <MdSearch className={Style.button} title="Search" />
                </button>
              </form>
            </div>
          ) : (
            <div>
              <GeoLocationUser
                getUserCountryPosition={getUserCountryPosition}
              />
              <form onSubmit={(e) => onFormSubmitHundler(e)}>
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter city"
                />
                <button>
                  <MdSearch className={Style.button} title="Search" />
                </button>
              </form>
            </div>
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

WeatherMain.displayName = 'WeatherMain'
export default WeatherMain
