import React from 'react'
import styled from "styled-components";

export default function AboutRightElement({ credits, parse }) {

    return (
        <StyledMidColContainer className='leftcol-container'>
        { credits?.map(( elem, i ) => (
            <StyledElementContainer className='element-container' key={i}>
                <StyledTitle> {elem.title} </StyledTitle>
                <StyledElement className='persona-ch'>
                   { parse(elem.content) }
                </StyledElement>

            </StyledElementContainer>
        )) || ""}
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
    border-top: 1px #F8B724 solid;
`;
const StyledTitle = styled.div`
    font-size: .5px;
    font-weight: bold;
    margin: 15px 0 15px 0;

`;
const StyledElement = styled.div`
    font-size: .5px;
    
`;
