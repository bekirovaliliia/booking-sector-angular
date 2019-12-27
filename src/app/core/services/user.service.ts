import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURl = 'https://localhost:44393/api/users';
  constructor(private http: HttpClient) { }
  getUser(id:number) {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }
  checkPass(pass: string, id:number){
   return this.http.get<Boolean>(`${this.apiURl}/${id}/${pass}`);
  }
  updateUserPassword(user :User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(user);
   return this.http.put(`${this.apiURl}/pass/${user.id}`, user, httpOptions);
  }
  updateUser(user :User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(user);
   return this.http.put(`${this.apiURl}/${user.id}`, user, httpOptions);
  }

  insertUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.apiURl}/`, user, httpOptions);
  }
}
