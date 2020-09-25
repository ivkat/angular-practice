import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';

import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  
  selectedIngredient: Ingredient;
  
  constructor(
            private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.selectedIngredient = stateData.editedIngredient;
          
          this.slForm.setValue({
            name: this.selectedIngredient.name,
            amount: this.selectedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClearForm(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem(){
    //this.shoppingListService.removeItem(this.editedItemIndex);

    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );

    this.slForm.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    
    const ing = new Ingredient(value.name, value.amount);
    if(!this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(ing)
      );
    }
    else {
      
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ing));
    }

    form.reset();
    this.editMode = false;
  }

}
