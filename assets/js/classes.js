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
                    <button class="btnEdit" onclick="Product.editProduct(${index})"><img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="ícone de editar"></button>
                    <button class="btnDel" onclick="Product.delete(${index}); Product.displayAll()"><img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="ícone de excluir"></button>
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

// --------- CLASSE ORDER COM CRUD
// p.s.: socorro

class Order {
    constructor(productCode, clientName, clientCpf, clientNumber, clientEmail, clientAddress, paymentMethod, orderStatus) {
        this.orderCode = Order.generateCode();
        this.productCode = productCode;  // Adicione este campo
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

    // Método para salvar pedido
    save() {
        orders.push(this);
        Order.updateStorage();
    }

    // Atualizar o localStorage
    static updateStorage() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    // Atualizar dados de um pedido
    update(newData) {
        Object.assign(this, newData);
        Order.updateStorage();
    }

    // Excluir um pedido
    static delete(index) {
        orders.splice(index, 1);
        Order.updateStorage();
    }

    // Exibir pedidos
    static displayAll() {
        const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpa o conteúdo anterior
    
        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderCode}</td>
                <td>${order.productCode}</td> <!-- Agora exibe o código do produto -->
                <td>${order.clientName}</td>
                <td>${order.clientCpf}</td>
                <td>${order.clientNumber}</td>
                <td>${order.clientAddress}</td>
                <td>${order.paymentMethod}</td>
                <td>${order.orderStatus}</td>
                <td>
                    <button class="btnEdit" onclick="Order.editOrder(${index})"><img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="ícone de editar"></button>
                    <button class="btnDel" onclick="Order.delete(${index}); Order.displayAll()"><img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="ícone de editar"></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }    

    // Editar pedido
    static editOrder(index) {
        const order = orders[index];
        
        document.getElementById('buyerName').value = order.clientName;
        document.getElementById('buyerCpf').value = order.clientCpf;
        document.getElementById('buyerNumber').value = order.clientNumber;
        document.getElementById('buyerEmail').value = order.clientEmail;
        document.getElementById('buyerAddres').value = order.clientAddress;
        document.getElementById('paymentMethod').value = order.paymentMethod;
        document.getElementById('orderStatus').value = order.orderStatus;

        formOrder.style.display = "block";

        document.getElementById('orderForm').onsubmit = function(event) {
            event.preventDefault();

            const updatedData = {
                clientName: document.getElementById('buyerName').value,
                clientCpf: document.getElementById('buyerCpf').value,
                clientNumber: document.getElementById('buyerNumber').value,
                clientEmail: document.getElementById('buyerEmail').value,
                clientAddress: document.getElementById('buyerAddres').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                orderStatus: document.getElementById('orderStatus').value
            };

            order.update(updatedData);  // Chama o método update na instância de Order
            Order.displayAll();
            document.getElementById('orderForm').reset();
            document.getElementById('orderForm').onsubmit = handleAddOrder;
            alert('Pedido editado com sucesso!');
        };
    }
}

// Inicializar pedidos e converter objetos recuperados do localStorage para instâncias de Order
let orders = JSON.parse(localStorage.getItem('orders')) || [];
orders = orders.map(order => new Order(order.clientName, order.clientCpf, order.clientNumber, order.clientEmail, order.clientAddress, order.paymentMethod, order.orderStatus));

// Função para adicionar pedido
function handleAddOrder() {
    const productCode = document.getElementById('orderProducts').value; // Captura o código do produto
    const clientName = document.getElementById('buyerName').value;
    const clientCpf = document.getElementById('buyerCpf').value;
    const clientNumber = document.getElementById('buyerNumber').value;
    const clientEmail = document.getElementById('buyerEmail').value;
    const clientAddress = document.getElementById('buyerAddres').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const orderStatus = document.getElementById('orderStatus').value;

    const newOrder = new Order(productCode, clientName, clientCpf, clientNumber, clientEmail, clientAddress, paymentMethod, orderStatus);
    newOrder.save();

    alert('Pedido adicionado com sucesso!');
    Order.displayAll();
    document.getElementById('orderForm').reset();
}

window.onload = () => {
    Product.displayAll(); // Caso queira exibir produtos também
    Order.displayAll();
};
document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault();
    handleAddOrder();
};

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