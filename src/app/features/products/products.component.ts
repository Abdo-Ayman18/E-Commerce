import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { finalize } from 'rxjs';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly product = inject(ProductsService);
  private readonly authService = inject(AuthService);
  isLoading: boolean = false;
  text: string = '';
  prodectData: Product[] = [];

  pageSize!: number;
  total!: number;
  p!: number;

  ngOnInit(): void {
    this.getProductData();

    console.log(this.authService.decodeToken());
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
