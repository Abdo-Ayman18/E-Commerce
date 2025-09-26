import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProductApi(pageNumper:number=1): Observable<any> {
    return this.http.get(environment.baseUrl + `products?page=${pageNumper}`);
  }
}
