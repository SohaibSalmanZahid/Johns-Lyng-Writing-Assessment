import { Component, Input } from '@angular/core';
import { Todo } from './todo/todo';

@Component({
  selector: 'app-todos',
  imports: [Todo],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  @Input({ required: true }) userName!: string;
  @Input({ required: true }) userId!: string;

  get todoSubTitile() {
    return this.userName + "'s ToDo List: ";
  }
}
