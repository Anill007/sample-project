import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = `https://jsonplaceholder.typicode.com/`;
  constructor(private http: HttpClient) {}

  public getUserList() {
    return this.http.get<IUser[]>(this.baseURL+`users/`);
  }

  public getUserById(id: Number) {
    return this.http.get<IUser[]>(this.baseURL+`users/${id}`);
  }
}
