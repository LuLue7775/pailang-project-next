import React from 'react'
import dataJson from '../dataset.json';
import styled from "styled-components";


export default function AboutMidElement() {
    const { middleCol } = dataJson?.aboutPage;

  return (

    <StyledMidColContainer>
        <StyledMidContent>
            <StyledMidTitle> {middleCol.title} </StyledMidTitle>
            <StyledMidEn> {middleCol.en} </StyledMidEn>
            <StyledMidCh> {middleCol.ch} </StyledMidCh>
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
`;
const StyledMidEn = styled.div`
    font-size:.6rem;
    padding: 15px 0 15px 0;
`;
const StyledMidCh = styled.div`
    font-size:.7rem;
    padding: 15px 0 15px 0;

`;



