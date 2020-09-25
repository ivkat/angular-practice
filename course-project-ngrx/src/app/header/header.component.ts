import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated: boolean = false;
  
  constructor(
    
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      map(authState => {
        return authState.user
      })
    ).subscribe((user: User) => {
      this.isAuthenticated = !!user;
      
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  

  onSaveData(){
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(){
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    
    this.store.dispatch(new AuthActions.Logout());
  }

}
