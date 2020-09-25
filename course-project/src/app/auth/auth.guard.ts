import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map,  take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree  {
        return this.authService.user.pipe(
            take(1),
            map(userData => {
            if( !!userData){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        })
        
        );
    }
    
}