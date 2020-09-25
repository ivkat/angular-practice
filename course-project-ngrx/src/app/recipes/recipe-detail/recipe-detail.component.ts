import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';


import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  recipeToShow: Recipe;
  private recipeId: number;
  constructor(
    
    private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }), 
      switchMap(id => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => index === this.recipeId);
      })
    )
    .subscribe(recipe => this.recipeToShow = recipe);
  }


  toShoppingList(){

    //this.recipeService.addToShoppingList(this.recipeToShow.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeToShow.ingredients));
  }

  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo: this.route}); ESTO FUNCIONA sin pasar el ID
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    //this.recipeService.deleteRecipe(this.recipeId);    
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }
}
