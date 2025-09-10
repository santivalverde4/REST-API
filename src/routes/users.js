const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

router.post('/users', 
    (req, res) => {
        console.log(req.body);
        console.log(req.headers);
        const user = userSchema(req.body);
        user.save()
            .then((result) => res.status(201).json(result))
            .catch((error) => res.status(500).json({ message: error.message || "Error creating user" }));
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

module.exports = router;