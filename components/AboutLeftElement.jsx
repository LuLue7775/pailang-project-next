import React from 'react'
import dataJson from '../dataset.json';
import styled from "styled-components";

export default function AboutLeftElement() {
    const { leftCol } = dataJson?.aboutPage;

  return (
    <StyledLeftColContainer className='leftcol-container'>
        { leftCol.map(( elem, i ) => (
            <StyledPersonaContainer className='persona-container' key={i}>
                <StyledInnerGrid>
                    <div>
                        <StyledLeftTitle className='persona-title'>
                            {elem.titles.map((title, i) => (
                                <div key={i} > { title } </div>
                            ) )}
                        </StyledLeftTitle>
                        <StyledPersonaEn className='persona-en'>
                            {elem.content.en.map((title, i) => (
                                <div key={i} > { title } </div>
                            ) )}
                        </StyledPersonaEn>
                    </div>
                    <StyledImgContainer className='persona-img-continer'>
                        <img className='persona-img' alt="pailang-persona" src={elem.content.image}/> 
                    </StyledImgContainer>
                </StyledInnerGrid>

                <StyledPersonaCh className='persona-ch'>
                    {elem.content.ch.map((title, i) => (
                        <div key={i} > { title } </div>
                    ) )}
                </StyledPersonaCh>

            </StyledPersonaContainer>
        ))
        }
    </StyledLeftColContainer>
  )
}

const StyledLeftColContainer = styled.div`
    padding: 20px;
`;
const StyledPersonaContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;
    border-top: 1px #85807f solid;
    border-bottom: 1px #85807f solid;
`;

const StyledInnerGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    
`; 
const StyledLeftTitle = styled.div`
    padding: 10px;
    font-weight: bold;
    font-size: 1.1rem;
`;
const StyledImgContainer = styled.div`
    padding: 20px;
    width:120px;
    height:120px;
    background-color: #000;
`;
const StyledPersonaEn = styled.div`
    padding: 10px;
    font-size:.6rem;
`;
const StyledPersonaCh = styled.div`
    padding: 10px;
    font-size:.7rem;
`;