import React from 'react';
import Firebase from 'firebase'
import styled from 'styled-components'
import MapBox from 'mapbox-gl'
import Marker from './Marker'

const pointLat = 35.9132
const pointLong = -79.0558

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [pointLong, pointLat]
    },
    properties: {
      title: 'Mapbox',
      description: 'Washington, D.C.'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [pointLong, pointLat + 0.03]
    },
    properties: {
      title: 'Mapbox',
      description: 'San Francisco, California'
    }
  }]
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

Firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'hacknc-dffd4.firebaseapp.com',
  projectId: 'hacknc-dffd4'
});

let db = Firebase.firestore();

let flooding = db.collection("Flooding").get().then(querySnapshot => {
  querySnapshot.forEach((doc)=>{
    console.log(doc.id, " => ", doc.data());
  })
})
let forestfire = db.collection("ForestFire").get()

console.log(flooding)

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: '100%',
      height: '100%',
      zoom: 10,
      mapbox: {},
      mounted: false,
    }
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
      mounted: true
    })
  }


  render() {
    return (
      <Container ref={(Container) => this.container = Container}>
        {this.state.mounted ?
          geojson.features.map((check) => (
              <Marker mapbox={this.state.mapbox} lat={check.geometry.coordinates[1]} long={check.geometry.coordinates[0]}/>
          )) : null
        }
      </Container>
    )
  }
}

