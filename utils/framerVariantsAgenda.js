export const imgWrapVariant = {
  open: {
    height: 'auto',
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  },
  closed: {
    height: '100px',
    transition: {
      duration: 0.5
    }
  },
  initial: {
    height: '100px'
  }
}

export const slideVariant = {
  initial: {
    // x: "150%",
    y: '-150%',
    skewY: 25
  },
  open: {
    // x: 0,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.5
    }
  },
  closed: {
    // x: "150%",
    y: '-150%',
    skewY: 25
  }
}

export const contentWrapVariant = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 2, delay: 0.3 }
  }
}
