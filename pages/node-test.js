import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import NodeBoxesContainer from '../components/NodeBoxesContainer'
import NodeBoxAndSVG from '../components/NodeBoxAndSVG'

import { motion } from "framer-motion";
import styled from "styled-components";

function updatePath( draggedIndex, draggedID, topic1, nodeRefs, pathRefs, containerRef) { 

    // deal with just tail 
    topic1[draggedIndex].connectors?.forEach((lineObj) => {
        const selfHandleIndex = draggedIndex;
        const HandleConnectToID = lineObj.connected_node.toString();
        const HandleConnectToIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === HandleConnectToID) 
        // console.log(HandleConnectToIndex)

        const tailSvgIndex = pathRefs.current?.findIndex((path) =>{ 
            // console.log( path?.getAttribute("id")  , `${topic1[draggedIndex].id }-${HandleConnectToID}`  )
           return path?.getAttribute("id")  === `${draggedID}-${HandleConnectToID}` 
        });

        let x1 = nodeRefs.current[selfHandleIndex]?.getBoundingClientRect().x + nodeRefs.current[draggedIndex].offsetWidth;
        let y1 = nodeRefs.current[selfHandleIndex]?.getBoundingClientRect().y + containerRef.current.slideTop; // title height
        let x2 = nodeRefs.current[HandleConnectToIndex]?.getBoundingClientRect().x ;
        let y2 = nodeRefs.current[HandleConnectToIndex]?.getBoundingClientRect().y + containerRef.current.slideTop; // title height
        let data = `M${x1} ${y1} L ${x2} ${y2}`;
        pathRefs.current[tailSvgIndex]?.setAttribute("d", data);

    })

    // // check all head connected svg
    topic1?.forEach((elem) => { 
        elem.connectors?.forEach((lineObj) => {
            if ( lineObj.connected_node === draggedID ) {
                const selfHandleIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === draggedID.toString()) 
                const HandleConnectToIndex = nodeRefs.current?.findIndex( handle =>  handle?.getAttribute("id") === elem.id.toString()) 

                const headSvgIndex = pathRefs.current.findIndex((path) => path?.getAttribute("id") === `${elem.id}-${draggedID}` );

                let x1 = nodeRefs.current[HandleConnectToIndex].getBoundingClientRect().x + nodeRefs.current[draggedIndex].offsetWidth;
                let y1 = nodeRefs.current[HandleConnectToIndex].getBoundingClientRect().y  + containerRef.current.slideTop; // title height
                let x2 = nodeRefs.current[selfHandleIndex].getBoundingClientRect().x ;
                let y2 = nodeRefs.current[selfHandleIndex].getBoundingClientRect().y  + containerRef.current.slideTop; // title height

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[headSvgIndex]?.setAttribute("d", data); 
            }  
        })
    })

  } 


export default function NodeTest({ data }) {

    const containerRef = useRef(null);
    const nodeRefs = useRef([]);
    const pathRefs = useRef([]);
    const nodePosRefs = useRef([]);


  return (
    
    <StyledContainer as={motion.div} ref={containerRef} element_amount={data?.nodes?.length}>
        {/* <NodeSVGsContainer elementsData={data?.nodes} pathRefs={pathRefs}/>
        <NodeBoxesContainer elementsData={data?.nodes} nodeRefs={nodeRefs} pathRefs={pathRefs} containerRef={containerRef} updatePath={updatePath} /> */}
        {
            data?.nodes?.map((elementData, node_i) =>  
                <NodeBoxAndSVG
                    key={`box${elementData?.id}` }
                    allElementsData={data?.nodes} 
                    elementData={elementData} 
                    node_i={node_i}
                    nodeRefs={nodeRefs} 
                    pathRefs={pathRefs} 
                    nodePosRefs={nodePosRefs}
                    containerRef={containerRef} 
                    updatePath={updatePath}
                />
            )
        }
    </StyledContainer>
  )
}

export async function getStaticProps({ params }) {
    // const id = params.id;

    const DIRECTUS_API = process.env.DIRECTUS
    
    const fetchData = async( route ) => {
        const res = await fetch(`${ DIRECTUS_API + route }`, {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }
        })
        const resJson = await res.json()
        
        if ( resJson.errors ) throw resJson.errors
        return resJson
    }

    const data = await fetchData(`/article-scenography/6`).catch(err => console.error(err) ) 

    return {
      props: { 
          data: data?.data || {},
      },
    };
  }

// export async function getStaticPaths() {

//     return {
//         paths: [
//             { params: { id: '1' } },
//             { params: { id: '2' } }, 
//             { params: { id: '3' } } 
//           ],
//         fallback: true
//     };
//   }


const StyledContainer = styled(motion.div)`
    position: relative;
    width:100%;
    // height:80vh;
    height: ${({element_amount}) => element_amount*250  }px;  
    overflow: hidden;
    // background-color: #ffffffa0;
`;
