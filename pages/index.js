import React from 'react'

import PageOneLeftCol from '../components/PageOneLeftCol';
import PageOneRightCol from '../components/PageOneRightCol';

import styled from "styled-components";


export default function Home() {


  return (
    <StyledHome className='pOne-content-container' >
        <StyledHomeLeftCol className='pOne-left-col' > 
            <PageOneLeftCol/>
        </StyledHomeLeftCol>

          <StyledHomeRightCol className='pOne-right-col' > 
              <PageOneRightCol/>
          </StyledHomeRightCol>
    </StyledHome>
  )
}




const StyledHome = styled.div`
  position: relative;
  display:grid;
  grid-template-columns:2fr 3fr;
  height: calc(100vh - 250px) ;
`;

const StyledHomeLeftCol = styled.div`
  border-right: 1px #85807f dashed;
  height: 100%;
  overflow-y:scroll;
  
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */


`;

const StyledHomeRightCol = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y:scroll;
  height: 100%;

  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

`;

