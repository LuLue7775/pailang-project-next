import React, { useState, useEffect, useRef } from "react";
import dataJson from '../dataset.json';
import AgendaElement from '../components/AgendaElement';

import styled from "styled-components";
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import Draggable from 'gsap/dist/Draggable'
import AgendaFliterLabel from "../components/AgendaFliterLabel";
import { motion } from "framer-motion";

const filterData = {
  "all": { id: "allCheck", value: "all", label: "All", type:'all' },
  "current": { id: "currentCheck", value: "current", label: "Current", type: "time" },
  "upcoming": { id: "upcomingCheck", value: "upcoming", label: "Upcoming", type: "time" },
  "past": { id: "pastCheck", value: "past", label: "Past", type: "time" },
  "video": { id: "videoCheck", value: "video", label: "Video", type: "form" },
  "journal": { id: "journalCheck", value: "journal", label: "Journal", type: "form" },
  "scenography": { id: "scenographyCheck", value: "scenography", label: "Scenography", type: "form" }
};

const filtersInitArray = Object.keys(filterData);

const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return;
  ref.current.push(el);
};


export default function Agenda() {
  const { data } = dataJson?.agendaPage;

  const [filter, setFilter] = useState(filtersInitArray);
  const boxRefs = useRef([]);

  const [activeExpand, setActiveExpand] = useState(null); 

  useEffect(() => {
    gsap.registerPlugin(Flip, Draggable);

    const state = Flip.getState(boxRefs.current);

    const timeFilter = filter.reduce((timeFilter, factor) => {if (filterData[factor].type === "time"){ timeFilter.push(factor)} return timeFilter }, []  )
    const formFilter = filter.reduce((timeFilter, factor) => {if (filterData[factor].type === "form"){ timeFilter.push(factor)} return timeFilter }, []  )
    const boxMatches =  boxRefs.current
        .filter(box => {
          var isContain = false;
          for (let i=0; i<timeFilter.length; i++ ) {
            if ( box.classList.contains(timeFilter[i]) ) { isContain = true; break; }
          }
          return isContain;
        })
        .filter(box => {
          var isContain = false;
          for (let i=0; i<formFilter.length; i++ ) {
            if ( box.classList.contains(formFilter[i]) ) { isContain = true; break; }
          }
          return isContain;
        })

      boxRefs.current?.forEach(box => {
        box.style.display = boxMatches.indexOf(box) === -1 ? "none" : "block"; 
      })

    Flip.from(state, {
        duration: 1,
        scale: true,
        absolute: true,
        ease: "power1.inOut", 
        onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})
      });
  }, [filter])

  const handleExpand = (id) => {
    setActiveExpand(id)
  };

  return (
    <StyledAgenda>
      <StyledAgendaFilter
        as={motion.div} 
        whileHover={{ height: '60px', transition: { duration: 0.5, when: 'beforeChildren' } }}

      > 
        {Object.values(filterData).map((item, i) => 
          <AgendaFliterLabel key={item?.id} item={item} filter={filter} setFilter={setFilter} filterData={filterData} filtersInitArray={filtersInitArray}/>
        )}
      </StyledAgendaFilter>

      <StyledAgendaGrid
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          delay: .3,
          ease: "easeInOut",
          staggerChildren: 0.3,
        }}
      >
        {data?.map((item, i) => (
          <StyledAgendaBox 
            key={item?.id} 
            className={`agenda-boxes ${item.type[0]} ${item.type[1]}`} 
            ref={ el => setRefs(el, boxRefs, data.length)} 
            onClick={() => handleExpand(item?.id)}
          >
            <AgendaElement item={item} activeExpand={activeExpand}/>
          </StyledAgendaBox>
        ))}


      </StyledAgendaGrid>
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
      data,
    }, 
    revalidate: 60    
  }
}


const StyledAgenda = styled.div`
  width:100vw;
  height: 100vh;
  color: #000;
  background: rgb(207,204,204);
  background: radial-gradient(circle, rgba(207,204,204,1) 29%, rgba(255,255,255,1) 93%);
  overflow-y:scroll;
  ::-webkit-scrollbar { width: 0; }
  scrollbar-width: none; /* Firefox */

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;

`
const StyledAgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;
  gap: 1.4rem;
  place-items: center;
  align-items: start;
`;

const StyledAgendaFilter = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 2px 50px 2px 50px;

  width:100%;
  height: 30px;
  background: #4C2B1F;
  color: #FFF;
`;

const StyledAgendaBox = styled.div`
  height: auto;
  width: 100%;
  max-height: 500px;
  max-width: 500px;
  overflow:hidden;

`;

