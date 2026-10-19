const express = require('express'); // Load the Express library that npm installed

const app = express(); // 
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from my shop!');
});

app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost:${PORT}`);
});