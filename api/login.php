<?php
    require_once("func-login.php");

    $post = json_decode(file_get_contents("php://input"), true);

    if ($post && isset($post["email"]) && isset($post["password"])) {

        try {

            $isValidUser = login($post);

            if ($isValidUser) {
               echo '../home-page/home-page.html';
            } else {
                http_response_code(400);
                echo '../login-page/login-page.html'; 
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]); 
        }

    } else {
        http_response_code(400);
        echo json_encode(["status" => "ERROR", "message" => "Некоректни данни!"]); 
    }

?>
