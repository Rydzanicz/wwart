import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactMailerService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private http: HttpClient | undefined;

  constructor(private injector: Injector) {}

  private getHttp(): HttpClient {
    if (!this.http) {
      this.http = this.injector.get(HttpClient);
    }
    return this.http;
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
}
