import React from 'react'
import Link from "next/link";

import styled from "styled-components";
import { motion, AnimatePresence  } from "framer-motion";

const tableVariant = { 
    initial:{ opacity: 0 },
    exit:{ opacity: 0 },
    animate:{ 
      opacity: 1 ,
      transition: { duration: 2, delay:.3 } 
    }
  }
const childVariant = { 
    initial:{ x: "100%" },
    exit:{ x: 0 },
    animate:{ 
        x: 0 ,
    //   transition: { duration: 2, delay:.3 } 
    }
  }

  
export default function AgendaTable({ expandContent }) {
    const { title, title_zh, start_date, end_date, type, artist, producer, curator, language, id } = expandContent

  return (
    <AnimatePresence>
        <StyledAgendaTitle> 
            <motion.div variants={childVariant} key={title}>
            { title } <br /> { title_zh } 
            </motion.div>
        </StyledAgendaTitle>
        <motion.tbody
            variants={tableVariant}
            initial="initial"
            exit="exit"
            animate="animate"
            >
            <motion.tr >
                <td>Date</td>
                <motion.td variants={childVariant} key={id}>{ start_date } - { end_date }</motion.td>
            </motion.tr>
            <motion.tr  >
                <td>Type</td>
                <motion.td variants={childVariant} key={id}>{ type } </motion.td>
            </motion.tr>
            <motion.tr >
                <td>Artist</td>
                <motion.td variants={childVariant} key={id}>{artist}</motion.td>
            </motion.tr>
            <motion.tr >
                <td>Producer</td>
                <motion.td variants={childVariant} key={id}>{ producer } </motion.td>
            </motion.tr>
            <motion.tr >
                <td>Curator</td>
                <motion.td variants={childVariant} key={id}>{ curator } </motion.td>
            </motion.tr>
            <motion.tr >
                <td>Language</td>
                <motion.td variants={childVariant} key={id}>{ language } </motion.td>
            </motion.tr>

            <Link href={`http://localhost:3000/article-${type}/${id}`}>
                <a>
                    <div> VIEW </div>
                </a>
            </Link>
        </motion.tbody>
    </AnimatePresence>
  )
}

const StyledAgendaTitle = styled(motion.caption)`
    // height: 60px;

    font-size: .7rem;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    padding: 10px 0;
`