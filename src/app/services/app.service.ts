import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RatingResponse {
  average: number;
  votes: { rating: number }[];
}


@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>('/api/auth/token/', {
      username,
      password,
    });
  }

  refreshToken(refresh: string): Observable<{ access: string }> {
    return this.http.post<{ access: string }>('/api/auth/token/refresh/', { refresh });
  }

  getProducts(params: { [k: string]: any } = {}) {
    let httpParams = new HttpParams();

    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .forEach(([key, value]) => {
        httpParams = httpParams.set(key, String(value));
      });

    return this.http.get<any>('/api/products/', { params: httpParams });
  }
   
  // GET rating
getProductRating(productId: number) {
  return this.http.get<{
    product_id: number;
    avg_rating: number;
    count: number;
  }>(`/api/products/${productId}/rating/`);
}

// POST rating
rateProduct(productId: number, rating: number) {
  return this.http.post<{
    product_id: number;
    avg_rating: number;
    count: number;
  }>(
    `/api/products/${productId}/rating/`,
    { rating }
  );
}
getProductById(id: number) {
  return this.http.get(`/products/${id}/`);
}

}
