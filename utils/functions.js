

export async function fetchData( route ){
    const DIRECTUS_API = process.env.DIRECTUS

    const res = await fetch(`${ DIRECTUS_API + route }`, {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
    })
    const resJson = await res.json()
    
    if ( resJson.errors ) throw resJson.errors
    return resJson
}

export function ErrorHandler({error}) {
    return (
      <div role="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  
export function slideTo(to, spring) {
  spring.set(window.pageYOffset, false);
  setTimeout(() => {
    spring.set(to);
  }, 50);
}

export function getRelativeCoordinates(event, referenceElement) {
  const position = {
    x: event.pageX,
    y: event.pageY
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2)
  };
} 