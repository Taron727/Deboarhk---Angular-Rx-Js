import { Component } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$ = this.productService.products$.pipe(
    tap((item) => console.log('item=', item)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY; // Observable that emit no items to Observer
    })
  );

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
