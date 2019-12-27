import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/models/user-model';
import {UserEmail} from "../../shared/models/user-email-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURl = 'http://localhost:44393/api/users';
  constructor(private http: HttpClient) { }
  getUser(id:number) {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }
  checkPass(pass: string, id:number){
   return this.http.get<Boolean>(`${this.apiURl}/${id}/${pass}`);
  }
  updateUser(user :User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/${user.id}`, user, httpOptions);
  }

  insertUser(user: UserEmail) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.apiURl}/`, user, httpOptions);
  }

  getUserByNumber(number: string) {
    return this.http.get<User>(`${this.apiURl}/phone/${number}`);
  }
}
