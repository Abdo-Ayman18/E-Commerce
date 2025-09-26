import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly product = inject(ProductsService);

  pageSize!: number;
  total!: number;
  p!: number;

  prodectData: Product[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(pageNumper: number = 1): void {
    this.isLoading = true;
    this.product
      .getProductApi(pageNumper)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (ser) => {
          // console.log(ser.data);
          this.prodectData = ser.data;
          this.pageSize = ser.metadata.limit;
          this.p = ser.metadata.currentPage;
          this.total = ser.results;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
