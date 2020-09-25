import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesSubscription = new Subscription();
  recipes:  Recipe[];

  constructor(
    
    private router: Router,
    private route: ActivatedRoute ,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnDestroy(){
    this.recipesSubscription.unsubscribe();
  }
  ngOnInit(): void {
    
    this.recipesSubscription = this.store.select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes)
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
}
