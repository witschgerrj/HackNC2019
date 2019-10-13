import React from 'react'
import Map from './components/Map'
import styled from 'styled-components'
import Report from './components/Report'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  `

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      longitude: -79.0558 - (Math.random() / 10), 
      latitude: 35.9132 + (Math.random() / 10)
    }
  }

  getCoords = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  render() {
    navigator.geolocation.getCurrentPosition(this.getCoords)
    return (
      <> 
        <Report latitude={this.state.latitude} 
                longitude={this.state.longitude}/>
        <Map longitude={this.state.longitude} 
              latitude={this.state.latitude}>
        </Map>
      </>
    )
  }
}

