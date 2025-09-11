const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         age:
 *           type: integer
 *           format: int32
 *           description: The age of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         name: John Doe
 *         age: 30
 *         email: john.doe@example.com
 *         password: securepassword
 *
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Mongo ObjectId
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *
 *     UserUpdate:
 *       type: object
 *       description: Campos a actualizar (todos opcionales)
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *           format: int32
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
 *     UpdateResult:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           example: true
 *         matchedCount:
 *           type: integer
 *           example: 1
 *         modifiedCount:
 *           type: integer
 *           example: 1
 *         upsertedCount:
 *           type: integer
 *           example: 0
 *         upsertedId:
 *           nullable: true
 *           example: null
 *
 *     DeleteResult:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           example: true
 *         deletedCount:
 *           type: integer
 *           example: 1
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User not found
 */

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        password: { type: String, required: true }
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
