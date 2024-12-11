<?php

  include "./connection.php";

  $data = array();

  $result = mysqli_query($connection, "SELECT * FROM product"); // PEGA OS PRODUTOS DA TABELA product

  while ($register = mysqli_fetch_assoc($result)) {
    array_push($data, $register); 
  }

  $json = json_encode($data);
  echo $json;

?>