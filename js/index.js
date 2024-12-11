/*-------------- VARIAVEIS GLOBAIS ------------ */
const cardsDiv = document.getElementById("cards");
const searchInput = document.getElementById("search");
let products = [];

async function getProducts() { // PEGA OS PRODUTOS 
  const response = await fetch("php/getProducts.php", {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function getProductsBySearch(searchText) { // PEGA TODOS OS PRODUTOS PELA CONDIÇÃO DE PESQUISA
  const data = new FormData();
  data.append("search_text", searchText.toLowerCase());

  const response = await fetch("php/getProductsBySearch.php", {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  return result;
}

async function addProductToCart(id) { // ADICIONA O PRODUTO NO CARRINHO
  const data = new FormData();
  data.append("id", id);

  await fetch("php/addProductToCart.php", { method: "POST", body: data });
}

function formattedPrice(price) { // FORMATA O PREÇO EM BRL R$11.000,00
  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderCards() { //RENDERIZA OS CARDS
  cardsDiv.replaceChildren(); //ESVAZIA A DIV

  products.forEach((product) => {
    const html = `
        <div class="card">
          <div class="card-img">
            <img
              src="./images/${product.id}.png"
              alt="img"
            />
          </div>
          <div class="card-info">
            <span class="name">${product.name}</span>
            <span class="price">${formattedPrice(product.price)}</span>
          </div>
          <button onclick="addProductToCart(${product.id})">
            <span>Adicionar ao Carrinho</span>
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
    `;

    cardsDiv.innerHTML += html;
  });
}

window.onload = async function () { // PEGA OS PRODUTOS E RENDERIZA NA PAGINA 
  products = await getProducts();
  renderCards();
};

searchInput.addEventListener("input", async () => { // PEGA A CONDIÇÃO DIGITADA E RENDERIZA UM ARRAY COM OS PRODUTOS ENCONTRADOS 
  products = await getProductsBySearch(searchInput.value);
  renderCards();
});
