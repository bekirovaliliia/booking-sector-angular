import { Injectable } from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient) {}
  public urlAddress: string = environment.urlAddress;

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.urlAddress}tournaments/all`)
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(item.id, item.name, item.description, item.preparationTerm)
          )

        )
      );
  }
/*
  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.urlAddress + 'tournaments/all')
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(item.id, item.name, this.datePipe.transform( item.dateStart, 'MMM dd, yyyy'),  this.datePipe.transform( item.dateEnd, 'MMM dd, yyyy') , item.preparationTerm)
          )
        )
      );
  }
  */

}
