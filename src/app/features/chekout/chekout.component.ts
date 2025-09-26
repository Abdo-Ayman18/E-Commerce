import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chekout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.css',
})
export class ChekoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  chekoutForm!: FormGroup;
  id: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParamId) => {
        this.id = urlParamId.get('id');
      },
    });
  }

  initForm(): void {
    this.chekoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }

  submitChekoutSession(): void {
    if (this.chekoutForm.valid) {
      // console.log(this.chekoutForm.value);
      // console.log(this.id);
      this.cartService
        .chekoutSession(this.id, this.chekoutForm.value)
        .subscribe({
          next: (res) => {
            // console.log(res);
            // window.open(res.session.url, '_self');
            window.location.href = res.session.url;
          },
        });
    }
  }
  submitCashOrder(): void {
    if (this.chekoutForm.valid) {
      // console.log(this.chekoutForm.value);
      // console.log(this.id);
      this.cartService
        .creatCashOrder(this.id, this.chekoutForm.value)
        .subscribe({
          next: (res) => {
            // console.log(res);
            if (res.status === 'success') {
              this.toastrService.success('Order Placed Successfully');
              this.router.navigateByUrl('/allorders');
            } else {
              this.toastrService.error('Error in Order');
              this.router.navigateByUrl('/cart');
            }
          },
        });
    }
  }
}
