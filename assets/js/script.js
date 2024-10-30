// VISIBILIDADE DOS FORMS
let btnNewOrder = document.getElementById("btn-add-order");
let btnNewProduct = document.getElementById("btn-add-product");
let btnClicked = false;

btnNewOrder.addEventListener('click', function(){
    let formOrder = document.getElementById('newOrder');
    btnClicked = !btnClicked;

    if(btnClicked) {
        formOrder.style.display = "block";
    } else {
        formOrder.style.display = "none";
    }
})

btnNewProduct.addEventListener('click', function(){
    let formProduct = document.getElementById('newProduct');
    btnClicked = !btnClicked;

    if(btnClicked) {
        formProduct.style.display = "block";
    } else {
        formProduct.style.display = "none";
    }
})

// CRIAÇÃO DOS MODELOS
class Product {
    constructor(title, author, publisher, genres, quantity) {
        this.productCode = Product.generateCode(); 
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.genres = genres;
        this.quantity = quantity;
    }

    static generateCode() {
        return String(Math.floor(Math.random() * 99999) + 1).padStart(4, '0');
    }
}

class Order {
    constructor(clientName, clientCpf, clientNumber, clientEmail, clientAddress, paymentMethod, orderStatus) {
        this.orderCode = Order.generateCode();
        this.clientName = clientName;
        this.clientCpf = clientCpf;
        this.clientNumber = clientNumber;
        this.clientEmail = clientEmail;
        this.clientAddress = clientAddress;
        this.paymentMethod = paymentMethod;
        this.orderStatus = orderStatus;
    }

    static generateCode() {
        return String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
    }
}

function addProduct(title, author, publisher, genres, quantity) {
    const product = new Product(title, author, publisher, genres, quantity);
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const publisher = document.getElementById('bookPublisher').value;
    const genres = document.getElementById('bookGenres').value;
    const quantity = parseInt(document.getElementById('quantAvailable').value);

    addProduct(title, author, publisher, genres, quantity);

    document.getElementById('productForm').reset();
    alert('Produto adicionado com sucesso!');
});

// ------------------------------------------------------------------------------------
// IMPLEMENTANDO CRUD

// CREATE
function addProduct(title, author, publisher, genres, quantity) {
    const product = new Product(title, author, publisher, genres, quantity);
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// READ
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productCode}</td>
            <td>${product.title}</td>
            <td>${product.author}</td>
            <td>${product.publisher}</td>
            <td>${product.genres}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


