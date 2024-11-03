import { useState, useEffect, useRef, useContext } from 'react'
import Cursor from '../components/Cursor'
import { fetchData, sortAgenda } from '../utils/functions'
import AgendaMainGrid from '../components/AgendaMainGrid'
import AgendaGrid from '../components/AgendaGrid'
import { CursorContext } from '../context/cursorContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import AgendaFliterLabel from '../components/AgendaFliterLabel'

const filterData = {
  published: {
    id: 'currentCheck',
    value: 'published',
    label: 'Current',
    labelZh: '當期',
    type: 'time'
  },
  draft: { id: 'upcomingCheck', value: 'draft', label: 'Upcoming', labelZh: '未來', type: 'time' },
  // archived: { id: 'pastCheck', value: 'archived', label: 'Past', labelZh: '往期', type: 'time' },
  video: { id: 'videoCheck', value: 'video', label: 'Video', labelZh: '電影', type: 'form' },
  journal: {
    id: 'journalCheck',
    value: 'journal',
    label: 'Journal',
    labelZh: '雜誌',
    type: 'form'
  },
  scenography: {
    id: 'scenographyCheck',
    value: 'scenography',
    label: 'Scenography',
    labelZh: '圖表',
    type: 'form'
  },
  TC: {
    id: 'zhCheck',
    value: 'TC',
    label: '繁中',
    labelZh: '繁中',
    type: 'language'
  },
  EN: {
    id: 'enCheck',
    value: 'EN',
    label: 'English',
    labelZh: '英文',
    type: 'language'
  }
}

const language = ['TC', 'EN']
const time = ['published', 'draft']
const form = ['video', 'journal', 'scenography']

const filtersInitArray = Object.keys(filterData)

export default function Agenda({ data }) {
  const [initalData, setInitialData] = useState(data)
  const [filteredData, setFilteredData] = useState(data)
  const [filter, setFilter] = useState([])

  const [activeExpand, setActiveExpand] = useState(null)

  // Cursor efffect
  const cursorAreaRef = useRef()
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)
  /**
   * Sorting
   */
  useEffect(() => {
    const filtered = sortAgenda(filter, filterData, data)
    setFilteredData(filtered)
    setActiveExpand(null)
  }, [filter, data])

  return (
    <StyledAgenda className="agenda-container" as={motion.div} id="cursor-area" ref={cursorAreaRef}>
      <Cursor cursorAreaRef={cursorAreaRef} hoverEvent={hoverEvent} />
      <StyledAgendaWrap>
        <StyledAgendaFilter
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 3 }
          }}>
          <AgendaMainGrid
            filterTitle={'filter by language'}
            filterType={language}
            filterData={filterData}
            filter={filter}
            setFilter={setFilter}
            filtersInitArray={filtersInitArray}
          />

          <AgendaMainGrid
            filterTitle={'filter by schedule'}
            filterType={time}
            filterData={filterData}
            filter={filter}
            setFilter={setFilter}
            filtersInitArray={filtersInitArray}
          />
          <AgendaMainGrid
            filterTitle={'filter by event type'}
            filterType={form}
            filterData={filterData}
            filter={filter}
            setFilter={setFilter}
            filtersInitArray={filtersInitArray}
          />
        </StyledAgendaFilter>
      </StyledAgendaWrap>

      <AgendaGrid
        filteredData={filteredData}
        setHoverEvent={setHoverEvent}
        setActiveExpand={setActiveExpand}
        activeExpand={activeExpand}
        dataAmount={data?.length}
        filter={filter}
        initalData={initalData}
      />
    </StyledAgenda>
  )
}

export async function getServerSideProps() {
  const total = await fetchData('/agenda')
    .then((res) => res.total)
    .catch((e) => console.log(e))

  const data = await fetchData(`/agenda?limit=${total}`).catch((e) => console.log(e))

  const sortedData =
    data?.data?.sort((a, b) => {
      return new Date(b.date_created) - new Date(a.date_created)
    }) || []

  return {
    props: {
      data: sortedData || {}
    }
  }
}

const StyledAgenda = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  color: #000;

  @media (min-width: 1080px) {
    display: grid;
    grid-template-columns: 33% 66%;
  }
`

const StyledAgendaWrap = styled.div`
  height: auto;
  display: grid;

  justify-items: end;
  align-content: end;
  font-size: 0.8rem;

  margin: 60px 10px 0 10px;
  @media (min-width: 1080px) {
    grid-template-rows: 30vh 10vh;
    margin: 0;
  }
`

const StyledAgendaFilter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  width: 100%;
  color: #000;

  @media (min-width: 1080px) {
    width: 30vw;
    position: fixed;
    bottom: 10px;
    left: 10px;
  }
`