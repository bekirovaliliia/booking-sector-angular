import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './models/user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURl = 'https://localhost:44393/api/users';
  constructor(private http: HttpClient) { }

  getUser(id:number) {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }
  updateUser(user :User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/${user.id}`, user, httpOptions);
  }
}
