export const FormContainer = () =>{
    return (
        <div className="w-full  flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
        <label htmlFor="task">Vou trabalhar em</label>
        <input
          className="bg-transparent h-10 border-0 border-b-2 flex-1 border-gray-500 font-bold text-xl px-2  text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none"
          id="task"
          type="text"
          disabled={!!activeCycle}
          {...register("task")}
        />

        <label htmlFor="minutesAmount">durante</label>
        <input
          className="bg-transparent h-10 border-0 border-b-2 w-[4rem] border-gray-500 font-bold text-xl px-2 text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none -moz-appearance:textfield"
          type="number"
          id="minutesAmount"
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </div>
    )
}