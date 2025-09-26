import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { Product } from '../../core/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly detailsService = inject(DetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productId: string | null = null;

  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramsUrl) => {
        // console.log(paramsUrl.get('id'));
        this.productId = paramsUrl.get('id');
      },
    });
  }
  getProductDetailsData(): void {
    this.detailsService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  detailsCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],

    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 100,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2,
    //   },
    //   740: {
    //     items: 3,
    //   },
    //   940: {
    //     items: 4,
    //   },
    // },
    items: 1,
    nav: false,
  };

  addProductItemToCart(id: string): void {
    this.cartService.getProductToCart(id).subscribe({
      next: (ser) => {
        console.log(ser);
        if (ser.status === 'success') {
          this.toastrService.success(ser.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
