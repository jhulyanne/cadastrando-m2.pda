const btnNewOrder = document.getElementById("btnAddOrder");
const btnNewProduct = document.getElementById("btnAddProduct");
const formOrder = document.getElementById('newOrder');
const formProduct = document.getElementById('newProduct');
const btnEdit = document.getElementById('btnDel');
const initialText = document.getElementById('initialText');
const textAndImg = document.getElementById('textAndImg')
let btnClicked = false;

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewProduct.innerText = "Voltar";
        initialText.style.display = "none"
        btnNewOrder.style.display = "none";
        formOrder.style.display = "none";
        formProduct.style.display = "block";
        initialDisplay.style.height = "15vh";
        textAndImg.style.display = "none"

    } else {
        btnNewProduct.innerText = "Registrar novo produto";
        initialText.style.display = "block";       
        btnNewOrder.style.display = "block";
        formProduct.style.display = "none";
        initialDisplay.style.height = "";
        textAndImg.style.display = "";
    }
})

btnNewOrder.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewOrder.innerText = "Voltar";
        btnNewProduct.style.display = "none";
        initialText.style.display = "none";
        formOrder.style.display = "block";
        formProduct.style.display = "none";
        initialDisplay.style.height = "15vh";
        textAndImg.style.display = "none"

    } else {
        btnNewOrder.innerText = "Adicionar novo pedido";
        btnNewProduct.style.display = "block";
        initialText.style.display = "block"
        formOrder.style.display = "none";
        initialDisplay.style.height = "";
        textAndImg.style.display = "";

        tables.style.display = "block";
    }
})