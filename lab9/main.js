const produtosContainer = document.querySelector('.produtos-container');
const carrinhoContainer = document.querySelector('.carrinho-container');
const carrinhoTotalValor = document.getElementById('carrinho-total-valor');
let carrinho = [];

// Carregar produtos do arquivo `produtos.js`
function carregarProdutos() {
  produtos.forEach(produto => {
    const produtoCard = document.createElement('div');
    produtoCard.classList.add('produto-card');

    produtoCard.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" class="produto-img">
      <div class="produto-info">
        <h3 class="produto-nome">${produto.title}</h3>
        <p class="produto-descricao">${produto.description}</p>
        <p class="produto-preco">${produto.price.toFixed(2)}€</p>
        <button class="produto-botao" data-id="${produto.id}">Adicionar</button>
      </div>
    `;

    produtosContainer.appendChild(produtoCard);
  });

  document.querySelectorAll('.produto-botao').forEach(button =>
    button.addEventListener('click', adicionarAoCarrinho)
  );
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(event) {
  const produtoId = Number(event.target.dataset.id);
  const produto = produtos.find(p => p.id === produtoId);

  carrinho.push(produto);
  atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
  carrinhoContainer.innerHTML = '';

  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.price;

    const carrinhoItem = document.createElement('div');
    carrinhoItem.classList.add('carrinho-item');

    carrinhoItem.innerHTML = `
      <span>${produto.title} - ${produto.price.toFixed(2)}€</span>
      <button class="carrinho-remover" data-index="${index}">Remover</button>
    `;

    carrinhoContainer.appendChild(carrinhoItem);
  });

  carrinhoTotalValor.textContent = total.toFixed(2);

  document.querySelectorAll('.carrinho-remover').forEach(button =>
    button.addEventListener('click', removerDoCarrinho)
  );
}

// Remover item do carrinho
function removerDoCarrinho(event) {
  const index = Number(event.target.dataset.index);
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
