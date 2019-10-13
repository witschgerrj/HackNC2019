import React from 'react';
import styled from 'styled-components'
import Wildfire from '../assets/ForestFire.svg'
import Flooding from '../assets/Flooding.svg'
import HighWind from '../assets/ForestFire.svg'
import PowerOut from '../assets/Flooding.svg'

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
  background-size: cover;
  height: 60px;
  width: 70px;
  left: 50px;
  top: 50px;
`

const Type = styled.text`
  position: absolute;
  left: 140px;
  top: 50px;
  font-size: 60px;
`

const Coords = styled.text`
  position: absolute;
  width: 200px;
  left: 150px;
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

export default class ReportForm extends React.Component {
  _storeData = () => {
    console.log('submitted')
  }

  constructor(props) {
    super(props) 
    this.state = {
      formType: props.type
    }
  }
  render() {
    return (
      <Form> 
        {this.state.formType === "Flooding" ? 
          <Point type={Flooding}/>
        : null}
        {this.state.formType === "Wildfire" ? 
          <Point type={Wildfire}/> 
        : null}
        {this.state.formType === "PowerOutage" ? 
          <Point type={PowerOut}/> 
        : null}
        {this.state.formType === "HighWind" ? 
          <Point type={HighWind}/> 
        : null}
        <Type>{this.state.formType.toUpperCase()}</Type>
        <Coords>{this.props.latitude + "    " + this.props.longitude}</Coords>
        <Submit onClick={() => {this._storeData()}}>Submit</Submit>
      </Form>
    )
  }
}

