import React from 'react'
import styled from "styled-components"
import ExtendableContent from './ExtendableContent';

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};
  

export default function BoxesContainer({elementsData, handleRefs, detailRef}) {
  return (
    <>
    {
        elementsData?.map((elem, i) => 
          <StyledBoxContainer
              className={`box${i} connect-${elem.connectTail}`}
              key={`box${elem.id}` }
              ref={elem => setRefs(elem, handleRefs, elementsData.length)}
          > {elem.id} 
            <ExtendableContent 
                  boxIndex={i} 
                  id={elem.id} 
                  node={elem.node} // {"type":"img", "content": ["url"] }
                  desciption={elem.desciption}
              />
          </StyledBoxContainer>
        )
    }
    </>
  )
}


const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: 120px;
    width: 100px;
    max-width: 350px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    color: #FFF;
    border: 1px solid #FFF;

`;