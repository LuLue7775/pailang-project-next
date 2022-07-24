export const banner = {
    animate: {
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.007
      }
    }
  }
  
export const letterAni = {
    initial: { y: 600 },
    animate: (i) => ({
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1
      }
    })
  }
  
export const subtitles = {
    initial: { opacity: 0 },
  
    animate: {
      opacity: 1,
      transition: {
        duration: 2,
        delay: 1.5
      }
    }
  }
  