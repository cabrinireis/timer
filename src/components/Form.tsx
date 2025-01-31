import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Stop } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { FormContainer } from "./Form/FomContainer";
import { CountdownContainer } from "./CountdownContainer";
const formValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(1).max(60),
});
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
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextType )

export const Form = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(formValidationSchema),
  });
  function handleCreateNewCycle(data: FieldValues): void {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const task = watch("task");
  const isDisableSubmit = !task;

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
  return (
    <form
      className="flex flex-col items-center gap-12"
      onSubmit={handleSubmit(handleCreateNewCycle)}
      action=""
    >
      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
        <FormContainer />
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
