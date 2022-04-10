
const btnSalvaProduto = document.getElementById('salva');
const btnDeletaTudo = document.getElementById('deletar');
let arrayCompras = []
let listaCompras = document.getElementById('listaCompras');
const produto = document.getElementById('produto');
const body = document.body;
body.onload = () =>{
    carregaDaLocalstorage()
    listarNaTela()
}








btnSalvaProduto.addEventListener('click', ()=>{
    if(produto.value.length > 0){
        arrayCompras.push({
            'nome': produto.value, 
            'status':false,
            'valor':false 
        }) 

        produto.value = '';
        produto.focus()

        salvaLocalStorage();
        listarNaTela();
  
    }
    else{
        alert('insira algum produto');
    }

})

function salvaLocalStorage(){
    if(arrayCompras.length >= 0){
       var objeto = JSON.stringify(arrayCompras);
       localStorage.setItem('lista', objeto);

    }

    
}



function carregaDaLocalstorage(){
    let recebeLocalStorage = localStorage.getItem('lista');
    recebeLocalStorage = JSON.parse(recebeLocalStorage);
    if(recebeLocalStorage.length > 0){
      arrayCompras = recebeLocalStorage;
    }
}

function mudaStatus(nome, status, index){
    if(status == false){
        let precoProduto = window.prompt('Digite o preço do produto!')
        if(precoProduto > 0 && !isNaN(precoProduto)){
            var produto = {
                'nome': nome,
                'valor': Number(precoProduto),
                'status': true
            }
            arrayCompras.splice(index, 1, produto);
          
        }
        else{
          alert('Valor inválido')
        }
    }
    else{
        var produto = {
            'nome': nome,
            'valor': false,
            'status': false}
            arrayCompras.splice(index, 1, produto);
    }
}

 function listarNaTela(){
    listaCompras.innerHTML = ''
    arrayCompras.forEach((item, index) =>{
        const linha = document.createElement('div');
        linha.classList.add('linha')

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.onclick = () =>{
            mudaStatus(item.nome, item.status, index)
            salvaLocalStorage();
            listarNaTela();
        }


        checkbox.checked = item.status ? 'checked' : '' 
        linha.appendChild(checkbox);

        const nomeDoItem = document.createElement('div');
        nomeDoItem.classList.add('label');
        nomeDoItem.innerHTML = item.nome;
        linha.appendChild(nomeDoItem);

        let imgDelete = document.createElement('img');
        imgDelete.src = "https://cdn-icons-png.flaticon.com/512/458/458594.png";
        imgDelete.height  = '16';
        imgDelete.width = '16';

        const btnDeletaItem = document.createElement('div');
        btnDeletaItem.class = 'btnDelete';
        btnDeletaItem.appendChild(imgDelete);
        btnDeletaItem.onclick = () =>{
            let confirma = confirm(`Quer mesmo deletar o produto ${item.nome} ? `);
            if(confirma){
                arrayCompras.splice(index, 1);
                salvaLocalStorage();
                listarNaTela();
           }
    }
        
        
        linha.appendChild(btnDeletaItem);
        listaCompras.appendChild(linha);

    })
    
     
 }

btnDeletaTudo.addEventListener('click', () =>{
    let confirmaDeletaTudo = confirm('Tem certeza que quer deletar tudo?')
    if(confirmaDeletaTudo){
        console.log('cliquei');
        arrayCompras = [];
        salvaLocalStorage();
        listarNaTela();
    }
    
})











