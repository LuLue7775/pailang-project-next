import React, { useEffect, useState } from 'react'
import styled from "styled-components";

export default function AgendaElement({ item, activeExpand }) {
  const { image, content } = item;
  const [isExpand, setExpand] = useState(false);

  useEffect(() => {
    if ( activeExpand === item.id ) setExpand(true);
    else setExpand(false);
  },[activeExpand])

  return (
      <ElementContainer className='container'>
          <StyledImgContainer isExpand={isExpand}>
            <img alt="" src={image}/>
          </StyledImgContainer>
          { content.map((item, i) => (
              <StyledElement key={i} > {item} </StyledElement>
            ))
          }
      </ElementContainer>
    )
  }
  
  const ElementContainer = styled.div`
    position: relative;  
    padding: 20px;
  `;
  const StyledImgContainer = styled.div`
    position: relative;  
    width: 100%;
    height: ${({ isExpand }) => isExpand ? '300px' : '100px'};
    background-color: #000;
    margin: 10px 0 10px 0;
    transition: height .6s;
  `;
  const StyledElement = styled.div`
    position: relative;  
    font-size:.5px;
  `;