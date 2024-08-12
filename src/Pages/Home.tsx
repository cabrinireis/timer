import { Play } from "phosphor-react";
export function Home() {
  return (
    <main className="flex flex-1 items-center justify-center flex-col">
      <form className="flex flex-col items-center gap-12">
        <div className="w-full  flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            className="bg-transparent h-10 border-0 border-b-2 flex-1 border-gray-500 font-bold text-xl px-2  text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none"
            id="task"
          />

          <label htmlFor="minutesAmount">durante</label>
          <input
            className="bg-transparent h-10 border-0 border-b-2 w-[4rem] border-gray-500 font-bold text-xl px-2 text-gray-100 focus:border-b-green-500 focus:[box-shadow:none] focus:outline-none"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </div>

        <div className="flex gap-4 text-gray-100 text-[10rem] font-mono">
          <span className="bg-gray-700 py-16 px-4 rounded-lg">0</span>
          <span className="bg-gray-700 py-16 px-4 rounded-lg">0</span>
          <div className="py-12 px-0 text-green-500 overflow-hidden flex justyfy-center">
            :
          </div>
          <span className="bg-gray-700 py-16 px-4 rounded-lg">0</span>
          <span className="bg-gray-700 py-16 px-4 rounded-lg">0</span>
        </div>

        <button
          className="w-full border-0 p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-green-500 text-white hover:bg-blue-700"
          disabled
          type="submit"
        >
          <Play size={24} />
          Começar
        </button>
      </form>
    </main>
  );
}
