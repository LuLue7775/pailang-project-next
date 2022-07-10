import React, { useState, useRef, useEffect, useLayoutEffect  } from 'react'
import useMediaQuery from '../../utils/hooks';
import VideoPlayer from '../../components/VideoPlayer';
import { UpChevronSVG } from '../../components/Svgs';
import { fetchData } from '../../utils/functions';

import styled from "styled-components";
import { motion, useSpring } from 'framer-motion'

import parse from 'html-react-parser';
import ArticlesHeader from '../../components/ArticlesHeader';

export default function Video({ data }) {
  // console.log(data)

  const isMobile = useMediaQuery('(max-width: 768px)');

  const videoPlayerRef = useRef(null);

  const spring = useSpring(0, { damping: 100, stiffness: 1000    });

  function slideTo(to) {
    spring.set(window.pageYOffset, false);
    setTimeout(() => {
      spring.set(to);
    }, 50);
  }
  
  useLayoutEffect(() => {
      spring.onChange(latest => {
        window.scrollTo(0, latest);
      });
    }, [spring]);


  return (
    <StyledContainer>
      <ArticlesHeader data={data} slideTo={slideTo}/>

      <>
        <StyledChevron onClick={() => slideTo(0)}> 
            <UpChevronSVG/>
        </StyledChevron>
        <StyledVideo id="section2" isMobile={isMobile}>

          <StyledLeftCol 
            className='left-col' 
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
            <StyledLeftText className='left-text'>
            { data?.description && parse(data?.description) }
              {/* <div dangerouslySetInnerHTML={createMarkup()} />; */}

            </StyledLeftText>
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
            >
            { data?.content && parse(data?.content) }
          </StyledRightCol>
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
  border-right:  ${({ isMobile }) => isMobile ? "" : "1px #FFB304 dashed"} ;
  padding: 20px;
  font-size: .5px;
  color: #000;
  
  height: 100%;
  overflow-y:scroll;
  ::-webkit-scrollbar { width: 0; }
  scrollbar-width: none; /* Firefox */


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
  ::-webkit-scrollbar { width: 0; }
  scrollbar-width: none; /* Firefox */
  
  font-size: .5px;
`;


const StyledVideoContainer = styled.div`
height: 450px;
width: 100%;
border-radius: 10px;
background-color: #0000005F;
border: 1px solid #FFB304;

`;

