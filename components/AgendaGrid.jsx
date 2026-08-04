import AgendaElement from './AgendaElement'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

export default function AgendaGrid({ filteredData, setHoverEvent }) {
  return (
    <StyledAgendaGrid>
      <AnimatePresence>
        {filteredData?.map((item, i) => (
          <StyledContentWrap
            layout
            as={motion.div}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            key={`${item?.type}-${item?.id}`}
            className={`${item.type} ${item.status}`}
            onMouseOver={() => setHoverEvent('expand')}
            onMouseLeave={() => setHoverEvent('default')}>
            <AgendaElement item={item} />
          </StyledContentWrap>
        ))}
      </AnimatePresence>
    </StyledAgendaGrid>
  )
}

const StyledAgendaGrid = styled.div`
  display: grid;
  gap: 3rem 2rem;
  width: 100%;
  align-items: start;

  /* minmax(0, 1fr)：允許欄位縮到比內容 min-content 更窄，避免圖片/長標題把 grid 撐爆超過 100vw */
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
const StyledContentWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 0; /* 允許 grid item 收縮，避免內容溢出撐寬版面 */
  cursor: pointer;
`
