import he from 'he'

export async function fetchData(route) {
  const DIRECTUS_API = process.env.DIRECTUS_CUSTOM_ENDPOINT
  const res = await fetch(`${DIRECTUS_API + route}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const resJson = await res.json()

  if (resJson.errors) throw resJson.errors
  return resJson
}

export function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function slideTo(to, spring) {
  spring.set(window.pageYOffset, false)
  setTimeout(() => {
    spring.set(to)
  }, 50)
}

export function getRelativeCoordinates(eventPageX, eventPageY, referenceElement) {
  if (!referenceElement) return

  const position = {
    x: eventPageX,
    y: eventPageY
  }

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight
  }

  let reference = referenceElement.offsetParent

  while (reference) {
    offset.left += reference.offsetLeft
    offset.top += reference.offsetTop
    reference = reference.offsetParent
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top
  }
}

export const setRefs = (el, ref, dataLength) => {
  if (ref.current.length === dataLength) return
  ref.current.push(el)
}

export const genRandomPos = (viewW, topic1, route) => {
  const randomRange = route.startsWith('/article-journal')
    ? (viewW / 9) * 4
    : route === '/'
    ? (viewW / 9) * 4
    : viewW - 300
  return topic1?.map((item, i) => {
    return { x: parseInt(Math.random() * randomRange), y: 200 * i }
  })
}

export const getWindowDimensions = () => {
  if (typeof window === 'undefined') return
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

export const toggleOpen = (id, isOpen, setOpen) => {
  if (isOpen.includes(id)) {
    if (isOpen.indexOf(id) > -1) setOpen((isOpen) => isOpen.splice(id, 1))
  } else {
    setOpen((isOpen) => {
      return [...isOpen, id]
    })
  }
}

/**
 * 此component已經是一單位node，也就是遍歷是在上層；initialPath裡面直接針對某node畫svg
 */
export function initialPath(nodeRefs, pathRefs, nodePosRefs, allElementsData) {
  // NOTE: to check all TAIL connected svg
  allElementsData?.forEach((elem) => {
    if (!elem?.connectors.length) return

    elem.connectors?.forEach((lineObj) => {
      // 找出此node的在陣列中的資料，為了要取得此node_pos
      const selfHandleIndex = nodeRefs.current?.findIndex(
        (handle) => handle?.getAttribute('id') === elem.id.toString()
      )

      const HandleConnectToID = lineObj.connected_node.toString()

      // 找出此尾端連接的node的在陣列中的資料，為了要取得連接的node_pos
      const HandleConnectToIndex = nodeRefs.current?.findIndex(
        (handle) => handle?.getAttribute('id') === HandleConnectToID
      )

      // 找出此svg的在陣列中的資料，為了要填入此svg的座標
      const tailSvgIndex = pathRefs.current.findIndex(
        (path) => path?.getAttribute('id') === `${elem.id}-${HandleConnectToID}`
      )

      if (HandleConnectToIndex === -1 || tailSvgIndex === -1) return

      let x1 = nodePosRefs.current[selfHandleIndex]?.x
      let y1 = nodePosRefs.current[selfHandleIndex]?.y
      let x2 = nodePosRefs.current[HandleConnectToIndex]?.x
      let y2 = nodePosRefs.current[HandleConnectToIndex]?.y

      let data = `M${x1} ${y1} L ${x2} ${y2}`
      pathRefs.current[tailSvgIndex]?.setAttribute('d', data)
      // console.log("tailSvgIndex:", tailSvgIndex)
      // console.log("pathRef:", pathRefs.current[tailSvgIndex])
    })
  })
}

export function updatePath(
  draggedIndex,
  draggedID,
  allElementsData,
  nodeRefs,
  pathRefs,
  nodePosRefs
) {
  // deal with just TAIL
  allElementsData[draggedIndex]?.connectors?.forEach((lineObj) => {
    const selfHandleIndex = draggedIndex
    const HandleConnectToID = lineObj.connected_node.toString()
    const HandleConnectToIndex = nodeRefs.current?.findIndex(
      (handle) => handle?.getAttribute('id') === HandleConnectToID
    )

    const tailSvgIndex = pathRefs.current?.findIndex((path) => {
      return path?.getAttribute('id') === `${draggedID}-${HandleConnectToID}`
    })

    if (HandleConnectToIndex === -1 || tailSvgIndex === -1) return

    let x1 = nodePosRefs.current[selfHandleIndex].x
    let y1 = nodePosRefs.current[selfHandleIndex].y
    let x2 = nodePosRefs.current[HandleConnectToIndex].x
    let y2 = nodePosRefs.current[HandleConnectToIndex].y
    let data = `M${x1} ${y1} L ${x2} ${y2}`
    pathRefs.current[tailSvgIndex]?.setAttribute('d', data)
  })

  // check all HEAD connected svg
  allElementsData?.forEach((elem) => {
    elem.connectors?.forEach((lineObj) => {
      if (lineObj.connected_node === draggedID) {
        const selfHandleIndex = nodeRefs.current?.findIndex(
          (handle) => handle?.getAttribute('id') === draggedID.toString()
        )
        const HandleConnectToIndex = nodeRefs.current?.findIndex(
          (handle) => handle?.getAttribute('id') === elem.id.toString()
        )

        const headSvgIndex = pathRefs.current.findIndex(
          (path) => path?.getAttribute('id') === `${elem.id}-${draggedID}`
        )

        if (HandleConnectToIndex === -1 || headSvgIndex === -1) return

        let x1 = nodePosRefs.current[selfHandleIndex].x
        let y1 = nodePosRefs.current[selfHandleIndex].y
        let x2 = nodePosRefs.current[HandleConnectToIndex].x
        let y2 = nodePosRefs.current[HandleConnectToIndex].y

        let data = `M${x1} ${y1} L ${x2} ${y2}`
        pathRefs.current[headSvgIndex]?.setAttribute('d', data)
      }
    })
  })
}

export function createMarkup(htmlStr, className) {
  if (className === 'en') return { __html: htmlStr }

  // Convert common HTML entities to characters
  const decodedStr = he.decode(htmlStr)

  const handleEnContent = decodedStr.replace(
    /(<a[^>]*>.*?<\/a>)|(<[^>]*>)|(&nbsp;)|(\b[A-Za-z]+(?:['']\w+)*(?:[-&,;:.!?()[\]/"\s](?![<>])(?:[A-Za-z]+(?:['']\w+)*)?)*\b)/g,
    (match, anchor, tag, nbsp, phrase) => {
      if (anchor) return anchor // Return full anchor tags as-is
      if (tag) return tag // Return other HTML tags as-is
      if (nbsp) return '<br />' // Replace &nbsp; with a line break
      if (phrase) return `<span class="en-term">${phrase}</span>` // Wrap English phrases
      return match // Return other matches as-is
    }
  )
  return { __html: handleEnContent }
}
export const sortAgenda = (filter, filterData, data) => {
  if (filter.length === 0) return data

  const timeFilter = filter.filter((item) => filterData[item].type === 'time')
  const formFilter = filter.filter((item) => filterData[item].type === 'form')
  const languageFilter = filter.filter((item) => filterData[item].type === 'language')

  return data.filter((item) => {
    const matchesTime = timeFilter.length === 0 || timeFilter.includes(item.status)
    const matchesForm = formFilter.length === 0 || formFilter.includes(item.type)
    const matchesLanguage =
      languageFilter.length === 0 || languageFilter.some((lang) => item.language.includes(lang))
    return matchesTime && matchesForm && matchesLanguage
  })
}
