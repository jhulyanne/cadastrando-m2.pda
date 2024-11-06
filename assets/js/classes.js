let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

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
        return String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
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

    static displayAll() {
        const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-th="Código">${product.productCode}</td>
                <td data-th="Título">${product.title}</td>
                <td data-th="Autor">${product.author}</td>
                <td data-th="Editora">${product.publisher}</td>
                <td data-th="Gênero(s)">${product.genres}</td>
                <td data-th="Em estoque">${product.quantity}</td>
                <td data-th="Editar/excluir">
                    <div class="btnsEdDel">
                        <button class="btnEdit" onclick="Product.editProduct(${index})">
                            <img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="ícone de editar">
                        </button>
                        <button class="btnDel" onclick="Product.delete(${index}); Product.displayAll()">
                            <img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="ícone de deletar">
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    static editProduct(index) {
        const product = products[index];

        // Preenche o formulário com os dados do produto
        document.getElementById('bookTitle').value = product.title;
        document.getElementById('bookAuthor').value = product.author;
        document.getElementById('bookPublisher').value = product.publisher;
        document.getElementById('bookGenres').value = product.genres;
        document.getElementById('quantAvailable').value = product.quantity;

        // Mostra o formulário de edição de produtos e oculta o de pedidos
        document.getElementById('newProduct').style.display = "block";
        document.getElementById('newOrder').style.display = "none";

        // Define a ação do formulário para atualizar o produto
        document.getElementById('productForm').onsubmit = function(event) {
            event.preventDefault();

            const updatedData = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                publisher: document.getElementById('bookPublisher').value,
                genres: document.getElementById('bookGenres').value,
                quantity: parseInt(document.getElementById('quantAvailable').value)
            };

            product.update(updatedData);
            Product.displayAll();
            document.getElementById('productForm').reset();
            alert('Produto editado com sucesso!');
            document.getElementById('productForm').onsubmit = null; // Remove o evento onsubmit para evitar duplicação
        };
    }

    static delete(index) {
        products.splice(index, 1);
        Product.updateStorage();
    }
}

class Order {
    constructor(productCode, clientName, clientNumber, clientAddress, paymentMethod, orderStatus) {
        this.orderCode = Order.generateCode();
        this.productCode = productCode;
        this.clientName = clientName;
        this.clientNumber = clientNumber;
        this.clientAddress = clientAddress;
        this.paymentMethod = paymentMethod;
        this.orderStatus = orderStatus;
    }

    static generateCode() {
        return String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
    }

    save() {
        orders.push(this);
        Order.updateStorage();
    }

    static updateStorage() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    update(newData) {
        Object.assign(this, newData);
        Order.updateStorage();
    }

    static displayAll() {
        const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-th="Código">${order.orderCode}</td>
                <td data-th="Produtos">${order.productCode}</td>
                <td data-th="Nome do cliente">${order.clientName}</td>
                <td data-th="Contato">${order.clientNumber}</td>
                <td data-th="Endereço">${order.clientAddress}</td>
                <td data-th="Forma de pagamento">${order.paymentMethod}</td>
                <td data-th="Status">${order.orderStatus}</td>
                <td data-th="Editar/excluir">
                    <div class="btnsEdDel">
                        <button class="btnEdit" onclick="Order.editOrder(${index})">
                            <img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="editar">
                        </button>
                        <button class="btnDel" onclick="Order.delete(${index}); Order.displayAll()">
                            <img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="deletar">
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    static editOrder(index) {
        const order = orders[index];

        // Preenche o formulário com os dados do pedido
        document.getElementById('buyerName').value = order.clientName;
        document.getElementById('buyerNumber').value = order.clientNumber;
        document.getElementById('buyerAddres').value = order.clientAddress;
        document.getElementById('paymentMethod').value = order.paymentMethod;
        document.getElementById('orderStatus').value = order.orderStatus;

        // Mostra o formulário de edição de pedidos e oculta o de produtos
        document.getElementById('newOrder').style.display = "block";
        document.getElementById('newProduct').style.display = "none";

        // Define a ação do formulário para atualizar o pedido
        document.getElementById('orderForm').onsubmit = function(event) {
            event.preventDefault();
            order.update({
                clientName: document.getElementById('buyerName').value,
                clientNumber: document.getElementById('buyerNumber').value,
                clientAddress: document.getElementById('buyerAddres').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                orderStatus: document.getElementById('orderStatus').value
            });
            Order.displayAll();
            document.getElementById('orderForm').reset();
            alert('Pedido editado com sucesso!');
            document.getElementById('orderForm').onsubmit = null; // Remove o evento onsubmit para evitar duplicação
        };
    }

    static delete(index) {
        orders.splice(index, 1);
        Order.updateStorage();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    products = products.map(data => new Product(data.title, data.author, data.publisher, data.genres, data.quantity));
    orders = orders.map(data => new Order(data.productCode, data.clientName, data.clientNumber, data.clientAddress, data.paymentMethod, data.orderStatus));

    Product.displayAll();
    Order.displayAll();

    document.getElementById('productForm').onsubmit = function(event) {
        event.preventDefault();
        const newProduct = new Product(
            document.getElementById('bookTitle').value,
            document.getElementById('bookAuthor').value,
            document.getElementById('bookPublisher').value,
            document.getElementById('bookGenres').value,
            parseInt(document.getElementById('quantAvailable').value)
        );
        newProduct.save();
        Product.displayAll();
        document.getElementById('productForm').reset();
        alert('Produto adicionado com sucesso!');
    };

    document.getElementById('orderForm').onsubmit = function(event) {
        event.preventDefault();
        handleAddOrder();
    };
});

function handleAddOrder() {
    const newOrder = new Order(
        document.getElementById('orderProducts').value,
        document.getElementById('buyerName').value,
        document.getElementById('buyerNumber').value,
        document.getElementById('buyerAddres').value,
        document.getElementById('paymentMethod').value,
        document.getElementById('orderStatus').value
    );
    newOrder.save();
    alert('Pedido adicionado com sucesso!');
    Order.displayAll();
}