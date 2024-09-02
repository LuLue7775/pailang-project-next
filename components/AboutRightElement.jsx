import { useEffect, useState } from 'react'
import { containerRightMotion, BGMotion, containerTextMotion } from '../utils/framerVariantsAbout'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LineSVGFull } from './Svgs'

export default function AboutRightElement({ credits, createMarkup }) {
  const [isHovered, setHovered] = useState(false)

  // calculate scroll height
  // const [scrollHeight, setScrollHeight] = useState()
  // useEffect(() => {
  //   setScrollHeight(document.getElementById('mid').scrollHeight)
  // }, [])

  return (
    <StyledRightColContainer
    // className="leftcol-container"
    // id="right"
    // as={motion.div}
    // variants={containerRightMotion}
    // initial="rest"
    // whileHover="hover"
    // animate="rest"
    // onMouseEnter={() => setHovered(true)}
    // onMouseLeave={() => setHovered(false)}
    // $isHovered={isHovered}
    >
      {/* <MotionBG variants={BGMotion} scrollHeight={scrollHeight} /> */}

      {credits?.map((elem, i) => (
        <StyledContainer className="element-container" key={i} variants={containerTextMotion}>
          <LineSVGFull />
          <StyledTitle className="font-ogg"> {elem?.title} </StyledTitle>
          <StyledElement dangerouslySetInnerHTML={elem?.content && createMarkup(elem?.content)} />
        </StyledContainer>
      )) || ''}
    </StyledRightColContainer>
  )
}
// const MotionBG = styled(motion.div)`
//   position: absolute;
//   // height: ${({ scrollHeight }) => scrollHeight && `${scrollHeight}px`};
//   height: auto;
//   z-index: -1;
//   width: 100%;
// `

const StyledContainer = styled(motion.div)`
  min-width: 100%;
`
const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px 0;
`
const StyledRightColContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  // ${({ $isHovered }) => $isHovered && "background-image: url('/about.jpg')"};
  // background-size: cover;
  // background-repeat: no-repeat;
`


const StyledElement = styled.div`
  padding: 20px 10px;
  background-color: transparent;
`
