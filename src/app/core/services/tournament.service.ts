import {ErrorHandler, Inject, Injectable} from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient,
              private datePipe: DatePipe,
  ) {}
  public urlAddress: string = environment.urlAddress;

  getAll() : Observable<any>{
    return this.http.get<Tournament[]>(`${this.urlAddress}/tournaments/all`)
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(
                item.id,
                item.name,
                item.description,
                item.preparationTerm,
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
          new Tournament(
            item.id,
            item.name,
            item.description,
            item.preparationTerm,
            item.tournamentStart,
            item.tournamentEnd,
          )
        )
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
/*
  handleError(exc) {
    let message = '';
    let title = '';
    switch (exc.status) {
      case HttpError.ConnectionError:
        message = 'Could not connect to server.';
        title = `Connection error`;
        break;

      case HttpError.BadRequest:
        message = `Request can not be processed by server. Check your data.`;
        title = `Error ${exc.status}. Bad request`;
        break;

      case HttpError.Forbidden:
        message = `Accessing the page or resource you were trying to reach is forbidden.`;
        title = `Error ${exc.status}. Forbidden`;
        break;

      case HttpError.NotFound:
        message = `${exc.error.ErrorMessage !== '' ? exc.error.ErrorMessage : exc.message}`;
        title = `Error ${exc.status}. Not found`;
        break;

      case HttpError.InternalServerError:
        message = `${exc.error.ErrorMessage !== '' ? exc.error.ErrorMessage : exc.message}`;
        title = `Error ${exc.status}. Internal server error`;
        break;
    }

    return throwError(exc);
  }

 */
}
