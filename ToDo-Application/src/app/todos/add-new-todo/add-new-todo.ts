import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewToDo } from '../todo.model';

@Component({
  selector: 'app-add-new-todo',
  imports: [FormsModule],
  templateUrl: './add-new-todo.html',
  styleUrl: './add-new-todo.css',
})
export class AddNewTodo {
  @Input({ required: true }) selectedUserId!: string;
  @Output() cancelTask = new EventEmitter();
  @Output() addTodoTask = new EventEmitter<NewToDo>();

  enteredTodo = '';
  enteredDueDate = '';

  onCancelTask() {
    this.cancelTask.emit(false);
  }

  onSubmitNewTask() {
    return this.addTodoTask.emit({
      taskDescription: this.enteredTodo,
      createdAt:
        new Date().getDate().toString() +
        '-' +
        new Date().getMonth().toString() +
        '-' +
        new Date().getFullYear().toString(),
      dueDate: this.enteredDueDate,
    });
  }
}
