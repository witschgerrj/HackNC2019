import React from 'react'
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import Wildfire from '../assets/Wildfire.svg'
import Flooding from '../assets/Flooding.svg'
import HighWind from '../assets/HighWind.svg'
import PowerOut from '../assets/PowerOut.svg'

const Point = styled.div`
  background-image: url(${props => props.type});
  background-repeat: no-repeat;
  height: 75px;
  width: 75px;
  max-width: 75px;
  z-index: 5;
`

export default class Marker extends React.Component {

  _setMarkers = () => {
    new MapBox.Marker(this.point)
    .setLngLat([this.props.long, this.props.lat])
    .addTo(this.props.mapbox)
  }
  componentDidMount() {
    this._setMarkers()
  }
  
  render() {
    return (
      <>
        {(this.props.type.toUpperCase() === "FLOODING") ?
          <Point ref={(Point) => this.point = Point} 
                 type={Flooding}/> : null
        }
        {(this.props.type.toUpperCase() === "WILDFIRE") ?
          <Point ref={(Point) => this.point = Point} 
                 type={Wildfire}/> : null
        }
        {(this.props.type.toUpperCase() === "POWEROUT") ?
          <Point ref={(Point) => this.point = Point} 
                 type={PowerOut}/> : null
        }
        {(this.props.type.toUpperCase() === "HIGHWIND") ?
          <Point ref={(Point) => this.point = Point} 
                 type={HighWind}/> : null
        }
      </>
    )
  }
}

