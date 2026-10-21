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

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const text = document.createElement("p");

        text.textContent = `${product.name} - £${product.price.toFixed(2)} - ${product.category} (${product.stock > 0 ? 'In stock' : 'Sold out'})`;

        item.append(image);
        item.append(text);

        list.append(item); // Adds the list onto the webpage
    }
}

async function init(){
    try{ // try to run the code
    showProducts(await getProducts()) // This runs the functions, gets the products and displays them on the page
    } catch(error){ // catches the error
        console.error(error) // Logs the error on the console
        document.querySelector("#products").textContent= "Sorry, The products could not be loaded"; // Show a error message on the webpage
    }
}

init(); // Calls the function to run everything