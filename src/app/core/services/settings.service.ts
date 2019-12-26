import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Setting} from '../../shared/models/setting.model';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  apiURl = 'http://localhost:44393/api/settings';
  constructor(private http: HttpClient) { }

  getSettings() {
    return this.http.get<Setting[]>(this.apiURl);
  }

  updateSetting(setting: Setting): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/${setting.id}`, setting, httpOptions);
  }
}
