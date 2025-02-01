import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Stop } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod'
import { FormContainer } from "./Form/FomContainer";
import { CountdownContainer } from "./CountdownContainer";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date,
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export const CyclesContext = createContext({} as CycleContextType )
type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export const Form = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }


  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
 
  const task = watch("task");
  const isDisableSubmit = !task;

  
  return (
    <form
      className="flex flex-col items-center gap-12"
      onSubmit={handleSubmit(handleCreateNewCycle)}
      action=""
    >
      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed,}}>
        <FormProvider {...newCycleForm}>
          <FormContainer />
        </FormProvider>
        <CountdownContainer />
      </CyclesContext.Provider>
      {!activeCycle ?
      <button
        className="w-full border-0 p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-green-500 text-white hover:bg-green-700 disabled:bg-gray-500"
        disabled={isDisableSubmit}
        type="submit"
      >
        <Play size={24} />
        Começar
      </button>
      :
      <button
        className="w-full border-0 p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-red-500 text-white hover:bg-red-700"
        onClick={handleInterruptCycle}
      >
        <Stop size={24} />
        Stop
      </button>
      }
    </form>
  );
};
