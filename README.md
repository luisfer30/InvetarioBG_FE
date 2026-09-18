# Inventory Frontend

Aplicación web desarrollada en **Angular** para la gestión de inventario.

El frontend consume una API REST desarrollada en ASP.NET Core.

---

## Tecnologías

- Angular
- TypeScript
- Bootstrap
- HttpClient
- Angular Router
- JWT

---

## Funcionalidades

La aplicación permite:

- Inicio de sesión.
- Almacenamiento del JWT.
- Protección de rutas mediante Auth Guard.
- Envío automático del JWT mediante HTTP Interceptor.
- Listado de productos.
- Registro de productos.
- Edición de productos.
- Eliminación de productos.
- Consulta de stock por producto.
- Visualización de precio por proveedor.
- Visualización de cantidad por proveedor.
- Registro de stock.
- Selección de proveedores.
- Cierre de sesión.
- Manejo visual de errores.
- Diseño responsive.

---

## Estructura

```text
src/app
|
|-- pages
|   |
|   |-- login
|   |-- products
|   |-- product-form
|
|-- services
|   |
|   |-- auth.ts
|   |-- products.ts
|   |-- stock.ts
|   |-- providers.ts
|
|-- guards
|   |
|   |-- auth.guard.ts
|
|-- interceptors
|   |
|   |-- auth.interceptor.ts
|
|-- app.routes.ts
|-- app.config.ts
```
