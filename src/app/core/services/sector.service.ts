import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sector} from '../../shared/models/sector.model';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SectorService {
  sectorsUrl = `${environment.apiUrl}/sectors`;
  constructor(private http: HttpClient) { }
  getSectors() {
    return this.http.get<Sector[]>(this.sectorsUrl);
  }
  changeSectorActivity(sector: Sector) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.sectorsUrl}/${sector.id}`, sector, httpOptions);
  }
}
