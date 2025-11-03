import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateUserCommand,
  GetCurrentUserResponse,
  GetUsersQuery,
  GridDataResponseOfUserListModel,
  RegisterUserCommand,
  Result,
  RoleModel,
  ToggleUserActiveStateCommand,
  UpdateCurrentUserCommand,
  UpdateUserCommand,
  UserModel,
} from '../nswag/api-nswag-client';
import { ApiBaseService } from './api-base.service';
import { ApiToastOptions } from './models/api-toast-options';

@Injectable({
  providedIn: 'root',
})
export default class UsersApiService extends ApiBaseService {
  getUsers(query: GetUsersQuery, options: ApiToastOptions = {}): Observable<GridDataResponseOfUserListModel> {
    return this.apiClient.getUsers(query).pipe(this.handleDataResult(options));
  }
  getUser(id: string, options: ApiToastOptions = {}): Observable<UserModel> {
    return this.apiClient.getUser(id).pipe(this.handleDataResult(options));
  }
  getCurrentUser(options: ApiToastOptions = {}): Observable<GetCurrentUserResponse> {
    return this.apiClient.getCurrentUser().pipe(this.handleDataResult(options));
  }
  deleteUser(id: string, options: ApiToastOptions = {}): Observable<Result> {
    return this.apiClient.deleteUser(id).pipe(this.handleResult(options));
  }
  getAllRoles(options: ApiToastOptions = {}): Observable<RoleModel[]> {
    return this.apiClient.getAllRoles().pipe(this.handleDataResult(options));
  }
  toggleUserActiveState(
    command: ToggleUserActiveStateCommand,
    options: ApiToastOptions = {}
  ): Observable<Result> {
    return this.apiClient.toggleActiveUser(command).pipe(this.handleResult(options));
  }

  createUser(command: CreateUserCommand, options: ApiToastOptions = {}): Observable<string> {
    return this.apiClient.createUser(command).pipe(this.handleDataResult(options));
  }

  udpateUser(userId: string, command: UpdateUserCommand, options: ApiToastOptions = {}): Observable<string> {
    return this.apiClient.updateUser(userId, command).pipe(this.handleDataResult(options));
  }

  udpateCurrentUser(command: UpdateCurrentUserCommand, options: ApiToastOptions = {}): Observable<string> {
    return this.apiClient.updateCurrentUser(command).pipe(this.handleDataResult(options));
  }

  registerUser(command: RegisterUserCommand, options: ApiToastOptions = {}): Observable<string> {
    return this.apiClient.registerUser(command).pipe(this.handleDataResult(options));
  }
}
