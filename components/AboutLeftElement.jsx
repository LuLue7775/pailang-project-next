import { useEffect, useState } from 'react'
import dataJson from '../dataset.json';
import Image from 'next/image'
import { LineSVGFull } from './Svgs';

import styled from "styled-components";
import { motion } from 'framer-motion'

/**
 * @TODO tweak gradient
 * @TODO apply to other two col
 * @TODO text reflow solution? 
 */

const containerMotion = {
    rest: { x:"0", zIndex:0,  },
    hover: {
        x:"5%", 
        scale:1.1, 
        width:"50%",
        transition: { duration: 1 }, zIndex:10,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }
    },
}

const BGMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
      opacity: 1,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeIn"
      }
    }
  };
  

export default function AboutLeftElement({ roles, parse }) {
    const [ scrollHeight, setScrollHeight ] = useState();
    useEffect(() => {
        setScrollHeight(document.getElementById('left').scrollHeight )
    }, [])
    

  return (
    <StyledLeftColContainer 
        id="left"
        className='leftcol-container'
        as={motion.div}
        variants={containerMotion}
        initial="rest"
        whileHover="hover"
        animate="rest"
    >
    <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />


        { roles?.map(( elem, i ) => (
            <StyledPersonaContainer className='persona-container' key={i}>
                <LineSVGFull />
                <StyledLeftTitle className='persona-title'>
                    <h3> {elem.name} </h3>
                    <h4> {elem.name_zh} </h4>
                </StyledLeftTitle>
                <StyledImgContainer className='persona-img-continer'>
                    <Image className='persona-img' 
                            alt="pailang-persona" 
                            src={elem.cover || "https://via.placeholder.com/300X150.png"}
                            width={300}
                            height={150}
                    /> 
                </StyledImgContainer>
                <StyledPersonaEn className='persona-en en'>
                    {parse(elem.introduction)}
                </StyledPersonaEn>
      

                <StyledPersonaCh className='persona-ch zh'>
                    {parse(elem.introduction_zh)}
                </StyledPersonaCh>

            </StyledPersonaContainer>
        )) || "" }

        
    </StyledLeftColContainer>
  )
}

const MotionBG = styled(motion.div)`
    position: absolute;
    z-index:-1;
    height: ${({ scrollHeight }) => scrollHeight &&  `${scrollHeight}px`};
    width: 100%;
    background-color: #c5b99e;

    background-image:
      radial-gradient(circle farthest-side  at 30% 89%, rgba(250, 170, 50,1) 0px, transparent 50%),
      radial-gradient(circle farthest-corner at 35% 0%, rgba(225, 100, 97,1) 0px, transparent 50%),
      radial-gradient(at 93% 46%, rgba(255, 255, 255,1) 0px, transparent 50%),
      radial-gradient(circle farthest-side  at 23% 49%,rgba(230, 70, 50,1) 0px, transparent 50%),
      radial-gradient(at 17% 27%, rgba(255, 255, 255,1) 0px, transparent 50%),
    //   radial-gradient(at 79% 30%,  rgba(230, 70, 50,1) 0px, transparent 50%),
      radial-gradient(at 26% 40%, hsla(36,65%,63%,1) 0px, transparent 50%);
`;

const MotionSvg = styled(motion.svg)`
  height: 300px;
  width: 300px;
`;
const MotionRect = styled(motion.rect)`
  border-radius: 15px;
`;

const StyledLeftColContainer = styled(motion.div)`
    height: 100%;
    position: absolute;
    
    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

    width: 33%;
`;
const StyledPersonaContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;

`;

const StyledLeftTitle = styled.div`
    padding: 10px;
    font-weight: bold;
    font-size: 1.1rem;
`;
const StyledImgContainer = styled.div`
    padding-left: 10px;
    
`;
const StyledPersonaEn = styled.div`
    padding: 10px;
    font-size:.6rem;
`;
const StyledPersonaCh = styled.div`
    padding: 10px;
    
`;