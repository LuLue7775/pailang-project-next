import { useRef, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { CursorContext } from '../context/cursorContext'

import styled from "styled-components"
import { motion } from "framer-motion";
import ReactPlayer from "react-player/lazy";

const expand = {
    open: () => 
    ({
      width:'300px',
      height:'300px',
      backgroundColor:'#eb8334',
      transition: {
        type: "spring",
        stiffness: 20,
      }
    }),
    closed: {
      width:'250px',
      height:'100px',
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };
  
  const parseContent = (type, content, isWindow) => {
    if (type === 'text') {
      return content || ''
    } else if ( type === 'image' ) {
      return (
       content &&
         <Image 
          alt="" 
          width="100%"
          height="100%"
          src={ content }
          layout="responsive"
          crossOrigin="true"
        />
      
      )
    }  else if ( type === 'video' ) {
      return ( 
        <>
          {isWindow && <ReactPlayer 
            id="react-player"
            url={content}
            className='react-player'
            width='100%'
            height='100%'
            volume={0.8}
            controls={false}

          />}
        </>
      )
    }

  }

  
export default function NodeExpandAreaAndName({ id, isOpen, toggleOpen, content, type }) {
  const expandRef = useRef()
  const { hoverEvent, setHoverEvent } =  useContext(CursorContext)

  const [isWindow, setWindow] = useState(false);
  useEffect(() => {
    setWindow(true);      
  }, [])

  return (
      <StyledExpandContainer
          as={motion.div}
          initial={false}
          animate={isOpen.includes(id) ? "open" : "closed"}
          onMouseOver={() => setHoverEvent("expand")}
          onMouseLeave={() => setHoverEvent("default")}  
      >     
          <StyledExpand 
            ref={expandRef} 
            as={motion.div} 
            onClick={() => expandRef.current?.scrollHeight > 100 && toggleOpen(id) } 
            variants={expand} 
            isOpen={isOpen.includes(id)} 
            hasContent={content}
          >
            { parseContent(type, content, isWindow ) } 
          </StyledExpand>
      </StyledExpandContainer>
)
}

const StyledExpandContainer = styled(motion.div)`
  height: 100px;
  width: 250px;
  z-index:1;
  cursor: pointer;
`;

const StyledExpand = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  margin: 10px 10px 0 10px;
  background-color: ${({ hasContent }) => hasContent ? "#000" : "transparent"};;
  overflow-y: ${({ isOpen }) => isOpen ? "scroll" : "hidden" };
`;
