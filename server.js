const express = require('express'); // Load the Express library that npm installed

const app = express(); // 
const PORT = process.env.PORT || 3000;

const path = require("path")

app.use(express.static(path.join(__dirname, 'public')))

const products = [
    { id: 1, name: "Bread", price: 4.99, category: "food", stock: 50, image: "/images/bread.png" },
    { id: 2, name: "Cheese", price: 55.5, category: "food", stock: 9, image: "/public/images/cheese.png" },
    { id: 3, name: "Orange", price: 2.99, category: "food", stock: 5, image: "/public/images/orange.jpg" },
    { id: 4, name: "Apple Juice", price: 79.99, category: "drink", stock: 0, image: "" },
    { id: 5, name: "Chocolate Bar", price: 9.99, category: "food", stock: 21, image: "" },
    { id: 6, name: "Energy Drink", price: 39.99, category: "drink", stock: 0, image: "" },
];

/**
 * GET /api/health
 * Shows that the server is running.
 */
app.get('/api/health', (req, res) => {
    res.json({ status: "ok"});
});

/**
 * GET /api/products
 * Sends every product to the browser as JSON
 */
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/', (req, res) => {
    res.send('Hello from my shop!');
});

app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost:${PORT}`);
});