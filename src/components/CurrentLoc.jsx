import React from 'react'
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import CurrentLocation from '../assets/CurrentLoc.svg'

const Current = styled.div`
  background-image: url(${CurrentLocation});
  background-repeat: no-repeat;
  height: 75px;
  width: 75px;
  z-index: 0;
`

export default class CurrentLoc extends React.Component {

  _setMarkers = () => {
    new MapBox.Marker(this.current)
    .setLngLat([this.props.long, this.props.lat])
    .addTo(this.props.mapbox)
  }

  componentDidMount() {
    this._setMarkers()
  }
  
  render() {
    return (
      <Current ref={(Current) => this.current = Current}/>
    )
  }
}

