import { ToastrService } from 'ngx-toastr';
import { Component, inject, Input, OnInit } from '@angular/core';
import { WashlistService } from './services/washlist.service';
import { Washlist } from '../models/washlist.interface';
import { TitleCasePipe } from '@angular/common';
import { CartService } from '../../cart/services/cart.service';
import { log } from 'console';

@Component({
  selector: 'app-washlist',
  templateUrl: './washlist.component.html',
  styleUrl: './washlist.component.css',
  imports: [],
})
export class WashlistComponent implements OnInit {
  private readonly washlistService = inject(WashlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  count!: number;
  washlistData: Washlist[] = [];
  item: any;
  flag: boolean = true;

  ngOnInit(): void {
    // this.count = this.cartService.countNumperOfWashlist;

    this.getLoggedUserWashlistData();
  }

  getLoggedUserWashlistData(): void {
    this.washlistService.getLogedUserWashlist().subscribe({
      next: (res) => {
        // console.log(res.category);
        this.washlistData = res.data;
        // console.log(this.washlistData);
      },
    });
  }

  removeCart(id: string): void {
    this.washlistService.RemoveProductWishlist(id).subscribe({
      next: (res) => {
        // console.log(res);
        console.log(res);
        this.cartService.countNumperOfWashlist.set(res.data.length);

        // this.washlistData = res.data;
        this.getLoggedUserWashlistData();
      },
    });
  }
  addProductItemToCart(id: string): void {
    this.cartService.getProductToCart(id).subscribe({
      next: (ser) => {
        // console.log(ser);
        if (ser.status === 'success') {
          this.toastrService.success(ser.message);
        }
      },
    });
  }
}

// private readonly cartService = inject(CartService);
// @Input({ required: true }) Product!: Product;
// cartt!: Cart;

// ngOnInit(): void {
//   this.getLogedUserData();
// }

// getLogedUserData(): void {
//   this.cartService.getLogedUserCart().subscribe({
//     next: (ser) => {
//       console.log(ser.data);
//       this.cartt = ser.data;
//     },
//     error: (err) => {
//       console.log(err);
//     },
//   });
// }

// addProductToWashlist(id: string): void {
//   this.cartService.getProductToCart(id).subscribe({
//     next: (ser) => {
//       console.log(ser);
//     },
//     error: (err) => {
//       console.log(err);
//     },
//   });
// }
