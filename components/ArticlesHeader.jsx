import React from 'react'
import { LeftCrossSVG, RightCrossSVG, LineSVG, DownChevronSVG } from './Svgs';
import styled from "styled-components";


export default function ArticlesHeader({ data, slideTo, spring }) {

  return (
    <StyledHeader>
        <StyledTitles>
            <LineSVG />
            <StyledTitle>{ data?.title }</StyledTitle>
            <h2>{ data?.title_zh }</h2>
        </StyledTitles>

        <StyledSubtitles className='zh'>
            <LeftCrossSVG/>
            <div> {data?.artist} </div>
            <div>
                <div> { data?.producer &&  `製作單位 Produced by ${data?.producer} `} </div>
                <div> { data?.curator && `策展 Curated by ${data?.curator}`} </div>
            </div>
            <div> {data?.start_date} - {data?.start_date} </div>
            <RightCrossSVG/>
        </StyledSubtitles>
        
        <div onClick={() => slideTo( document.getElementById("section2").offsetTop, spring )}>
            <DownChevronSVG />
        </div>
    </StyledHeader>
  )
}


const StyledHeader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

/**
* @TODO media query on height and fontsize
*/
const StyledTitles = styled.div`
  text-align: center;
  height: clamp(200px, 55vh, 400px);
  overflow: hidden;
`
const StyledTitle = styled.h1` 
  line-height: 6rem;


`
const StyledSubtitles = styled.div`
  width: 100%;
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 30% 30% 30% 1fr;
  justify-items: center;
  align-items: center;

`
