import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        //CommonModule,
        //AppRoutingModule,
        ShoppingListRoutingModule,
        FormsModule,
        //ReactiveFormsModule
        SharedModule
    ]
})

export class ShoppingListModule {}