import React from 'react'
import dataJson from '../dataset.json';
import Image from 'next/image'

import styled from "styled-components";


export default function AboutLeftElement({ roles, parse }) {
  return (
    <StyledLeftColContainer className='leftcol-container'>
        { roles?.map(( elem, i ) => (
            <StyledPersonaContainer className='persona-container' key={i}>
                <StyledLeftTitle className='persona-title'>
                    <div> {parse(elem.name)} </div>
                    <div> {parse(elem.name_zh)} </div>
                </StyledLeftTitle>
                <StyledImgContainer className='persona-img-continer'>
                    <Image className='persona-img' 
                            alt="pailang-persona" 
                            src={elem.cover || "https://via.placeholder.com/300X150.png"}
                            width={300}
                            height={150}
                    /> 
                </StyledImgContainer>
                <StyledPersonaEn className='persona-en'>
                    {parse(elem.introduction)}
                </StyledPersonaEn>
      

                <StyledPersonaCh className='persona-ch'>
                    {parse(elem.introduction_zh)}
                </StyledPersonaCh>

            </StyledPersonaContainer>
        )) || "" }
    </StyledLeftColContainer>
  )
}

const StyledLeftColContainer = styled.div`
    padding: 20px;
`;
const StyledPersonaContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;
    border-top: 1px #F8B724 solid;
    border-bottom: 1px #F8B724 solid;
`;

const StyledLeftTitle = styled.div`
    padding: 5px;
    font-weight: bold;
    font-size: 1.1rem;
`;
const StyledImgContainer = styled.div`
    padding-left: 5px;
    
`;
const StyledPersonaEn = styled.div`
    padding: 5px;
    font-size:.6rem;
`;
const StyledPersonaCh = styled.div`
    padding: 5px;
    font-size:.7rem;
`;