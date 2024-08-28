import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AgendaFliterLabel({ item, filter, setFilter }) {
  let isChecked = filter.indexOf(item.value) > -1

  const handleFilterChange = ({ target }) => {
    const { value, checked } = target

    if (checked) setFilter([].concat(filter, value))
    else setFilter(filter.filter((currentFilter) => currentFilter !== value))
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
      <div> {item?.label === 'Video' ? 'Cinema' : item.label} </div>
      <div> {item?.labelZh} </div>
    </StyledLabel>
  )
}

const StyledLabel = styled(motion.div)`
  flex: 1;
  margin: 0 5px;
  line-height: 1.3rem;

  position: relative;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #fff;

  background-color: ${({ checked }) => (checked ? 'var(--main-color, #e0954f)' : '#0a0323a0')};
  &:hover {
    background-color: var(--agenda-tooltip-color, #f2e446);
    color: #000;
  }

  div {
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
`

const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`
