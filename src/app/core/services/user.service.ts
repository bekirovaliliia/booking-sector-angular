import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../shared/models/user-model';
import {UserEmail} from '../../shared/models/user-email-model';
import { environment } from '../../../environments/environment';
import {UserDetails} from '../../shared/models/user-details.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiURl = environment.urlAddress + '/users';
  constructor(private http: HttpClient) { }

  getUser( id: number )  {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }
  getUserDetails(id: number) {
    return this.http.get<UserDetails>(`${this.apiURl}/details`, {params: new HttpParams()
        .set('id', String(id))});
  }

  checkPass(password: string, id: number) {
   return this.http.get<Boolean>(`${this.apiURl}/${id}/${password}`);
  }
  resetPass(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(`${this.apiURl}/reset/${email}`, httpOptions);
  }
  updateUserPassword(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/password/${user.id}`, user, httpOptions);
  }
  updateUserPhoto(file: FormData, id: number) {
     return this.http.put(`${this.apiURl}/photo/${id}`, file).subscribe();
  }
  deleteUserPhoto(id: number) {
    return this.http.put(`${this.apiURl}/deletePhoto/${id}`, id).subscribe();
 }
  updateUser(user: User) {
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

  insertUserGuest(user: UserEmail) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.apiURl}/booking`, user, httpOptions);
  }

  // tslint:disable-next-line:variable-name
  getUserByNumber( number: string) {
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
