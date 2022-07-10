import React, { useState, useEffect } from 'react'
import styled from "styled-components"

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import NodeExpandArea from './NodeExpandArea';
const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};

const genRandomPos = (viewW, topic1) => {
  /**
   * @TODO on /journal +200 should be viewW/4 
   */
  return topic1?.map((item, i) => {
      return { x: parseInt(Math.random()*viewW -300) +200, y: 65*i }
  })
}
const getWindowDimensions = () => {
  if( typeof window === "undefined") return
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function NodeBoxesContainer({elementsData, nodeRefs, pathRefs, containerRef, updatePath}) {
  const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());
  const [boxPos, setBoxPos] = useState(genRandomPos(windowDimensions?.width, elementsData));

  const [isOpen, setOpen] = useState([]);

  const toggleOpen = (id) => {
    if (isOpen.includes(id)) {
      if( isOpen.indexOf(id) > -1 ) setOpen( isOpen => isOpen.splice(id, 1) );
    } else {
      setOpen( isOpen => { return [...isOpen, id] });
    }
  }

  useEffect(() => {
    
    /**
     * @TODO here initialize nodeRefs position (call updatePath after gen random pos)
     */
     nodeRefs.current?.forEach((node, node_i) => {
        updatePath(node_i, elementsData[node_i]?.id, elementsData, nodeRefs, pathRefs, containerRef)
     })
}, [])



  return (
    <AnimatePresence>
    {
        elementsData?.map((elem, node_i) => 
        
          <StyledBoxContainer
              borderstyle={elem?.border_style}
              className='zh'
              key={`box${elem.id}` }
              id={elem.id}
              ref={elem => setRefs(elem, nodeRefs, elementsData.length)}
              as={motion.div}

              initial={{ x: 0, y:0  }}
              animate={{ x: `${boxPos[node_i].x}px`, y: `${boxPos[node_i].y}px`    }}
              onAnimationComplete={() => updatePath(node_i, elementsData[node_i]?.id, elementsData, nodeRefs, pathRefs, containerRef)}

              drag
              dragConstraints={containerRef}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 10}}
              dragElastic={0.5}
              whileTap={{ cursor: "grabbing", zIndex: 10  }}
              dragMomentum={false}
              onDrag={() => updatePath(node_i, elementsData[node_i]?.id, elementsData, nodeRefs, pathRefs, containerRef) }
          > 
            <StyledID> {elem.id} </StyledID>

           <NodeExpandArea id={elem.id} isOpen={isOpen} toggleOpen={toggleOpen} content={elem?.content} name={elem?.content_zh}/>

          </StyledBoxContainer>

        
        )
    }
    </AnimatePresence>
  )
}


const StyledBoxContainer = styled(motion.div)`
    position: relative;
    height: 120px;
    max-width: 350px;
    padding-left: 10px; 
    overflow-wrap: break-word;
    color: #FFF;
    background-color: #000;
    border: 1px solid #FFB304;
    border-radius: ${({ borderstyle }) => borderstyle === "oval" ? "50px": "5px"};
  `;

const StyledID = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: -15px;
  color: #FFB304;
`;
