# API REST de Gestión de Productos

API REST completa para la gestión de inventarios y productos, desarrollada con Node.js, Express, MongoDB y documentada con Swagger UI.

## 📚 Descripción del Proyecto

Esta API permite gestionar un catálogo de productos con funcionalidades completas de:
- **CRUD de productos** (Crear, Leer, Actualizar, Eliminar)
- **Gestión de inventarios** con ajustes de stock
- **Búsquedas avanzadas** con filtros múltiples
- **Paginación** para grandes volúmenes de datos
- **Documentación interactiva** con Swagger UI
- **Validaciones robustas** y manejo de errores

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + Express.js
- **Base de Datos**: MongoDB con Mongoose ODM
- **Documentación**: Swagger UI + OpenAPI 3.0
- **Desarrollo**: Nodemon para hot reload
- **Configuración**: dotenv para variables de entorno

## 📁 Estructura del Proyecto

```
REST-API/
│
├── src/
│   ├── models/
│   │   └── product.js       # Modelo de producto + esquemas Swagger
│   ├── routes/
│   │   └── product.js       # Endpoints REST + documentación OpenAPI
│   └── index.js             # Servidor principal + configuración Swagger
│
├── package.json             # Dependencias y scripts npm
├── .env                     # Variables de entorno
└── README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd REST-API
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/products-api
```

### 4. Iniciar el servidor
```bash
# Modo desarrollo (recomendado)
npm run start

# Modo producción
node src/index.js
```

## 📊 Modelo de Producto

### Campos del Producto:
- **`sku`** (String, único, requerido) - Código identificador del producto
- **`name`** (String, requerido) - Nombre comercial del producto
- **`brand`** (String, opcional) - Marca del producto
- **`category`** (String, requerido) - Categoría del producto
- **`unit`** (String, requerido) - Unidad de venta: `pz`, `caja`, `m`, `kg`, `lt`
- **`price`** (Number, requerido, ≥ 0) - Precio de venta
- **`cost`** (Number, opcional, ≥ 0) - Costo del producto
- **`stock`** (Number, requerido, ≥ 0) - Existencias actuales
- **`minStock`** (Number, opcional, ≥ 0, default: 0) - Nivel mínimo de inventario
- **`location`** (String, opcional) - Ubicación en bodega
- **`supplierId`** (String, opcional) - ID del proveedor
- **`tags`** (Array[String], opcional) - Etiquetas para búsqueda
- **`imageUrl`** (String, opcional) - URL de imagen del producto
- **`active`** (Boolean, default: true) - Estado activo/inactivo
- **`attributes`** (Array[{key, value}], opcional) - Atributos personalizados
- **`createdAt`** (Date, automático) - Fecha de creación
- **`updatedAt`** (Date, automático) - Fecha de última actualización

### Ejemplo de Producto:
```json
{
  "sku": "HAM-16OZ-STAN001",
  "name": "Martillo 16oz mango fibra",
  "brand": "Stanley",
  "category": "Herramientas",
  "unit": "pz",
  "price": 12990,
  "cost": 8500,
  "stock": 24,
  "minStock": 5,
  "location": "A-1-B",
  "supplierId": "PROV-001",
  "tags": ["martillo", "obrero", "construccion"],
  "imageUrl": "https://example.com/images/martillo-stanley.jpg",
  "attributes": [
    {"key": "peso", "value": "16oz"},
    {"key": "material", "value": "fibra de vidrio"}
  ]
}
```

## 🔗 Endpoints de la API

### Base URL: `http://localhost:3000/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/products` | Listar productos con filtros y paginación |
| **POST** | `/products` | Crear un nuevo producto |
| **GET** | `/products/:id` | Obtener producto por ID |
| **PATCH** | `/products/:id` | Actualizar producto parcialmente |
| **DELETE** | `/products/:id` | Eliminar producto (soft delete) |
| **PATCH** | `/products/:id/adjust-stock` | Ajustar stock del producto |

### Documentación Interactiva
- **Swagger UI**: `http://localhost:3000/api-docs`

## 🔍 Filtros y Búsqueda

### Parámetros de Query disponibles:

#### Búsqueda General:
- **`q`** - Busca en nombre, marca y categoría
  ```
  GET /api/products?q=martillo
  ```

#### Filtros Específicos:
- **`category`** - Filtrar por categoría
- **`brand`** - Filtrar por marca
- **`minPrice`** - Precio mínimo
- **`maxPrice`** - Precio máximo
- **`active`** - Estado (true/false)
- **`minStockAlert`** - Solo productos con stock bajo

#### Paginación:
- **`limit`** - Número de productos por página (default: 10)
- **`skip`** - Productos a omitir (default: 0)

### Ejemplos de Uso:
```bash
# Búsqueda general
GET /api/products?q=martillo&limit=5

# Filtro por categoría y marca
GET /api/products?category=Herramientas&brand=Stanley

# Productos con precio entre $1000 y $50000
GET /api/products?minPrice=1000&maxPrice=50000

# Productos con stock bajo
GET /api/products?minStockAlert=true

# Paginación (página 3, 20 productos por página)
GET /api/products?limit=20&skip=40
```

## 📝 Ejemplos de Uso

### 1. Crear un Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "TAL-12V-DEW001",
    "name": "Taladro inalámbrico 12V",
    "brand": "DeWalt",
    "category": "Herramientas Eléctricas",
    "unit": "pz",
    "price": 45990,
    "cost": 32000,
    "stock": 15,
    "minStock": 3,
    "tags": ["taladro", "inalambrico", "dewalt"],
    "attributes": [
      {"key": "voltaje", "value": "12V"},
      {"key": "bateria", "value": "Li-ion"}
    ]
  }'
```

### 2. Buscar Productos
```bash
# Buscar todos los taladros
curl "http://localhost:3000/api/products?q=taladro"

# Herramientas DeWalt con paginación
curl "http://localhost:3000/api/products?brand=DeWalt&category=Herramientas&limit=10&skip=0"
```

### 3. Ajustar Stock
```bash
# Reducir stock por venta
curl -X PATCH http://localhost:3000/api/products/[PRODUCT_ID]/adjust-stock \
  -H "Content-Type: application/json" \
  -d '{
    "adjustment": -3,
    "reason": "Venta al cliente"
  }'

# Aumentar stock por compra
curl -X PATCH http://localhost:3000/api/products/[PRODUCT_ID]/adjust-stock \
  -H "Content-Type: application/json" \
  -d '{
    "adjustment": 50,
    "reason": "Compra a proveedor"
  }'
```

### 4. Actualizar Producto
```bash
curl -X PATCH http://localhost:3000/api/products/[PRODUCT_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "price": 47990,
    "stock": 20,
    "location": "B-2-A"
  }'
```

## 📊 Respuestas de la API

### Listado de Productos:
```json
{
  "products": [...],
  "total": 150,
  "limit": 10,
  "skip": 0,
  "hasMore": true
}
```

### Ajuste de Stock:
```json
{
  "message": "Stock adjusted successfully",
  "product": {...},
  "previousStock": 15,
  "newStock": 12,
  "adjustment": -3,
  "reason": "Venta al cliente"
}
```

### Errores:
```json
{
  "message": "Product not found"
}
```

## ⚠️ Códigos de Estado HTTP

- **200** - OK (consulta exitosa)
- **201** - Created (producto creado)
- **400** - Bad Request (datos inválidos)
- **404** - Not Found (producto no encontrado)
- **409** - Conflict (SKU duplicado)
- **500** - Internal Server Error (error del servidor)

## 🧪 Testing con Swagger UI

1. **Iniciar el servidor**: `npm run start`
2. **Abrir navegador**: `http://localhost:3000/api-docs`
3. **Explorar endpoints**: Cada endpoint tiene ejemplos y formularios interactivos
4. **Probar directamente**: Ejecutar requests desde la interfaz
5. **Ver respuestas**: Analizar resultados en tiempo real

## 🔧 Funcionalidades Avanzadas

### Gestión de Inventarios
- **Seguimiento de stock** en tiempo real
- **Alertas de stock mínimo** automáticas
- **Auditoría de movimientos** con motivos
- **Validación de stock negativo**

### Búsqueda Inteligente
- **Búsqueda de texto completo** en múltiples campos
- **Filtros combinables** para búsquedas precisas
- **Paginación eficiente** para grandes catálogos
- **Índices optimizados** para mejor performance

### Validaciones
- **SKU único** en toda la base de datos
- **Precios y costos no negativos**
- **Unidades de medida predefinidas**
- **URLs válidas** para imágenes
- **Atributos flexibles** con validación de estructura

## 🛡️ Buenas Prácticas Implementadas

- **Separación de responsabilidades** (Modelo, Rutas, Controlador)
- **Validación robusta** con mensajes descriptivos
- **Manejo de errores** centralizado
- **Documentación completa** con OpenAPI 3.0
- **Soft delete** para preservar historial
- **Índices de base de datos** para performance
- **Variables de entorno** para configuración

## 🔧 Desarrollo y Mantenimiento

### Scripts Disponibles:
```bash
# Iniciar en desarrollo
npm run start

# Instalar dependencias
npm install

# Limpiar node_modules
npm run clean  # (si está configurado)
```

### Logs y Debugging:
- Los logs aparecen en la consola durante desarrollo
- Usa las herramientas de desarrollador del navegador con Swagger UI
- MongoDB Compass para inspeccionar la base de datos

## 📈 Escalabilidad

### Consideraciones para Producción:
- **Índices adicionales** según patrones de consulta
- **Rate limiting** para prevenir abuso
- **Autenticación y autorización** para seguridad
- **Logging estructurado** para monitoreo
- **Tests automatizados** para CI/CD
- **Compresión GZIP** para responses grandes
- **CORS configurado** para frontend

## 👨‍💻 Autor

**Santiago Valverde**  
Proyecto desarrollado para aprendizaje de APIs REST y gestión de inventarios.

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.