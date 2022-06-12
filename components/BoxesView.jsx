import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styled from "styled-components"
import dataJson from '../dataset.json';
import BoxesContainer from './BoxesContainer';
import SVGsContainer from './SVGsContainer';

import {gsap} from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'


/**
 * @TODO topic1 will be dynamic in NextJS from route param.
 */

const genRandomPos = (viewW, topic1) => {
    return topic1?.map((item, i) => {
        return { x: Math.random()*viewW, y: 65*i }
    })
}

const getWindowDimensions = () => {
    if( typeof window === "undefined") return
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

function initialPath(topic1, handleRefs, pathRefs) {
    let pathIndex = 0;
    topic1?.forEach((elem, i) => { 
        elem.connectTail && elem.connectTo.forEach((line, j) => {
            const boxConnectTo = parseInt(line);
            
            let x1 = handleRefs.current[i].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
            let y1 = handleRefs.current[i].getBoundingClientRect().y -250; // title height
            let x2 = handleRefs.current[boxConnectTo].getBoundingClientRect().x ;
            let y2 = handleRefs.current[boxConnectTo].getBoundingClientRect().y -250; // title height

            let data = `M${x1} ${y1} L ${x2} ${y2}`;
            pathRefs.current[pathIndex++].setAttribute("d", data);
        })
    })                
}

function updatePath( i, boxId, topic1, handleRefs, pathRefs, canvasRef) { 
    // deal with just tail 
    topic1[i].connectTo.forEach((lineObj, j) => {
        const boxConnectTo = parseInt(lineObj);
        const boxTailIndex = pathRefs.current.findIndex((path) => path.getAttribute("id") === `${boxId}-${j}` );

        let x1 = handleRefs.current[i].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
        let y1 = handleRefs.current[i].getBoundingClientRect().y -250 +canvasRef.current.scrollTop; // title height
        let x2 = handleRefs.current[boxConnectTo].getBoundingClientRect().x ;
        let y2 = handleRefs.current[boxConnectTo].getBoundingClientRect().y -250 +canvasRef.current.scrollTop; // title height
        let data = `M${x1} ${y1} L ${x2} ${y2}`;
        pathRefs.current[boxTailIndex].setAttribute("d", data);

    })

    // check all connected svg
    topic1?.forEach((elem, connectedIndex) => { 
        elem.connectTo?.forEach((lineObj, j) => {
            if ( lineObj === boxId ) {
                const boxTailIndex = pathRefs.current.findIndex((path) => path?.getAttribute("id") === `${connectedIndex}-${j}` );

                let x1 = handleRefs.current[connectedIndex].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
                let y1 = handleRefs.current[connectedIndex].getBoundingClientRect().y -250 +canvasRef.current.scrollTop; // title height
                let x2 = handleRefs.current[i].getBoundingClientRect().x ;
                let y2 = handleRefs.current[i].getBoundingClientRect().y -250 +canvasRef.current.scrollTop; // title height

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[boxTailIndex]?.setAttribute("d", data); 
            }  
        })
    })

  }

export default function BoxesView({ canvasRef }) {
    const { topic1 } = dataJson?.homePage?.rightCol;
    const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());
    const [boxPos, setBoxPos] = useState(genRandomPos(windowDimensions?.width, topic1));

    const handleRefs = useRef([]);
    const pathRefs = useRef([]);

    /**
     * @TODO force refresh on page resize?
     */
    useEffect(()=> {
        gsap.registerPlugin(InertiaPlugin)
        gsap.registerPlugin(Draggable)

        // window.addEventListener('resize', () => setWindowDimensions(getWindowDimensions()));
        // return () => window.removeEventListener('resize', () => setWindowDimensions(getWindowDimensions()));
    }, [])

    useLayoutEffect(() => {
        topic1?.forEach((elem, i) => { 
            gsap.set(handleRefs.current[i],  boxPos[i] ); 
        })
        initialPath(topic1, handleRefs, pathRefs);
      }, [])


    useEffect(() => {
        handleRefs.current?.forEach((elem, i) => {
            Draggable.create(elem, {
                trigger:  elem,
                cursor: "grab",
                // bounds: "#box-container",
                bounds: {top:0, left:0, width:windowDimensions.width, height:topic1.length*300},
                edgeResistance: 0.65,
                inertia: true,
                onDrag: () => updatePath(i, topic1[i]?.id, topic1, handleRefs, pathRefs, canvasRef), // check if tail exist first
                throwProps: true,
                onThrowUpdate: () => updatePath(i, topic1[i]?.id, topic1, handleRefs, pathRefs, canvasRef), // check if tail exist first
            })
        })
    }, [])
    
    const detailRef = useRef();

  return (
    <StyledBoxesContainer id="box-container" className='box-container' elementAmount={topic1.length} >
        <SVGsContainer elementsData={topic1} pathRefs={pathRefs}/>
        <BoxesContainer elementsData={topic1} handleRefs={handleRefs} detailRef={detailRef}/>
    </StyledBoxesContainer>
  )
}


const StyledBoxesContainer = styled.div`
    position: relative;
    width: 100%;
    // height: 100%;  
    height: ${({elementAmount}) => elementAmount*250  }px;  
    overflow: hidden;
`;
