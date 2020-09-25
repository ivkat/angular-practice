import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

// @Injectable()
// export class RecipeEffects {
//     constructor(
//         private actions$: Actions,
//         private http: HttpClient
//     ) { }

//     private apiEndpoint = 'https://ng-course-recipe-book-958b3.firebaseio.com/recipes.json';

//     @Effect()
//     fetchRecipes = this.actions$.pipe(
//         ofType(RecipesActions.FETCH_RECIPES),
//         switchMap(() => {
//             return this.http.get<Recipe[]>(this.apiEndpoint);
//         }),
//         map(recipes =>{
//             return recipes.map(recipe => {
                
//                 return {
//                     ...recipe, 
//                     ingredients: recipe.ingredients? recipe.ingredients: []
//                 };
//             });
//         }),
//         map(recipes => {
//             return new RecipesActions.SetRecipes(recipes);
//         })
//     );
    

// }


@Injectable()
export class RecipeEffects {
  private apiEndpoint = 'https://ng-course-recipe-book-958b3.firebaseio.com/recipes.json';
  @Effect()
  
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        this.apiEndpoint
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        this.apiEndpoint,
        recipesState.recipes)
    })
  );

  constructor(
    private actions$: Actions, 
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {}
}