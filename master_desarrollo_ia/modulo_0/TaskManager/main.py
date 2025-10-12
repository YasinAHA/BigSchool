def show_menu():
    print("\nTask Manager")
    print("1. Add Task")
    print("2. List Tasks")
    print("3. Complete Task")
    print("4. Delete Task")
    print("5. Exit")
    print("6. Save Tasks")
    print("7. Load Tasks")
    print("8. Break Down Task (AI)")


def get_int_input(prompt):
    try:
        return int(input(prompt))
    except ValueError:
        print("Invalid ID. Please enter a number.")
        return None


def add_task(manager):
    title = input("Enter task title: ")
    description = input("Enter task description: ")
    manager.add_task(title, description)


def list_tasks(manager):
    manager.list_tasks()


def complete_task(manager):
    task_id = get_int_input("Enter task ID to complete: ")
    if task_id is not None:
        manager.complete_task(task_id)


def delete_task(manager):
    task_id = get_int_input("Enter task ID to delete: ")
    if task_id is not None:
        manager.delete_task(task_id)


def save_tasks(manager):
    filename = input("Enter filename to save tasks: ")
    manager.save_tasks(filename)
    print(f"Tasks saved to {filename}.")


def load_tasks(manager):
    filename = input("Enter filename to load tasks from: ")
    manager.load_tasks(filename)
    print(f"Tasks loaded from {filename}.")


def break_down_task_ai():
    from ai_service import create_simple_tasks
    task = input("Enter a task to break down: ")
    result = create_simple_tasks(task)
    print("\nAI-generated breakdown:")
    print(result)


def main():
    from task_manager import TaskManager

    manager = TaskManager()
    actions = {
        "1": add_task,
        "2": list_tasks,
        "3": complete_task,
        "4": delete_task,
        "6": save_tasks,
        "7": load_tasks,
        "8": lambda m: break_down_task_ai()
    }
    while True:
        show_menu()
        choice = get_int_input("Choose an option: ")
        if choice == 5:
            print("Exiting Task Manager.")
            break
        action = actions.get(str(choice))
        if action:
            action(manager)
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
