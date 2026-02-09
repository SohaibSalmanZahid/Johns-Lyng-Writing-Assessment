import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type ToDoTaskModel } from '../todo.model';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  @Input({ required: true }) todoTask!: ToDoTaskModel;
  @Output() taskCompleted = new EventEmitter();

  onCompleteTask() {
    return this.taskCompleted.emit(this.todoTask.taskId);
  }
}
