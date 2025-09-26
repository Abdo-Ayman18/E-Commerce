import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoriesData: Categories[] = [];

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getCategoriesApi().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categoriesData = res.data;
        console.log(this.categoriesData);
        console.log('this.categoriesData');
      },
    });
  }
}
