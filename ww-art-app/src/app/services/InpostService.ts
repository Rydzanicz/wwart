import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InpostService {
  private readonly token = '';
  private readonly pointsUrl = 'https://api.inpost.pl/v1/points?type=parcel_locker&functions=parcel_collect&limit=500&status=Operating';

  constructor(private http: HttpClient) {
  }

  getToken(): string {
    return this.token;
  }

  getInpostPoints() {

    return this.http.get(this.pointsUrl, {
      headers: new HttpHeaders({Authorization: `Bearer ${this.token}`})
    });
  }
}
