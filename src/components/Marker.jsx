import React from 'react';
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import ForestFire from '../assets/ForestFire.svg'
import Flooding from '../assets/Flooding.svg'

const Point = styled.div`
  background-image: url(${ForestFire});
  background-repeat: no-repeat;
  background-size: cover;
  height: 60px;
  width: 70px;
`

export default class Marker extends React.Component {
  _setMarkers = () => {
    new MapBox.Marker(this.point)
    .setLngLat([this.props.long, this.props.lat])
    .addTo(this.props.mapbox)
  }

  
  render() {
    this._setMarkers()
    return (
      <Point ref={(Point) => this.point = Point}>
        
      </Point>
    )
  }
}
