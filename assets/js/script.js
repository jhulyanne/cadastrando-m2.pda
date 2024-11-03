const btnNewOrder = document.getElementById("btnAddOrder");
const btnNewProduct = document.getElementById("btnAddProduct");
const formOrder = document.getElementById('newOrder');
const formProduct = document.getElementById('newProduct');
const tables = document.getElementById('tables');
const btnEdit = document.getElementById('btnDel');
const initialText = document.getElementById('initialText');
let btnClicked = false;

btnNewOrder.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewOrder.innerText = "Voltar"
        btnNewProduct.style.display = "none";
        initialText.style.display = "none"
        formOrder.style.display = "block";
        formProduct.style.display = "none";

    } else {
        btnNewOrder.innerText = "Adicionar novo pedido"
        btnNewProduct.style.display = "block";
        initialText.style.display = "block"
        formOrder.style.display = "none";

        tables.style.display = "block";
    }
})

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewProduct.innerText = "Voltar";
        initialText.style.display = "none"
        btnNewOrder.style.display = "none";
        formOrder.style.display = "none";
        formProduct.style.display = "block";
        
        tables.style.display = "none";
    } else {
        btnNewProduct.innerText = "Registrar novo produto";
        initialText.style.display = "block"        
        btnNewOrder.style.display = "block";
        formProduct.style.display = "none";

        tables.style.display = "block";
    }
})