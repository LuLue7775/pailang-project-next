import React from 'react'
import styled from "styled-components"

const setRefs = (elem, refs) => {
    refs.current.push(elem);
  };

export default function SVGsContainer({ elementsData, pathRefs }) {
  return (
    <StyledSvgArea className='svg-area' elementAmount={elementsData.length}>  
        {elementsData?.map((elem, i) =>  
         elem?.connectTail &&
            elem?.connectTo.map((line, i) => 
                <StyledPath 
                    key={`svg-${elem.id}-${i}`}
                    id={`${elem.id}-${i}`}
                    className={`${elem.id} path`} 
                    ref={elem => setRefs(elem, pathRefs)}
                />  
            )
        )}
    </StyledSvgArea>
    
  )
}

const StyledPath = styled.path`
    fill: #F8B724;
    stroke: #F8B724;
`

const StyledSvgArea = styled.svg`
    position: absolute;
    top: 60px;
    width: 100%;
    // height: 100%;
    height: ${({elementAmount}) => elementAmount*250  }px;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;


`