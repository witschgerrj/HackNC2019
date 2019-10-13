import React from 'react';
import styled from 'styled-components'
import ReportForm from './ReportForm'

const Container = styled.div`
  position: absolute;
  width: 230px;
  height: ${props => props.height}px;
  right: 50px;
  top: 50px;
  z-index: 1;
`

const Report = styled.div`
  top: ${props => props.top}px;
  color: white;
  background-color: #828282;
  position: absolute; 
  width: 230px;
  height: 50px;
  border-radius: 20px;
  font-size: 35px;
  transition: all 1s;
  z-index: 1;
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);

  :hover{
    transform: scale(1.08);
  }
`

const SubMenu = styled.div`
  top: ${props => props.top}px; 
  color: black;
  background-color: white;
  position: absolute; 
  width: 230px;
  height: 50px;
  border-radius: 20px;
  font-size: 35px;
  transition: all 1s;
  z-index: 0;
  box-shadow: 0 0.3vh 0.3vw 0 rgba(0, 0, 0, 0.4), 0 2px 2px 0 rgba(0, 0, 0, 0.4);
`

const StyledText = styled.text`
  position: absolute;
  border-radius: 20px;
  font-size: 35px;
  margin-left: 46px;
  margin-top: 4px;
  width: 230px;
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
      formType: ""
    }
  }
  _expand = () => {
    this.setState({
      height: 340,
      FloodingTop: 66,
      WildfireTop: 126,
      PowerOutageTop: 186,
      HighWindTop: 246,
      opacity: 1,
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
      <Container height={this.state.height}>
        <Report top={0}>
          <StyledText onClick={this._expand}>REPORT</StyledText>
        </Report>
         
        <SubMenu top={this.state.FloodingTop} 
                 opacity={this.state.opacity}>
          <StyledText onClick={() => this._showForm('Flooding')}>
            Flooding
          </StyledText>
        </SubMenu>
         
        <SubMenu top={this.state.WildfireTop} 
                 opacity={this.state.opacity}>
          <StyledText onClick={() => this._showForm('Wildfire')}>
            Wildfire
          </StyledText>
        </SubMenu>
         
        <SubMenu top={this.state.PowerOutageTop} 
                 opacity={this.state.opacity}>
          <StyledText onClick={() => this._showForm('PowerOutage')}>
            Power Out
          </StyledText>
        </SubMenu>
         
        <SubMenu top={this.state.HighWindTop} 
                 opacity={this.state.opacity}>
          <StyledText onClick={() => this._showForm('HighWind')}>
            High Wind
          </StyledText>
        </SubMenu>
        
        {this.state.formType != "" ? 
          <ReportForm type={this.state.formType}
                      latitude={this.props.latitude}
                      longitude={this.props.longitude}/> 
        : null}

      </Container>
    )
  }
}

