import React from 'react';
import styled from 'styled-components'
import Wildfire from '../assets/Wildfire.svg'
import Flooding from '../assets/Flooding.svg'
import HighWind from '../assets/HighWind.svg'
import PowerOut from '../assets/PowerOut.svg'
import Firebase from 'firebase'



const Form = styled.div`
  position: fixed;
  left: ${window.innerWidth / 2 - 250}px;
  top: ${window.innerHeight / 2 - 150}px;
  height: 300px;
  width: 500px;
  background-color: white;
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);
  z-index: 1;
  border-radius: 20px;
`

const Point = styled.div`
  position: absolute;
  background-image: url(${props => props.type});
  background-repeat: no-repeat;
  height: 80px;
  width: 70px;
  left: 40px;
  top: 50px;
`

const Type = styled.text`
  position: absolute;
  left: 140px;
  top: 42px;
  font-size: 60px;
`

const Coords = styled.text`
  position: absolute;
  width: 200px;
  left: 140px;
  top: 120px;
  font-size: 20px;
  white-space: pre;
`

const Submit = styled.div`
  color: white;
  background-color: #828282;
  position: absolute;
  bottom: 25px;
  right: 25px; 
  width: 230px;
  height: 50px;
  border-radius: 20px;
  font-size: 35px;
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);
`

const SubmitText = styled.text`
  position: absolute;
  bottom: 4px;
  right: 64px; 
`

export default class ReportForm extends React.Component {
  
  _storeData = () => {
    let db = Firebase.firestore()
    if (this.state.formType === "Flooding") {
      db.collection('Flooding').doc().set({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        reported_by: "Anonymous"
      })
    } else if (this.state.formType === "Wildfire") {
      db.collection('Wildfire').doc().set({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        reported_by: "Anonymous"
      })
    } else if (this.state.formType === "PowerOut") {
      db.collection('PowerOut').doc().set({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        reported_by: "Anonymous"
      })
    } else if (this.state.formType === "HighWind") {
      db.collection('HighWind').doc().set({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        reported_by: "Anonymous"
      })
    } else {
      //do nothing for now
    }
    this.props.retract()
  }

  constructor(props) {
    super(props) 
    this.state = {
      formType: props.type,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    }
  }

  render() {
    console.log("Report Form Lat: " + this.state.latitude)
    console.log("Report Form Long: " + this.state.longitude)
    return (
      <Form> 
        {this.state.formType === "Flooding" ? 
          <Point type={Flooding}/>
        : null}
        {this.state.formType === "Wildfire" ? 
          <Point type={Wildfire}/> 
        : null}
        {this.state.formType === "PowerOut" ? 
          <Point type={PowerOut}/> 
        : null}
        {this.state.formType === "HighWind" ? 
          <Point type={HighWind}/> 
        : null}
        <Type>{this.state.formType.toUpperCase()}</Type>
        <Coords>{this.state.latitude.toFixed(5) + "    " + this.state.longitude.toFixed(5)}</Coords>
        <Submit onClick={() => {this._storeData()}}>
          <SubmitText>
            Submit
          </SubmitText>
        </Submit>
      </Form>
    )
  }
}

