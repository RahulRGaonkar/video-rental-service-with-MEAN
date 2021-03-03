import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private persistenceService: PersistenceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userDetails = this.persistenceService.get('userDetails', StorageType.LOCAL);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      const modified = req.clone({setHeaders: {'auth-token': userDetails.token}});
      return next.handle(modified);
    } else {
      return next.handle(req);
    }
  }
}
