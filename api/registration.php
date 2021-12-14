<?php

require_once("../db/db.php");

if($_POST) {
    $name = $_POST["name"];
    $last_name = $_POST["last-name"];
    $email = $_POST["email"];
    $pass = $_POST["password"];

    try {

        $db = new DB();
        $connection = $db->getConnection();

        $sql = "INSERT INTO user (first_name, last_name, email, password)
        VALUES (:name, :last_name, :email, :password)";

        $stmt = $connection->prepare($sql);
        $stmt->execute(["name" => $name, "last_name" => $last_name,
         "email" => $email, "password" => $pass]);


    } catch (PDOException $e)
    {
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => "Грешка при регистрация!"]);
    }
}


?>