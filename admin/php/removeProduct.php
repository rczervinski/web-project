<?php

  include "./connection.php";

  $id = $_POST["id"];

  mysqli_query($connection, "DELETE FROM cart WHERE product_id = $id"); // REMOVE O PRODUTO DE cart E product
  mysqli_query($connection, "DELETE FROM product WHERE id = $id");

  $image_url = "../../images/".$id.".png";
  unlink($image_url);

?>