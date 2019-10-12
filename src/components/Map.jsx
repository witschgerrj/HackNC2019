import React from 'react';
import Firebase from 'firebase'
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import Marker from './Marker'

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
      forestfire: [],
      flooding: [],
    }
  }

  componentWillMount() {
    Firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: 'hacknc-dffd4.firebaseapp.com',
      projectId: 'hacknc-dffd4'
    });
    
    let db = Firebase.firestore();

    let flooding = []
    db.collection("Flooding").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        flooding.push(doc.data())   
      })
      this.setState({
        flooding: flooding
      })
    })

    let forestfire = []
    db.collection("ForestFire").get().then(querySnapshot => {
      querySnapshot.forEach((doc, index) => {
        forestfire.push(doc.data())
      })
      this.setState({
        forestfire: forestfire
      })
    })

  }

  componentDidMount() {
    MapBox.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    let map = new MapBox.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v11',
      //       long,     lat
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
      <Container ref={(Container) => this.container = Container}>
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
          this.state.forestfire.map((data, index) => (
              <Marker key={data.latitude + data.longitude} 
                      type={"FORESTFIRE"}
                      mapbox={this.state.mapbox} 
                      lat={data.latitude} 
                      long={data.longitude}/>
          )) : null
          }
      </Container>
    )
  }
}

