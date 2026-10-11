import styled from 'styled-components'

/**
 * 語言切換：單一按鈕，在繁中（TC）與英文（EN）之間切換。
 * 按鈕顯示的是「點下去會切換到的語言」：目前繁中 → 顯示 English；目前英文 → 顯示 繁中。
 */
export default function AgendaFliterLabel({ filter, setFilter }) {
  const isEN = filter === 'EN'

  return (
    <StyledToggle
      type="button"
      lang={isEN ? 'zh-Hant' : 'en'}
      aria-label={isEN ? '切換為繁體中文' : 'Switch to English'}
      onClick={() => setFilter(isEN ? 'TC' : 'EN')}
    >
      {isEN ? '繁中' : 'English'}
    </StyledToggle>
  )
}

const StyledToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  border: 1.5px solid #000;
  border-radius: 10px;
  background-color: transparent;
  color: #000;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: var(--title-font-zh);
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover {
    background-color: #000;
    color: var(--main-color, #ffc93c);
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`
