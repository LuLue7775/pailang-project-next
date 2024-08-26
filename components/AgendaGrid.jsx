import AgendaElement from './AgendaElement'
import { contentWrapVariant } from '../utils/framerVariantsAgenda'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

export default function AgendaGrid({
  filteredData,
  setHoverEvent,
  setActiveExpand,
  activeExpand,
  filter,
  initalData
}) {
  const handleExpand = (expandIndex) => {
    setActiveExpand(expandIndex)
  }

  return (
    <AnimatePresence>
      <StyledAgendaGrid>
        {filter.length === 0
          ? initalData?.map((item, i) => (
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
                }}>
                <AgendaElement item={item} activeExpand={activeExpand} expandIndex={i} />
              </StyledContentWrap>
            ))
          : filteredData?.map((item, i) => (
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
                }}>
                <AgendaElement item={item} activeExpand={activeExpand} expandIndex={i} />
              </StyledContentWrap>
            ))}
      </StyledAgendaGrid>
    </AnimatePresence>
  )
}

const StyledAgendaGrid = styled.div`
  display: grid;
  gap: 4rem;
  padding-top: 20px;
  place-items: center;
  align-items: start;
  justify-items: start;

  grid-template-columns: 1fr;
  grid-auto-rows: auto;

  width: 100%;
  margin: 60px auto; // center the grid

  @media (min-width: 768px) {
    margin: 60px 0;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`
const StyledContentWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto; // center the grid
  overflow: hidden;
  cursor: pointer;
  padding: 0 10px;
`
