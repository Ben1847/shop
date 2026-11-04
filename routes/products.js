//routes/product.js
const express = require("express");
const router = express.Router();
let products = [
    { id: 1, name: "Bread", price: 4.99, category: "food", stock: 50, image: "/images/bread.webp" },
    { id: 2, name: "Cheese", price: 55.5, category: "food", stock: 9, image: "/images/cheese.webp" },
    { id: 3, name: "Orange", price: 2.99, category: "food", stock: 5, image: "/images/orange.webp" },
    { id: 4, name: "Apple Juice", price: 79.99, category: "drink", stock: 0, image: "/images/apple juice.webp" },
    { id: 5, name: "Chocolate Bar", price: 9.99, category: "food", stock: 21, image: "/images/chocolate bar.webp" },
    { id: 6, name: "Energy Drink", price: 39.99, category: "drink", stock: 0, image: "/images/energy drink.webp" },
];
let nextId = 7; //the id the next new product


router.get("/", (req, res) => {

    // Get query parameters
    const { category, maxPrice, sort } = req.query;

    // Create a copy of the products array
    let result = [...products];

    // Filter by category
    if (category) {
        result = result.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter by maximum price
    if (maxPrice !== undefined) {
        const price = Number(maxPrice);

        // Validate maxPrice
        if (Number.isNaN(price) || price < 0) {
            return res.status(400).json({
                error: "MaxPrice must be a number"
            });
        }

        result = result.filter(p => p.price <= price);
    }

    // Sort by price
    if (sort === "price") {
        result.sort((a, b) => a.price - b.price);
    }

    // Sort by name
    if (sort === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json(result);
});

function parseId(value) {
    const id = Number(value);

    return Number.isInteger(id) ? id : null;
}

router.get("/:id", (req, res) => {
    // Get ID from URL
    const id = parseId(req.params.id);

    // Return 400 if ID is invalid
    if (id === null) {
        return res.status(400).json({
            error: "Id must be a whole number"
        });
    }
    
    // Find matching product
    const product = products.find(p => p.id === id);

    // Return 404 if product doesn't exist
    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    // Return the product
    res.json(product);
});

module.exports = router;
