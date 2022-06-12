import React from 'react'
import AboutLeftElement from '../components/AboutLeftElement';
import AboutMidElement from '../components/AboutMidElement';
import AboutRightElement from '../components/AboutRightElement';

import styled from "styled-components";

export default function About() {
  return (
    <StyledAbout>
      <StyledAboutLeftCol>
        <AboutLeftElement/>
      </StyledAboutLeftCol>

      <StyledAboutMidCol>
        <StyledSideLines/>

        <AboutMidElement/>
      </StyledAboutMidCol>

      <StyledAboutRightCol>
        <AboutRightElement/>
      </StyledAboutRightCol>
    </StyledAbout>
  )
}

const StyledAbout = styled.div`
    display:grid;
    grid-template-columns: 5fr 6fr 5fr;
    position: relative;
    width:100vw;
    height: calc(100vh - 50px);
    color: #000;
    background: rgb(207,204,204);
    background: radial-gradient(circle, rgba(207,204,204,1) 29%, rgba(255,255,255,1) 93%);
    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

const StyledAboutLeftCol = styled.div`
    border-right: 1px #85807f dashed;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

const StyledAboutMidCol = styled.div`
    border-right: 1px #85807f dashed;
    height: 100%;
`;
const StyledSideLines = styled.div`
    position: absolute;
    border-left: 1px #85807f solid;
    border-right: 1px #85807f solid;
    width: calc(100vw/16*6*0.96);
    height: 300px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

const StyledAboutRightCol = styled.div`
    border-right: 1px #85807f dashed;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

