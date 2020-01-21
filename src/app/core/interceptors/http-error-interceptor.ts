import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {HttpError} from './HttpError';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor  implements  HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let message = ' ';
    let title = ' ';
    return next.handle(request).pipe(
      catchError((exception: HttpErrorResponse) => {
          switch (exception.status) {

            case HttpError.ConnectionError:
              message = 'Could not connect to server.';
              title = `Connection error`;
              break;

            case HttpError.BadRequest:
              message = `Server cannot process the client request. Check your data.`;
              title = `Error ${exception.status}. Bad request`;
              break;

            case HttpError.NotFound:
              message = `${exception.error.ErrorMessage !== '' ? exception.error.ErrorMessage : exception.message}`;
              title = `Error ${exception.status}. Not found`;
              break;

            case HttpError.Forbidden:
              message = `Accessing the page or resource you were trying to reach is forbidden.`;
              title = `Error ${exception.status}. Forbidden`;
              break;

            case HttpError.InternalServerError:
              message = `${exception.error.ErrorMessage !== '' ? exception.error.ErrorMessage : exception.message}`;
              title = `Error ${exception.status}. Internal server error`;
              break;

            default:
              message = 'Something happened.';
              title = `Unknown error`;
              break;
          }

          this.toastr.error(message, title);
          console.error(title, message);
          return throwError(exception);
        }
      )
    );
  }
}
