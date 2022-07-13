import React, { useState, useRef, useContext, useLayoutEffect  } from 'react'
import { CursorContext } from '../../context/cursorContext'
import { getRelativeCoordinates } from '../../utils/functions'
import { useMediaQuery } from '../../utils/hooks'
import VideoPlayer from '../../components/VideoPlayer'
import { UpChevronSVG } from '../../components/Svgs'
import { fetchData, slideTo } from '../../utils/functions'
import Cursor from '../../components/Cursor'

import styled from "styled-components"
import { motion, useSpring } from 'framer-motion'
import DOMPurify from 'isomorphic-dompurify'
import ArticlesHeader from '../../components/ArticlesHeader'

export default function Video({ data }) {
  // console.log(data)

  const isMobile = useMediaQuery('(max-width: 768px)')
  const videoPlayerRef = useRef(null);
  
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

  // chevron
  const spring = useSpring(0, { damping: 100, stiffness: 1000 })
  useLayoutEffect(() => {
      spring.onChange(latest => {
        window.scrollTo(0, latest);
      });
    }, [spring])

  return (
    <StyledContainer      
      className='video-container'
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

      <ArticlesHeader data={data} slideTo={slideTo} spring={spring}/>

      <>
        <StyledChevron 
          onClick={() => slideTo(0, spring)}
          onMouseOver={() => setHoverEvent("expand")}
          onMouseLeave={() => setHoverEvent("default")}  
      >
            <UpChevronSVG/>
        </StyledChevron>

        <StyledVideo id="section2" isMobile={isMobile}>
          <StyledLeftCol 
            className='left-col en' 
            isMobile={isMobile} 
            as={motion.div}
            initial={{ x:"-100%", y:"200px" }}
            animate={{ x: 0, y: 0 }}
            exit={{ y:"200px" }}
            transition={{
              type:"spring",
              stiffness: 360,
              damping: 100,
              duration: 3,
              ease: "easeInOut"
            }}
            >
            <StyledVideoContainer > 
              { data?.video && <VideoPlayer ref={videoPlayerRef} video={data?.video}/>}
            </StyledVideoContainer>
            <StyledLeftText className='left-text' dangerouslySetInnerHTML={ data?.description && sanitizedData(data?.description)} />

          </StyledLeftCol>
          <StyledRightCol 
            className='right-col'
            as={motion.div}
            initial={{ x:"100%", y:"200px" }}
            animate={{ x: 0, y: 0 }}
            exit={{  y:"200px" }}
            transition={{
              type:"spring",
              stiffness: 360,
              damping: 100,
              duration: 3,
              ease: "easeInOut"
            }}
            dangerouslySetInnerHTML={ data?.content && sanitizedData(data?.content)}/>
        </StyledVideo>
      </>
      </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
    const id = params.id;

    const data = await fetchData(`/article-video/${id}`).catch(err => console.error(err) ) 
    return {
      props: { 
          data: data?.data || {},
      },
    };
  }

export async function getStaticPaths() {


    // const id = dataJson.pages.first;
    // console.log(id)
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }, 
            { params: { id: '3' } } 
          ],
        fallback: true
    };
  }

const StyledContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`
  

const StyledVideo = styled.div`
  display: ${({ isMobile }) => isMobile ? "flex" : "grid"};
  flex-direction: column;
  grid-template-columns: 4fr 2fr;
  position: relative;
  width:100vw;
  height:100vh;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;
`;

const StyledChevron = styled.div`
  position: sticky;
  top:0;
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;


const StyledLeftCol = styled(motion.div)`
  position: relative;
  border-right:  ${({ isMobile }) => isMobile ? "" : "1px rgba(250, 170, 50,1)   dashed"} ;
  padding: 20px;
  font-size: .5px;
  color: #000;
  
  height: 100%;
  overflow-y:scroll;
`;
const StyledLeftText = styled.div`
  position: relative;
  height: auto;
  padding: 20px;
`;
const StyledRightCol = styled(motion.div)`
  color: #000;
  padding: 20px;
  
  height: 100%;
  overflow-y:scroll;

  font-size: .5px;
`;


const StyledVideoContainer = styled.div`
height: 450px;
width: 100%;
border-radius: 10px;
background-color: #0000005F;
border: 1px solid rgba(250, 170, 50,1)  ;

`;

