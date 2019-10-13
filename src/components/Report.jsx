import React from 'react';
import styled from 'styled-components'
import ReportForm from './ReportForm'

const Container = styled.div`
  position: absolute;
  width: 230px;
  height: ${props => props.height}px;
  right: 50px;
  top: 50px;
  z-index: 100;
  text-align: center;
`

const Report = styled.div`
  top: ${props => props.top}px;
  color: black;
  background-color: #80dfff;
  position: absolute; 
  width: 230px;
  height: 50px;
  border-radius: 15px;
  font-size: 35px;
  transition: all 0.75s;
  z-index: 6;
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);

  :hover{
    transform: scale(1.05);
  }
`

const SubMenu = styled.div`
  top: ${props => props.top}px; 
  opacity: ${props => props.opacity};
  color: black;
  background-color: white;
  position: absolute; 
  width: 230px;
  height: 50px;
  border-radius: 15px;
  font-size: 35px;
  transition: all 0.75s;
  z-index: ${props => props.zIndex};
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);
  :hover{
    transform: scale(1.05);
  }
`

const StyledText = styled.text`
  position: relative;
  width: 280px;
  font-size: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3px;
  height: 50px;
`


export default class Marker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 50,
      FloodingTop: 0,
      WildfireTop: 0,
      PowerOutageTop: 0,
      HighWindTop: 0,
      showForm: false,
      formType: "",
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      opacity: 0,
    }
  }
  _expand = () => {
    //if Report is already opened. Click again and it will close
    if (this.state.height === 340) {
      this.setState({
        height: 0,
        FloodingTop: 0,
        WildfireTop: 0,
        PowerOutageTop: 0,
        HighWindTop: 0,
        opacity: 0
      })
    } else {
      this.setState({
        height: 340,
        FloodingTop: 66,
        WildfireTop: 126,
        PowerOutageTop: 186,
        HighWindTop: 246,
        opacity: 1,
      })
    }
  }
  //retract on x
  //retract on submit**
  //retract on click outside container
  _retract = () => {
    this.setState({
      height: 50,
      FloodingTop: 0,
      WildfireTop: 0,
      PowerOutageTop: 0,
      HighWindTop: 0,
      opacity: 0,
      showForm: false,
    })
  }


  _showForm = (formType) => {
    this.setState({
      showForm: true,
      formType: formType
    })
  }
  
  render() {

    return (
      <Container 
        height={this.state.height}
        opacity={this.state.opacity}>
        <Report top={0}>
          <StyledText onClick={this._expand}>REPORT</StyledText>
        </Report>
         
        <SubMenu 
          top={this.state.FloodingTop}
          opacity={this.state.opacity}
          zIndex={5}>
          <StyledText onClick={() => this._showForm('Flooding')}>
            Flooding
          </StyledText>
        </SubMenu>
         
        <SubMenu 
          top={this.state.WildfireTop}
          opacity={this.state.opacity}
          zIndex={4}>
          <StyledText onClick={() => this._showForm('Wildfire')}>
            Wildfire
          </StyledText>
        </SubMenu>
         
        <SubMenu 
          top={this.state.PowerOutageTop}
          opacity={this.state.opacity}
          zIndex={3}>
          <StyledText onClick={() => this._showForm('PowerOut')}>
            Power Out
          </StyledText>
        </SubMenu>
         
        <SubMenu 
          top={this.state.HighWindTop}
          opacity={this.state.opacity}
          zIndex={2}>
          <StyledText onClick={() => this._showForm('HighWind')}>
            High Wind
          </StyledText>
        </SubMenu>
        
        {this.state.showForm ? 
          <ReportForm type={this.state.formType}
                      latitude={this.state.latitude}
                      longitude={this.state.longitude}
                      retract={this._retract}
                      mapbox={this.props.mapbox}/> 
        : null}

      </Container>
    )
  }
}

