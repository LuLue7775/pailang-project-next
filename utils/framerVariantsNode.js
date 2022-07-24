export const expand = {
  open: () => ({
    width: '300px',
    height: '300px',
    backgroundColor: 'var(--node-expandBg-color, #cc5e0ae0)',
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
