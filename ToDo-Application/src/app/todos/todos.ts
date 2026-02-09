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
import { NewToDoModel, ToDoTaskModel } from './todo.model';
import { TodosService } from './todos.service';
import { Subscription } from 'rxjs';
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
  private loadTasksSubscription?: Subscription;

  isAddingNewTask = false;
  tasks: ToDoTaskModel[] = [];
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
    if (this.loadTasksSubscription) {
      this.loadTasksSubscription.unsubscribe();
    }

    this.isLoadingTask = true;
    const loadTasksSubscription = this.todosService.loadUserTasks(this.userId).subscribe({
      next: (resData) => {
        this.tasks = resData;
        this.isLoadingTask = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.errorMessage =
          'Something went wrong while fetching user tasks. Please try again later!';
        console.log(e.message);
        this.isLoadingTask = false;
        this.cdr.detectChanges();
      },
    });

    this.destroyRef.onDestroy(() => {
      this.loadTasksSubscription?.unsubscribe();
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
        this.errorMessage = 'Something went wrong while completing task. PLease try again later!';
        console.log(e.message);
        this.cdr.detectChanges();
      },
      complete: () => {
        this.isDeletingTask = false;
        this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
        this.cdr.markForCheck();
      },
    });
  }

  onStartAddNewToDo() {
    this.isAddingNewTask = true;
  }

  onCancelTask() {
    this.isAddingNewTask = false;
  }

  onSubmitNewTask(newTodo: NewToDoModel) {
    this.isAddingNewTask = true;
    this.todosService
      .addNewUserTask(this.userId, newTodo.taskDescription, newTodo.dueDate, newTodo.createdAt)
      .subscribe({
        next: (resData) => {
          this.tasks = [...this.tasks, resData];
          this.isAddingNewTask = false;
          this.cdr.detectChanges();
        },
        error: (e) => {
          this.errorMessage =
            'Something went wrong while adding the new task. Please try again later!';
          console.log(e.message);
          this.isAddingNewTask = false;
          this.cdr.detectChanges();
        },
      });
    this.isAddingNewTask = false;
  }
}
