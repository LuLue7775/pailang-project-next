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
          > 
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
    height: 120px;
    max-width: 350px;
    padding-left: 45px; 
    padding-right: 45px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    color: #F8B724;
    background-color: #F8B72450;
    border: 1px solid #F8B724;

    border-radius: 10px;
`;