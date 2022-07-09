import React from 'react'

import styled from "styled-components"
import { motion } from "framer-motion";

const expand = {
    open: (height = 500) => 
    ({
      // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      width:'300px',
      height:'auto',
      backgroundColor:'#eb8334',
      transition: {
        type: "spring",
        stiffness: 20,
        // restDelta: 2
      }
    }),
    closed: {
      // clipPath: "circle(30px at 40px 40px)",
      width:'300px',
      height:'80px',

      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };
  

  
export default function NodeExpandArea({ id, isOpen, toggleOpen, content, name}) {
  return (
    <>
    <StyledExpandContainer
        as={motion.div}
        initial={false}
        animate={isOpen.includes(id) ? "open" : "closed"}
    >
        <StyledExpand as={motion.div} onClick={() => toggleOpen(id) } variants={expand}>
        {content}
        </StyledExpand>
        
    </StyledExpandContainer>
    <StyledName> {name} </StyledName>
    </>
)
}

const StyledExpandContainer = styled(motion.div)`
  width:300px;
  overflow: hidden;
  z-index:1;
`;
const StyledExpand = styled(motion.div)`
  width:300px;
  overflow: hidden;
  padding: 0 20px;
  margin: 10px;
  background-color: #000;

`;
const StyledName = styled(motion.div)`
  position: absolute;
  top:100px;
  padding-top:20px;
  color:#000;
  z-index:-1;
`;
