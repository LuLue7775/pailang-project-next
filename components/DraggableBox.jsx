import React, { useRef, useState } from 'react'
import styled from "styled-components";

import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

import { Flipper, Flipped } from 'react-flip-toolkit'

const setPos = [
    { x: 250, y: 0 }, 
    { x: -250, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 200 },
    { x: -250, y: 250 },  //5
    { x: 250, y: 300 },
    { x: -250, y: 350 },
    { x: -250, y: 500 },
    { x: -250, y: 600 },
    { x: 250, y: 550 },  //10
    { x: 250, y: 0 }, 
    { x: -250, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 200 },
    { x: 100, y: 400 },  
    { x: -250, y: 500 },
    { x: 250, y: 600 },
    { x: -250, y: 700 },
    { x: 250, y: 800 },
    { x: -250, y: 900 }, //20
    
  ]

const  DraggableBox = ({boxIndex, id, node, desciption, elemPos = { x: 100, y: 100 } }) => {
    const updateXarrow = useXarrow();
    const posRef = useRef();

    const [fullScreen, setFullScreen] = useState(false);
    const toggleFullScreen = () => setFullScreen(prevState => !prevState);


    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} ref={posRef}
            // position={setPos[boxIndex]}
            defaultPosition = {setPos[boxIndex]}
        >
            <StyledBoxContainer className="box-container" id={id} fullScreen={fullScreen}>
                <Flipper flipKey={fullScreen}>
                    <Flipped flipId="square">
                        <StyledBox 
                            className={fullScreen ? "full-screen-square" : "square"}
                            onClick={toggleFullScreen}
                            fullScreen={fullScreen}
                        >
                        <p>{id}</p>
                        {node.content.map( (item, i) => 
                            node.type === 'text' 
                            ? <div key={i}> {item} </div>
                            : <StyledImageContainer> img/video</StyledImageContainer>)}
                        </StyledBox>
                    </Flipped>
                </Flipper>


                { desciption?.length && 
                    desciption.map( (item, i) => (
                        <StyledBoxDesc key={i}>
                            {item} 
                        </StyledBoxDesc>
                    ))
                }
            </StyledBoxContainer>
        </Draggable>
    );
};
export default DraggableBox;

const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: auto;
    width: auto;
    max-width: 380px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};

`;
const StyledBox = styled.div`
    position: relative;
    // position: ${({fullScreen}) => ( fullScreen ? 'absolute' : 'relative')};
    top: ${({fullScreen}) => ( fullScreen ? 0 : '')};
    left: ${({fullScreen}) => ( fullScreen ? 0 : '')};
    width: ${({fullScreen}) => ( fullScreen ? '50vw' : '')};
    height: ${({fullScreen}) => ( fullScreen ? '50vh' : '')};

    border: grey solid 1px; 
    border-radius: 10px; 
    padding:  10px; 
    background-color: #000;
    color: #FFF;
    
    cursor: grab;


`;

const StyledBoxDesc = styled.div`
    color: #fff;
    font-size:5px;
    
`;
const StyledImageContainer = styled.div`
    background: #FFF;
    width: 200px;
    height: 100px;
    color: #000;
`;