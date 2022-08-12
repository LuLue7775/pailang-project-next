import styled from 'styled-components'
import { motion } from 'framer-motion'
import useSound from 'use-sound' // made by ian
import React, { useState } from 'react' // made by ian

export default function NodeName({
  $hasContent,
  $hasSource,
  $isOpen,
  name,
  name_zh,
  source,
  tooltip,
  setTooltip
}) {
  // made by ian
  const [index, setIndex] = useState(1)
  const [index2, setIndex2] = useState(1)

  // made by ian
  function changeSound() {
    let newIndex = Math.floor(Math.random() * (10 - 0) + 0)
    let newIndex2 = Math.floor(Math.random() * (3 - 0) + 0)
    setIndex(newIndex)
    setIndex2(newIndex2)
  }

  // made by ian
  const [play] = useSound('/sounds/' + index2 + '_0' + index + '.wav')

  return (
    <StyledName $hasContent={$hasContent} $hasSource={$hasSource} $isOpen={$isOpen}>
      <div
        onClick={() => {
          source && window.open(source)
          changeSound()
          play()
        }} // made by ian
        onMouseOver={() => {
          setTooltip(true)
        }}
        onMouseLeave={() => {
          setTooltip(false)
        }}
      >
        <div> {name} </div>
        <div> {name_zh} </div>
        {tooltip && source && <StyledTooltip> view source </StyledTooltip>}
      </div>
    </StyledName>
  )
}

const StyledName = styled(motion.div)`
  position: absolute;
  top: ${({ $hasContent }) =>
    $hasContent ? 'var(--node-height, 200px) ' : 'calc(var(--node-height, 200px)/2 )'};
  left: ${({ $hasContent }) => ($hasContent ? '10px' : '-10px')};
  padding-top: 5px;
  padding-left: ${({ $hasContent }) => ($hasContent ? '0px' : '30px')};
  color: #000;
  z-index: ${({ $isOpen }) => ($isOpen ? -1 : 2)};
  cursor: ${({ $hasSource }) => ($hasSource ? 'pointer' : 'none')};
`

const StyledTooltip = styled.div`
  position: relative;
  top: 10px;
  left: 10px;
  height: 1.5rem;
  width: 120px;
  display: flex;
  justify-content: center;
  background-color: var(--node-tooltip-color, #e0bc9ba0);
  border-radius: 10px;

  &:after {
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    border-bottom: solid 10px var(--node-tooltip-color, #e0bc9ba0);
    transform: translateX(-50%);
    position: absolute;
    z-index: -1;
    content: '';
    bottom: 100%;
    left: 50%;
    height: 0;
    width: 0;
  }
`
