import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sector} from '../../shared/models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  apiUrl = 'https://localhost:44393/api/sectors';
  constructor(private http: HttpClient) { }
  getSectors() {
    return this.http.get<Sector[]>(this.apiUrl);
  }
}
