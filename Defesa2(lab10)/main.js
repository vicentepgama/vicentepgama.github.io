// Buscar produtos da API
function fetchProdutos() {
  return fetch('https://deisishop.pythonanywhere.com/products/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((produtos) => {
      console.log('Produtos recebidos:', produtos); // Log para debug
      return produtos;
    })  
    .catch((error) => {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao carregar os produtos. Por favor, tente novamente mais tarde.');
      return [];
    });
}

// Buscar categorias da API
function fetchCategorias() {
  return fetch('https://deisishop.pythonanywhere.com/categories/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar categorias: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((categorias) => {
      console.log('Categorias recebidas:', categorias); // Log para debug
      return categorias;
    })
    .catch((error) => {
      console.error('Erro ao buscar categorias:', error);
      alert('Erro ao carregar categorias. Por favor, tente novamente mais tarde.');
      return [];
    });
}

// Atualizar o elemento select com categorias
function preencherCategorias() {
  const select = document.getElementById('categoria-select');
  fetchCategorias().then((categorias) => {
    // Adiciona a opção padrão "Todos"
    const optionTodos = document.createElement('option');
    optionTodos.value = 'todos';
    optionTodos.textContent = 'Todas as Categorias';
    select.appendChild(optionTodos);

    categorias.forEach((categoria) => {
      const option = document.createElement('option');
      option.value = categoria.toLowerCase();
      option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      select.appendChild(option);
    });
  });
}

// Renderiza a lista de produtos com base em filtros, pesquisa e ordenação
function exibirProdutos() {
  const container = document.querySelector(".produtos-container");
  container.innerHTML = ''; // Limpa o conteúdo existente

  fetchProdutos().then((produtos) => {
    if (produtos.length === 0) {
      container.innerHTML = '<p>Nenhum produto disponível no momento.</p>';
      return;
    }

    // Aplicar filtro de categoria
    const categoriaSelecionada = document.getElementById('categoria-select').value;
    let produtosFiltrados = produtos;

    if (categoriaSelecionada !== 'todos') {
      produtosFiltrados = produtos.filter((produto) =>
        produto.category.toLowerCase() === categoriaSelecionada
      );
    }

    // Aplicar filtro de pesquisa
    const termoPesquisa = document.getElementById('pesquisa-input').value.toLowerCase();
    if (termoPesquisa) {
      produtosFiltrados = produtosFiltrados.filter((produto) =>
        produto.title.toLowerCase().includes(termoPesquisa) ||
      produto.description.toLowerCase().includes(termoPesquisa)
      );
    }

    // Aplicar ordenação de preço
    const ordemSelecionada = document.getElementById('ordem-rating-select').value;
    if (ordemSelecionada === 'asc') {
      produtosFiltrados.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (ordemSelecionada === 'desc') {
      produtosFiltrados.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    // Renderizar os produtos filtrados e ordenados
    if (produtosFiltrados.length === 0) {
      container.innerHTML = '<p>Nenhum produto encontrado com os filtros aplicados.</p>';
      return;
    }

    produtosFiltrados.forEach((item) => {
      const produtoElemento = criarElementoProduto(item);
      container.appendChild(produtoElemento);
    });
  });
}

// Cria um elemento visual para cada produto
function criarElementoProduto(produto) {
  const card = document.createElement("div");
  card.classList.add("produto-card");

  const imagem = document.createElement("img");
  imagem.src = produto.image || 'https://via.placeholder.com/150'; // Imagem de placeholder
  imagem.alt = produto.title || 'Produto';
  imagem.classList.add("produto-imagem");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title || 'Sem título';
  titulo.classList.add("produto-titulo");

  const preco = document.createElement("p");
  preco.textContent = produto.price ? `${produto.price.toFixed(2)}€` : 'Preço indisponível';
  preco.classList.add("produto-preco");

  const descricao = document.createElement("p");
  descricao.textContent = produto.description || 'Sem descrição';
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

// Carrega o carrinho da memória local
function carregarCarrinho() {
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
  totalElement.textContent = `${total}€`;
}

// Recupera o carrinho do localStorage
function recuperarCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// Salva o carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
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

  // Filtra o carrinho para remover o produto com o ID correspondente
  carrinho = carrinho.filter((item) => item.id !== id);

  salvarCarrinho(carrinho);
  atualizarCarrinho();
}

// Adicionar funcionalidade de desconto de estudante e cupão
function aplicarDescontos(total) {
  const isEstudante = document.getElementById("estudante-checkbox").checked;
  const cupaoInput = document.getElementById("cupao-input").value.trim();

  let descontoEstudante = 0;
  let descontoCupao = 0;

  // Aplica 10% de desconto se for estudante
  if (isEstudante) {
    descontoEstudante = total * 0.10;
  }

  // Valida o cupão e aplica o desconto
  if (cupaoInput === "DESCONTO10") {
    descontoCupao = total * 0.10;
  } else if (cupaoInput !== "") {
    document.getElementById("compra-resultado").textContent = "Cupão inválido!";
    return total; // Não aplica desconto se cupão for inválido
  }

  // Calcula o total final com descontos aplicados
  const totalComDescontos = total - descontoEstudante - descontoCupao;

  // Mostra os descontos aplicados
  document.getElementById("compra-resultado").textContent = `Desconto aplicado: -${(descontoEstudante + descontoCupao).toFixed(2)}€`;
  return totalComDescontos;
}

// Função para concluir a compra
document.getElementById("comprar-button").addEventListener("click", () => {
  const carrinho = recuperarCarrinho();
  if (carrinho.length === 0) {
    document.getElementById("compra-resultado").textContent = "Seu carrinho está vazio!";
    return;
  }

  // Calcula o total atual do carrinho
  const total = carrinho.reduce((acc, item) => acc + item.price, 0);

  // Aplica os descontos
  const totalFinal = aplicarDescontos(total);

  // Exibe o total final
  document.getElementById("compra-resultado").textContent += ` Total final: ${totalFinal.toFixed(2)}€`;
});

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
  preencherCategorias();
  exibirProdutos();
  carregarCarrinho();

  // Adicionar eventos para filtros, ordenação e pesquisa
  document.getElementById('categoria-select').addEventListener('change', exibirProdutos);
  document.getElementById('ordem-rating-select').addEventListener('change', exibirProdutos);
  document.getElementById('pesquisa-input').addEventListener('input', exibirProdutos);

  document.getElementById('adicionarTudo').addEventListener('click', () => {
    
    fetchProdutos().then((produtos) => {
      produtos.forEach((produto) => {
        adicionarAoCarrinho(produto);
      });
    });
  }
)

document.getElementsById('menosInformacaoNaDescricao').addEventListener('click', () => {
  fetchProdutos().then((produtos) => {
    produtos.forEach((produto) => {
      produto.description = produto.description="";
    });
  });

})

document.getElementById('submeter-morada').addEventListener('click', () => {
  const morada = document.getElementById('morada').value;

  
  

});

});


