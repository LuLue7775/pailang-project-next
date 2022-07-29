import { useRef, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { CursorContext } from '../context/cursorContext'

import styled from 'styled-components'
import { textExpand, imageVideoExpand } from '../utils/framerVariantsNode'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player/lazy'

const parseContent = (type, content, isWindow, isOpen) => {
  if (type === 'text') {
    return content || ''
  } else if (type === 'image') {
    return (
      content && (
        <Image
          alt="image"
          src={content}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit={isOpen ? 'contain' : 'cover'}
          crossOrigin="true"
        />
      )
    )
  } else if (type === 'video') {
    return (
      <>
        {isWindow && (
          <ReactPlayer
            id="react-player"
            url={content}
            className="react-player"
            width="100%"
            height="100%"
            volume={0.8}
            controls={false}
          />
        )}
      </>
    )
  }
}

export default function NodeExpandAreaAndName({
  id,
  isOpen,
  toggleOpen,
  content,
  contentZh,
  type,
  hasContent
}) {
  const expandRef = useRef()
  const { setHoverEvent } = useContext(CursorContext)

  const [isWindow, setWindow] = useState(false)
  useEffect(() => {
    setWindow(true)
  }, [])

  return (
    <StyledExpandContainer
      as={motion.div}
      initial={false}
      animate={isOpen.includes(id) ? 'open' : 'closed'}
      onMouseOver={() => setHoverEvent('expand')}
      onMouseLeave={() => setHoverEvent('default')}
      hasContent={hasContent}
    >
      <StyledExpand
        ref={expandRef}
        as={motion.div}
        onClick={() => expandRef.current?.scrollHeight > 100 && toggleOpen(id)}
        variants={ type==='text' ? textExpand : imageVideoExpand}
        isOpen={isOpen.includes(id)}
        hasContent={content}
      >
        <div className='en'>{parseContent(type, content, isWindow, isOpen.includes(id))}</div>
        <div className='zh'>{parseContent(type, contentZh, isWindow, isOpen.includes(id))}</div>
      </StyledExpand>
    </StyledExpandContainer>
  )
}

const StyledExpandContainer = styled(motion.div)`
  height: 180px;
  width: 250px;
  z-index: 1;
  cursor: pointer;
  ${({ hasContent }) => !hasContent && `pointer-events: none;`}
`

const StyledExpand = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  margin: 10px 10px 0 5px;
  padding: 0 10px;
  // background-color: ${({ hasContent }) =>
    hasContent ? 'var( --node-bg-color, #000000a0)' : 'transparent'};
  overflow-y: ${({ isOpen }) => (isOpen ? 'scroll' : 'hidden')};
`
