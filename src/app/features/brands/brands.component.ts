import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from './services/brand.service';
import { Brand } from './models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  brandData: Brand[] = [];

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData(): void {
    this.brandService.getBrandsApi().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.brandData = res.data;
        // console.log(this.brandData);
      },
    });
  }
}
