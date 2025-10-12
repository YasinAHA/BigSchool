class Task:
    def __init__(self, id, title, description, completed=False):
        self.id = id
        self.title = title
        self.description = description
        self.completed = completed

    def mark_completed(self):
        self.completed = True

    def __str__(self):
        status = "Completed" if self.completed else "Pending"
        return (
            f"Task: {self.title}\n"
            f"Description: {self.description}\n"
            f"Status: {status}"
        )


class TaskManager:
    def __init__(self):
        self._tasks = []
        self._next_id = 1

    def add_task(self, title, description):
        task = Task(self._next_id, title, description)
        self._tasks.append(task)
        self._next_id += 1
        print(f"Task '{title}' added with ID {task.id}.")

    def list_tasks(self):
        if not self._tasks:
            print("No tasks available.")
            return
        for task in self._tasks:
            print(f"ID: {task.id} - {task}")
            print("-" * 20)

    def complete_task(self, task_id):
        for task in self._tasks:
            if task.id == task_id:
                task.mark_completed()
                print(f"Task ID {task_id} marked as completed.")
                return
        print(f"Task ID {task_id} not found.")

    def delete_task(self, task_id):
        for task in self._tasks:
            if task.id == task_id:
                self._tasks.remove(task)
                print(f"Task ID {task_id} deleted.")
                return
        print(f"Task ID {task_id} not found.")

    # Add a persistent method to save tasks to a file
    # and load tasks from a file for future enhancements. (JSON)

    def save_tasks(self, filename):
        import json

        with open(filename, "w") as f:
            json.dump(
                [
                    {
                        "id": task.id,
                        "title": task.title,
                        "description": task.description,
                        "completed": task.completed,
                    }
                    for task in self._tasks
                ],
                f,
                indent=4,
            )

    def load_tasks(self, filename):
        import json
        import os

        if not os.path.exists(filename):
            print(f"No saved tasks found in {filename}.")
            return

        with open(filename, "r") as f:
            tasks_data = json.load(f)
            self._tasks = [
                Task(
                    data["id"],
                    data["title"],
                    data["description"],
                    data["completed"],
                )
                for data in tasks_data
            ]
            if self._tasks:
                self._next_id = max(task.id for task in self._tasks) + 1
            else:
                self._next_id = 1
        print(f"Loaded {len(self._tasks)} tasks from {filename}.")


""" if __name__ == "__main__":
    manager = TaskManager()
    manager.add_task("Buy groceries", "Milk, Bread, Eggs")
    manager.add_task("Read book", "Finish reading '1984'")
    manager.list_tasks()
    manager.complete_task(1)
    manager.list_tasks()
    manager.delete_task(2)
    manager.list_tasks()
 """
# The above block is commented out to prevent execution during imports.