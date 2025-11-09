"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

let tasks: Task[] = [];

export function getTasks() {
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
