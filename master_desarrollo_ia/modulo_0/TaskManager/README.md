# TaskManager

A simple command-line Task Manager in Python, with optional AI-powered task breakdown using OpenAI.

## Features

- Add, list, complete, and delete tasks
- Save/load tasks to/from a file (JSON format)
- Break down complex tasks into subtasks using OpenAI (if API key is set)
- Simple menu-driven interface

## Structure

- `main.py`: CLI interface and menu logic
- `task_manager.py`: Task and TaskManager classes, handles all task operations and persistence
- `ai_service.py`: Uses OpenAI API to break down tasks into subtasks
- `test_main.py`: Unit tests for main module functions

## Usage

1. Run `main.py` to start the Task Manager.
2. Follow the menu prompts to manage your tasks.
3. Use "Break Down Task (AI)" to get subtasks for a complex task (requires OpenAI API key in `.env`).

## Requirements

- Python 3.8+
- `openai` and `python-dotenv` packages (for AI features)
- See `requirements.txt` for dependencies

## Example

```
Task Manager
1. Add Task
2. List Tasks
3. Complete Task
4. Delete Task
5. Exit
6. Save Tasks
7. Load Tasks
8. Break Down Task (AI)
```
