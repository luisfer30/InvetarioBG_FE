import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductsService } from '../../services/products';
import { Router } from '@angular/router';
import { StockCreate, StockItem, StockService } from '../../services/stock';
import { FormsModule } from '@angular/forms';
import { Provider, ProvidersService } from '../../services/providers';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  stock: StockItem[] = [];
  providers: Provider[] = [];

  selectedProductId: number | null = null;

  selectedProductStock: StockItem[] = [];

  loadingStock = false;

  showStockForm = false;

  newStock: StockCreate = {
    productoId: 0,
    proveedorId: 1,
    precioUnitario: 0,
    cantidad: 0,
  };

  constructor(
    private productsService: ProductsService,
    private stockService: StockService,
    private providersService: ProvidersService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  newProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    const confirmed = confirm('¿Está seguro de eliminar este producto?');

    if (!confirmed) {
      return;
    }

    this.productsService.deleteProduct(id).subscribe({
      next: response => {
        if (response.success) {
          this.products = this.products.filter(product => product.id !== id);

          this.cdr.markForCheck();
        } else {
          this.errorMessage = response.message;
          this.cdr.markForCheck();
        }
      },

      error: error => {
        console.error(error);

        this.errorMessage = 'No fue posible eliminar el producto.';

        this.cdr.markForCheck();
      },
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadProviders();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productsService.getProducts().subscribe({
      next: response => {
        this.products = response.data;
        this.loading = false;

        this.cdr.markForCheck();
      },

      error: error => {
        console.error(error);

        this.errorMessage = 'No fue posible cargar los productos.';

        this.loading = false;

        this.cdr.markForCheck();
      },
    });
  }
  viewStock(productId: number): void {
    this.selectedProductId = productId;
    this.loadingStock = true;
    this.errorMessage = '';

    this.stockService.getStock().subscribe({
      next: response => {
        console.log('STOCK API:', response);

        this.stock = response.data;

        this.selectedProductStock = this.stock.filter(item => item.productoId === productId);

        console.log('STOCK PRODUCTO:', this.selectedProductStock);

        this.loadingStock = false;

        this.cdr.detectChanges();
      },

      error: error => {
        console.error('ERROR STOCK:', error);

        this.errorMessage = 'No fue posible cargar el stock del producto.';

        this.loadingStock = false;

        this.cdr.detectChanges();
      },
    });
  }
  closeStock(): void {
    this.selectedProductId = null;
    this.selectedProductStock = [];
  }
  openStockForm(): void {
    if (this.selectedProductId === null) {
      return;
    }

    this.newStock = {
      productoId: this.selectedProductId,
      proveedorId: 1,
      precioUnitario: 0,
      cantidad: 0,
    };

    this.showStockForm = true;
  }
  cancelStockForm(): void {
    this.showStockForm = false;
  }
  saveStock(): void {
    if (this.selectedProductId === null) {
      return;
    }

    if (this.newStock.proveedorId <= 0) {
      this.errorMessage = 'Debe seleccionar un proveedor.';
      return;
    }

    if (this.newStock.precioUnitario <= 0) {
      this.errorMessage = 'El precio debe ser mayor a cero.';
      return;
    }

    if (this.newStock.cantidad < 0) {
      this.errorMessage = 'La cantidad no puede ser negativa.';
      return;
    }

    this.newStock.productoId = this.selectedProductId;

    this.loadingStock = true;
    this.errorMessage = '';

    this.stockService.addStock(this.newStock).subscribe({
      next: response => {
        this.loadingStock = false;

        if (response.success) {
          this.showStockForm = false;

          this.viewStock(this.selectedProductId!);
        } else {
          this.errorMessage = response.message;

          this.cdr.detectChanges();
        }
      },

      error: error => {
        console.error(error);

        this.loadingStock = false;

        this.errorMessage = error?.error?.message ?? 'No fue posible registrar el stock.';

        this.cdr.detectChanges();
      },
    });
  }
  loadProviders(): void {
    this.providersService.getProviders().subscribe({
      next: response => {
        this.providers = response.data;
        this.cdr.detectChanges();
      },

      error: error => {
        console.error('ERROR PROVEEDORES:', error);
      },
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
