import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;

  constructor(public tokenStorage: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.body!=null && request.body.bearerToken != null){
      this.token = request.body.bearerToken;
    }

    const url = request.url;
    const endpointsWithoutAuthorization: Array<string> = [
      'wp-json/wp/v2/categories',
      'jwt-auth/v1/token',
      'wp/v2/users/lost-password',
      'forget-password',

    ];
    let authorization = true;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < endpointsWithoutAuthorization.length; i++)
    {
      if(url.endsWith(endpointsWithoutAuthorization[i]) === true){
        authorization = false;
      }
    }

    //if(url.endsWith('wp-json/wp/v2/categories') === false && url.endsWith('jwt-auth/v1/token',url.length) === false){
    if(authorization){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer INTUKGJLfDAq3vOmxLrVdn1ktgZ0CMvENJGDeFLg'// + this.token
        }
      });
    }
    return next.handle(request);
  }
}
