import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Allorder } from './models/allorder.interface';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  ordersList = this.cartService.allOrders.asReadonly();
  user_id: string | null = null;
  ngOnInit(): void {
    console.log(this.authService.decodeToken()?.id);

    this.getAllOrders();
  }
  getAllOrders() {
    this.cartService
      .getAllOrdersApi(this.authService.decodeToken()?.id)
      .subscribe((res) => {
        // console.log(res.data);
        // this.ordersList = res;
        // console.log(this.ordersList);
        this.cartService.allOrders.set(res);
        console.log(this.cartService.allOrders());

        // this.ordersList = res;
        // console.log(this.ordersList);
        // console.log(this.ordersList);
      });
  }
}
