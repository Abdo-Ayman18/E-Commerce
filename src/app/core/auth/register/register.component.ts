import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  masgError: string = '';
  isLoding: boolean = false;
  flag: boolean = true;
  subscription:Subscription=new Subscription()

  // email: FormControl = new FormControl(null, [
  //   Validators.email,
  //   Validators.required,
  // ]);
  // submit(): void {
  //   console.log(this.email.value);
  // }
  ngOnInit(): void {
    this.initForm();
  }
  registerForm!: FormGroup;

  initForm(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
        ]),
        rePassword: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern('^01[0125][0-9]{8}$'),
        ]),
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(grop: AbstractControl) {
    let password = grop.get('password')?.value;
    let rePassword = grop.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      grop.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    // return password === rePassword ? null : this.registerForm.get('rePassword')?.setErrors({ mismatch: true });
    // return password === rePassword ? null : { mismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoding = true;
      this.subscription.unsubscribe()
      // console.log(this.registerForm);
      // console.log(this.registerForm.value);
     this.subscription= this.authService.registerData(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.masgError = '';
          if (res.message === 'success') {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
          this.isLoding = false;
        },
        error: (err) => {
          // console.log(err);
          this.masgError = err.error.message;
          this.isLoding = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.get('rePassword')?.patchValue('');
      // this.registerForm.setErrors({ mismatch: true });
    }
  }
}
