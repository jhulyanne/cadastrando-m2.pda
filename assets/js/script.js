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
        return String(Math.floor(Math.random() * 99999) + 1).padStart(3, '0');
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

