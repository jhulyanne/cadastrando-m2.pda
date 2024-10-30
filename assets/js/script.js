// ---------------- VISIBILIDADE DOS FORMS
const btnNewOrder = document.getElementById("btn-add-order");
const btnNewProduct = document.getElementById("btn-add-product");
const formProduct = document.getElementById('newProduct');
const formOrder = document.getElementById('newOrder');
let btnClicked = false;

btnNewOrder.addEventListener('click', function(){
    
    btnClicked = !btnClicked;

    if(btnClicked) {
        formOrder.style.display = "block";
    } else {
        formOrder.style.display = "none";
    }
})

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        formProduct.style.display = "block";
    } else {
        formProduct.style.display = "none";
    }
})

// --------- CRIAÇÃO DOS MODELOS
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

// ------------------------------------------------------------------------------------
// IMPLEMENTANDO CRUD
// CREATE
function addProduct() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const publisher = document.getElementById('bookPublisher').value;
    const genres = document.getElementById('bookGenres').value;
    const quantity = parseInt(document.getElementById('quantAvailable').value);

    if (!title || !author || !publisher || !genres || isNaN(quantity)) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const product = new Product(title, author, publisher, genres, quantity);
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    alert('Produto adicionado com sucesso!');
    displayProducts();
    document.getElementById('productForm').reset();
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

// UPDATE
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    document.getElementById('bookTitle').value = product.title;
    document.getElementById('bookAuthor').value = product.author;
    document.getElementById('bookPublisher').value = product.publisher;
    document.getElementById('bookGenres').value = product.genres;
    document.getElementById('quantAvailable').value = product.quantity;

    const formProduct = document.getElementById('newProduct');
    formProduct.style.display = "block";

    document.getElementById('productForm').onsubmit = function(event) {
        event.preventDefault();

        product.title = document.getElementById('bookTitle').value;
        product.author = document.getElementById('bookAuthor').value;
        product.publisher = document.getElementById('bookPublisher').value;
        product.genres = document.getElementById('bookGenres').value;
        product.quantity = parseInt(document.getElementById('quantAvailable').value);

        products[index] = product;
        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
        document.getElementById('productForm').reset();
        document.getElementById('productForm').onsubmit = addProduct;
        alert('Produto editado com sucesso!');
    };
}
