import { createTask, getTasks } from "./actions";
import { TaskList } from "./task-list";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Mis tareas</h1>
        <p className="text-sm text-gray-600">
          Añade tareas, márcalas como completadas o elimínalas cuando ya no las
          necesites.
        </p>
        <p className="text-xs text-gray-500">
          Nota: esta demo mantiene las tareas en memoria en el servidor de
          desarrollo y no persiste entre reinicios. Es útil como ejemplo simple.
        </p>
      </header>

      <form action={createTask} className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Nueva tarea
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={1}
            placeholder="Escribe el título de la tarea"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-black"
          />
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Añadir
          </button>
        </div>
      </form>

      <TaskList tasks={tasks} />
    </main>
  );
}
