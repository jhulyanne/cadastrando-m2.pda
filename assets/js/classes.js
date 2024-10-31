// --------- CLASSE PRODUCT COM CRUD ------
// isso aqui tá funcionando, pelo amor de deus...

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

    save() {
        products.push(this);
        Product.updateStorage();
    }

    static updateStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    update(newData) {
        Object.assign(this, newData);
        Product.updateStorage();
    }

    static delete(index) {
        products.splice(index, 1);
        Product.updateStorage();
    }

    static displayAll() {
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
                    <button onclick="Product.editProduct(${index})">Editar</button>
                    <button onclick="Product.delete(${index}); Product.displayAll()">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    static editProduct(index) {
        const product = products[index];
        
        document.getElementById('bookTitle').value = product.title;
        document.getElementById('bookAuthor').value = product.author;
        document.getElementById('bookPublisher').value = product.publisher;
        document.getElementById('bookGenres').value = product.genres;
        document.getElementById('quantAvailable').value = product.quantity;

        formProduct.style.display = "block";

        document.getElementById('productForm').onsubmit = function(event) {
            event.preventDefault();

            const updatedData = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                publisher: document.getElementById('bookPublisher').value,
                genres: document.getElementById('bookGenres').value,
                quantity: parseInt(document.getElementById('quantAvailable').value)
            };

            product.update(updatedData);  // Chama o método update na instância de Product
            Product.displayAll();
            document.getElementById('productForm').reset();
            document.getElementById('productForm').onsubmit = handleAddProduct;
            alert('Produto editado com sucesso!');
        };
    }
}

let products = JSON.parse(localStorage.getItem('products')) || [];
products = products.map(product => new Product(product.title, product.author, product.publisher, product.genres, product.quantity));

function handleAddProduct() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const publisher = document.getElementById('bookPublisher').value;
    const genres = document.getElementById('bookGenres').value;
    const quantity = parseInt(document.getElementById('quantAvailable').value);

    const newProduct = new Product(title, author, publisher, genres, quantity);
    newProduct.save();

    alert('Produto adicionado com sucesso!');
    Product.displayAll();
    document.getElementById('productForm').reset();
}

window.onload = () => Product.displayAll();
document.getElementById('productForm').onsubmit = function(event) {
    event.preventDefault();
    handleAddProduct();
};