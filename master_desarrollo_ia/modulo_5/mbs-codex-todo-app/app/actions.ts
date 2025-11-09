"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import type { Task } from "../types/task";

// Tareas de ejemplo para que la app muestre contenido al abrirla.
// Mantener en memoria (demo simple). Para producción usaría una BD o persistencia.
let tasks: Task[] = [
  { id: randomUUID(), title: "Comprar leche", completed: false },
  { id: randomUUID(), title: "Aprender los básicos de Next.js", completed: true },
];

export async function getTasks() {
  return tasks;
}

export async function createTask(formData: FormData) {
  const rawTitle = formData.get("title");
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";

  if (!title) {
    return;
  }

  const newTask: Task = {
    id: randomUUID(),
    title,
    completed: false,
  };

  tasks = [newTask, ...tasks];
  revalidatePath("/");
}

export async function toggleTask(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") {
    return;
  }

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") {
    return;
  }

  tasks = tasks.filter((task) => task.id !== id);
  revalidatePath("/");
}
