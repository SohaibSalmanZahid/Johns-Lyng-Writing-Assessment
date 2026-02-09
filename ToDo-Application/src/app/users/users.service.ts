import { ChangeDetectorRef, DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { type UserModel } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private httpClient = inject(HttpClient);

  loadUsers() {
    return this.httpClient.get<UserModel[]>(`${environment.apiBaseUrl}User`);
  }

  addNewUser(username: string) {
    return this.httpClient.post<UserModel>(`${environment.apiBaseUrl}User`, {
      name: username,
    });
  }
}
