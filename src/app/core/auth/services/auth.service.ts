import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from '../../models/myjwtpayload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerData(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  loginData(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }
  logOut(): void {
    // remove token cookies
    this.cookieService.delete('token');
    // navigate to login
    this.router.navigate(['/login']);
  }

  decodeToken(): MyJwtPayload | undefined {
    let token;
    try {
      token = jwtDecode(this.cookieService.get('token')) as MyJwtPayload;
    } catch (error) {
      this.logOut();
    }
    return token;
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/forgotPasswords',
      data
    );
  }
  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/verifyResetCode',
      data
    );
  }
  submitResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'auth/resetPassword',
      data
    );
  }
}
