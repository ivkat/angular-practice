import { Component, ComponentFactoryResolver, ComponentFactory, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

    ngOnDestroy() {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        if (!form.valid){
            return;
        } 

        let authObs: Observable<AuthResponseData>;
        
        const email = form.value.email;
        const password = form.value.password;

        // console.log(email);
        // console.log(password);
        this.isLoading = true;  
        
        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
            
        } else {
            authObs = this.authService.signup(email, password);
           
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
            errorMessage => {

                console.log(errorMessage);
                this.isLoading = false;
                this.showErrorAlert(errorMessage);
                this.error = errorMessage;
                
            }
            
        );

        //this.isLoading = false;
        

        form.reset();
    }

    onHandleError() {
        this.error = null;
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