import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }

  onExportToTextFile() {
    this.ingredients.subscribe((data) => {
      const textContent = data.ingredients
        .map((ingredient) => `${ingredient.name}: ${ingredient.amount}`)
        .join('\n');
      const blob = new Blob([textContent], { type: 'text/plain' });
      saveAs(blob, 'shopping-list.txt');
    });
  }
}
