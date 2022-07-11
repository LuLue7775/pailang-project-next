import { useEffect, useState } from 'react'
import { containerRightMotion, BGMotion } from '../utils/framerVariants'
import styled from "styled-components"
import { motion } from 'framer-motion'
import { LineSVGFull } from './Svgs';

export default function AboutRightElement({ credits, parse }) {
    const [ scrollHeight, setScrollHeight ] = useState();
    useEffect(() => {
        setScrollHeight(document.getElementById('right').scrollHeight )
    }, [])
    
    return (
        <StyledMidColContainer 
            className='leftcol-container zh'
            id="right"
            as={motion.div}
            variants={containerRightMotion}
            initial="rest"
            whileHover="hover"
            animate="rest"    
        >
            <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />

        { credits?.map(( elem, i ) => (
            <StyledElementContainer className='element-container' key={i}>
                <LineSVGFull /> 
                <StyledTitle> {elem.title} </StyledTitle>
                <StyledElement className='persona-ch '>
                   { parse(elem.content) }
                </StyledElement>

            </StyledElementContainer>
        )) || ""}
    </StyledMidColContainer>
    )
}
const MotionBG = styled(motion.div)`
    position: absolute;
    z-index:-1;
    height: ${({ scrollHeight }) => scrollHeight &&  `${scrollHeight}px`};
    width: 100%;
    background-color: #fff;

    background-image:
      radial-gradient(circle farthest-side at 10% 89%, rgba(250, 170, 50,1) 0px, transparent 50%),
      radial-gradient(circle farthest-corner at 35% 0%,  rgba(250, 97, 55,1) 0px, transparent 50%),
      radial-gradient(at 93% 46%, rgba(255, 255, 255,1) 0px, transparent 50%),
      radial-gradient(circle farthest-side  at 23% 49%,rgba(247, 138, 119,1) 0px, transparent 50%),
      radial-gradient(at 17% 27%, rgba(255, 255, 255,1) 0px, transparent 50%),
      radial-gradient(at 79% 30%,  rgba(230, 70, 50,1) 0px, transparent 50%),
      radial-gradient(at 26% 40%, hsla(36,65%,63%,1) 0px, transparent 50%);
`;

const StyledMidColContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 33%;
    padding: 20px;
    overflow-y:scroll;
`;

const StyledElementContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;
`;
const StyledTitle = styled.div`
    font-size: .5px;
    font-weight: bold;
    margin: 15px 0 15px 0;

`;
const StyledElement = styled.div`
    font-size: .5px;
    
`;
