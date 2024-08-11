import { useState, useEffect, useRef, useContext } from 'react'
import Cursor from '../components/Cursor'
import { fetchData, sortAgenda } from '../utils/functions'
import AgendaMainGrid from '../components/AgendaMainGrid'
import AgendaGrid from '../components/AgendaGrid'
import { CursorContext } from '../context/cursorContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const filterData = {
  published: {
    id: 'currentCheck',
    value: 'published',
    label: 'Current',
    labelZh: '當期',
    type: 'time'
  },
  draft: { id: 'upcomingCheck', value: 'draft', label: 'Upcoming', labelZh: '未來', type: 'time' },
  archived: { id: 'pastCheck', value: 'archived', label: 'Past', labelZh: '往期', type: 'time' },
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
  }
}

const time = ['published', 'draft', 'archived']
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
    setFilteredData(sortAgenda(filter, filterData, data))
    setActiveExpand(null)
  }, [filter])

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
          }}
        >
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

export async function getStaticProps() {
  const data = await fetchData('/agenda').catch((e) => console.log(e))
  return {
    props: {
      data: data?.data || {}
    },
    revalidate: 60
  }
}

const StyledAgenda = styled.div`
  display: grid;
  grid-template-columns: 33% 66%;
  width: 100%;
  height: 100vh;
  color: #000;

  overflow: hidden;
`

const StyledAgendaWrap = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 30vh 10vh;

  justify-items: end;
  align-content: end;
  padding-bottom: 1rem;
  font-size: 0.8rem;
  overflow: hidden;
`

const StyledAgendaFilter = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  margin-top: 1px;

  width: 80%;
  height: 200px;
  color: #000;
  border: 1px solid #000;
  overflow: hidden;
`
