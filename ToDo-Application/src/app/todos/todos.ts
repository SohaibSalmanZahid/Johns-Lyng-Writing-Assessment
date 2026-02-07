import { Component, Input } from '@angular/core';
import { Todo } from './todo/todo';
import { DUMMY_TODOS } from './DUMMY_TODOS';
import { AddNewTodo } from './add-new-todo/add-new-todo';
import { NewToDo } from './todo.model';

@Component({
  selector: 'app-todos',
  imports: [Todo, AddNewTodo],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  @Input({ required: true }) userName!: string;
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) selectedUser!: string;
  isAddingNewTask = false;

  tasks = DUMMY_TODOS;

  get todoSubTitle() {
    return this.userName + "'s ToDo List: ";
  }

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.selectedUser);
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
  }

  onStartAddNewToDo() {
    this.isAddingNewTask = true;
  }

  onCancelTask() {
    this.isAddingNewTask = false;
  }

  onSubmitNewTask(newTodo: NewToDo) {
    this.tasks.unshift({
      taskId: new Date().getMilliseconds().toString(),
      userId: this.selectedUser,
      taskDescription: newTodo.taskDescription,
      createdAt: newTodo.createdAt,
      dueDate: newTodo.dueDate,
    });
    this.isAddingNewTask = false;
  }
}
