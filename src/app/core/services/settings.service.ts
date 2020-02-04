import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Setting } from '../../shared/models/setting.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  apiURl = environment.urlAddress + '/settings';
  constructor(private http: HttpClient) { }

  getSettings() {
    return this.http.get<Setting[]>(this.apiURl);
  }

  getSettingById(id: number) {
    return this.http.get<Setting>(`${this.apiURl}/${id}`);
  }

  updateSetting(setting: Setting): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/${setting.id}`, setting, httpOptions);
  }
}
