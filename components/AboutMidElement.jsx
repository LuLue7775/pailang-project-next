import { useEffect, useState } from 'react'
import { containerMidMotion, BGMotion, containerTextMotion } from '../utils/framerVariantsAbout'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AboutMidElement({ content, content_zh, createMarkup }) {
  const [isHovered, setHovered] = useState(false)

  // calculate scroll height
  // const [scrollHeight, setScrollHeight] = useState()
  // useEffect(() => {
  //   setScrollHeight(document.getElementById('mid').scrollHeight + 1000)
  // }, [])

  return (
    <StyledMidColContainer
    // id="mid"
    // as={motion.div}
    // variants={containerMidMotion}
    // initial="rest"
    // exit="exit"
    // whileHover="hover"
    // animate="rest"
    // onMouseEnter={() => setHovered(true)}
    // onMouseLeave={() => setHovered(false)}
    // $isHovered={isHovered}
    >
      {/* <MotionBG variants={BGMotion} scrollHeight={scrollHeight} /> */}
      <StyledMidContent
        className="element-container"
        as={motion.div}
        variants={containerTextMotion}>
        <StyledMidZhTitle> 白浪的定居殖民博物館 </StyledMidZhTitle>
        <StyledMidTitle className="font-ogg">
          {' '}
          Pailang Museum of Settler Colonialism{' '}
        </StyledMidTitle>

        <StyledMidCh dangerouslySetInnerHTML={content_zh && createMarkup(content_zh)} />
        <StyledMidEn dangerouslySetInnerHTML={content && createMarkup(content)} />
      </StyledMidContent>
    </StyledMidColContainer>
  )
}

// const MotionBG = styled(motion.div)`
//   position: absolute;
//   // height: ${({ scrollHeight }) => scrollHeight && `${scrollHeight}px`};
//   height: auto;
//   z-index: -1;
//   width: 100%;
// `

const StyledMidColContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  // ${({ $isHovered }) => $isHovered && "background-image: url('/about.jpg')"};
  // background-size: cover;
  // background-repeat: no-repeat;
`
const StyledMidContent = styled.div`
  // position: absolute;
  // top: 0;
`

const StyledMidTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.2em;
  padding: 0px 10px 0 10px;
`
const StyledMidZhTitle = styled.div`
  text-align: center;

  font-size: 1.3rem;
  font-family: var(--main-font-zh, sans-serif);
  line-height: 1.5rem;

  @media (min-width: 768px) {
    padding: 100px 10px 10px 10px;
  }
`

const StyledMidEn = styled.div`
  padding: 15px 0 15px 0;
`
const StyledMidCh = styled.div`
  padding: 15px 0 15px 0;
  font-family: var(--main-font-zh, serif);
`
