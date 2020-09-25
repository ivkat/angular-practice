import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  selectedIngredient: Ingredient;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.selectedIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        });
        
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClearForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem(){
    this.shoppingListService.removeItem(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    
    const ing = new Ingredient(value.name, value.amount);
    if(!this.editMode)
      this.shoppingListService.addIngredient(ing);
    else
      this.shoppingListService.updateIngredient(this.editedItemIndex, ing);
    
    form.reset();
    this.editMode = false;
  }

}
