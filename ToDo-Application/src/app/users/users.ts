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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [AddUser, UsersList],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  users: UserModel[] = [];
  selectedUser?: UserModel;

  @Output() currentUser = new EventEmitter();

  ngOnInit() {
    const subscription = this.httpClient
      .get<UserModel[]>('http://localhost:5050/api/User')
      .subscribe({
        next: (resData) => {
          this.users = resData;
          this.cdr.detectChanges();
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
    this.httpClient
      .post<UserModel>('http://localhost:5050/api/User', {
        name: username,
      })
      .subscribe({
        next: (resData) => {
          this.users = [...this.users, resData];
          this.cdr.markForCheck();
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
