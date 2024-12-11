/*-------------- VARIAVEIS GLOBAIS ------------ */
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imgInput = document.getElementById("img");

async function addProductFetch(data) {
   // ADICIONA PRODUTO 
  // data: name: string, / price: number,  / image: File
  const response = await fetch("php/addProduct.php", {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  return result;
}

async function addProduct() { // INFORMACOES DO PRODUTO 
  const name = nameInput.value;
  const price = priceInput.value;
  const imageFile = imgInput.files[0];
  if (name == "" || price == "" || !imageFile) {
    alert("Todos os campos devem ser preenchidos");
    return;
  }

  const data = new FormData(); // NAME , PRICE , IMAGE  PARA O PHP
  data.append("name", nameInput.value);
  data.append("price", priceInput.value);
  data.append("image", imgInput.files[0]);

  const success = await addProductFetch(data);

  if (success) { // VERIFICACAO DE IMAGEM 
    alert("Produto adicionado com sucesso");
    window.location.href = "/web_final_project/admin/index.html";
  } else {
    alert("Formato de imagem inválido, deve ser png");
  }
}
