import { useState, useEffect, useRef, useContext } from 'react'
import Cursor from '../components/Cursor'
import { fetchData } from '../utils/functions'
import AgendaGrid from '../components/AgendaGrid'
import AgendaFliterLabel from '../components/AgendaFliterLabel'
import { CursorContext } from '../context/cursorContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'

// 只保留語言篩選（繁中 TC / 英 EN）
const languageFilters = [
  { value: 'TC', label: '繁中' },
  { value: 'EN', label: 'English' }
]

// 語言判斷：只要 language 含 'EN'（涵蓋 'EN' / '英 EN'）即為英文，其餘一律視為繁中
const isEnglish = (item) => (item?.language || '').includes('EN')

export default function Agenda({ data }) {
  // 每個語言篩選是獨立的 boolean，預設全開（兩種語言都顯示）
  const [filter, setFilter] = useState(['TC', 'EN'])
  const [filteredData, setFilteredData] = useState(data)

  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  useEffect(() => {
    // 純 boolean：語言有被勾選才顯示；兩者都取消則為空（不再回退成「全部顯示」）
    const wantEN = filter.includes('EN')
    const wantTC = filter.includes('TC')
    setFilteredData(
      data.filter((item) => {
        const en = isEnglish(item)
        return (en && wantEN) || (!en && wantTC)
      })
    )
  }, [filter, data])

  return (
    <StyledAgenda className="agenda-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />

      <StyledFilterBar
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2 } }}>
        {languageFilters.map((item) => (
          <AgendaFliterLabel
            key={item.value}
            item={item}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </StyledFilterBar>

      <AgendaGrid filteredData={filteredData} setHoverEvent={setHoverEvent} />
    </StyledAgenda>
  )
}

export async function getServerSideProps() {
  const total = await fetchData('/agenda')
    .then((res) => res.total)
    .catch((e) => console.log(e))

  const data = await fetchData(`/agenda?limit=${total}`).catch((e) => console.log(e))

  const sortedData =
    data?.data
      ?.filter((item) => item.type === 'journal' || item.type === 'field')
      .sort((a, b) => new Date(b.date_created) - new Date(a.date_created)) || []

  return {
    props: {
      data: sortedData
    }
  }
}

const StyledAgenda = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 90px 20px 60px;
  background-color: var(--main-color, #FFC93C);
  color: #000;
  overflow-x: clip; /* 防止任何子元素橫向溢出而露出右側白色 body */

  @media (min-width: 768px) {
    padding: 100px 40px 80px;
  }
`

const StyledFilterBar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 56px;
  }
`
