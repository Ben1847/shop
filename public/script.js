async function getProducts(){
    const address = `http://localhost:3000/api/products`; // Gets products
    const response = await fetch(address); // contacts the links server and gets the products from the page
    if (!response.ok) { // if its false and fails
    throw new Error(`Request failed with status ${response.status}`); // Creates an error and stops the execution
    }
    return response.json(); // Converts the response to json and returns it
}

function showProducts(products){
    const list = document.querySelector("#products") // Stores the list with the ID
    list.innerHTML = ""; // Removes everything inside the list by setting it to nothing
    if (products.length === 0) { // Checks if there are no Products
        list.textContent = "No Products found."; // Shows this text on the HTML 
        return; // Exits the function
    }
    for (const product of products) { // It is a loop going through all the products in the array
        console.log(product);
        const item = document.createElement("li") // This creates a new HTML list element
        item.className = "product-card";

        item.innerHTML = `<img src="${product.image}" alt="${product.name}">
                          <h2>${product.name}</h2>
                          <p class="product-price">£${product.price.toFixed(2)}</p>
                          <p>Category: ${product.category}</p>
                          <p class="product-stock">
                          ${product.stock > 0 ? "In stock" : "Sold out"}
                          </p>`;
                          
        list.append(item); // Adds the list onto the webpage
    }
}
async function getProducts(category = '', sort = '') {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
    const response = await fetch(`/api/products?${params}`);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}
async function refresh() {
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;
    showProducts(await getProducts(category, sort));
    }
    document.getElementById('categoryFilter')
    .addEventListener('change', refresh);
    document.getElementById('sortFilter')
    .addEventListener('change', refresh);

async function init(){
    try{ // try to run the code
    showProducts(await getProducts()) // This runs the functions, gets the products and displays them on the page
    } catch(error){ // catches the error
        console.error(error) // Logs the error on the console
        document.querySelector("#products").textContent= "Sorry, The products could not be loaded"; // Show a error message on the webpage
    }
}

init(); // Calls the function to run everything