import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  NgClass,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../features/cart/services/cart.service';
import { WashlistService } from '../../../features/washlist/washlist/services/washlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TitleCasePipe, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) Product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly washlistService = inject(WashlistService);
  addedToWashlist = false;

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

  ngOnInit(): void {
    Aos.init();
  }

  getProductWashlist(id: string): void {
    this.washlistService.getWashApi(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          // console.log('count' + res.data.length);
          this.cartService.countNumperOfWashlist.set(res.data.length);
          // console.log('washList');
          this.toastrService.success(res.message);
          this.addedToWashlist = true;
        }
      },
    });
  }
}
