import { RouterLink } from '@angular/router';
import { Cart } from './models/cart.interface';
import { CartService } from './services/cart.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLogedUserData();
  }

  getLogedUserData(): void {
    this.cartService.getLogedUserCart().subscribe({
      next: (ser) => {
        // console.log(ser.data.products.length);
        // console.log(ser.data);
        this.cartDetails = ser.data;
      },
    });
  }

  removeItem(id: string): void {
    this.cartService.removeSpecificCartItrm(id).subscribe({
      next: (ser) => {
        // console.log(ser);
        // this.getLogedUserData();
        this.cartDetails = ser.data;
        this.cartService.countNumperOfCart.set(ser.numOfCartItems);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (ser) => {
        // console.log(ser);
        // this.getLogedUserData();
        this.cartDetails = ser.data;
      },
    });
  }
}
