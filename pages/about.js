import { useEffect } from 'react'
import AboutLeftElement from '../components/AboutLeftElement';
import AboutMidElement from '../components/AboutMidElement';
import AboutRightElement from '../components/AboutRightElement';
import { fetchData } from '../utils/functions';
import { useRouter } from 'next/router'

import { useContext, useRef, useState } from 'react';
import { CursorContext } from '../context/cursorContext'
import { getRelativeCoordinates } from '../utils/functions'
import styled from "styled-components"
import { motion } from 'framer-motion'
import DOMPurify from 'isomorphic-dompurify';
import Cursor from '../components/Cursor';

export default function About({ data }) {
  
  const { content, content_zh, credits, roles } = data
  const router = useRouter()
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data)
  })

  // Cursor efffect
  const cursorAreaRef = useRef()
  const [mousePosition, setMousePosition] = useState({})
  const { hoverEvent, setHoverEvent } =  useContext(CursorContext)

  const handleMouseMove = e => {
    setMousePosition(getRelativeCoordinates(e, cursorAreaRef.current));
  };

  
  // force refresh to recalculate
  useEffect(() => {
    function handleResize() {  router.reload(window.location.pathname)  }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return (
    <StyledAbout      
      className='about-container'
      as={motion.div}
      id="cursor-area" 
      ref={cursorAreaRef}
      onMouseMove={e => handleMouseMove(e)}
      animate={{
        rotateX: mousePosition.centerX * 20,
        rotateY: mousePosition.centerY * 20
      }}
    >
      <Cursor mousePosition={mousePosition} hoverEvent={hoverEvent} />

      <StyledAboutLeftCol>
        <AboutLeftElement roles={roles} sanitizedData={sanitizedData}/>
      </StyledAboutLeftCol>

      <StyledAboutMidCol>
        <StyledSideLines/>
        <AboutMidElement content={content} content_zh={content_zh} sanitizedData={sanitizedData}/>
      </StyledAboutMidCol>

      <StyledAboutRightCol>
        <AboutRightElement credits={credits} sanitizedData={sanitizedData}/>
      </StyledAboutRightCol>
    </StyledAbout>
  )
}

export async function getStaticProps() {  
  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data: data?.data || {}
    }, 
    revalidate: 60    
  }
}


const StyledAbout = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: absolute;
    top: 0;
    padding-top: 80px;
    width:100%;
    height:100vh;
    // height: calc(100vh - 50px);

    color: #000;
    overflow: hidden;

`;

const StyledAboutLeftCol = styled(motion.div)`
    height: 100%;
`;

const StyledAboutMidCol = styled(motion.div)`
    height: 100%;
`;
const StyledAboutRightCol = styled(motion.div)`
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;
`;

const StyledSideLines = styled.div`
    position: absolute;

    width: calc(100vw/16*6*0.96);
    height: 300px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;
