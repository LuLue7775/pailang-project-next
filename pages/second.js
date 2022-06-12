import React, { useRef }  from 'react'
import styled from "styled-components";
import BoxesView from '../components/BoxesView';

export default function Second() {
  const canvasRef = useRef(null);
  
  return (
    <StyledPageTwo 
      ref={canvasRef} 
      className="page-two" 
    >
      <BoxesView canvasRef={canvasRef}/>
    </StyledPageTwo>
  )
}


const StyledPageTwo= styled.div`
  position: relative;
  height: calc(100vh - 250px) };
  // height: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

`;
