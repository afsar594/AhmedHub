import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

  refreshCartCount() {
    this.GetAllItemCard()
      .pipe(
        map((r: any) => {
          const rows = Array.isArray(r)
            ? r
            : Array.isArray(r?.data)
              ? r.data
              : [];

          return rows.length;
        }),
        catchError(() => of(0)),
      )
      .subscribe((count) => this.setCartCount(count));
  }

  removeBg(imageBase64: string) {
    return this.http.post(`${this.baseUrl}Item/RemoveBg`, {
      image: imageBase64,
    });
  }
  private baseUrl = 'https://localhost:44379/api/';
  constructor(private http: HttpClient) {}

  getItems(id: any) {
    return this.http.get(`${this.baseUrl}Item/itemGetByClassifiedId?id=${id}`);
  }
  getItemsAll() {
    return this.http.get(`${this.baseUrl}Item`);
  }

  saveItems(data: any) {
    return this.http.post(`${this.baseUrl}Item`, data);
  }
  UpdateItems(id: any, data: any) {
    return this.http.put(`${this.baseUrl}Item/${id}`, data);
  }
  DeleteItems(id: number) {
    return this.http.delete(`${this.baseUrl}Item/${id}`);
  }
  // for user creadential

  login(user: any) {
    return this.http.post(`${this.baseUrl}User/login`, user);
  }
  register(user: any) {
    return this.http.post(`${this.baseUrl}User/signup`, user);
  }
  //  for Card Api

  saveCard(payload: any) {
    return this.http.post(`${this.baseUrl}Cart`, payload);
  }
  GetAllItemCard() {
    return this.http.get(`${this.baseUrl}Cart`);
  }
  DeleteCart(id: number) {
    return this.http.delete(`${this.baseUrl}Cart/${id}`);
  }
  DeleteAll() {
    return this.http.delete(`${this.baseUrl}Cart`);
  }
  postCheckout(payload: any) {
    return this.http.post(`${this.baseUrl}Checkout`, payload);
  }
   UserShippingAddress(payload: any) {
    return this.http.post(`${this.baseUrl}UserShippingAddress/Create`, payload);
  }
  ///payment///////
CreateCustomer(data: any) {
  debugger
  return this.http.post(
    `${this.baseUrl}/Customer`,
    data
  );
}

CreatePayment(data: any) {
  return this.http.post(
    `${this.baseUrl}Payment`,
    data
  );
}
}
