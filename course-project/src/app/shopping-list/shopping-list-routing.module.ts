import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
    //{path: 'shopping-list', component: ShoppingListComponent}, //deleted path for using lazy loading from app-routing-module
    {path: '', component: ShoppingListComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListRoutingModule {
    
}