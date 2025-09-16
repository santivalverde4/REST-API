const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductInput:
 *       type: object
 *       required:
 *         - sku
 *         - name
 *         - category
 *         - unit
 *         - price
 *         - stock
 *       properties:
 *         sku:
 *           type: string
 *           description: Código único del producto
 *           example: "HAM-16OZ-STAN001"
 *         name:
 *           type: string
 *           description: Nombre comercial del producto
 *           example: "Martillo 16oz mango fibra"
 *         brand:
 *           type: string
 *           description: Marca del producto
 *           example: "Stanley"
 *         category:
 *           type: string
 *           description: Categoría del producto
 *           example: "Herramientas"
 *         unit:
 *           type: string
 *           description: Unidad de venta
 *           enum: [pz, caja, m, kg, lt]
 *           example: "pz"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Precio de venta
 *           example: 12990
 *         cost:
 *           type: number
 *           minimum: 0
 *           description: Costo del producto
 *           example: 8500
 *         stock:
 *           type: number
 *           minimum: 0
 *           description: Existencias actuales
 *           example: 24
 *         minStock:
 *           type: number
 *           minimum: 0
 *           description: Nivel mínimo de inventario
 *           default: 0
 *           example: 5
 *         location:
 *           type: string
 *           description: Ubicación en bodega
 *           example: "A-1-B"
 *         supplierId:
 *           type: string
 *           description: Referencia al proveedor
 *           example: "PROV-001"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas de búsqueda
 *           example: ["martillo", "obrero"]
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de imagen del producto
 *           example: "https://example.com/images/martillo.jpg"
 *         active:
 *           type: boolean
 *           description: Estado activo/inactivo
 *           default: true
 *           example: true
 *         attributes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: "peso"
 *               value:
 *                 type: string
 *                 example: "16oz"
 *           description: Atributos libres del producto
 *           example: [{"key": "peso", "value": "16oz"}]
 *       example:
 *         sku: "HAM-16OZ-STAN001"
 *         name: "Martillo 16oz mango fibra"
 *         brand: "Stanley"
 *         category: "Herramientas"
 *         unit: "pz"
 *         price: 12990
 *         cost: 8500
 *         stock: 24
 *         minStock: 5
 *         tags: ["martillo", "obrero"]
 *         attributes: [{"key": "peso", "value": "16oz"}]
 *
 *     Product:
 *       allOf:
 *         - $ref: '#/components/schemas/ProductInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Mongo ObjectId
 *               example: "507f1f77bcf86cd799439011"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Fecha de creación
 *               example: "2025-09-16T10:30:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: Fecha de última actualización
 *               example: "2025-09-16T10:30:00.000Z"
 *             isLowStock:
 *               type: boolean
 *               description: Indica si el stock está por debajo del mínimo
 *               example: false
 *
 *     ProductUpdate:
 *       type: object
 *       description: Campos a actualizar (todos opcionales)
 *       properties:
 *         sku:
 *           type: string
 *           description: Código único del producto
 *         name:
 *           type: string
 *           description: Nombre comercial del producto
 *         brand:
 *           type: string
 *           description: Marca del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         unit:
 *           type: string
 *           enum: [pz, caja, m, kg, lt]
 *           description: Unidad de venta
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Precio de venta
 *         cost:
 *           type: number
 *           minimum: 0
 *           description: Costo del producto
 *         stock:
 *           type: number
 *           minimum: 0
 *           description: Existencias actuales
 *         minStock:
 *           type: number
 *           minimum: 0
 *           description: Nivel mínimo de inventario
 *         location:
 *           type: string
 *           description: Ubicación en bodega
 *         supplierId:
 *           type: string
 *           description: Referencia al proveedor
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas de búsqueda
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de imagen del producto
 *         active:
 *           type: boolean
 *           description: Estado activo/inactivo
 *         attributes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *           description: Atributos libres del producto
 *
 *     ProductFilter:
 *       type: object
 *       description: Filtros disponibles para búsqueda de productos
 *       properties:
 *         q:
 *           type: string
 *           description: Palabra clave para buscar en nombre, marca o categoría
 *           example: "martillo"
 *         category:
 *           type: string
 *           description: Filtrar por categoría
 *           example: "Herramientas"
 *         brand:
 *           type: string
 *           description: Filtrar por marca
 *           example: "Stanley"
 *         minPrice:
 *           type: number
 *           description: Precio mínimo
 *           example: 1000
 *         maxPrice:
 *           type: number
 *           description: Precio máximo
 *           example: 50000
 *         active:
 *           type: boolean
 *           description: Filtrar por estado activo
 *           example: true
 *         minStockAlert:
 *           type: boolean
 *           description: Mostrar solo productos con stock bajo
 *           example: true
 *         limit:
 *           type: integer
 *           description: Número de productos a retornar
 *           default: 10
 *           example: 10
 *         skip:
 *           type: integer
 *           description: Número de productos a omitir (paginación)
 *           default: 0
 *           example: 20
 *
 *     ProductList:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         total:
 *           type: integer
 *           description: Total de productos que coinciden con el filtro
 *           example: 150
 *         limit:
 *           type: integer
 *           description: Límite aplicado
 *           example: 10
 *         skip:
 *           type: integer
 *           description: Productos omitidos
 *           example: 20
 *         hasMore:
 *           type: boolean
 *           description: Indica si hay más productos disponibles
 *           example: true
 *
 *     StockAdjustment:
 *       type: object
 *       required:
 *         - adjustment
 *       properties:
 *         adjustment:
 *           type: number
 *           description: Ajuste de stock (positivo para agregar, negativo para restar)
 *           example: -5
 *         reason:
 *           type: string
 *           description: Motivo del ajuste de stock
 *           example: "Venta"
 *       example:
 *         adjustment: -5
 *         reason: "Venta"
 *
 *     StockAdjustmentResult:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Stock adjusted successfully"
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         previousStock:
 *           type: number
 *           description: Stock anterior
 *           example: 30
 *         newStock:
 *           type: number
 *           description: Stock actual
 *           example: 25
 *         adjustment:
 *           type: number
 *           description: Ajuste aplicado
 *           example: -5
 *         reason:
 *           type: string
 *           description: Motivo del ajuste
 *           example: "Venta"
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *           example: "Product not found"
 */

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    unit: {
        type: String,
        required: [true, 'Unit is required'],
        enum: {
            values: ['pz', 'caja', 'm', 'kg', 'lt'],
            message: 'Unit must be one of: pz, caja, m, kg, lt'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than or equal to 0']
    },
    cost: {
        type: Number,
        min: [0, 'Cost must be greater than or equal to 0']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock must be greater than or equal to 0']
    },
    minStock: {
        type: Number,
        min: [0, 'Minimum stock must be greater than or equal to 0'],
        default: 0
    },
    location: {
        type: String,
        trim: true
    },
    supplierId: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true; // Allow empty values
                return /^https?:\/\/.+/.test(v);
            },
            message: 'ImageUrl must be a valid URL'
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    attributes: [{
        key: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            trim: true
        }
    }]
}, {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    collection: 'Product' // Especifica el nombre de la colección
});

module.exports = mongoose.model('Product', productSchema);