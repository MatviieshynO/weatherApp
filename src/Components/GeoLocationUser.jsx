import { MdGpsFixed } from 'react-icons/md'
import Style from './GeoLocationUser.module.css'

const GeoLocationUser = ({ getUserCountryPosition }) => {
  return (
    <MdGpsFixed
      className={Style.svg}
      title="GPS"
      onClick={() => getUserCountryPosition()}
    />
  )
}

GeoLocationUser.displayName = "GeoLocationUser"
export default GeoLocationUser
