import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Allorder } from '../../allorders/models/allorder.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  // NOW save all orders global then i  need it in order details
  allOrders: WritableSignal<Allorder[]> = signal<Allorder[]>([]);
  countNumperOfCart: WritableSignal<number> = signal(0);
  countNumperOfWashlist: WritableSignal<number> = signal(0);

  getProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',

      {
        productId: id,
      }
    );
  }

  getLogedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeSpecificCartItrm(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`, {
      count: count,
    });
  }

  // payment
  chekoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    );
  }
  creatCashOrder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data);
  }
  // orders/user/68b3c17a6eb61f375329219c
  getAllOrdersApi(userId: string | undefined): Observable<Allorder[]> {
    return this.httpClient
      .get<Allorder[]>(environment.baseUrl + `orders/user/${userId}`)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
