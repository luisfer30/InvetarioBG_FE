import { ChangeDetectorRef,Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product,ProductsService} from '../../services/products';
import { Router } from '@angular/router';
import { StockItem,StockService} from '../../services/stock';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Product[] = [];
  loading = false;
  errorMessage = '';

stock: StockItem[] = [];

selectedProductId: number | null = null;

selectedProductStock: StockItem[] = [];

loadingStock = false;

constructor(
  private productsService: ProductsService,
  private stockService: StockService,
  private cdr: ChangeDetectorRef,
  private router: Router
) {}


newProduct(): void {
  this.router.navigate(['/products/new']);
}

editProduct(id: number): void {
  this.router.navigate(['/products/edit', id]);
}

deleteProduct(id: number): void {

  const confirmed = confirm(
    '¿Está seguro de eliminar este producto?'
  );

  if (!confirmed) {
    return;
  }

  this.productsService
    .deleteProduct(id)
    .subscribe({
      next: response => {

        if (response.success) {

          this.products = this.products.filter(
            product => product.id !== id
          );

          this.cdr.markForCheck();

        } else {

          this.errorMessage = response.message;
          this.cdr.markForCheck();
        }
      },

      error: error => {

        console.error(error);

        this.errorMessage =
          'No fue posible eliminar el producto.';

        this.cdr.markForCheck();
      }
    });
}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.loading = true;
    this.errorMessage = '';

    this.productsService
      .getProducts()
      .subscribe({
        next: response => {

          this.products = response.data;
          this.loading = false;

          this.cdr.markForCheck();
        },

        error: error => {

          console.error(error);

          this.errorMessage =
            'No fue posible cargar los productos.';

          this.loading = false;

          this.cdr.markForCheck();
        }
      });
  }
viewStock(productId: number): void {

  this.selectedProductId = productId;
  this.loadingStock = true;
  this.errorMessage = '';

  this.stockService
    .getStock()
    .subscribe({
      next: response => {

        console.log('STOCK API:', response);

        this.stock = response.data;

        this.selectedProductStock =
          this.stock.filter(
            item => item.productoId === productId
          );

        console.log(
          'STOCK PRODUCTO:',
          this.selectedProductStock
        );

        this.loadingStock = false;

        this.cdr.detectChanges();
      },

      error: error => {

        console.error('ERROR STOCK:', error);

        this.errorMessage =
          'No fue posible cargar el stock del producto.';

        this.loadingStock = false;

        this.cdr.detectChanges();
      }
    });
}
closeStock(): void {
  this.selectedProductId = null;
  this.selectedProductStock = [];
}
}