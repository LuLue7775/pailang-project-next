import { useEffect, useState } from 'react'
import { containerRightMotion, BGMotion, containerTextMotion } from '../utils/framerVariants'
import styled from "styled-components"
import { motion } from 'framer-motion'
import { LineSVGFull } from './Svgs';

export default function AboutRightElement({ credits, sanitizedData }) {
    const [ isHovered, setHovered ] = useState(false);

    // calculate scroll height
    const [ scrollHeight, setScrollHeight ] = useState();
    useEffect(() => {
        setScrollHeight(document.getElementById('mid').scrollHeight  )
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

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            isHovered={isHovered}
        >
            <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />

        { credits?.map(( elem, i ) => (
            <StyledElementContainer 
                className='element-container' 
                key={i}
                as={motion.div}
                variants={containerTextMotion}
            >
                <LineSVGFull /> 
                <StyledTitle> {elem?.title} </StyledTitle>
                <StyledElement 
                    className='credit-ch ' 
                    dangerouslySetInnerHTML={ sanitizedData(elem?.content)}
                /> 

            </StyledElementContainer>
        )) || ""}
    </StyledMidColContainer>
    )
}
const MotionBG = styled(motion.div)`
    position: absolute;
    height: ${({ scrollHeight }) => scrollHeight &&  `${scrollHeight}px`};
    z-index:-1;
    width: 100%;
`;

const StyledMidColContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 30%;
    overflow-y:scroll;
    ${({ isHovered }) =>  isHovered && "background-image: url('/about.jpg')" }    

`;

const StyledElementContainer = styled(motion.div)`

`;
const StyledTitle = styled.div`
    font-size: .5px;
    font-weight: bold;
    margin: 15px 0 15px 0;

`;
const StyledElement = styled.div`
    font-size: .5px;
    
`;
