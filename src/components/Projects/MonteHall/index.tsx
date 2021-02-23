import * as React from 'react'
import { Button } from '@chakra-ui/react'

interface DoorParams {
  num: string
  win: boolean
  firstPick: boolean
  onClick: () => void
}

// const zonk = 'https://upload.wikimedia.org/wikipedia/en/a/a6/2009lmadzonkgoat.jpg'

const Door = ({ num, win, firstPick, onClick }: DoorParams) => {
  React.useEffect(() => {}, [])
  return (
    <>
      {firstPick && win ? (
        <p>Super Lucky!</p>
      ) : (
        <Button onClick={onClick}>Door #{num}</Button>
      )}
    </>
  )
}

const MonteHall = () => {
  const [pick, setPick] = React.useState<number | null>(null)
  const doors = ['1', '2', '3']
  const win = Math.floor(Math.random() * doors.length - 1)
  const goats = doors.filter((a) => a !== doors[win])
  return (
    <>
      {pick ? (
        <>
          <p>
            You've selected Door #{doors[pick]}. Here is some additional info...
          </p>
          <p>
            You did not select Door #{goats.find((a) => a !== doors[pick])}{' '}
            which happens to be a goat.
          </p>
          <p>Would you like to reconsider your selection?</p>
        </>
      ) : (
        <p>Pick a door</p>
      )}
      {doors.map((num: string, i: number) => {
        return (
          <Door
            num={num}
            win={i === win}
            firstPick={pick ? true : false}
            onClick={() => setPick(i)}
          />
        )
      })}
    </>
  )
}

export default MonteHall
