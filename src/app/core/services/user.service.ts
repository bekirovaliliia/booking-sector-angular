import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/models/user-model';
import {UserEmail} from '../../shared/models/user-email-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiURl = environment.urlAddress + '/users';
  constructor(private http: HttpClient) { }
  getUser(id:number) {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }
  getUserPhoto(id:number) {
    const httpOptions = {
      headers: new HttpHeaders({responseType: 'text'})
    };
    return this.http.get<string>(`${this.apiURl}/UserPhoto/${id}`, httpOptions);
  }
  checkPass(pass: string, id:number){
   return this.http.get<Boolean>(`${this.apiURl}/${id}/${pass}`);
  }
  resetPass(email: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(`${this.apiURl}/reset/${email}`, httpOptions);
  }
  updateUserPassword(user :User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(user);
   return this.http.put(`${this.apiURl}/pass/${user.id}`, user, httpOptions);
  }
  updateUserPhoto(file : FormData, id:number) {
    const httpOptions = {
      //headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
    };
    console.log(file);
     return this.http.put(`${this.apiURl}/photo/${id}`, file, httpOptions).subscribe(res => console.log('File Uploaded ...'));

  }
  updateUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(user);
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
  getUserByEmail(email: string) {
    return this.http.get<User>(`${this.apiURl}/email/${email}`);
  }
  confirmEmail(email: string, hash: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}
      )
    };

    return this.http.put(`${this.apiURl}/confirm/${email}/${hash}`, httpOptions, { responseType: 'text' });
  }
}
