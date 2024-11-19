// Renderiza a lista de produtos na página
function exibirProdutos() {
  const container = document.querySelector(".produtos-container");

  produtos.forEach((item) => {
    const produtoElemento = criarElementoProduto(item);
    container.appendChild(produtoElemento);
  });

  carregarCarrinho(); // Carrega itens salvos no carrinho ao carregar a página
}

// Cria um elemento visual para cada produto
function criarElementoProduto(produto) {
  const card = document.createElement("div");
  card.classList.add("produto-card");

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;
  imagem.classList.add("produto-imagem");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;
  titulo.classList.add("produto-titulo");

  const preco = document.createElement("p");
  preco.textContent = `${produto.price.toFixed(2)}€`;
  preco.classList.add("produto-preco");

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;
  descricao.classList.add("produto-descricao");

  const botao = document.createElement("button");
  botao.textContent = "Adicionar";
  botao.classList.add("produto-botao");

  botao.addEventListener("click", () => {
    adicionarAoCarrinho(produto);
  });

  card.append(imagem, titulo, preco, descricao, botao);
  return card;
}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(produto) {
  const carrinho = recuperarCarrinho();

  // Verifica se o produto já existe no carrinho
  const existe = carrinho.find((item) => item.id === produto.id);
  if (!existe) {
    carrinho.push(produto);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
  }
}

// Remove um produto do carrinho
function removerDoCarrinho(id) {
  let carrinho = recuperarCarrinho();
  carrinho = carrinho.filter((item) => item.id !== id);
  salvarCarrinho(carrinho);
  atualizarCarrinho();
}

// Atualiza o carrinho na interface
function atualizarCarrinho() {
  const container = document.querySelector(".carrinho-container");
  container.innerHTML = ""; // Limpa o conteúdo existente

  const carrinho = recuperarCarrinho();

  carrinho.forEach((item) => {
    const linha = document.createElement("div");
    linha.classList.add("carrinho-item");

    const nome = document.createElement("span");
    nome.textContent = item.title;
    nome.classList.add("carrinho-nome");

    const preco = document.createElement("span");
    preco.textContent = `${item.price.toFixed(2)}€`;
    preco.classList.add("carrinho-preco");

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("carrinho-remover");

    botaoRemover.addEventListener("click", () => {
      removerDoCarrinho(item.id);
    });

    linha.append(nome, preco, botaoRemover);
    container.appendChild(linha);
  });

  atualizarTotal();
}

// Calcula e exibe o total do carrinho
function atualizarTotal() {
  const totalElement = document.getElementById("carrinho-total-valor");
  const carrinho = recuperarCarrinho();

  const total = carrinho.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  totalElement.textContent = total;
}

// Salva o carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Recupera o carrinho do localStorage
function recuperarCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// Carrega o carrinho da memória local
function carregarCarrinho() {
  atualizarCarrinho();
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
  exibirProdutos();
});
