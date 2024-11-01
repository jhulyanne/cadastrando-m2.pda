const btnNewOrder = document.getElementById("btnAddOrder");
const btnNewProduct = document.getElementById("btnAddProduct");
const formOrder = document.getElementById('newOrder');
const formProduct = document.getElementById('newProduct');
const ordersList = document.getElementById('ordersList');
const booksAvailable = document.getElementById('booksAvailable');
let btnClicked = false;

btnNewOrder.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewOrder.innerText = "Ocultar"
        btnNewProduct.style.display = "none";
        formOrder.style.display = "block";
        formProduct.style.display = "none";

        booksAvailable.style.visibility = "hidden";
        ordersList.style.visibility = "hidden";
        
    } else {
        btnNewOrder.innerText = "Adicionar novo pedido"
        btnNewProduct.style.display = "block";
        formOrder.style.display = "none";

        booksAvailable.style.visibility = "visible";
        ordersList.style.visibility = "visible";
    }
})

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewOrder.style.display = "none";
        btnNewProduct.innerText = "Ocultar";
        formOrder.style.display = "none";
        formProduct.style.display = "block";
        
        booksAvailable.style.visibility = "hidden";
        ordersList.style.visibility = "hidden";

    } else {
        btnNewProduct.innerText = "Registrar novo produto";
        btnNewOrder.style.display = "block";
        formProduct.style.display = "none";

        booksAvailable.style.visibility = "visible";
        ordersList.style.visibility = "visible";
    }
})
