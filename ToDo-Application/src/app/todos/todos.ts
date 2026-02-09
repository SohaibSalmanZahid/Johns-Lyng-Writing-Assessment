import {
  Component,
  DestroyRef,
  inject,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { Todo } from './todo/todo';
import { AddNewTodo } from './add-new-todo/add-new-todo';
import { NewToDo, ToDoTask } from './todo.model';
import { TodosService } from './todos.service';
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

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private todosService = inject(TodosService);

  isAddingNewTask = false;
  tasks: ToDoTask[] = [];
  errorMessage = '';
  isLoadingTask = false;
  isDeletingTask = false;
  isAddingTask = false;

  ngOnInit() {
    this.loadUserTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && !changes['selectedUser'].firstChange) {
      this.tasks = [];
      this.loadUserTasks();
    }
  }

  private loadUserTasks() {
    this.isLoadingTask = true;
    const subscription = this.todosService.loadUserTasks(this.userId).subscribe({
      next: (resData) => {
        this.tasks = resData;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.errorMessage = 'Something went wrong loading user tasks. Please try again later!';
        console.log(e.message);
      },
      complete: () => {
        this.isLoadingTask = false;
        this.cdr.detectChanges();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get todoSubTitle() {
    return this.userName + "'s ToDo List: ";
  }

  get selectedUserTasks() {
    return this.tasks;
  }

  onCompleteTask(taskId: string) {
    this.isDeletingTask = true;
    this.todosService.completeUserTask(taskId).subscribe({
      error: (e) => {
        this.errorMessage = 'Something went wrong completing task. PLease try again later!';
        console.log(e.message);
      },
      complete: () => {
        this.isDeletingTask = false;
        this.cdr.markForCheck();
      },
    });

    this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
  }

  onStartAddNewToDo() {
    this.isAddingNewTask = true;
  }

  onCancelTask() {
    this.isAddingNewTask = false;
  }

  onSubmitNewTask(newTodo: NewToDo) {
    this.isAddingNewTask = true;
    this.todosService
      .addNewUserTask(this.userId, newTodo.taskDescription, newTodo.dueDate, newTodo.createdAt)
      .subscribe({
        next: (resData) => {
          this.tasks = [...this.tasks, resData];
          this.cdr.markForCheck();
        },
        error: (e) => {
          this.errorMessage = 'Something went wrong adding the new task. Please try again later!';
          console.log(e.message);
        },
        complete: () => {
          this.isAddingNewTask = false;
          this.cdr.markForCheck();
        },
      });
    this.isAddingNewTask = false;
  }
}
