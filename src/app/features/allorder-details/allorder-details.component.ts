import { CartService } from './../cart/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Allorder } from '../allorders/models/allorder.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allorder-details',
  imports: [],
  templateUrl: './allorder-details.component.html',
  styleUrl: './allorder-details.component.css',
})
export class AllorderDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  allOrders = this.cartService.allOrders.asReadonly();
  id: string | null = null;
  order: Allorder = {} as Allorder;

  ngOnInit(): void {
    this.getProductId();
    console.log(this.id, this.allOrders());
    this.order = this.allOrders().filter((order) => order._id === this.id)[0];
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parmUrl) => {
        // console.log(parmUrl.get('id'));
        this.id = parmUrl.get('id');
      },
    });
  }

  addProductItemToCart(id: string): void {
    this.cartService.getProductToCart(id).subscribe({
      next: (ser) => {
        // console.log(ser);
        // console.log('count' + this.cartService.countNumperOfCart);

        if (ser.status === 'success') {
          this.toastrService.success(ser.message);
          this.cartService.countNumperOfCart.set(ser.numOfCartItems);
        }
      },
    });
  }
}
