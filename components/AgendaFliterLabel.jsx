import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AgendaFliterLabel({ item, filter, setFilter, filtersInitArray }) {
  let isChecked = filter.indexOf(item.value) > -1
  //        item.value === "all"
  //         ? (filter.length === filtersInitArray.length )
  //         : filter.indexOf(item.value) > -1

  const handleFilterChange = ({ target }) => {
    const { value, checked } = target
    // if (value === "all") {
    //   if (checked) setFilter(filtersInitArray);
    //   else setFilter([]);
    // } else {
    if (checked) setFilter([].concat(filter, value))
    // "all" will still be in filter if it's not unchecked by hand. so we need to clear it first.
    else setFilter(filter.filter((e) => e !== 'all' && e !== value))
    // }
  }

  return (
    <StyledLabel className="filter-btn" htmlFor={item?.id} as={motion.div} checked={isChecked}>
      <StyledInput
        className="form-input"
        type="checkbox"
        value={item?.value}
        checked={isChecked}
        onChange={handleFilterChange}
      />
      <div> {item?.label} </div>
    </StyledLabel>
  )
}

const StyledLabel = styled(motion.div)`
  position: relative;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;

  background-color: ${({ checked }) => checked ? 'var(--main-color, #e0954f)' : '#0a0323a0' };
  &:hover { background-color: var(--agenda-tooltip-color, #f2e446) };
`

const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;

  opacity: 0;
`
