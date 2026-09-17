import { ChangeDetectorRef,Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product,ProductsService} from '../../services/products';
import { Router } from '@angular/router';

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

constructor(
  private productsService: ProductsService,
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
  console.log('Eliminar producto:', id);
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
}