import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  virifyEmail!: FormGroup;
  virifyCode!: FormGroup;
  restPassword!: FormGroup;
  step: number = 1;
  flag: boolean = true;

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.virifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.virifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.restPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        Validators.pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
      ],
    });
  }
  formStep1(): void {
    if (this.virifyEmail.valid) {
      this.authService.submitVerifyEmail(this.virifyEmail.value).subscribe({
        next: (res) => {
          this.step = 2;
        },
      });
    }
  }
  formStep2(): void {
    if (this.virifyCode.valid) {
      this.authService.submitVerifyCode(this.virifyCode.value).subscribe({
        next: (res) => {
          this.step = 3;
        },
      });
    }
  }
  formStep3(): void {
    if (this.restPassword.valid) {
      this.authService.submitResetPassword(this.restPassword.value).subscribe({
        next: (res) => {
          // save token in cookies
          this.cookieService.set('token', res.token);
          // navigate to home
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
