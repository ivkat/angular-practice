import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const route: Routes = [
    //{path: 'auth', component: AuthComponent} //deleted the path for adding lazy loading in app-routing-module
    {path: '', component: AuthComponent}
]

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule, 
        CommonModule,
        RouterModule.forChild(route),
        SharedModule
    ]
})
export class AuthModule {

}