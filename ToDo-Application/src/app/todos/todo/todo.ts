import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type ToDoTask } from './todo.model';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  @Input({ required: true }) todoTask!: ToDoTask;
  @Output() taskCompleted = new EventEmitter();

  onCompleteTask() {
    return this.taskCompleted.emit(this.todoTask.taskId);
  }
}
