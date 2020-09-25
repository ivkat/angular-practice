import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  //@Input() index: number;
  recipeToShow: Recipe;
  private recipeId: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.recipeId = +params['id'];
        this.recipeToShow = this.recipeService.getRecipe(this.recipeId);
      }
    )
  }
  toShoppingList(){
    
    this.recipeService.addToShoppingList(this.recipeToShow.ingredients);
  }

  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo: this.route}); ESTO FUNCIONA sin pasar el ID
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeId);    
    this.router.navigate(['/recipes']);
  }
}
