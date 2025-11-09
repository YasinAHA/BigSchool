"use client";

import { useMemo, useState } from "react";
import { deleteTask, toggleTask, type Task } from "./actions";

type Filter = "all" | "pending" | "completed";

const filterLabels: Record<Filter, string> = {
  all: "Todas",
  pending: "Pendientes",
  completed: "Completadas",
};

function filterTasks(tasks: Task[], filter: Filter) {
  if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const pendingCount = useMemo(
    () => tasks.reduce((count, task) => (task.completed ? count : count + 1), 0),
    [tasks],
  );

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">{`${pendingCount} pendientes de ${tasks.length}`}</h2>
        <div className="flex gap-2">
          {(Object.keys(filterLabels) as Filter[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-md border px-3 py-1 text-sm font-medium transition-colors ${
                filter === key
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-black"
              }`}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>
      </header>

      <ul className="flex flex-col gap-3" aria-live="polite">
        {filteredTasks.length === 0 ? (
          <li className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
            No hay tareas para mostrar.
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <form action={toggleTask}>
                  <input type="hidden" name="id" value={task.id} />
                  <input
                    type="checkbox"
                    aria-label={`Marcar la tarea "${task.title}" como ${
                      task.completed ? "pendiente" : "completada"
                    }`}
                    className="h-4 w-4 cursor-pointer"
                    checked={task.completed}
                    onChange={(event) => {
                      event.currentTarget.form?.requestSubmit();
                    }}
                  />
                </form>
                <span className={`text-sm ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                  {task.title}
                </span>
              </div>
              <form action={deleteTask}>
                <input type="hidden" name="id" value={task.id} />
                <button
                  type="submit"
                  aria-label={`Eliminar la tarea "${task.title}"`}
                  className="rounded-md border border-transparent bg-red-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Eliminar
                </button>
              </form>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
