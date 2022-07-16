import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'

import { motion, AnimatePresence, useMotionValue, useDragControls } from "framer-motion";
import NodeExpandAreaAndName from './NodeExpandAreaAndName';
import { DragHandleSVG } from './Svgs';

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};

const genRandomPos = (viewW, topic1, route) => {
    const randomRange = route.startsWith('/article-journal') 
                      ? viewW/9*4 
                      : route==='/' ? viewW/9*4  : (viewW - 300)
    return topic1?.map((item, i) => {
        return { x: parseInt(Math.random()*randomRange), y: 200*i }
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
        const tailSvgIndex = pathRefs.current?.findIndex((path) =>{ 
           return path?.getAttribute("id")  === `${draggedID}-${HandleConnectToID}` 
        });

        let x1 = nodePosRefs.current[selfHandleIndex].x ;
        let y1 = nodePosRefs.current[selfHandleIndex].y ;
        let x2 = nodePosRefs.current[HandleConnectToIndex].x ;
        let y2 = nodePosRefs.current[HandleConnectToIndex].y ;
        let data = `M${x1} ${y1} L ${x2} ${y2}`;
        pathRefs.current[tailSvgIndex]?.setAttribute("d", data);
    })

    // check all head connected svg
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
        // check all head connected svg
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

export default function NodeBoxAndSVG({ allElementsData, elementData, node_i, nodeRefs, pathRefs, nodePosRefs }) {
    const router = useRouter()

    const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());
    const [boxPos, setBoxPos] = useState(genRandomPos(windowDimensions?.width, allElementsData,  router.asPath));
    const [isOpen, setOpen] = useState([]);
    const [tooltip, setTooltip] = useState(false);
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
    }, [elementData?.connectors])

    useEffect(() => {
        x.onChange(v => {
            nodePosRefs.current[node_i].x = v
            // update path here. same for y
            updatePath(node_i, allElementsData[node_i]?.id, allElementsData, nodeRefs, pathRefs, nodePosRefs)
        } )
        y.onChange(v => nodePosRefs.current[node_i].y = v )

    }, [])

  return (
    <AnimatePresence>
      <StyledBoxContainer
        style={{ x, y }} 
        borderstyle={elementData?.border_style}
        className='zh'
        key={`box${elementData?.id}` }
        id={elementData?.id}
        ref={elementData => setRefs(elementData, nodeRefs, allElementsData?.length) }
        as={motion.div}
        whileTap={{ cursor: "grabbing", zIndex: 10  }}
        drag
        dragMomentum={false}
        hasContent={elementData?._value ? true : false}
      > 
        <StyledDot />
        <StyledHandle hasContent={elementData?._value ? true : false}>
          <DragHandleSVG/>
        </StyledHandle>
        
        <NodeExpandAreaAndName 
          id={elementData?.id} 
          isOpen={isOpen} 
          toggleOpen={toggleOpen} 
          content={elementData?._value} 
          type={elementData?.type} 
          source={elementData?.source}
        />
        
        <StyledName 
          hasContent={elementData?._value ? true : false } 
          hasSource={elementData?.source ? true : false}
          isOpen={isOpen}
        > 
          <div 
            onClick={ () => elementData?.source && window.open(elementData?.source) }
            onMouseOver={ () => setTooltip(true)}
            onMouseLeave={ () => setTooltip(false)}
          >  
            <div>  {elementData?.name} </div>
            <div>  {elementData?.name_zh} </div>     
            { tooltip && elementData?.source && 
              <StyledTooltip> view source </StyledTooltip> 
            }   
            
          </div> 
        </StyledName>
      </StyledBoxContainer>

    
      <StyledSvgArea className='svg-area' elementAmount={allElementsData?.length}>  
        { elementData?.connectors.map((lineObj, i) =>         
          <StyledPath 
              linestyle={lineObj?.border_style}
              key={`svg-${elementData?.id}-${i}`}
              id={`${elementData?.id}-${lineObj.connected_node}`}
              className={`${elementData.id} path`} 
              ref={elementData => setRefs(elementData, pathRefs)}
              strokeDasharray= { 
                lineObj?.line_style === "dashed" 
                ? "10, 10"
                : lineObj?.line_style === "dotted" ? "2, 2" : "0, 0" 
              }
              />   )   }
      </StyledSvgArea>

    </AnimatePresence>
  )
}



const StyledBoxContainer = styled(motion.div)`
    position: absolute;

    height: ${({ hasContent }) => hasContent ? "120px": "0"} ;
    width: 280px;
    display: flex;
    justify-content: center;
    overflow-wrap: break-word;
    color: #FFF;
    background-color: #000;
    
    ${({ hasContent }) => hasContent ? "border: 1px solid rgba(250, 170, 50,1);": ""}
    border-radius: ${({ borderstyle }) => borderstyle === "oval" ? "50px": "5px"};
    cursor: grab;
  `;
  
const StyledDot = styled(motion.div)`
    position: absolute;
    left: -3px;
    top: 57px;
    height: 5px;
    width: 5px;
    background-color: rgba(250, 170, 50,1);
`;

const StyledHandle = styled(motion.div)`
    position: absolute;
    left: 5px;
    top: ${({ hasContent }) => hasContent && "0"};
    bottom:0;
    opacity: ${({ hasContent }) => !hasContent && 0};
    margin: auto 0;
    height: 50px;
    width: 15px;
    border-radius: 5px;
`;

const StyledName = styled(motion.div)`
    position: absolute;
    top: ${({ hasContent }) => hasContent ? "100px": "10px"} ;
    left: 10px;
    padding-top: 20px;
    padding-left: ${({ hasContent }) => hasContent ? "0px": "30px"} ;
    color:#000;
    z-index: ${({ isOpen }) => isOpen ? -1 : 2} ;
    cursor: ${({ hasSource }) => hasSource ? "pointer": "none"} ;;
`;


const StyledPath = styled.path`
    fill: rgba(250, 170, 50,1)  ;
    stroke: rgba(250, 170, 50,1)  ;
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
const StyledTooltip = styled.div`
    position: relative;
    top:10px;
    left: 10px;
    height: 1.5rem;
    width: 120px;
    display: flex;
    justify-content: center;
    background-color: rgba(250, 170, 50,.6);
    border-radius: 10px;

    &:after {
      border-right: solid 10px transparent;
      border-left: solid 10px transparent;
      border-bottom: solid 10px  rgba(250, 170, 50,.6);
      transform: translateX(-50%);
      position: absolute;
      z-index: -1;
      content: "";
      bottom: 100%;
      left: 50%;
      height: 0;
      width: 0;
    }
  `;