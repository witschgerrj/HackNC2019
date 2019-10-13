import React from 'react';
import Firebase from 'firebase'
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import Marker from './Marker'
import Report from './Report'
import CurrentLocation from './CurrentLoc'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

export default class Map extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      width: '100%',
      height: '100%',
      zoom: 10,
      mapbox: {},
      mounted: false,
      wildfire: [],
      flooding: [],
      powerout: [],
      highwind: [],
      newData: false,
    }
    
    Firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: 'hacknc-dffd4.firebaseapp.com',
      projectId: 'hacknc-dffd4'
    })
  }


  _updateData = () => {    
    let db = Firebase.firestore()

    let flooding = []
    let wildfire = []
    let powerout = []
    let highwind = []
 
    db.collection("Flooding").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        flooding.push(doc.data())   
      })
    })


    db.collection("Wildfire").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        wildfire.push(doc.data())
      })
    })


    db.collection("PowerOut").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        powerout.push(doc.data())
      })
    })


    db.collection("HighWind").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        highwind.push(doc.data())
      })
      this.setState({
        highwind: highwind,
        wildfire: wildfire,
        flooding: flooding,
        powerout: powerout,
        newData: false,
      })
    })
  }

  _toggleNewData = () => {
    this.setState({
      newData: true
    })
  }

  componentDidMount() {
    this._updateData()
    MapBox.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    let map = new MapBox.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v11',
      //       long,                 lat
      center: [this.props.longitude, this.props.latitude],
      zoom: 12,
    })
    this.setState({
      mapbox: map,
      mounted: true,
    })
  }
  
  render() {
    return (
      <>
      <Report latitude={this.props.latitude} 
              longitude={this.props.longitude}
              mapbox={this.state.mapbox}/>
      <Container ref={(Container) => this.container = Container}>
        {this.state.mounted ? 
              <CurrentLocation mapbox={this.state.mapbox} 
                               lat={this.props.latitude} 
                               long={this.props.longitude}/>
              : null}
        {this.state.mounted ?
          this.state.flooding.map((data, index) => (
              <Marker key={data.latitude + data.longitude} 
                      type={"FLOODING"}
                      mapbox={this.state.mapbox} 
                      lat={data.latitude} 
                      long={data.longitude}/>
          )) : null
        }
        {this.state.mounted ?
          this.state.wildfire.map((data, index) => (
              <Marker key={data.latitude + data.longitude} 
                      type={"WILDFIRE"}
                      mapbox={this.state.mapbox} 
                      lat={data.latitude} 
                      long={data.longitude}/>
          )) : null
          }
          {this.state.mounted ?
          this.state.powerout.map((data, index) => (
              <Marker key={data.latitude + data.longitude} 
                      type={"POWEROUT"}
                      mapbox={this.state.mapbox} 
                      lat={data.latitude} 
                      long={data.longitude}/>
          )) : null
          }
          {this.state.mounted ?
          this.state.highwind.map((data, index) => (
              <Marker key={data.latitude + data.longitude} 
                      type={"HIGHWIND"}
                      mapbox={this.state.mapbox} 
                      lat={data.latitude} 
                      long={data.longitude}/>
          )) : null
          }

      </Container>
      </>
    )
  }
}

