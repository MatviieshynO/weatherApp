import {
  WiHorizonAlt,
  WiMoonWaningCrescent3,
  WiNightAltRainMix,
  WiCloudyGusts,
  WiBarometer,
  WiWindDeg,
  WiCloudDown,
  WiCloudUp,
  WiHumidity,
  WiDaySunny,
  WiCloudy,
} from 'react-icons/wi'
import Style from './WeatherDisplay.module.css'

const WeatherDisplay = ({ dataWeather }) => {
  const iconsWeather = () => {
    if (
      dataWeather.weather[0].main == 'Snow' &&
      dataWeather.weather[0].main == 'Rein'
    ) {
      return <WiNightAltRainMix className={Style.imageWeather} />
    } else if (dataWeather.weather[0].main == 'Clear') {
      return <WiDaySunny className={Style.imageWeather} />
    } else {
      return <WiCloudy className={Style.imageWeather} />
    }
  }

  const today = new Date()
  const zeroFirstFormat = (value) => {
    if (value < 10) {
      value = '0' + value
    }
    return value
  }
  if (dataWeather !== '') {
    return (
      <div className={Style.displayWrapper}>
        <p className={Style.actDays}>
          <span>
            {today.toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>
            {`${today.getHours()}:${zeroFirstFormat(today.getMinutes())}`}
          </span>
        </p>

        <div className={Style.blocksWrapper}>
          <div className={Style.weatherWrapper}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {iconsWeather()}

              <div className={Style.temperature}>
                {Math.floor(dataWeather.main.temp - 273.15)}°C
              </div>
            </div>
          </div>
          <div className={Style.airWrapper}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              className={Style.headerAirWrapp}
            >
              <WiHorizonAlt
                title="sunrice"
                style={{ fontSize: '30px', color: 'yellow' }}
              />
              <span title="sunrice" style={{ marginRight: '120px' }}>
                {new Date(dataWeather.sys.sunrise * 1000).toLocaleTimeString()}
              </span>

              <span title="sunset">
                {new Date(dataWeather.sys.sunset * 1000).toLocaleTimeString()}
              </span>
              <WiMoonWaningCrescent3
                style={{ fontSize: '28px', color: 'yellow' }}
                title="sunset"
              />
            </div>
            <div
              style={{
                width: '100%',
                fontSize: '25px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              {dataWeather.weather[0].description}
            </div>
            <div
              style={{
                display: 'Flex',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <div>
                <WiWindDeg style={{ fontSize: '30px' }} />
                <p>
                  Visibility <br />
                  {`${dataWeather.visibility / 1000} km`}
                </p>
              </div>
              <div>
                <WiCloudyGusts style={{ fontSize: '30px' }} />
                <p>
                  Wind <br />
                  {`${Math.floor((dataWeather.wind.speed * 18) / 5)} km/h`}
                </p>
              </div>
              <div>
                <WiBarometer style={{ fontSize: '30px' }} />
                <p>
                  Pressure <br />
                  {`${dataWeather.main.pressure} hPa`}
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'Flex',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <div>
                <WiCloudDown style={{ fontSize: '30px' }} />
                <p>
                  Min °C
                  <br />
                  {(dataWeather.main.temp_min - 273.15).toFixed(0)}
                </p>
              </div>
              <div>
                <WiCloudUp style={{ fontSize: '30px' }} />
                <p>
                  Max °C <br />
                  {(dataWeather.main.temp_max - 273.15).toFixed(0)}
                </p>
              </div>
              <div>
                <WiHumidity style={{ fontSize: '30px' }} />
                <p>
                  Humidity <br />
                  {`${dataWeather.main.humidity} %`}
                </p>
              </div>
            </div>
          </div>
          <div className={Style.anotherWrapper}>
            <div
              style={{
                width: '38%',
                height: '96%',
                opacity: '0.7',
                marginTop: '5px',
                opacity: '0.4',
              }}
            >
              {dataWeather.weather[0].main}
            </div>
            <div
              style={{
                width: '58%',
                height: '96%',
                opacity: '0.5',
                marginTop: '5px',
                opacity: '0.6',
              }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherDisplay
