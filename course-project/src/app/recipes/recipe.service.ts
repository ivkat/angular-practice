import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];
    // = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREGjc2yEZCyonNF-GP16LrJLSG1CN66subu6WHUpoQmklAGIOH&usqp=CAU',
    //     [
    //         new Ingredient('Huevo', 3), 
    //         new Ingredient('Berenjena', 9)
    //     ]),
        
    //     new Recipe('Otra receta', 
    //     'Segunda receta: fideitos', 
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2SdxAAXXJnA03wIyYL4fJE0Y5COS7DneiMZylnFN0fVcBkiqn&usqp=CAU',
    //     [
    //         new Ingredient('Solomillo', 1),
    //         new Ingredient('Porotos', 4)
    //     ])
    //   ];
    
      constructor(private shoppingListService: ShoppingListService){

      }
    getRecipes(){
        return this.recipes.slice();
    }

    addToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addToShoppingList(ingredients);
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id:number){
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}