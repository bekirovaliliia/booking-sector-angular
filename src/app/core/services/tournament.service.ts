import { Injectable } from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import {catchError, map, retry} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  public urlAddress: string = environment.urlAddress;

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.urlAddress}/tournaments/all`)
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(item.id, item.name, item.description, item.preparationTerm,
                item.tournamentStart,
                item.tournamentEnd,
                )
          )
        )
      );
  }


  getById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.urlAddress}/tournaments/${id}`)
      .pipe(
        map((item: Tournament) =>
            new Tournament(item.id, item.name, item.description, item.preparationTerm,
              item.tournamentStart,
              item.tournamentEnd,
              )
        ),
        retry(1),
        catchError(this.handleError)
      );
  }

  delete(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}/tournaments/${id}`);
  }

  update(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlAddress}/tournaments/${tournament.id}`, tournament, httpOptions);
  }

  add(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.urlAddress}/tournaments`, tournament, httpOptions);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.status === 404) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
