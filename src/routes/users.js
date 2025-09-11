const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post('/users', 
    (req, res) => {
        console.log(req.body);
        console.log(req.headers);
        const user = userSchema(req.body);
        user.save()
            .then((result) => res.status(201).json(result))
            .catch((error) => res.status(500).json({ message: error.message || "Error creating user" }));
    });

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users',
    async (req, res) => {
        userSchema.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json({ message: error.message || "Error fetching users" }));
    });

router.get('/users/:id',
    async (req, res) => {
        const { id } = req.params;
        userSchema.findById(id)
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(data);
            })
            .catch((error) => res.status(500).json({ message: error.message || "Error fetching user" }));
    });

// Filter users by age: older than
router.get('/users/filter',
    async (req, res) => {
        try {
            //1 read filters
            const { age, name } = req.query;
            let variables = {
                age: req.query.age,
                name: req.query.name
            };
            //2 build filter object
            const query = {};
            //validate and create query
            if (name){  //asks if name is not null or undefined
                query.name = new RegExp(String(name), 'i'); //i= case insensitive
            }
            if (age) {
                const n = Number(age);
                if (!Number.isFinite(n)) {
                    res.status(400).json({ message: "Age must be a valid number" });
                    return
                }
                query.age = { $gt: n }; //greater than
            }
            console.log(query);
            //3 execute query
            const users = await userSchema.find(query);
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error filtering users" });
        }
    });

router.put('/users/:id',
    (req, res) => {
        const { id } = req.params;
        const { name, age, email, password } = req.body;
        userSchema
            .updateOne({ _id: id }, { $set: { name, age, email, password } })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => res.status(500).json({ message: error.message || "Error updating user" }));
    }
);

router.delete('/users/:id',
    (req, res) => {
        const { id } = req.params;
        userSchema
            .deleteOne({ _id: id })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => res.status(500).json({ message: error.message || "Error deleting user" }));
    }
);

router.patch('/users/:id',
    (req, res) => {
    userSchema
        .deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message || "Error deleting user" }));
    }
);

router.patch('/users/:id',
    (req, res) => {
        const { id } = req.params;
        const { name, age, email, password } = req.body;
        userSchema
            .updateOne({ _id: id }, { $set: { name, age, email, password } })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => res.status(500).json({ message: error.message || "Error updating user" }));
    }
);

module.exports = router;