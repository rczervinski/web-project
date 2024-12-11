<?php

  include "./connection.php";

  $id = $_POST["id"];
  $operation = $_POST["operation"];

  // SE ADICIONAR, APENAS ADICIONA 1 NA QUANTIDADE
  if($operation == "+") {

    mysqli_query($connection, "UPDATE cart SET quantity = quantity + 1 WHERE product_id = $id");

    
  } else if($operation == "-") { // VERIFICACAO DE QUANTIDADE 

    $response = mysqli_query($connection, "SELECT quantity FROM cart WHERE product_id = $id");
    $result = mysqli_fetch_assoc($response);
    $quantity = $result["quantity"];

    if($quantity > 1) { // SE FOR MAIOR QUE 1, REMOVE 1 DA QUANTIDADE 

      mysqli_query($connection, "UPDATE cart SET quantity = quantity - 1 WHERE product_id = $id");

    } else { // SE FOR IGUAL A 0, REMOVE O PRODUTO DO  CARRINHO 
 
      mysqli_query($connection, "DELETE FROM cart WHERE product_id = $id");

    }

  }
?>