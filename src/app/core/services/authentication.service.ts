import { Injectable } from '@angular/core';
import { Token } from 'src/app/shared/models/token';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { TokenStore } from '../helpers/token-store';
import { Role } from 'src/app/shared/models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService,
    private tokenStore: TokenStore,
    private spinner: SpinnerService
  ) {}

  login(phone: string, password: string): Observable<Token> {
      return this.http
      .post<Token>(`${environment.urlAddress}/authentication/authenticate`, {
        phone,
        password
      })
      .pipe(
        tap(token => this.handleSuccess(token)),
        catchError(error => this.handleError(error))
      );
  }

  private handleSuccess(token: Token): void {
    this.tokenStore.setToken(token);
    if(this.tokenStore.getRole() == Role.User)
    {
      this.toast.success('Hello, User!');
      this.router.navigate([`profile`]);
    }
    else if(this.tokenStore.getRole() == Role.Admin)
    {
      this.toast.success('Hello, Admin!');
      this.router.navigate(['admin/bookings']);
    }
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    if (httpResponse.status !== 0) {
      this.toast.error('Неправильно введений логін або пароль', 'Помилка логування');
    }
    return throwError(httpResponse);
  }

  logout(): void {
    this.tokenStore.removeToken();
    this.router.navigate(['sign-in']);
  }

  refreshAccessToken(): Observable<Token> {
    const currentToken = this.tokenStore.getToken();
    if (!currentToken) {
      return throwError('No token');
    }

    const { refreshToken, accessToken } = currentToken;
    return this.http
      .post<Token>(`${environment.urlAddress}/authentication/refresh_token`, {
        accessToken,
        refreshToken
      })
      .pipe(
        tap(newToken => this.handleRefreshTokenSuccess(newToken)),
        catchError(error => this.handleRefreshTokenError(error))
      );
  }

  private handleRefreshTokenSuccess(newToken: Token) {
    this.tokenStore.setToken(newToken);
  }

  private handleRefreshTokenError(error: HttpErrorResponse): Observable<never> {
    this.tokenStore.removeToken();
    return throwError(error);
  }

  isLoggedIn(): boolean {
    return this.tokenStore.isTokenExpired() === false;
  }

  getRole(): Role {
    return this.tokenStore.getRole();
  }

  getLogin(): string {
    return this.tokenStore.getLogin();
  }
  
  getId(): number{
    return this.tokenStore.getId();
  }
}