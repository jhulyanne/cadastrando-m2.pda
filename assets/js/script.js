const btnNewOrder = document.getElementById("btnAddOrder");
const btnNewProduct = document.getElementById("btnAddProduct");
const formOrder = document.getElementById('newOrder');
const formProduct = document.getElementById('newProduct');
const btnEdit = document.getElementById('btnDel');
const initialText = document.getElementById('initialText');
const textAndImg = document.getElementById('textAndImg');
const container = document.getElementById('container');
let btnClicked = false;

btnNewProduct.addEventListener('click', function(){
    btnClicked = !btnClicked;

    if(btnClicked) {
        btnNewProduct.innerText = "Voltar";
        container.style.display = "block";
        initialText.style.display = "none"
        btnNewOrder.style.display = "none";
        formOrder.style.display = "none";
        formProduct.style.display = "block";
        initialDisplay.style.height = "20vh";
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
        container.style.display = "block";
        btnNewProduct.style.display = "none";
        initialText.style.display = "none";
        formOrder.style.display = "block";
        formProduct.style.display = "none";
        initialDisplay.style.height = "20vh";
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

document.getElementById("deleteAll").addEventListener("click", function() {
    if (confirm("Tem certeza de que deseja excluir todos os dados?")) {
        localStorage.clear();
        alert("Dados excluídos com sucesso!");
        location.reload();
    } else {
        alert("Ação cancelada.");
    }
});
