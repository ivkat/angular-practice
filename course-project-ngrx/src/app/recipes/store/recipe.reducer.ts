import { Recipe } from '../recipe.model';
//import { RecipesActions } from './recipe.actions';
import * as RecipesActions from './recipe.actions'

export interface State {
    recipes: Recipe[];
}

const initialState = {recipes: []};

export function recipeReducer(
    state: State = initialState, 
    action: RecipesActions.RecipesActions) {
    switch (action.type) {

        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
                //or -> recipes: action.payload.slice()
            };

        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload).slice()
            };
        
        case RecipesActions.UPDATE_RECIPE:
            let newRecipes = [...state.recipes];
            newRecipes[action.payload.index] = action.payload.recipe;

            return {
                ...state,
                recipes: newRecipes
            };
        default:
            return state;
    }
} 