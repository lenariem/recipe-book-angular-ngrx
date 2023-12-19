import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
})
export class RecipeStartComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

}
