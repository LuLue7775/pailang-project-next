export const textExpand = {
  open: () => ({
    width: '300px',
    height: '300px',
    backgroundColor:  'var(--node-text-expandBg-color, #000000E0)' ,
    transition: {
      type: 'spring',
      stiffness: 20
    }
  }),
  closed: {
    width: '250px',
    height: '180px',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}
export const imageVideoExpand = {
  open: () => ({
    width: '350px',
    height: '350px',
    backgroundColor:  'var(--node-image-video-expandBg-color, transparent)',
    transition: {
      type: 'spring',
      stiffness: 20
    }
  }),
  closed: {
    width: '250px',
    height: '180px',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}
