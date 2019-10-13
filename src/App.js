import React from 'react'
import './App.css';
import Map from './components/Map'
import Logo from './components/Logo'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: -79.0558 - (Math.random() / 10), 
      latitude: 35.9132 + (Math.random() / 10),
    }
  }

  /*getCoords = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }*/

  render() {
    //navigator.geolocation.getCurrentPosition(this.getCoords)
    return (
        <>
          <Map longitude={this.state.longitude} 
              latitude={this.state.latitude}/>
          <Logo/>
        </>

    )
  }
}

