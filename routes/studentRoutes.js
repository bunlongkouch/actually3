const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Registration API (POST)
router.post('/register', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send({ message: "User registered successfully", student });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Login API (POST)
router.post('/login', async (req, res) => {
    const { sid, spass } = req.body;
    const student = await Student.findOne({ sid, spass });
    if (student) {
        res.send({ message: "Login successful", student });
    } else {
        res.status(401).send({ message: "Invalid credentials" });
    }
});

// Search API (GET)
router.get('/search/:sid', async (req, res) => {
    const student = await Student.findOne({ sid: req.params.sid });
    if (student) {
        res.send(student);
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

// Update API (PUT)
router.put('/update/:sid', async (req, res) => {
    const student = await Student.findOneAndUpdate({ sid: req.params.sid }, req.body, { new: true });
    if (student) {
        res.send({ message: "User updated successfully", student });
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

// Delete API (DELETE)
router.delete('/delete/:sid', async (req, res) => {
    const student = await Student.findOneAndDelete({ sid: req.params.sid });
    if (student) {
        res.send({ message: "User deleted successfully" });
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

module.exports = router;
