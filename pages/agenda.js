import React, { useState, useEffect, useRef } from "react";
import AgendaElement from '../components/AgendaElement';

import styled from "styled-components";
import AgendaFliterLabel from "../components/AgendaFliterLabel";
import { motion, AnimatePresence, onHover  } from "framer-motion";
import AgendaTable from "../components/AgendaTable";
import Link from "next/link";

const filterData = {
  // "all": { id: "allCheck", value: "all", label: "All", type:'all' },
  "published": { id: "currentCheck", value: "published", label: "Current", type: "time" },
  "draft": { id: "upcomingCheck", value: "draft", label: "Upcoming", type: "time" },
  "archived": { id: "pastCheck", value: "archived", label: "Past", type: "time" },
  "video": { id: "videoCheck", value: "video", label: "Video", type: "form" },
  "journal": { id: "journalCheck", value: "journal", label: "Journal", type: "form" },
  "scenography": { id: "scenographyCheck", value: "scenography", label: "Scenography", type: "form" }
};

const time = ["published", "draft", "archived"];
const form = ["video", "journal", "scenography"];

const filtersInitArray = Object.keys(filterData);

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};

const contentWrapVariant = {
  initial:{ opacity: 0 },
  exit:{ opacity: 0, },
  animate:{ 
    opacity: 1 ,
    transition: { duration: 2, delay:.3 } 
  }
}


export default function Agenda({ data }) {

  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState(filtersInitArray);
 
  const [expandContent, setExpandContent] = useState({});
  const [activeExpand, setActiveExpand] = useState(null); 
  const boxRefs = useRef([]);

/**
 * Sorting
 */
  useEffect(() => {
    const timeFilter = filter.reduce((timeFilter, factor) => {if (filterData[factor].type === "time"){ timeFilter.push(factor)} return timeFilter }, []  )
    const typeFilter = filter.reduce((timeFilter, factor) => {if (filterData[factor].type === "form"){ timeFilter.push(factor)} return timeFilter }, []  )
    const filterResult = data?.filter( data => {
      var isContain = false;
      for (let i=0; i<timeFilter.length; i++ ) {
        if ( timeFilter[i] === data.status ) { isContain = true; break; }
      }
      return isContain;
    }).filter( data => {
      var isContain = false;
      for (let i=0; i<typeFilter.length; i++ ) {
        if ( typeFilter[i] === data.type ) { isContain = true; break; }
      }
      return isContain;
    })
    
    setFilteredData(filterResult)
    setExpandContent({})
    setActiveExpand(null)
  }, [filter])

  /**
 * Selecting
 */
  const handleExpand = (expandIndex) => {
    setActiveExpand(expandIndex)
  };

  useEffect(() => {
    setExpandContent({
      id : data[activeExpand]?.id || null,
      title : data[activeExpand]?.title || '',
      title_zh : data[activeExpand]?.title_zh || '',
      type : data[activeExpand]?.type || '',
      start_date : data[activeExpand]?.start_date || '',
      end_date : data[activeExpand]?.end_date || '',
      artist : data[activeExpand]?.artist || '',
      producer : data[activeExpand]?.producer || '',
      curator : data[activeExpand]?.curator || '',
      language : data[activeExpand]?.language || '',
    })
  }, [activeExpand])

  return (
    <StyledAgenda>
      <StyledAgendaWrap>
        <StyledAgendaTableWrap>
          <AgendaTable expandContent={expandContent} />
          <button>
            <Link href={`http://localhost:3000/article-${expandContent?.type}/${expandContent?.id}`}>
                <a>
                    <div> VIEW </div>
                </a>
            </Link>
          </button>
        </StyledAgendaTableWrap>

        <StyledAgendaFilter> 
            <StyledMainGrid  whileHover={{ height: "20px" }} >  
              <StyledFilterName as={motion.div}> filter by schedule </StyledFilterName>
              <StyledHiddenGrid as={motion.div}>
                {time.map( (el, i) => 
                    <AgendaFliterLabel key={i} item={filterData[el]} filter={filter} setFilter={setFilter} filtersInitArray={filtersInitArray}/>)
                }
            </StyledHiddenGrid>

            </StyledMainGrid>

            <StyledMainGrid  whileHover={{ height: "20px" }}>
                <StyledFilterName as={motion.div}> filter by event type </StyledFilterName>
                <StyledHiddenGrid  as={motion.div}>
                {form.map( (el, i) => 
                    <AgendaFliterLabel key={i} item={filterData[el]} filter={filter} setFilter={setFilter} filtersInitArray={filtersInitArray}/> )
                }
                </StyledHiddenGrid>
            </StyledMainGrid>

        </StyledAgendaFilter>
      </StyledAgendaWrap>

      <AnimatePresence >
        <StyledAgendaGrid>
          {filteredData?.map((item, i) => (
              <StyledContentWrap 
                  as={motion.div}
                  variants={contentWrapVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  
                  key={`${i}-${item?.id}`} 
                  onClick={() => handleExpand(i)} 
                  ref={ el => setRefs(el, boxRefs, data.length)}
                  className={`agenda-boxes ${item.type} ${item.status}`} 
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
  const DIRECTUS_API = process.env.DIRECTUS

  const fetchData = async( route ) => {
      const res = await fetch(`${ DIRECTUS_API + route }`, {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' }
      })
      const resJson = await res.json()
      
      if ( resJson.errors ) throw resJson.errors
      return resJson
  }

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
    
    width:100%;
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
    font-size: .4rem;
`
const StyledAgendaTableWrap = styled.div`
    width: 90%;
    color: #000;
    border-right: 1px solid #000;
    border-bottom: 2px solid #000;
    overflow: hidden;
`;

const StyledAgendaFilter = styled(motion.div)`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    margin-top: 1px;

    width: 80%;
    height: 200px;
    color: #000;
    border: 1px solid #000;
    overflow: hidden;
`;

const StyledFilterName = styled(motion.div)`
   height: 100%;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
`;
const StyledMainGrid = styled(motion.div)`
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #000;
    z-index: 1;    
    background: #fff;
    border: 1px solid #000;
`;
const StyledHiddenGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height:50px;
    z-index: -1;    
    
`;



const StyledAgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 300px;
  position: relative;
  gap: 1.4rem;
  margin:  20px;
  place-items: center;
  align-items: start;

  overflow-y:scroll;
  ::-webkit-scrollbar { width: 0; }
  scrollbar-width: none; /* Firefox */
`;



const StyledContentWrap = styled(motion.div)`
    position: relative;  
    width: 85%;
    height: min(300px, 100%);
    overflow: hidden;

`
