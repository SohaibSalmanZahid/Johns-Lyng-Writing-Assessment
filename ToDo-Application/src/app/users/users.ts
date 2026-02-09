import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { AddUser } from './add-user/add-user';
import { UsersList } from './users-list/users-list';
import { UserModel } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user',
  imports: [AddUser, UsersList],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private usersService = inject(UsersService);

  users: UserModel[] = [];
  selectedUser?: UserModel;
  isFetchingUsers = false;
  isAddingUser = false;
  errorMessage = '';

  @Output() currentUser = new EventEmitter();

  ngOnInit() {
    this.isFetchingUsers = true;
    const subscription = this.usersService.loadUsers().subscribe({
      next: (resData) => {
        this.users = resData;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.errorMessage = 'Something went wrong fetching Users. Please try again later!';
        console.log(e.message);
        this.isFetchingUsers = false;
      },
      complete: () => {
        this.isFetchingUsers = false;
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get userAvailable() {
    return this.users.length;
  }

  onNewUser(username: string) {
    this.errorMessage = '';
    this.isAddingUser = true;
    this.usersService.addNewUser(username).subscribe({
      next: (resData) => {
        this.users = [...this.users, resData];
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.errorMessage = 'Something went wrong adding a new user. Please try again later!';
        console.log(error.message);
        this.cdr.detectChanges();
      },
      complete: () => {
        this.isAddingUser = false;
      },
    });
  }

  onSelectUser(user: UserModel) {
    const newuser = this.users.find((nuser) => nuser.userId === user.userId);
    if (newuser) {
      this.selectedUser = newuser;
      this.currentUser.emit(user);
    }
  }
}
