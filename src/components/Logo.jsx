import React from 'react';
import styled from 'styled-components'


const Logo = styled.text`
  position: fixed;
  color: white;
  font-size: 60px;
  left: 50px;
  top: 20px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
  z-index: 100;
`


export default class Marker extends React.Component {
  render() {
    return (
      <Logo>
        swrv
      </Logo>
    )
  }
}

