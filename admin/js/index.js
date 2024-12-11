const cardsDiv = document.getElementById("cards");
let products = [];

async function removeProductFetch(id, name) {
  let message = `Deseja mesmo remover este produto?: ${name}`;

  if (confirm(message)) {
    const data = new FormData();
    data.append("id", id);

    await fetch("php/removeProduct.php", { method: "POST", body: data });

    await updateCards();
  }
}

async function getProducts() {
  const response = await fetch("php/getProducts.php", {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function updateCards() {
  products = await getProducts();
  renderCards();
}

function formattedPrice(price) {
  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderCards() {
  // esvaziar a div
  cardsDiv.replaceChildren();

  products.forEach((product) => {
    const html = `
        <div class="card">
          <div class="card-img">
            <img
              src="../images/${product.id}.png"
              alt="img"
            />
          </div>
          <div class="card-info">
            <span class="name">${product.name}</span>
            <span class="price">${formattedPrice(product.price)}</span>
          </div>
          <button onclick="removeProductFetch(${product.id}, '${
      product.name
    }')">
            <span>Remover Produto</span>
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
    `;

    cardsDiv.innerHTML += html;
  });
}

window.onload = async () => {
  await updateCards();
};
