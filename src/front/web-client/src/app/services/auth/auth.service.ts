import { Injectable } from '@angular/core';
//import { ICurrentUserService } from '@apollo-core/apollo-core-angular-kendo-grid/current-user.interface';
import { ApiBaseService } from '@services/api/api-base.service';
import { AppPermission, ResultOfTokenResponse } from '@services/nswag/api-nswag-client';
import { jwtDecode } from 'jwt-decode';
import {
  BehaviorSubject,
  catchError,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import UsersApiService from '../api/users.api.service';
import { CurrentUserService } from '../current-user.service';

const refreshTokenKey = 'refreshTokenKey';
const currentUserKey = 'currentUserKey';
const currentEmailKey = 'currentEmailKey';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiBaseService  {
  private readonly accessToken$ = new BehaviorSubject<string | undefined>(undefined);
  private permissions$ = new ReplaySubject<AppPermission[]>(1);
  private readonly refreshing$ = new BehaviorSubject<boolean>(false);
  private readonly needsTermsOfUseValidation$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userApiService: UsersApiService
  ) {
    super();
    // Immediately try to see if we can have a token, so that roles are evaluated
    this.getAccessToken().subscribe();
  }

  login(userName: string, password: string): Observable<ResultOfTokenResponse> {
    return this.apiClient
      .authenticate({
        userName,
        password,
      })
      .pipe(
        tap((result) => {
          this.storeTokens(result);
        })
      );
  }

  getAccessToken(): Observable<string | undefined> {
    return this.accessToken$.pipe(
      switchMap((token) => {
        if (!token) {
          return this.refreshToken();
        }

        const data = jwtDecode(token);
        const expirationDate = new Date((data.exp ?? 0) * 1000);
        const dateDiff = expirationDate.getTime() - new Date().getTime();
        const isTokenValid = dateDiff > 5000;

        // If less than 5 seconds before expiry
        if (!isTokenValid) {
          return this.refreshToken();
        }

        return of(token);
      }),
      take(1)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.getAccessToken().pipe(map((token) => !!token));
  }

  needsTermsOfUseValidation(): Observable<boolean> {
    return this.needsTermsOfUseValidation$.pipe(take(1));
  }

  termsOfUseValidated(): void {
    this.needsTermsOfUseValidation$.next(false);
  }

  getPermissions(): Observable<AppPermission[]> {
    return this.permissions$;
  }

  isAdmin(): Observable<boolean> {
    return this.permissions$.pipe(
      take(1),
      map((perms) => perms.includes('superAdmin'))
    );
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(currentUserKey);
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(currentEmailKey);
  }

  logout(): void {
    this.accessToken$.next(undefined);
    this.refreshing$.next(false);
    this.needsTermsOfUseValidation$.next(false);
    this.permissions$ = new ReplaySubject<AppPermission[]>(1);
    this.currentUserService.changeCurrentUserName('');
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(currentUserKey);
  }

  private refreshToken(): Observable<string | undefined> {
    if (this.refreshing$.value) {
      return this.refreshing$.pipe(
        filter((r) => !r), // Wait until other refresh has happened
        switchMap(() => this.accessToken$)
      );
    }
    this.refreshing$.next(true);
    const refreshToken = this.getRefreshToken();
    const userName = this.getCurrentUser();
    if (!refreshToken || !userName) {
      this.logout();
      return of(undefined);
    }
    return this.apiClient
      .refreshToken({
        refreshToken,
        userName,
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          this.logout();
          return of(undefined);
        }),
        tap((result) => this.storeTokens(result)),
        map((result) => result?.data?.accessToken ?? undefined),
        take(1)
      );
  }

  private async storeTokens(result: ResultOfTokenResponse | undefined): Promise<void> {
    this.accessToken$.next(result?.data?.accessToken);
    this.setRefreshToken(result?.data?.refreshToken);
    if (result?.data?.accessToken) {
      const payload = jwtDecode<{
        name: string | undefined;
        email: string | undefined;
        lastName: string | undefined;
        firstName: string | undefined;
        needsTermsOfUseValidation: string | undefined;
      }>(result?.data?.accessToken);
      const name = payload.name;
      const email = payload.email;

      if (!name || !email) {
        this.logout();
        return;
      }
      if (payload.needsTermsOfUseValidation === 'True') {
        this.needsTermsOfUseValidation$.next(true);
      }
      this.currentUserService.changeCurrentUserName(`${payload.firstName} ${payload.lastName}`);
      localStorage.setItem(currentUserKey, name);
      localStorage.setItem(currentEmailKey, email);
    }
    await this.fetchPermissions();

    this.refreshing$.next(false);
  }

  private async fetchPermissions(): Promise<void> {
    const currentUser = await firstValueFrom(this.userApiService.getCurrentUser());
    const permissions = currentUser.permissions ?? [];
    this.permissions$.next(permissions);
  }

  private setRefreshToken(token: string | undefined): void {
    if (token) {
      localStorage.setItem(refreshTokenKey, token);
    } else {
      localStorage.removeItem(refreshTokenKey);
    }
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
  }
}
