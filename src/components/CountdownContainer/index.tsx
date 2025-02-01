import { useContext, useEffect } from "react"
import { CyclesContext } from "../Form"
import { differenceInSeconds } from "date-fns"

export const CountdownContainer = () => {
    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed, amountSecondsPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;


    useEffect(() => {
        let interval: number
    
        if (activeCycle) {
          interval = setInterval(() => {
            const secondsDifference = differenceInSeconds(
              new Date(),
              activeCycle.startDate,
            )
    
            if (secondsDifference >= totalSeconds) {
              markCurrentCycleAsFinished()
    
              setSecondsPassed(totalSeconds)
              clearInterval(interval)
            } else {
                setSecondsPassed(secondsDifference)
            }
          }, 1000)
        }
    
        return () => {
          clearInterval(interval)
        }
      }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

      const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

      const minutesAmount = Math.floor(currentSeconds / 60)
      const secondsAmount = currentSeconds % 60
    
      const minutes = String(minutesAmount).padStart(2, '0')
      const seconds = String(secondsAmount).padStart(2, '0')
    
      useEffect(() => {
        if (activeCycle) {
          document.title = `${minutes}:${seconds}`
        }
      }, [minutes, seconds, activeCycle])


    return (
        <div className="flex gap-4 text-gray-100 text-[10rem] font-mono">
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{minutes[0]}</span>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{minutes[1]}</span>
        <div className="py-12 px-0 text-green-500 overflow-hidden flex justyfy-center">
          :
        </div>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{seconds[0]}</span>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{seconds[1]}</span>
      </div>
    )
}