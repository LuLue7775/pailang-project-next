import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

import styled from "styled-components"
import { motion } from "framer-motion";
import ReactPlayer from "react-player/lazy";

const expand = {
    open: () => 
    ({
      width:'400px',
      height:'400px',
      backgroundColor:'#eb8334',
      transition: {
        type: "spring",
        stiffness: 20,
      }
    }),
    closed: {
      width:'300px',
      height:'120px',
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };
  
  const parseContent = (type, content, isOpen, isWindow) => {
    // console.log(content)
    if (type === 'text') {
      return content
    } else if ( type === 'image' ) {
      return (
        <Image 
          alt="" 
          width={isOpen ? "100%" :  "300px"}
          height={isOpen ? "100%" :  "200px"}
          src={ content }
          layout={isOpen ? "responsive" :  "intrinsic"}
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
          />}
        </>
      )
    }

  }

  
export default function NodeExpandAreaAndName({ id, isOpen, toggleOpen, content, type, name, name_zh, source}) {
  const expandRef = useRef()

  const [isWindow, setWindow] = useState(false);
  useEffect(() => {
    setWindow(true);      
  }, [])

  return (
    <>
    <StyledExpandContainer
        as={motion.div}
        initial={false}
        animate={isOpen.includes(id) ? "open" : "closed"}
    >
       
        <StyledExpand as={motion.div} onClick={() => expandRef.current?.scrollHeight > 120 && toggleOpen(id) } variants={expand} isOpen={isOpen.includes(id)} ref={expandRef} >
          {content && parseContent(type, content, isOpen.includes(id), isWindow   ) } 
          {source && 
            <div onClick={ () => window.open(source) }>  view source </div>
          }
        </StyledExpand>
        
    </StyledExpandContainer>
    <StyledName> 
      <div>  {name} </div>
      <div>  {name_zh} </div>      
    </StyledName>
    </>
)
}

const StyledExpandContainer = styled(motion.div)`
  height: 120px;
  width: 300px;
  z-index:1;
`;

const StyledExpand = styled(motion.div)`
  width:300px;
  overflow: hidden;
  padding:${({ isOpen }) => isOpen ? "20px" : "0 20px" };;
  margin: 10px;
  background-color: #000;
  overflow-y: ${({ isOpen }) => isOpen ? "scroll" : "hidden" };
  ::-webkit-scrollbar { width: 0; }
  scrollbar-width: none; /* Firefox */


`;
const StyledName = styled(motion.div)`
  position: absolute;
  top:100px;
  padding-top: 40px;
  color:#000;
  z-index:-1;
`;
