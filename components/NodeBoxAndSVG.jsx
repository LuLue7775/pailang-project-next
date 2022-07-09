import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import NodeExpandArea from './NodeExpandArea';

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};

const genRandomPos = (viewW, topic1, route) => {
    const randomRange = route.startsWith('/article-journal') ? viewW/4 : (viewW - 300)
  /**
   * @TODO on /journal +200 should be viewW/4 
   */
  return topic1?.map((item, i) => {
      return { x: parseInt(Math.random()*randomRange ), y: 200*i }
  })
}
const getWindowDimensions = () => {
  if( typeof window === "undefined") return
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}


function updatePath( draggedIndex, draggedID, allElementsData, nodeRefs, pathRefs, nodePosRefs) { 

    // deal with just tail 
    allElementsData[draggedIndex].connectors?.forEach((lineObj) => {
        const selfHandleIndex = draggedIndex;
        const HandleConnectToID = lineObj.connected_node.toString();
        const HandleConnectToIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === HandleConnectToID) 
        // console.log(HandleConnectToIndex)

        const tailSvgIndex = pathRefs.current?.findIndex((path) =>{ 
            // console.log( path?.getAttribute("id")  , `${topic1[draggedIndex].id }-${HandleConnectToID}`  )
           return path?.getAttribute("id")  === `${draggedID}-${HandleConnectToID}` 
        });

        let x1 = nodePosRefs.current[selfHandleIndex].x ;
        let y1 = nodePosRefs.current[selfHandleIndex].y ;
        let x2 = nodePosRefs.current[HandleConnectToIndex].x ;
        let y2 = nodePosRefs.current[HandleConnectToIndex].y ;
        let data = `M${x1} ${y1} L ${x2} ${y2}`;
        pathRefs.current[tailSvgIndex]?.setAttribute("d", data);
    })

    // // check all head connected svg
    allElementsData?.forEach((elem) => { 
        elem.connectors?.forEach((lineObj) => {
            if ( lineObj.connected_node === draggedID ) {
                const selfHandleIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === draggedID.toString()) 
                const HandleConnectToIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === elem.id.toString()) 

                const headSvgIndex = pathRefs.current.findIndex((path) => path?.getAttribute("id") === `${elem.id}-${draggedID}` );

                let x1 = nodePosRefs.current[selfHandleIndex].x ;
                let y1 = nodePosRefs.current[selfHandleIndex].y ;
                let x2 = nodePosRefs.current[HandleConnectToIndex].x ;
                let y2 = nodePosRefs.current[HandleConnectToIndex].y ;

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[headSvgIndex]?.setAttribute("d", data); 
            }  
        })
    })
  } 

  function initialPath( draggedID, allElementsData, nodeRefs, pathRefs, nodePosRefs) { 
        // // check all head connected svg
        allElementsData?.forEach((elem) => { 
            elem.connectors?.forEach((lineObj) => {
                const selfHandleIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === draggedID.toString()) 
                const HandleConnectToIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === elem.id.toString()) 

                const headSvgIndex = pathRefs.current.findIndex((path) => path?.getAttribute("id") === `${elem.id}-${draggedID}` );

                let x1 = nodePosRefs.current[selfHandleIndex]?.x ;
                let y1 = nodePosRefs.current[selfHandleIndex]?.y ;
                let x2 = nodePosRefs.current[HandleConnectToIndex]?.x ;
                let y2 = nodePosRefs.current[HandleConnectToIndex]?.y ;

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[headSvgIndex]?.setAttribute("d", data); 
                
            })
        })
  }

export default function NodeBoxAndSVG({allElementsData, elementData, node_i, nodeRefs, pathRefs, nodePosRefs}) {
  const router = useRouter()

  const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());
  const [boxPos, setBoxPos] = useState(genRandomPos(windowDimensions?.width, allElementsData,  router.asPath));

  const [isOpen, setOpen] = useState([]);

  const toggleOpen = (id) => {
    if (isOpen.includes(id)) {
      if( isOpen.indexOf(id) > -1 ) setOpen( isOpen => isOpen.splice(id, 1) );
    } else {
      setOpen( isOpen => { return [...isOpen, id] });
    }
  }


    const x = useMotionValue( boxPos[node_i].x )
    const y = useMotionValue(  boxPos[node_i].y )

    useEffect(() => {
        setRefs({x: boxPos[node_i].x, y: boxPos[node_i].y}, nodePosRefs, allElementsData?.length)
    }, [])

    useEffect(() => {
        if ( !nodePosRefs?.current ) return
        initialPath(allElementsData[node_i]?.id, allElementsData, nodeRefs, pathRefs, nodePosRefs)
    }, [nodePosRefs?.current])

    useEffect(() => {
        x.onChange(v => {
            nodePosRefs.current[node_i].x = v
            // update path here. same for y
            updatePath(node_i, allElementsData[node_i]?.id, allElementsData, nodeRefs, pathRefs, nodePosRefs)
        } )
        y.onChange(v => nodePosRefs.current[node_i].y = v )


        /**
         * @TODO unmount listener
         */
    }, [])

    


  return (
    <AnimatePresence>
          <StyledBoxContainer

            style={{ x, y }} 

            // randomx={boxPos[node_i].x}
            borderstyle={elementData?.border_style}
            className='zh'
            key={`box${elementData?.id}` }
            id={elementData?.id}
            ref={elementData => setRefs(elementData, nodeRefs, allElementsData?.length) }
            as={motion.div}

            //   initial={{ x: 0, y:0  }}
            //   animate={{ x: `${boxPos[node_i].x}px`, y: `${boxPos[node_i].y}px`    }}
            //   onAnimationComplete={() => updatePath(node_i, elementData[node_i]?.id, elementData, nodeRefs, pathRefs, containerRef)}

              drag
            //   dragConstraints={containerRef}
            //   dragTransition={{ bounceStiffness: 300, bounceDamping: 10}}
            //   dragElastic={0.5}
              whileTap={{ cursor: "grabbing", zIndex: 10  }}
              dragMomentum={false}
          > 
            <StyledID> {elementData?.id} </StyledID>

         

           <NodeExpandArea id={elementData.id} isOpen={isOpen} toggleOpen={toggleOpen} content={elementData?.content} name={elementData?.content_zh}/>
          </StyledBoxContainer>
        
          <StyledSvgArea className='svg-area' elementAmount={allElementsData?.length}>  
            {
                elementData?.connectors.map((lineObj, i) => 
                <StyledPath 
                    linestyle={lineObj?.border_style}
                    key={`svg-${elementData.id}-${i}`}
                    id={`${elementData.id}-${lineObj.connected_node}`}
                    className={`${elementData.id} path`} 
                    ref={elementData => setRefs(elementData, pathRefs)}
                    />   )   
            }
            </StyledSvgArea>

    </AnimatePresence>
  )
}


const StyledBoxContainer = styled(motion.div)`
    position: absolute;
    height: 120px;
    width: 350px;
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

const StyledPath = styled.path`
    fill: #FFB304;
    stroke: #FFB304;
`

const StyledSvgArea = styled.svg`
    position: absolute;
    top: 60px;
    width: 100%;
    height: ${({elementAmount}) => elementAmount*250  }px;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    z-index:-1;
`