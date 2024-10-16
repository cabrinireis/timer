import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "phosphor-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const formValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(5).max(60),
});
type NewCycleFormData = z.infer<typeof formValidationSchema>;
interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}
export const Form = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(formValidationSchema),
  });
  function handleCreateNewCycle(data: FieldValues): void {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  const task = watch("task");
  const isDisableSubmit = !task;
  return (
    <form
      className="flex flex-col items-center gap-12"
      onSubmit={handleSubmit(handleCreateNewCycle)}
      action=""
    >
      <div className="w-full  flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
        <label htmlFor="task">Vou trabalhar em</label>
        <input
          className="bg-transparent h-10 border-0 border-b-2 flex-1 border-gray-500 font-bold text-xl px-2  text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none"
          id="task"
          type="text"
          {...register("task")}
        />

        <label htmlFor="minutesAmount">durante</label>
        <input
          className="bg-transparent h-10 border-0 border-b-2 w-[4rem] border-gray-500 font-bold text-xl px-2 text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none -moz-appearance:textfield"
          type="number"
          id="minutesAmount"
          {...register("minutesAmount", { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </div>

      <div className="flex gap-4 text-gray-100 text-[10rem] font-mono">
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{minutes[0]}</span>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{minutes[1]}</span>
        <div className="py-12 px-0 text-green-500 overflow-hidden flex justyfy-center">
          :
        </div>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{seconds[0]}</span>
        <span className="bg-gray-700 py-16 px-4 rounded-lg">{seconds[1]}</span>
      </div>

      <button
        className="w-full border-0 p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-green-500 text-white hover:bg-green-700 disabled:bg-gray-500"
        disabled={isDisableSubmit}
        type="submit"
      >
        <Play size={24} />
        Começar
      </button>
    </form>
  );
};
