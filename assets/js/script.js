const btnNewOrder = document.getElementById("btnAddOrder");
const btnNewProduct = document.getElementById("btnAddProduct");
const formOrder = document.getElementById('newOrder');
const formProduct = document.getElementById('newProduct');
const tables = document.getElementById('tables');
const btnEdit = document.getElementById('btnDel');
let btnClicked = false;

btnNewOrder.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewOrder.innerText = "Cancelar"
        btnNewProduct.style.display = "none";
        formOrder.style.display = "block";
        formProduct.style.display = "none";

    } else {
        btnNewOrder.innerText = "Adicionar novo pedido"
        btnNewProduct.style.display = "block";
        formOrder.style.display = "none";

    }
})

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewProduct.innerText = "Cancelar";
        btnNewOrder.style.display = "none";
        formOrder.style.display = "none";
        formProduct.style.display = "block";
        
        tables.style.display = "none";
    } else {
        btnNewProduct.innerText = "Registrar novo produto";
        btnNewOrder.style.display = "block";
        formProduct.style.display = "none";

        tables.style.display = "block";
    }
})
