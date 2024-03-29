export const containerTextMotion = {
  rest: { color: '#000' },
  hover: {
    backgroundColor: '#ffffff10',
    padding: '30px',
    transition: {
      delay: 0.4,
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.8
    }
  }
}

export const containerLeftMotion = {
  rest: { x: '0', zIndex: 0 },
  hover: {
    x: '5%',
    y: '-60px',
    width: '50%',
    scale: 1.1,
    transition: { duration: 1 },
    zIndex: 10,
    transition: {
      delay: 1,
      type: 'tween',
      ease: 'easeInOut',
      duration: 1.2
    }
  },
  exit: { x: '0', y: '0px', zIndex: 0, scale: 0.9 }
}

export const containerMidMotion = {
  rest: { x: '0', zIndex: 0 },
  hover: {
    x: '-20%',
    y: '-60px',
    scale: 1.1,
    width: '50%',
    transition: { duration: 1 },
    zIndex: 10,
    transition: {
      delay: 1,
      type: 'tween',
      ease: 'easeInOut',
      duration: 1.2
    }
  },
  exit: { x: '0', y: '0px', zIndex: 0, scale: 0.9 }
}
export const containerRightMotion = {
  rest: { x: '0', zIndex: 0 },
  hover: {
    right: 0,
    y: '-60px',

    scale: 1.1,
    width: '50%',
    transition: { duration: 1 },
    zIndex: 10,
    transition: {
      delay: 1,
      type: 'tween',
      ease: 'easeInOut',
      duration: 1.2
    }
  },
  exit: { x: '0', y: '0px', zIndex: 0, scale: 0.9 }
}

export const BGMotion = {
  rest: { opacity: 0, ease: 'easeOut', duration: 0.2, type: 'tween' },
  hover: {
    opacity: 1,
    transition: {
      duration: 2,
      type: 'tween',
      ease: 'easeIn'
    }
  }
}
