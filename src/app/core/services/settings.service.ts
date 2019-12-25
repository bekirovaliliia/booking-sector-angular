import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Setting} from '../../shared/models/setting.model';
import {Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settignsUrl = `${environment.apiUrl}/settings`;
  constructor(private http: HttpClient) { }

  getSettings() {
    return this.http.get<Setting[]>(this.settignsUrl);
  }

  updateSetting(setting: Setting): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.settignsUrl}/${setting.id}`, setting, httpOptions);
  }
}
