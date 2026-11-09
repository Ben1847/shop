const form = document.getElementById('addForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = {
        name: document.getElementById('name').value,
        price: Number(document.getElementById('price').value),
        category: document.getElementById('category').value,
        stock: Number(document.getElementById('stock').value)
    };
    try {
        const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
        });
        const data = await response.json();
        message.textContent = response.ok
        ? `Added: ${data.name} (id ${data.id})`
        : `Error: ${data.error}`;
    } catch (error) {
        message.textContent = 'Could not reach the server';
    }
});