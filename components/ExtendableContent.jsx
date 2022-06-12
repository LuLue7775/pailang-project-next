import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styled from "styled-components"

import {gsap} from 'gsap'
import Flip from 'gsap/dist/Flip'
import Draggable from 'gsap/dist/Draggable'


export default function ExtendableContent( props ) {
    const { boxIndex, id, node, desciption } = props;

    const thisBox = useRef();

    const ref = useRef();
    const q = gsap.utils.selector(ref);
    const [contentSizeLg, setContentSizeLg] = useState(false);
    const [layoutState, setLayoutState] = useState(null);

    const togglecontentSizeLg = () => {
        setContentSizeLg(!contentSizeLg);
        setLayoutState(Flip.getState(q(".thumbnail")));
    };
    useLayoutEffect(() => {
        if (!layoutState) return;

        const flip = Flip.from(layoutState, {
          targets: q(".thumbnail"),
          duration: 0.5,
          scale: true,
          ease: "power1.inOut",
          nested: true,
          absolute: true,
          makeAbsolute: true
        });
    
        return () => {
          flip.kill();
        };
      }, [layoutState]);

      useEffect(() => {
        gsap.registerPlugin(Flip, Draggable);
      }, [])


  return (

    <StyledCompContainer ref={ref} id="box-content" >
         {contentSizeLg ? (
          <ContentLG togglecontentSizeLg={togglecontentSizeLg} {...props}/>
        ) : ( 
          <ContentSm togglecontentSizeLg={togglecontentSizeLg} {...props}/>
         )} 
    </StyledCompContainer>

  )
}

const ContentSm = (props) => {
    const { boxIndex, id, node, desciption, togglecontentSizeLg } = props;

    return (
        <StyledCompSm
            className="thumbnail box-container"
            data-flip-id="1"
            onClick={togglecontentSizeLg}
        >
        {
            node.content.map( (item, i) => 
            node.type === 'text' 
            ? <StyledTextContainer key={i} > 
              {item} 
              </StyledTextContainer>
            : node.type === 'img' 
                ? <StyledImageContainer key={i} className="thumbnail" data-flip-id="1" alt="" src="https://placehold.co/100x100"  {...props}  />
                : 'video'
            )
        }
        <StyledDesc className="desc"> {desciption.map((item, i) => <div key={i} > {item} </div>) }</StyledDesc>
        </StyledCompSm>
    )
  };
  
  const ContentLG = (props) => {
    const { boxIndex, id, node, desciption, togglecontentSizeLg } = props;

    return (
        <StyledCompLg
            className="thumbnail box-container"
            data-flip-id="1"
            onClick={togglecontentSizeLg}
        >
        {
            node.content.map( (item, i) => 
            node.type === 'text' 
            ? <StyledTextContainer key={i} > 
              {item} 
              </StyledTextContainer>
            : node.type === 'img' 
                ? <StyledImageContainer key={i} alt="" src="https://placehold.co/600x600"  {...props}  />
                : 'video'
            )
        }
        </StyledCompLg>
    );
  };

const StyledDesc = styled.div`
    position: absolute; 
    top:100px;
`
const StyledCompContainer = styled.div`
    position: absolute; 
`
const StyledCompSm = styled.div`
    background: blue;
    font-size: 1rem;
    height: 80px;
    width: 300px;
    overflow: hidden;
`
const StyledCompLg = styled.div`
    background:red;
    font-size: 1.5rem;
`
const StyledTextContainer = styled.div`
    &:hover { cursor: pointer; };
`
const StyledImageContainer = styled.img`
    &:hover { cursor: pointer; };
`;

const StyledClickArea = styled.div`
    // width: ${({contentSizeLg}) => contentSizeLg ? '200px': '50px'};
    // transition: width 2s, height 4s;

    width: 50px;
    height: 50px;
    background: ${({ contentSizeLg }) => contentSizeLg ? 'red' : 'blue'};

    &:hover { cursor: pointer; };

    // visibility: ${({ contentSizeLg }) => contentSizeLg ? 'hidden' : ''};
    // display: ${({ contentSizeLg }) => contentSizeLg ? 'none' : ''};
    

`