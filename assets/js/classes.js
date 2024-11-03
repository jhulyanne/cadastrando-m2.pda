let products = [];

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
                <td data-th="Estoque">${product.quantity}</td>
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

            product.update(updatedData);
            Product.displayAll();
            document.getElementById('productForm').reset();
            alert('Produto editado com sucesso!');
        };
    }

    static delete(index) {
        products.splice(index, 1);
        Product.updateStorage();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    products = (JSON.parse(localStorage.getItem('products')) || []).map(data => new Product(data.title, data.author, data.publisher, data.genres, data.quantity));
    Product.displayAll();

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
});

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
        this.updateStorage();
    }

    updateStorage() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    update(newData) {
        Object.assign(this, newData);
        this.updateStorage();
    }

    static delete(index) {
        orders.splice(index, 1);
        orders[0].updateStorage();
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
                        <button class="btnEdit" onclick="Order.editOrder(${index})"><img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="editar"></button>
                        <button class="btnDel" onclick="Order.delete(${index}); Order.displayAll()"><img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="deletar"></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    static editOrder(index) {
        const order = orders[index];
        document.getElementById('buyerName').value = order.clientName;
        document.getElementById('buyerNumber').value = order.clientNumber;
        document.getElementById('buyerAddres').value = order.clientAddress;
        document.getElementById('paymentMethod').value = order.paymentMethod;
        document.getElementById('orderStatus').value = order.orderStatus;

        formOrder.style.display = "block";
        initialDisplay.style.display = "none"


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
            inicialDislplay.style.display = "block"

        };
    }
}

let orders = JSON.parse(localStorage.getItem('orders')) || [];
orders = orders.map(order => new Order(order.productCode, order.clientName, order.clientNumber, order.clientAddress, order.paymentMethod, order.orderStatus));

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
    document.getElementById('orderForm').reset();
}

window.onload = () => {
    Product.displayAll();
    Order.displayAll();
};

document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault();
    handleAddOrder();
};


// // Variável global para armazenar produtos
// let products = [];

// // Classe Product
// class Product {
//     constructor(title, author, publisher, genres, quantity) {
//         this.productCode = Product.generateCode(); 
//         this.title = title;
//         this.author = author;
//         this.publisher = publisher;
//         this.genres = genres;
//         this.quantity = quantity;
//     }

//     static generateCode() {
//         return String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
//     }

//     save() {
//         products.push(this);
//         Product.updateStorage();
//     }

//     static updateStorage() {
//         localStorage.setItem('products', JSON.stringify(products));
//     }

//     static displayAll() {
//         const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
//         tableBody.innerHTML = '';
//         products.forEach((product, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td data-th="">${product.productCode}</td>
//                 <td data-th="">${product.title}</td>
//                 <td data-th="">${product.author}</td>
//                 <td data-th="">${product.publisher}</td>
//                 <td data-th="">${product.genres}</td>
//                 <td data-th="">${product.quantity}</td>
//                 <td data-th="">
//                     <div class="btnsEdDel">
//                         <button class="btnEdit" onclick="Product.editProduct(${index})">
//                             <img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="ícone de editar">
//                         </button>
//                         <button class="btnDel" onclick="Product.delete(${index}); Product.displayAll()">
//                             <img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="ícone de deletar">
//                         </button>
//                     </div>
//                 </td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }

//     static editProduct(index) {
//         const product = products[index];
        
//         document.getElementById('bookTitle').value = product.title;
//         document.getElementById('bookAuthor').value = product.author;
//         document.getElementById('bookPublisher').value = product.publisher;
//         document.getElementById('bookGenres').value = product.genres;
//         document.getElementById('quantAvailable').value = product.quantity;

//         formProduct.style.display = "block";

//         document.getElementById('productForm').onsubmit = function(event) {
//             event.preventDefault();

//             const updatedData = {
//                 title: document.getElementById('bookTitle').value,
//                 author: document.getElementById('bookAuthor').value,
//                 publisher: document.getElementById('bookPublisher').value,
//                 genres: document.getElementById('bookGenres').value,
//                 quantity: parseInt(document.getElementById('quantAvailable').value)
//             };

//             product.update(updatedData);
//             Product.displayAll();
//             document.getElementById('productForm').reset();
//             alert('Produto editado com sucesso!');
//         };
//     }

//     static delete(index) {
//         products.splice(index, 1);
//         Product.updateStorage();
//     }
// }

// // Inicializa a tabela ao carregar a página
// document.addEventListener("DOMContentLoaded", () => {
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     products = storedProducts.map(productData => new Product(
//         productData.title,
//         productData.author,
//         productData.publisher,
//         productData.genres,
//         productData.quantity
//     ));
//     Product.displayAll();

//     // Adiciona o listener para o formulário de produto
//     document.getElementById('productForm').onsubmit = function(event) {
//         event.preventDefault(); // Previne o comportamento padrão de envio do formulário

//         const newProduct = new Product(
//             document.getElementById('bookTitle').value,
//             document.getElementById('bookAuthor').value,
//             document.getElementById('bookPublisher').value,
//             document.getElementById('bookGenres').value,
//             parseInt(document.getElementById('quantAvailable').value)
//         );

//         newProduct.save(); // Salva o novo produto
//         Product.displayAll(); // Atualiza a tabela de produtos
//         document.getElementById('productForm').reset(); // Reseta o formulário
//         alert('Produto adicionado com sucesso!'); // Alerta de sucesso
//     };
// });


// // --------- CLASSE ORDER COM CRUD
// // p.s.: socorro

// class Order {
//     constructor(productCode, clientName, clientNumber, clientAddress, paymentMethod, orderStatus) {
//         this.orderCode = Order.generateCode();
//         this.productCode = productCode;  // Adicione este campo
//         this.clientName = clientName;
//         this.clientNumber = clientNumber;
//         this.clientAddress = clientAddress;
//         this.paymentMethod = paymentMethod;
//         this.orderStatus = orderStatus;
//     }

//     static generateCode() {
//         return String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
//     }

//     // Método para salvar pedido
//     save() {
//         orders.push(this);
//         Order.updateStorage();
//     }

//     // Atualizar o localStorage
//     static updateStorage() {
//         localStorage.setItem('orders', JSON.stringify(orders));
//     }

//     // Atualizar dados de um pedido
//     update(newData) {
//         Object.assign(this, newData);
//         Order.updateStorage();
//     }

//     // Excluir um pedido
//     static delete(index) {
//         orders.splice(index, 1);
//         Order.updateStorage();
//     }

//     // Exibir pedidos
//     static displayAll() {
//         const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
//         tableBody.innerHTML = ''; // Limpa o conteúdo anterior
    
//         orders.forEach((order, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td data-th="Código">${order.orderCode}</td>
//                 <td data-th="Produtos">${order.productCode}</td> <!-- Agora exibe o código do produto -->
//                 <td data-th="Nome do cliente">${order.clientName}</td>
//                 <td data-th="Contato">${order.clientNumber}</td>
//                 <td data-th="Endereço">${order.clientAddress}</td>
//                 <td data-th="Forma de pagamento">${order.paymentMethod}</td>
//                 <td data-th="Status">${order.orderStatus}</td>
//                 <td data-th="Editar/excluír">
//                     <div class="btnsEdDel">
//                         <button class="btnEdit" onclick="Order.editOrder(${index})"><img class="imgBtnEditDel" src="assets/imgs/icons/edit-icon.svg" alt="ícone de editar"></button>
//                         <button class="btnDel" onclick="Order.delete(${index}); Order.displayAll()"><img class="imgBtnEditDel" src="assets/imgs/icons/delete-icon.svg" alt="ícone de editar"></button>
//                     </div>
//                 </td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }    

//     // Editar pedido
//     static editOrder(index) {
//         const order = orders[index];
        
//         document.getElementById('buyerName').value = order.clientName;
//         document.getElementById('buyerNumber').value = order.clientNumber;
//         document.getElementById('buyerAddres').value = order.clientAddress;
//         document.getElementById('paymentMethod').value = order.paymentMethod;
//         document.getElementById('orderStatus').value = order.orderStatus;

//         formOrder.style.display = "block";

//         document.getElementById('orderForm').onsubmit = function(event) {
//             event.preventDefault();

//             const updatedData = {
//                 clientName: document.getElementById('buyerName').value,
//                 clientNumber: document.getElementById('buyerNumber').value,
//                 clientAddress: document.getElementById('buyerAddres').value,
//                 paymentMethod: document.getElementById('paymentMethod').value,
//                 orderStatus: document.getElementById('orderStatus').value
//             };

//             order.update(updatedData);  // Chama o método update na instância de Order
//             Order.displayAll();
//             document.getElementById('orderForm').reset();
//             document.getElementById('orderForm').onsubmit = handleAddOrder;
//             alert('Pedido editado com sucesso!');
//         };
//     }
// }

// // Inicializar pedidos e converter objetos recuperados do localStorage para instâncias de Order
// let orders = JSON.parse(localStorage.getItem('orders')) || [];
// orders = orders.map(order => new Order(order.clientName, order.clientNumber, order.clientAddress, order.paymentMethod, order.orderStatus));

// // Função para adicionar pedido
// function handleAddOrder() {
//     const productCode = document.getElementById('orderProducts').value; // Captura o código do produto
//     const clientName = document.getElementById('buyerName').value;
//     const clientNumber = document.getElementById('buyerNumber').value;
//     const clientAddress = document.getElementById('buyerAddres').value;
//     const paymentMethod = document.getElementById('paymentMethod').value;
//     const orderStatus = document.getElementById('orderStatus').value;

//     const newOrder = new Order(productCode, clientName, clientNumber, clientAddress, paymentMethod, orderStatus);
//     newOrder.save();

//     alert('Pedido adicionado com sucesso!');
//     Order.displayAll();
//     document.getElementById('orderForm').reset();
// }

// window.onload = () => {
//     Product.displayAll(); // Caso queira exibir produtos também
//     Order.displayAll();
// };
// document.getElementById('orderForm').onsubmit = function(event) {
//     event.preventDefault();
//     handleAddOrder();
// };

// // let products = JSON.parse(localStorage.getItem('products')) || [];
// // products = products.map(product => new Product(product.title, product.author, product.publisher, product.genres, product.quantity));

// function handleAddProduct() {
//     const title = document.getElementById('bookTitle').value;
//     const author = document.getElementById('bookAuthor').value;
//     const publisher = document.getElementById('bookPublisher').value;
//     const genres = document.getElementById('bookGenres').value;
//     const quantity = parseInt(document.getElementById('quantAvailable').value);

//     const newProduct = new Product(title, author, publisher, genres, quantity);
//     newProduct.save();

//     alert('Produto adicionado com sucesso!');
//     Product.displayAll();
//     document.getElementById('productForm').reset();
// }