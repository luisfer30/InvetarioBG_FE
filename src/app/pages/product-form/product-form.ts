import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Product,
  ProductsService
} from '../../services/products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {

  product: Product = {
    id: 0,
    nombre: '',
    modelo: '',
    categoriaId: 1,
    marcaId: 1
  };

  loading = false;
  errorMessage = '';

  isEditMode = false;
  productId = 0;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;
      this.productId = Number(id);

      this.loadProduct();
    }
  }

  loadProduct(): void {

    this.loading = true;
    this.errorMessage = '';

    this.productsService
      .getProductById(this.productId)
      .subscribe({
        next: response => {

          if (response.success && response.data) {

            this.product = response.data;

          } else {

            this.errorMessage =
              'No fue posible cargar el producto.';
          }

          this.loading = false;

          this.cdr.markForCheck();
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'No fue posible cargar el producto.';

          this.cdr.markForCheck();
        }
      });
  }

  save(): void {

    if (!this.product.nombre) {

      this.errorMessage =
        'El nombre del producto es obligatorio.';

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode) {

      this.updateProduct();

    } else {

      this.createProduct();
    }
  }

  private createProduct(): void {

    this.productsService
      .addProduct(this.product)
      .subscribe({
        next: response => {

          this.loading = false;

          if (response.success) {

            this.router.navigate(['/products']);

          } else {

            this.errorMessage = response.message;

            this.cdr.markForCheck();
          }
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'No fue posible crear el producto.';

          this.cdr.markForCheck();
        }
      });
  }

  private updateProduct(): void {

    this.productsService
      .updateProduct(this.product)
      .subscribe({
        next: response => {

          this.loading = false;

          if (response.success) {

            this.router.navigate(['/products']);

          } else {

            this.errorMessage = response.message;

            this.cdr.markForCheck();
          }
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'No fue posible actualizar el producto.';

          this.cdr.markForCheck();
        }
      });
  }

  cancel(): void {

    this.router.navigate(['/products']);
  }
}