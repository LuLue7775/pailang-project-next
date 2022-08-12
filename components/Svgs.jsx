
export function LineSVG() {
  return (
    <svg
      className="line-svg"
      mlns="http://www.w3.org/2000/svg"
      width="min(70%, 600px)"
      height="40"
      stroke="#000"
      strokeWidth="1px"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M0 0 H 1000 0" />
      <path d="M0 5 H 1000 0" />
    </svg>
  )
}
export function LineSVGFull() {
  return (
    <svg
      className="line-svg"
      mlns="http://www.w3.org/2000/svg"
      width="100%"
      height="40"
      stroke="#000"
      strokeWidth="1px"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M0 0 H 1000 0" />
      <path d="M0 5 H 1000 0" />
    </svg>
  )
}

export function LeftCrossSVG() {
  return (
    <svg
      className="cross-svg"
      mlns="http://www.w3.org/2000/svg"
      width="51"
      height="100"
      stroke="#00000090"
      strokeWidth="1"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M 0 50 H 10 50" />
      <path d="M 50 0 V 50 100" />
    </svg>
  )
}
export function RightCrossSVG() {
  return (
    <svg
      className="cross-svg"
      mlns="http://www.w3.org/2000/svg"
      width="51"
      height="100"
      stroke="#00000090"
      strokeWidth="1"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M 0 50 H 10 50" />
      <path d="M 1 0 V 50 100" />
    </svg>
  )
}

export function DownChevronSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  )
}

export function UpChevronSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
      />
    </svg>
  )
}

export function EllipseBtnSVG({ texts }) {
  return (
    <a style={{ postion: 'relative', display: 'flex', justifyContent: 'end' }}>
      <svg height="80" width="200">
        <ellipse
          cx="100"
          cy="40"
          rx="60"
          ry="20"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1, background: 'transparent' }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          width="200"
          fill="#000"
          style={{ fontSize: '.8rem' }}
        >
          {' '}
          {texts}{' '}
        </text>
      </svg>
    </a>
  )
}

export function DragHandleSVG() {
  return (
    <svg width="20" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="0.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="2.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="4.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="6.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="8.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="10.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="12.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="2.5" cy="14.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="0.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="2.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="4.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="6.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="8.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="10.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="12.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="4.5" cy="14.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="0.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="2.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="4.5" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="6.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="8.499" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="10.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="12.498" r=".6" fill="var(--node-handle-color, #FFF" />
      <circle cx="6.499" cy="14.498" r=".6" fill="var(--node-handle-color, #FFF" />
    </svg>
  )
}

export function SoundPlaying() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      className="bi bi-volume-up"
      viewBox="0 0 16 16"
    >
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
      <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
    </svg>
  )
}
export function SoundSetPlay() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      className="bi bi-volume-off"
      viewBox="0 0 16 16"
    >
      <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM10 5.04 8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96V5.04z" />
    </svg>
  )
}
