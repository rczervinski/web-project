<?php

  include "./connection.php";

  $id = $_POST["id"];

  $result = mysqli_query($connection, "SELECT * FROM cart WHERE product_id = $id"); // PEGA OS PRODUTOS DO CARRINHO PARA CONDICAO

  if(mysqli_num_rows($result) > 0) {
    mysqli_query($connection, "UPDATE cart SET quantity = quantity + 1 WHERE product_id = $id"); // SE JA TEM UM PRODUTO COM O MESMO ID, ELE ADICIONA 1 NA QUANTIDADE
  } else {
    mysqli_query($connection, "INSERT INTO cart VALUES ($id, 1)"); // SE NAO TEM, ELE ADICIONA COM A QUANTIDADE 1
  };

?>