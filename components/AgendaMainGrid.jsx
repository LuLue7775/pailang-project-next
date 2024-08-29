import React from 'react'
import AgendaFliterLabel from './AgendaFliterLabel'
import styled from 'styled-components'

export default function AgendaMainGrid({ filterTitle, filterType, filterData, filter, setFilter }) {
  const isLanguageFilter = filterType.includes('EN')

  return (
    <StyledMainGrid>
      {/* <StyledFilterName> {filterTitle} </StyledFilterName> */}
      <StyledHiddenGrid $isLanguageFilter={isLanguageFilter}>
        {filterType.map((el, i) => (
          <AgendaFliterLabel
            key={i}
            item={filterData[el]}
            filter={filter}
            setFilter={setFilter}
            isLanguageFilter={isLanguageFilter}
          />
        ))}
      </StyledHiddenGrid>
    </StyledMainGrid>
  )
}

const StyledMainGrid = styled.div`
  width: 100%;
  display: grid;
  border-bottom: 1px solid #aaa;
  z-index: 1;
  background: #fff;
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
  z-index: -1;
  width: 100%;
  ${({ isLanguageFilter }) => isLanguageFilter && `justify-content: space-between;`}
`