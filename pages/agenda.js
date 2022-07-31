import { useState, useEffect, useRef, useContext } from 'react'
import Cursor from '../components/Cursor'
import { fetchData, sortAgenda } from '../utils/functions'
import AgendaMainGrid from '../components/AgendaMainGrid'
import AgendaGrid from '../components/AgendaGrid'
import { CursorContext } from '../context/cursorContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const filterData = {
  published: { id: 'currentCheck', value: 'published', label: 'Current', type: 'time' },
  draft: { id: 'upcomingCheck', value: 'draft', label: 'Upcoming', type: 'time' },
  archived: { id: 'pastCheck', value: 'archived', label: 'Past', type: 'time' },
  video: { id: 'videoCheck', value: 'video', label: 'Video', type: 'form' },
  journal: { id: 'journalCheck', value: 'journal', label: 'Journal', type: 'form' },
  scenography: { id: 'scenographyCheck', value: 'scenography', label: 'Scenography', type: 'form' }
}

const time = ['published', 'draft', 'archived']
const form = ['video', 'journal', 'scenography']

const filtersInitArray = Object.keys(filterData)

export default function Agenda({ data }) {
  const [filteredData, setFilteredData] = useState(data)
  const [filter, setFilter] = useState(filtersInitArray)

  const [activeExpand, setActiveExpand] = useState(null)

  const boxRefs = useRef([])

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
        <StyledAgendaTableWrap />
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
        boxRefs={boxRefs}
        dataAmount={data?.length}
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
  padding-top: 20px;
  width: 100%;
  height: calc(100vh - 60px);
  color: #000;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;
`

const StyledAgendaWrap = styled.div`
  display: grid;
  grid-template-rows: 60vh 25vh;

  justify-items: end;
  align-content: end;
  padding-bottom: 1rem;
  font-size: 0.8rem;
`
const StyledAgendaTableWrap = styled.div`
  width: 90%;
  color: #000;
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
