import { useEffect, useState } from 'react'
import { containerMidMotion, BGMotion, containerTextMotion } from '../utils/framerVariants'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AboutMidElement({ content, content_zh, parse }) {
  const [isHovered, setHovered] = useState(false)

  // calculate scroll height
  const [scrollHeight, setScrollHeight] = useState()
  useEffect(() => {
    setScrollHeight(document.getElementById('mid').scrollHeight + 1000)
  }, [])

  return (
    <StyledMidColContainer
      id="mid"
      as={motion.div}
      variants={containerMidMotion}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      isHovered={isHovered}
    >
      <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />
      <StyledMidContent
        className="element-container"
        as={motion.div}
        variants={containerTextMotion}
      >
        <StyledMidTitle> Pailang Settlers Museum </StyledMidTitle>
        <StyledMidEn className="en">{content && parse(content)}</StyledMidEn>
        <StyledMidCh className="zh">{content_zh && parse(content_zh)}</StyledMidCh>
      </StyledMidContent>
    </StyledMidColContainer>
  )
}

const MotionBG = styled(motion.div)`
  position: absolute;
  // height: ${({ scrollHeight }) => scrollHeight && `${scrollHeight}px`};
  height: auto;
  z-index: -1;
  width: 100%;
`

const StyledMidColContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow-y: scroll;
  ${({ isHovered }) => isHovered && "background-image: url('/about.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
`
const StyledMidContent = styled.div`
  position: absolute;
  top: 0;
`

const StyledMidTitle = styled.h3`
  text-align: center;
  padding: 100px 10px 10px 10px;
`
const StyledMidEn = styled.div`
  padding: 15px 0 15px 0;
`
const StyledMidCh = styled.div`
  padding: 15px 0 15px 0;
`
