import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    idToken: string; //	A Firebase Auth ID token for the authenticated user.
    email: string; //The email for the authenticated user.
    refreshToken: string; //A Firebase Auth refresh token for the authenticated user.
    expiresIn: string; //The number of seconds in which the ID token expires.
    localId: string; //The uid of the authenticated user.
    registered?: boolean; //Whether the email is for an existing account.
}

@Injectable({providedIn: 'root'})

export class AuthService{

    constructor(private http: HttpClient, private router: Router){}

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    
    signup(email: string, password: string){

        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }            
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {

                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                
            })
        );

    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData => {
            //console.log('autenticacion funcionó');
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            
        }));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date( userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.user.next(loadedUser);
            //getTime() returns milliseconds
            const expirationDuration = new Date( userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate['/auth'];
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, 
        expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const signedUser = new User(email, userId, token, expirationDate);

        this.user.next(signedUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(signedUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        //console.log('autenticacion funcionó');
        let errorMessage: string;

        if(!errorRes.error || !errorRes.error.error){
            throwError(errorRes);
        }

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':{
                errorMessage = 'Email already exists';
                break;
            }          
            
            case 'EMAIL_NOT_FOUND': {
                errorMessage = 'Email not found';
                break;
            }

            case 'INVALID_PASSWORD': {
                errorMessage = 'Invalid password';
                break;
            }

            default: {
                errorMessage = 'An unknown error ocurred';
                break;
            }
        }

        return throwError(errorMessage);
    }
}