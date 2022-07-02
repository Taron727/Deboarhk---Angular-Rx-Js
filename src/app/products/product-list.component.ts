import { Component } from '@angular/core';

import { combineLatest, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, map, filter, startWith } from 'rxjs/operators';
import { ProductCategory } from '../product-categories/product-category';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories: ProductCategory[] = [];
  // selectedCatId: number = 0;

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY; // Observable that emit no items to Observer
    })
  );

  private catSelectedSubj = new BehaviorSubject<number>(0);
  catSelectedAct$ = this.catSelectedSubj.asObservable();  // read-only 

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.catSelectedAct$,
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY; // Observable that emit no items to Observer
    })
  );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.catSelectedSubj.next(+categoryId);
    // this.selectedCatId = +categoryId; // cast to number
    // console.log('updated to', categoryId, this.selectedCatId);
    // console.log('Not yet implemented');
  }
}
