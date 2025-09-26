import { Categories } from './../../../../core/models/categories.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categoriesData: Categories[] = [];

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getCategoriesApi().subscribe({
      next: (ser) => {
        // console.log(ser.data);
        this.categoriesData = ser.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ---------slider-----------
  CategoriesPtions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,

    autoplay: true,
    autoplayTimeout: 700,
    autoplayHoverPause: true,
    margin: 10,

    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
