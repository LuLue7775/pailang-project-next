import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";

export default function AgendaFliterLabel({ item, filter, setFilter, filtersInitArray }) {

  let isChecked = item.value === "all"
          ? (filter.length === filtersInitArray.length )
          : filter.indexOf(item.value) > -1

  const handleFilterChange = ({ target }) => {
    const { value, checked } = target;
    // console.log(value)
    if (value === "all") {
      if (checked) setFilter(filtersInitArray);
      else setFilter([]);
    } else {
      if (checked) setFilter([].concat(filter, value)); // "all" will still be in filter if it's not unchecked by hand. so we need to clear it first.
      else setFilter( filter.filter(e => e !== "all" && e !== value) );
    }
  }

  return (
    <StyledLabel 
      className='filter-btn' 
      htmlFor={item?.id}
      as={motion.div}
      checked={isChecked}
      >
      <StyledInput
        className='form-input'
        type='checkbox'
        value={item?.value}
        checked={isChecked}
        onChange={handleFilterChange}        
      />
      <p>

      {item?.label}
      </p>
    </StyledLabel>
  )
}

const StyledLabel = styled(motion.div)`
  position: relative;

  width: 120px;
  height: 100%;
  background:${({ checked }) => checked ? '#F8B72450' : '#f3f3f3a0' } ;
  
  border: 1px solid #F8B724;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;

`;

const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  
  opacity: 0;

`;

