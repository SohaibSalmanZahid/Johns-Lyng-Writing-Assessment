import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  @Input({ required: true }) userName!: string;

  get todoSubTitile() {
    return this.userName + "'s ToDo List";
  }
}
