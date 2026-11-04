const express = require('express'); // Load the Express library that npm installed

const app = express(); // 
const PORT = process.env.PORT || 3000;

const path = require("path")
const productsRouter = require("./routes/products")

app.use(express.json())
app.use(express.static("public"))
app.use("/api/products",productsRouter)

app.use(express.static(path.join(__dirname, 'public')))


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