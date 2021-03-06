import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //exhaustMap waits for "take(1)" to finish and then do its task
        return this.authService.user.pipe(take(1), 
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
                //modifiedRequest.headers.append('auth', user.token);
                return next.handle(modifiedRequest);
            }));

        
    }

}