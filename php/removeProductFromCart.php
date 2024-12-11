<?php

  include "./connection.php";

  $id = $_POST["id"]; // RECEBE O ID

  mysqli_query($connection, "DELETE FROM cart WHERE product_id = $id"); // DELETA O PRODUTO 

?>