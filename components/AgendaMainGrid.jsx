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
  width: 100%;
  display: grid;
  border-bottom: 1px solid #000;
  z-index: 1;
  background: #fff;
  border: 1px solid #000;
`
const StyledFilterName = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledHiddenGrid = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  z-index: -1;
  width: 100%;
`