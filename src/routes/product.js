const express = require('express');
const productSchema = require('../models/product');
const router = express.Router();

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - SKU already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/products', async (req, res) => {
    try {
        console.log('Creating product:', req.body);
        const product = new productSchema(req.body);
        const result = await product.save();
        res.status(201).json(result);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate SKU error
            res.status(409).json({ message: 'SKU already exists' });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message || "Error creating product" });
        }
    }
});

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products with filters and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword (searches in name, brand, category)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: minStockAlert
 *         schema:
 *           type: boolean
 *         description: Show only products with low stock
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 skip:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/products', async (req, res) => {
    try {
        const { 
            q, 
            category, 
            brand, 
            minPrice, 
            maxPrice, 
            active, 
            minStockAlert,
            limit = 10, 
            skip = 0 
        } = req.query;
        
        // Build query object
        const query = {};
        
        // Text search in name, brand, category
        if (q) {
            const searchRegex = new RegExp(q, 'i');
            query.$or = [
                { name: searchRegex },
                { brand: searchRegex },
                { category: searchRegex }
            ];
        }
        
        // Category filter
        if (category) {
            query.category = new RegExp(category, 'i');
        }
        
        // Brand filter
        if (brand) {
            query.brand = new RegExp(brand, 'i');
        }
        
        // Price range filters
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        // Active filter
        if (active !== undefined) {
            query.active = active === 'true';
        }
        
        // Low stock alert filter
        if (minStockAlert === 'true') {
            query.$expr = { $lte: ['$stock', '$minStock'] };
        }
        
        console.log('Product query:', query);
        
        // Execute query with pagination
        const limitNum = Number(limit);
        const skipNum = Number(skip);
        
        const [products, total] = await Promise.all([
            productSchema.find(query)
                .limit(limitNum)
                .skip(skipNum)
                .sort({ createdAt: -1 }),
            productSchema.countDocuments(query)
        ]);
        
        res.status(200).json({
            products,
            total,
            limit: limitNum,
            skip: skipNum,
            hasMore: (skipNum + limitNum) < total
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error fetching products" });
    }
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid product ID format" });
        } else {
            res.status(500).json({ message: error.message || "Error fetching product" });
        }
    }
});

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product partially
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Remove empty fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined || updateData[key] === null || updateData[key] === '') {
                delete updateData[key];
            }
        });
        
        const product = await productSchema.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid product ID format" });
        } else if (error.code === 11000) {
            res.status(409).json({ message: "SKU already exists" });
        } else {
            res.status(500).json({ message: error.message || "Error updating product" });
        }
    }
});

/**
 * @openapi
 * /api/products/{id}/adjust-stock:
 *   patch:
 *     summary: Adjust product stock
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adjustment
 *             properties:
 *               adjustment:
 *                 type: number
 *                 description: Stock adjustment (positive to add, negative to subtract)
 *                 example: -5
 *               reason:
 *                 type: string
 *                 description: Reason for stock adjustment
 *                 example: "Sale"
 *             example:
 *               adjustment: -5
 *               reason: "Sale"
 *     responses:
 *       200:
 *         description: Stock adjusted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Stock adjusted successfully"
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *                 previousStock:
 *                   type: number
 *                   example: 30
 *                 newStock:
 *                   type: number
 *                   example: 25
 *       400:
 *         description: Bad request - insufficient stock or invalid adjustment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/products/:id/adjust-stock', async (req, res) => {
    try {
        const { id } = req.params;
        const { adjustment, reason } = req.body;
        
        if (typeof adjustment !== 'number') {
            return res.status(400).json({ message: "Adjustment must be a number" });
        }
        
        const product = await productSchema.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const previousStock = product.stock;
        const newStock = previousStock + adjustment;
        
        if (newStock < 0) {
            return res.status(400).json({ 
                message: "Insufficient stock", 
                currentStock: previousStock,
                requestedAdjustment: adjustment
            });
        }
        
        product.stock = newStock;
        await product.save();
        
        console.log(`Stock adjusted for ${product.sku}: ${previousStock} -> ${newStock} (${adjustment}). Reason: ${reason || 'Not specified'}`);
        
        res.status(200).json({
            message: "Stock adjusted successfully",
            product,
            previousStock,
            newStock,
            adjustment,
            reason: reason || null
        });
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid product ID format" });
        } else {
            res.status(500).json({ message: error.message || "Error adjusting stock" });
        }
    }
});

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (soft delete)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deactivated successfully"
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Soft delete: just set active to false
        const product = await productSchema.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json({
            message: "Product deactivated successfully",
            product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid product ID format" });
        } else {
            res.status(500).json({ message: error.message || "Error deleting product" });
        }
    }
});

module.exports = router;