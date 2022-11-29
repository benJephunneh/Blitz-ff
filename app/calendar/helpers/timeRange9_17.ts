const timeRange9_17 = () => {
  const timeArray: number[] = []
  for (let ii = 0; ii <= 16; ii++) {
    // to 16 because there are 16+1 half-hour segments from 9-17.
    const nextTime = 900 + (ii % 2 === 0 ? (ii / 2) * 100 : Math.floor(ii / 2) * 100 + 30)
    timeArray.push(nextTime)
  }

  return timeArray
}

export default timeRange9_17
