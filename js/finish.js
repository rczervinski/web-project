/*-------------- VARIAVEIS GLOBAIS ------------ */
const qrcodeButton = document.getElementById("qrcode-button");
const cardButton = document.getElementById("card-button");

const qrcodeOption = document.getElementById("qrcode-option");
const cardOption = document.getElementById("card-option");

const cartTotal = document.getElementById("cart-total");

const cardsDiv = document.getElementById("cards");
let products = [];


async function getProductsFromCart() { // PEGA TODO OS PRODUTOS DO CARRINHO
  const response = await fetch("php/getProductsFromCart.php", {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

function selectOption(option) { // OPCAO DE QRCODE OU CARTAO
  if (option == "qrcode") {
    qrcodeButton.classList.add("active");
    cardButton.classList.remove("active"); // OPCAO QRCODE

    qrcodeOption.style.display = "flex";
    cardOption.style.display = "none";

  } else if (option == "card") {
    qrcodeButton.classList.remove("active");
    cardButton.classList.add("active"); // OPCAO CARTAO

    qrcodeOption.style.display = "none";
    cardOption.style.display = "flex";
  }
}

function finish() { // FINALIZAR COMPRA 
  alert("Obrigado pela sua compra!");
  window.location.href = "/web_final_project/index.html";
}

function formattedPrice(price) { // FORMATACAO DE PREÇO PRA BRL R$11.000,00
  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderCards() { // RENDERIZA OS PRODUTOS DO CARRINHO 
  
  cardsDiv.replaceChildren(); // ESVAZIA A DIV 

  products.forEach((product) => {
    const html = `
        <div class="card">
            <i class="fa-solid fa-mobile-screen"></i>
            <span class="name">${product.name}</span> 
            <span class="price">${formattedPrice(product.price)}</span>
            <span class="quantity"><strong>${
              product.quantity
            }</strong> un.</span>
        </div>
    `;

    cardsDiv.innerHTML += html;
  });
}

async function renderCardsAndupdateTotal() { // PEGA TODOS OS PRODUTOS DO CARRINHO E CALCULA O TOTAL 
  products = await getProductsFromCart();
  renderCards();

  let total = 0;
  products.forEach((product) => (total += product.price * product.quantity));
  cartTotal.innerText = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

window.onload = async () => {
  await renderCardsAndupdateTotal();
};
