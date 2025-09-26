import { CookieService } from 'ngx-cookie-service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  masgError: string = '';
  isLoding: boolean = false;
  subscription: Subscription = new Subscription();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this.subscription.unsubscribe();
      // console.log(this.loginForm.value);
      this.subscription = this.authService
        .loginData(this.loginForm.value)
        .subscribe({
          next: (res) => {
            // console.log(res);

            this.masgError = '';
            if (res.message === 'success') {
              // save token
              this.cookieService.set('token', res.token);

              console.log(this.authService.decodeToken());
              // navigate to home
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 1000);
            }
            this.isLoding = false;
          },
          error: (err) => {
            console.log(err);
            this.masgError = err.error.message;
            this.isLoding = false;
          },
        });
    }
  }
}
