import { useState, useEffect, useRef, useContext } from 'react'
import { CursorContext } from '../context/cursorContext'
import { getRelativeCoordinates } from '../utils/functions'
import Cursor from '../components/Cursor'
import AgendaElement from '../components/AgendaElement'
import { fetchData } from '../utils/functions'

import styled from 'styled-components'
import AgendaFliterLabel from '../components/AgendaFliterLabel'
import { motion, AnimatePresence, onHover } from 'framer-motion'
import AgendaTable from '../components/AgendaTable'
import Link from 'next/link'

const filterData = {
  // "all": { id: "allCheck", value: "all", label: "All", type:'all' },
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

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return
  ref.current.push(el)
}

const contentWrapVariant = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 2, delay: 0.3 }
  }
}

export default function Agenda({ data }) {
  const [filteredData, setFilteredData] = useState(data)
  const [filter, setFilter] = useState(filtersInitArray)

  const [activeExpand, setActiveExpand] = useState(null)
  const [activeExpandData, setActiveExpandData] = useState(null)
  const [expandContent, setExpandContent] = useState({})
  const boxRefs = useRef([])
  const articleByTypeRef = useRef({
    journal: [],
    Scenography: [],
    video: []
  })

  // Cursor efffect
  const cursorAreaRef = useRef()
  const [mousePosition, setMousePosition] = useState({})
  const { hoverEvent, setHoverEvent } = useContext(CursorContext)

  const handleMouseMove = (e) => {
    setMousePosition(getRelativeCoordinates(e, cursorAreaRef.current))
  }

  /**
   * Sorting
   */
  useEffect(() => {
    const timeFilter = filter.reduce((timeFilter, factor) => {
      if (filterData[factor].type === 'time') {
        timeFilter.push(factor)
      }
      return timeFilter
    }, [])
    const typeFilter = filter.reduce((timeFilter, factor) => {
      if (filterData[factor].type === 'form') {
        timeFilter.push(factor)
      }
      return timeFilter
    }, [])
    const filterResult = data
      ?.filter((data) => {
        var isContain = false
        for (let i = 0; i < timeFilter.length; i++) {
          if (timeFilter[i] === data.status) {
            isContain = true
            break
          }
        }
        return isContain
      })
      .filter((data) => {
        var isContain = false
        for (let i = 0; i < typeFilter.length; i++) {
          if (typeFilter[i] === data.type) {
            isContain = true
            break
          }
        }
        return isContain
      })

    setFilteredData(filterResult)
    setExpandContent({})
    setActiveExpand(null)
  }, [filter])

  /**
   *  Categorize data so we can find data by id when box expands.
   *  (note: because there're same id in three types)
   */
  const categorizeDataByType = () => {
    let article = {
      journal: [],
      scenography: [],
      video: []
    }
    data?.forEach((item, i) => {
      if (item?.type === 'journal') article.journal.push(item)
      if (item?.type === 'scenography') article.scenography.push(item)
      if (item?.type === 'video') article.video.push(item)
    })
    articleByTypeRef.current = article
  }

  useEffect(() => {
    categorizeDataByType()
  }, [])

  const getExpandDataIndexByID = (boxID) => {
    let { journal, scenography, video } = articleByTypeRef.current

    if (boxID.startsWith('journal'))
      return journal.find((item) => item.id === parseInt(boxID.split('-')[1]))
    else if (boxID.startsWith('scenography'))
      return scenography.find((item) => item.id === parseInt(boxID.split('-')[1]))
    else if (boxID.startsWith('video'))
      return video.find((item) => item.id === parseInt(boxID.split('-')[1]))
  }

  const handleExpand = (expandIndex, id) => {
    setActiveExpand(expandIndex)
    setActiveExpandData(getExpandDataIndexByID(id))
  }

  /**
   * @TODO use useReducer
   */
  useEffect(() => {
    setExpandContent({
      id: activeExpandData?.id || null,
      title: activeExpandData?.title || '',
      title_zh: activeExpandData?.title_zh || '',
      type: activeExpandData?.type || '',
      start_date: activeExpandData?.start_date || '',
      end_date: activeExpandData?.end_date || '',
      artist: activeExpandData?.artist || '',
      producer: activeExpandData?.producer || '',
      curator: activeExpandData?.curator || '',
      language: activeExpandData?.language || '',
      status: activeExpandData?.status || ''
    })
  }, [activeExpand])

  return (
    <StyledAgenda
      className="agenda-container"
      as={motion.div}
      id="cursor-area"
      ref={cursorAreaRef}
      onMouseMove={(e) => handleMouseMove(e)}
      animate={{
        rotateX: mousePosition.centerX * 20,
        rotateY: mousePosition.centerY * 20
      }}
    >
      <Cursor mousePosition={mousePosition} hoverEvent={hoverEvent} />

      <StyledAgendaWrap>
        <StyledAgendaTableWrap>
          <AgendaTable expandContent={expandContent} />
          <div
            style={{ postion: 'relative', width: '100%', display: 'flex', justifyContent: 'end' }}
          >
            {expandContent?.status !== 'draft' && (
              <Link
                href={
                  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
                    ? `http://localhost:3000/article-${expandContent?.type}/${expandContent?.id}`
                    : `${process.env.NEXT_PUBLIC_DOMAIN}/article-${expandContent?.type}/${expandContent?.id} `
                }
              >
                <a>
                  <svg height="80" width="200">
                    <ellipse
                      cx="100"
                      cy="40"
                      rx="60"
                      ry="20"
                      style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeWidth: 1,
                        background: 'transparent'
                      }}
                    />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      width="200"
                      fill="#000"
                      style={{ fontSize: '.8rem' }}
                    >
                      {' '}
                      VIEW{' '}
                    </text>
                  </svg>
                </a>
              </Link>
            )}
          </div>
        </StyledAgendaTableWrap>

        <StyledAgendaFilter>
          <StyledMainGrid whileHover={{ height: '20px' }}>
            <StyledFilterName as={motion.div}> filter by schedule </StyledFilterName>
            <StyledHiddenGrid as={motion.div}>
              {time.map((el, i) => (
                <AgendaFliterLabel
                  key={i}
                  item={filterData[el]}
                  filter={filter}
                  setFilter={setFilter}
                  filtersInitArray={filtersInitArray}
                />
              ))}
            </StyledHiddenGrid>
          </StyledMainGrid>

          <StyledMainGrid whileHover={{ height: '20px' }}>
            <StyledFilterName as={motion.div}> filter by event type </StyledFilterName>
            <StyledHiddenGrid as={motion.div}>
              {form.map((el, i) => (
                <AgendaFliterLabel
                  key={i}
                  item={filterData[el]}
                  filter={filter}
                  setFilter={setFilter}
                  filtersInitArray={filtersInitArray}
                />
              ))}
            </StyledHiddenGrid>
          </StyledMainGrid>
        </StyledAgendaFilter>
      </StyledAgendaWrap>

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
              onClick={() => handleExpand(i, `${item.type}-${item?.id}`)}
              ref={(el) => setRefs(el, boxRefs, data.length)}
              className={`${item.type} ${item.status}`}
              onMouseOver={() => setHoverEvent('expand')}
              onMouseLeave={() => setHoverEvent('default')}
            >
              <AgendaElement item={item} activeExpand={activeExpand} expandIndex={i} />
            </StyledContentWrap>
          ))}
        </StyledAgendaGrid>
      </AnimatePresence>
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
  border-right: 1px solid #000;
  border-bottom: 2px solid #000;
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

const StyledFilterName = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledMainGrid = styled(motion.div)`
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #000;
  z-index: 1;
  background: #fff;
  border: 1px solid #000;
`
const StyledHiddenGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 50px;
  z-index: -1;
`

const StyledAgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 300px;
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
