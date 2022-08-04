import AgendaElement from './AgendaElement'
import { contentWrapVariant } from '../utils/framerVariantsAgenda'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

export default function AgendaGrid({
  filteredData,
  setHoverEvent,
  setActiveExpand,
  activeExpand,
  dataAmount
}) {
  const handleExpand = (expandIndex) => {
    setActiveExpand(expandIndex)
  }

  return (
    <AnimatePresence>
      <StyledAgendaGrid>
        {filteredData?.map((item, i) => (
          <StyledContentWrap
            as={motion.div}
            variants={contentWrapVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`${i}-${item?.id}`}
            id={`${item.type}-${item?.id}`}
            className={`${item.type} ${item.status}`}
            onMouseOver={() => {
              setHoverEvent('expand')
              handleExpand(i, `${item.type}-${item?.id}`)
            }}
            onMouseLeave={() => {
              setHoverEvent('default')
              setActiveExpand(null)
            }}
          >
            <AgendaElement item={item} activeExpand={activeExpand} expandIndex={i} />
          </StyledContentWrap>
        ))}
      </StyledAgendaGrid>
    </AnimatePresence>
  )
}

const StyledAgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 350px;
  position: relative;
  gap: 1.4rem;
  margin: 20px;
  place-items: center;
  align-items: start;

  overflow-y: scroll;
`

const StyledContentWrap = styled(motion.div)`
  position: relative;
  width: 85%;
  height: min(300px, 100%);
  overflow: hidden;
  cursor: pointer;
`
