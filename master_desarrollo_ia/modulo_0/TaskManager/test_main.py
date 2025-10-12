import unittest
from unittest.mock import MagicMock, patch

from main import (
    add_task,
    break_down_task_ai,
    complete_task,
    delete_task,
    get_int_input,
    list_tasks,
    load_tasks,
    save_tasks,
    show_menu,
)


class TestMainModule(unittest.TestCase):
    @patch("builtins.print")
    def test_show_menu_prints_menu(self, mock_print):
        show_menu()
        mock_print.assert_any_call("\nTask Manager")
        mock_print.assert_any_call("1. Add Task")
        mock_print.assert_any_call("8. Break Down Task (AI)")
        self.assertEqual(mock_print.call_count, 8)

    @patch("builtins.input", return_value="42")
    def test_get_int_input_valid(self, mock_input):
        result = get_int_input("Prompt: ")
        self.assertEqual(result, 42)

    @patch("builtins.input", return_value="notanumber")
    @patch("builtins.print")
    def test_get_int_input_invalid(self, mock_print, mock_input):
        result = get_int_input("Prompt: ")
        self.assertIsNone(result)
        mock_print.assert_called_with("Invalid ID. Please enter a number.")

    @patch("builtins.input", side_effect=["Title", "Description"])
    def test_add_task_calls_manager(self, mock_input):
        manager = MagicMock()
        add_task(manager)
        manager.add_task.assert_called_once_with("Title", "Description")

    def test_list_tasks_calls_manager(self):
        manager = MagicMock()
        list_tasks(manager)
        manager.list_tasks.assert_called_once()

    @patch("builtins.input", return_value="1")
    def test_complete_task_valid(self, mock_input):
        manager = MagicMock()
        complete_task(manager)
        manager.complete_task.assert_called_once_with(1)

    @patch("builtins.input", return_value="notanumber")
    @patch("builtins.print")
    def test_complete_task_invalid(self, mock_print, mock_input):
        manager = MagicMock()
        complete_task(manager)
        manager.complete_task.assert_not_called()
        mock_print.assert_called_with("Invalid ID. Please enter a number.")

    @patch("builtins.input", return_value="2")
    def test_delete_task_valid(self, mock_input):
        manager = MagicMock()
        delete_task(manager)
        manager.delete_task.assert_called_once_with(2)

    @patch("builtins.input", return_value="notanumber")
    @patch("builtins.print")
    def test_delete_task_invalid(self, mock_print, mock_input):
        manager = MagicMock()
        delete_task(manager)
        manager.delete_task.assert_not_called()
        mock_print.assert_called_with("Invalid ID. Please enter a number.")

    @patch("builtins.input", return_value="tasks.json")
    @patch("builtins.print")
    def test_save_tasks(self, mock_print, mock_input):
        manager = MagicMock()
        save_tasks(manager)
        manager.save_tasks.assert_called_once_with("tasks.json")
        mock_print.assert_called_with("Tasks saved to tasks.json.")

    @patch("builtins.input", return_value="tasks.json")
    @patch("builtins.print")
    def test_load_tasks(self, mock_print, mock_input):
        manager = MagicMock()
        load_tasks(manager)
        manager.load_tasks.assert_called_once_with("tasks.json")
        mock_print.assert_called_with("Tasks loaded from tasks.json.")

    @patch("builtins.input", return_value="Breakdown task")
    @patch("ai_service.create_simple_tasks", return_value="Subtasks")
    @patch("builtins.print")
    def test_break_down_task_ai(self, mock_print, mock_create):
        break_down_task_ai()
        mock_create.assert_called_once_with("Breakdown task")
        mock_print.assert_any_call("\nAI-generated breakdown:")
        mock_print.assert_any_call("Subtasks")


if __name__ == "__main__":
    unittest.main()
