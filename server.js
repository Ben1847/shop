const express = require('express'); // Load the Express library that npm installed

const app = express(); // 
const PORT = process.env.PORT || 3000;

const path = require("path")

app.use(express.static(path.join(__dirname, 'public')))

const products = [
    { id: 1, name: "Wireless Mouse", price: 14.99, category: "accessories", stock: 25 },
    { id: 2, name: "Mechanical Keyboard", price: 59.5, category: "accessories", stock: 8 },
    { id: 3, name: "USB-C Hub", price: 24, category: "accessories", stock: 0 },
    { id: 4, name: "24-inch Monitor", price: 119.99, category: "displays", stock: 5 },
    { id: 5, name: "Laptop Stand", price: 22.5, category: "accessories", stock: 14 },
    { id: 6, name: "Webcam HD", price: 39.99, category: "video", stock: 0 },
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