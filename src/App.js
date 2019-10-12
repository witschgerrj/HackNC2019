import React from 'react';
import Map from './components/Map'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      longitude: -79.0558, 
      latitude: 35.9132
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
        <Map longitude={this.state.longitude} 
             latitude={this.state.latitude}>
        </Map>
      </>
    )
  }
}

