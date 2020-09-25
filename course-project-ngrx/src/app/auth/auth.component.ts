import { Component, ComponentFactoryResolver, ComponentFactory, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth'
})
export class AuthComponent implements OnDestroy, OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    
    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(

        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>){}

    ngOnDestroy() {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }

        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        if (!form.valid){
            return;
        } 
        const email = form.value.email;
        const password = form.value.password;
        
        if(this.isLoginMode){
            
            this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
            
        } else {
            
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
           
        }

        form.reset();
    }

    onHandleError() {
        
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(errorMessage: string) {
        //const alertComponent = new AlertComponent();
        const alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}