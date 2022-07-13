import { useContext, useEffect, useLayoutEffect, useState, useRef } from 'react'
import { LeftCrossSVG, RightCrossSVG, LineSVG, DownChevronSVG } from './Svgs';
import styled from "styled-components";
import { CursorContext } from '../context/cursorContext';
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from '../utils/hooks';

const letterAni = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const AnimatedLetters = ({ title, disabled }) => (
  <motion.span
    className='row-title'
    variants={disabled ? null : banner}
    initial='initial'
    animate='animate'>
    {[...title].map((letter, i) => (
      <motion.span
        key={i}
        className='row-letter'
        variants={disabled ? null : letterAni}>
        {letter}
      </motion.span>
    ))}
  </motion.span>
);


export default function ArticlesHeader({ data, slideTo, spring }) {
  const { hoverEvent, setHoverEvent } =  useContext(CursorContext)
  const titleRef = useRef(  data?.title.length > 60 ? true : false )
  const titleZhRef = useRef(  data?.title_zh.length > 40 ? true : false )
  const { windowWidth } = useWindowSize()


  return (
    <StyledHeader>
        <LineSVG />
        <StyledTitles>
            <StyledTitle isTitleExceed={titleRef.current} windowWidth={windowWidth}>
                { data?.title }
            </StyledTitle>
            <StyledTitleZh isTitleExceed={titleZhRef.current} windowWidth={windowWidth}>
                { data?.title_zh }
            </StyledTitleZh>
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
        
        <div onClick={() => slideTo( document.getElementById("section2").offsetTop, spring )}
            onMouseOver={() => setHoverEvent("expand")}
            onMouseLeave={() => setHoverEvent("default")}  
        >
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
  height: max(300px, 45vh);
  overflow: hidden;
  width: 100%;
`
const StyledTitle = styled.h1` 
  line-height: 5rem;
  font-size: ${({isTitleExceed, windowWidth }) => isTitleExceed ? `min(${(windowWidth/20)*100/windowWidth}vw, 80px)` : 'min(8vw, 90px)' };
  margin-bottom: 6px;
`
const StyledTitleZh = styled.h2` 
  line-height: 5rem;
  font-size: ${({isTitleExceed, windowWidth }) => isTitleExceed ? `min(${(windowWidth/60)*100/windowWidth}vw, 80px)` : 'min(2vw, 32px)' };
  margin-bottom: 6px;
`


const StyledSubtitles = styled.div`
  width: 100%;
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 30% 30% 30% 1fr;
  justify-items: center;
  align-items: center;

`
