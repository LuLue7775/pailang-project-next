import React from 'react'
import styled from "styled-components";

export default function AboutMidElement({ content, content_zh, parse }) {

  return (
    <StyledMidColContainer>
        <StyledMidContent>
            <StyledMidTitle> Pailang Settlers Museum </StyledMidTitle>
            <StyledMidEn> {content && parse(content)} </StyledMidEn>
            <StyledMidCh> {content_zh && parse(content_zh)} </StyledMidCh>
        </StyledMidContent>
    </StyledMidColContainer>
  )
}

const StyledMidColContainer = styled.div`
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px 20px 30px;
    position: relative;

    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;
const StyledMidContent = styled.div`
    position: absolute;
    top: 15vh; 
    margin: 30px;
`;

const StyledMidTitle = styled.h3`
    text-align: center;
    font-family: "RiccioneSerial";
    font-size: 1.3rem;
    font-weight: 500;
`;
const StyledMidEn = styled.div`
    font-size:.6rem;
    padding: 15px 0 15px 0;
`;
const StyledMidCh = styled.div`
    font-size:.7rem;
    padding: 15px 0 15px 0;

`;



