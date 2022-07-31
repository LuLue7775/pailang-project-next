import React from 'react'
import AgendaFliterLabel from './AgendaFliterLabel'
import styled from 'styled-components'

export default function AgendaMainGrid({
  filterTitle,
  filterType,
  filterData,
  filter,
  setFilter,
  filtersInitArray
}) {
  return (
    <StyledMainGrid>
      <StyledFilterName> {filterTitle} </StyledFilterName>
      <StyledHiddenGrid>
        {filterType.map((el, i) => (
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
  )
}

const StyledMainGrid = styled.div`
  height: 100px;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  border-bottom: 1px solid #000;
  z-index: 1;
  background: #fff;
  border: 1px solid #000;
`
const StyledFilterName = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledHiddenGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 50px;
  z-index: -1;
`
