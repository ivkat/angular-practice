import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Injectable({providedIn: 'root'})

export class AuthService{

    constructor(
        // private http: HttpClient, 
        // private router: Router,
        private store: Store<fromApp.AppState>){}

    
    private tokenExpirationTimer: any;
    

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            //this.logout();
            this.store.dispatch(new AuthActions.Logout());
        }, 
        expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}