<?php
    require_once("../db/db.php");

    function login($userData) {

        try {

            $db = new DB();
            $connection = $db->getConnection();

            $email = $userData["email"];
            $password = $userData["password"];

            $sql = "SELECT * FROM user where email = :email";

            $stmt = $connection->prepare($sql);
            $stmt->execute(["email" => $email]);

            if ($stmt->rowCount() == 1) {

                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($password != $user["password"]) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return false;
            }

        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
        }

    }


?>