<?php

  include "./connection.php";

  $data = array();

  $query = "SELECT p.*, c.quantity FROM cart AS c INNER JOIN product AS p ON c.product_id = p.id;"; // PEGA TODOS OS PRODUTOS DO CARRINHO, ONDE O ID DO PRODUTO É IGUAL NAS DUAS TABELAS

  $result = mysqli_query($connection, $query);

  while ($register = mysqli_fetch_assoc($result)) {
    array_push($data, $register); 
  }

  $json = json_encode($data);
  echo $json;

?>