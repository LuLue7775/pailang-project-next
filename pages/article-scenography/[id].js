import { useLayoutEffect, useRef, useState, useContext } from "react";
import { CursorContext } from "../../context/cursorContext"
import Cursor from "../../components/Cursor"
import { getRelativeCoordinates } from "../../utils/functions"
import { motion } from "framer-motion";
import styled from "styled-components";
import NodesContainer from '../../components/NodesContainer';
import ArticlesHeader from '../../components/ArticlesHeader';
import { UpChevronSVG } from "../../components/Svgs";
import { fetchData, slideTo } from '../../utils/functions';

import { useSpring } from "framer-motion";


export default function Scenography({ data }) {
    // Cursor efffect
    const cursorAreaRef = useRef()
    const [mousePosition, setMousePosition] = useState({})
    const { hoverEvent, setHoverEvent } =  useContext(CursorContext)

    const handleMouseMove = e => {
      setMousePosition(getRelativeCoordinates(e, cursorAreaRef.current));
    };

    const spring = useSpring(0, { damping: 100, stiffness: 1000    });
    useLayoutEffect(() => {
        spring.onChange(latest => {
          window.scrollTo(0, latest);
        });
      }, [spring]);

  return (
    <StyledContainer
      className='scenography-container'
      as={motion.div}
      id="cursor-area" 
      ref={cursorAreaRef}
      onMouseMove={e => handleMouseMove(e)}
      animate={{
        rotateX: mousePosition.centerX * 20,
        rotateY: mousePosition.centerY * 20
      }}
    >
      <Cursor mousePosition={mousePosition} hoverEvent={hoverEvent}/>
        <ArticlesHeader data={data} slideTo={slideTo} spring={spring}/>
        <div>
          <StyledChevron 
            onClick={() => slideTo(0, spring)}
            onMouseOver={() => setHoverEvent("expand")}
            onMouseLeave={() => setHoverEvent("default")}  
         > 
            <UpChevronSVG/>
          </StyledChevron>

          <NodesContainer data={data} slideTo={slideTo}/>
        </div>
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
    const id = params.id;

    const data = await fetchData(`/article-scenography/${id}`).catch(err => console.error(err) ) 

    return {
      props: { 
          data: data?.data || {},
      },
      revalidate: 60
    };
  }

export async function getStaticPaths() {

    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }, 
            { params: { id: '3' } }, 
            { params: { id: '4' } }, 
            { params: { id: '5' } }, 
            { params: { id: '6' } }, 
          ],
        fallback: 'blocking'
    };
  }


const StyledContainer = styled.div`
    height: 200vh;
    width: 100%;
    overflow: hidden;
`

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
