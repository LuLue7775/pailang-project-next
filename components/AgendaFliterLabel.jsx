import styled from 'styled-components'

export default function AgendaFliterLabel({ item, filter, setFilter }) {
  const isChecked = filter.indexOf(item.value) > -1

  const handleFilterChange = ({ target }) => {
    const { value, checked } = target
    if (checked) setFilter([].concat(filter, value))
    else setFilter(filter.filter((currentFilter) => currentFilter !== value))
  }

  return (
    <StyledPill $isActive={isChecked}>
      <StyledInput
        type="checkbox"
        value={item?.value}
        checked={isChecked}
        onChange={handleFilterChange}
      />
      {item?.label}
    </StyledPill>
  )
}

const StyledPill = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  border: 1.5px solid #000;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: var(--title-font-zh);
  transition: background-color 0.25s ease, color 0.25s ease, opacity 0.25s ease;

  background-color: ${({ $isActive }) => ($isActive ? '#000' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'var(--main-color, #FFC93C)' : '#000')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.3)};

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#000' : 'rgba(0, 0, 0, 0.08)')};
    opacity: 1;
  }
`
const StyledInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0;
`
