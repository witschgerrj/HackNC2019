import React from 'react'
import './App.css';
import Map from './components/Map'


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

  //gets called in report form. Then sets state for a map reload...
  //state then gets passed into map via mapReload state.
  //map calls _setMapReload after successfully reloaded



  render() {
    //navigator.geolocation.getCurrentPosition(this.getCoords)
    return (

        <Map longitude={this.state.longitude} 
             latitude={this.state.latitude}/>

    )
  }
}

