import React from 'react'
import dataJson from '../dataset.json';

import styled from "styled-components";

export default function AboutRightElement() {
    const { rightCol } = dataJson?.aboutPage;

    return (
        <StyledMidColContainer className='leftcol-container'>
        { rightCol.map(( elem, i ) => (
            <StyledElementContainer className='element-container' key={i}>
                <StyledTitle> {elem.title} </StyledTitle>
                <StyledElement className='persona-ch'>
                    {elem.content.map((name, i) => (
                        <div key={i} > { name } </div>
                    ) )}
                </StyledElement>

            </StyledElementContainer>
        ))
        }
    </StyledMidColContainer>
    )
}
const StyledMidColContainer = styled.div`
    color: #000;
    width: 100%;
    padding: 20px;

`;

const StyledElementContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;
    border-top: 1px #85807f solid;
`;
const StyledTitle = styled.div`
    font-size: .5px;
    font-weight: bold;
    margin: 15px 0 15px 0;

`;
const StyledElement = styled.div`
    font-size: .5px;
    
`;
