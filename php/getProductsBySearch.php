<?php

  include "./connection.php";

  $search_text = $_POST["search_text"]; // CONDICAO DE TEXTO PRA PESQUISA 

  $data = array();

  $result = mysqli_query($connection, "SELECT * FROM product WHERE name LIKE '%$search_text%'"); // PEGA TUDO DE PRODUTOS ONDE A CONDICAO DE TEXTO É VERDADEIRA

  while ($register = mysqli_fetch_assoc($result)) { 
    array_push($data, $register);
  }

  $json = json_encode($data);
  echo $json;

?>