<?php

  include "./connection.php";

  $name = $_POST["name"];
  $price = $_POST["price"]; 
  $image = $_FILES["image"];
  $return = true;

  if ($image["type"] == "image/png"){

    mysqli_query($connection, "INSERT INTO product VALUES (NULL, '$name', $price)");
    
    $id = mysqli_insert_id($connection); // PEGA O ULTIMO ID REGISTRADO 
    $images_address = "../../images/".$id.".png"; // ADICIONA ESSE ID AO NOME DA IMAGEM
    move_uploaded_file($image["tmp_name"], $images_address); //MOVE PRA PASTA DE IMAGENS 

  } else {
    $return = false;
  }

  $json = json_encode($return);
  echo $json;

?>