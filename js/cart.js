/*-------------- VARIAVEIS GLOBAIS ------------ */
const cardsDiv = document.getElementById("cards");
const cartTotal = document.getElementById("cart-total");
let products = [];


async function getProductsFromCart() { // PEGA TODOS OS PRODUTOS NO CARRINHO
  const response = await fetch("php/getProductsFromCart.php", {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function removeProductFromCart(id) { //REMOVE O PRODUTO DO CARRINHO PELO ID
  const data = new FormData();
  data.append("id", id);

  await fetch("php/removeProductFromCart.php", { method: "POST", body: data });

  await updateCardsAndTotal();
}

async function changeQuantityInCart(id, operation) { // MUDA A QUANTIDADE DO PRODUTO PELA OPERACAO + ou -
  // operation: "+" | "-"
  const data = new FormData();
  data.append("id", id);
  data.append("operation", operation);

  await fetch("php/changeQuantityInCart.php", { method: "POST", body: data });

  await updateCardsAndTotal();
}

async function updateCardsAndTotal() { // ATUALIZA O CARRINHO
  products = await getProductsFromCart();
  renderCards();

  let total = 0;
  products.forEach((product) => (total += product.price * product.quantity));
  cartTotal.innerText = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formattedPrice(price) { // FORMATA O VALOR PRA BRL R$11.000,00
  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderCards() { // RENDERIZA OS CARDS 
  cardsDiv.replaceChildren(); // ESVAZIA A DIV 

  products.forEach((product) => { // PASSA TODAS AS INFOS PARA CADA PRODUTO NO CARRINHO 
    const html = `
        <div class="card">
          <div class="product-info">
            <img src="./images/${product.id}.png"/>
            <div class="data">
              <span class="name">${product.name}</span>
              <span class="price">${formattedPrice(product.price)}</span>
            </div>
          </div>
          <div class="quantity-info">
            <span class="total">${(
              product.price * product.quantity //TOTAL DO PRODUTO
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</span>
            <div class="buttons">
              <button onclick="changeQuantityInCart(${product.id}, '-');">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>${product.quantity}</span>
              <button onclick="changeQuantityInCart(${product.id}, '+')">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <i onclick="removeProductFromCart(${
            product.id
          })" class="fa-solid fa-x close"></i>
        </div>
    `;

    cardsDiv.innerHTML += html;
  });
}

window.onload = async function () { // RENDERIZA O CARRINHO
  await updateCardsAndTotal();
};
