import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceMailerService {
  private apiUrl = '';
  private apiKey = '';
  private http: HttpClient | undefined;

  constructor(private injector: Injector) {
  }

  private getHttp(): HttpClient {
    if (!this.http) {
      this.http = this.injector.get(HttpClient);
    }
    return this.http;
  }

  sendBuyerData(buyerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey
    });

    return this.getHttp().post(`${this.apiUrl}/save-invoice`, buyerData, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  sendContactMessage(contactData: { name: string; addressEmail: string; message: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey
    });

    return this.getHttp().post(`${this.apiUrl}/mail`, contactData, {
      headers,
      responseType: 'text' as 'json'
    });
  }


  getCommentsByProductId(productId: string): Observable<Comment[]> {
    const headers = new HttpHeaders({
      'X-API-KEY': this.apiKey
    });

    return this.getHttp().get<Comment[]>(`${this.apiUrl}/comments`, {
      headers,
      params: {productId}
    });
  }

  addCommentWithImage(formData: FormData): Observable<Comment> {
    const headers = new HttpHeaders({
      'X-API-KEY': this.apiKey
    });

    return this.getHttp().post<Comment>(`${this.apiUrl}/comments`, formData, {
      headers
    });
  }
}
