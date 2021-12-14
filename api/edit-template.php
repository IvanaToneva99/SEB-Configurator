<?php

require_once("../db/db.php");

if($_POST) {
    $name = $_POST["name-input"];
    $show_taskbar = $_POST["taskbar"];
    $show_time = $_POST["time"];
    $show_reload_button = $_POST["show-reload"];
    $show_keyboard_layout = $_POST["show-language"];
    $enable_quitting = $_POST["allow-exiting"];
    $ask_quitting = $_POST["confirm-exit"];
    $mute_audio = $_POST["mute-audio"];
    $audio_control = $_POST["allow-audio-control"];
    $delete_cookies = $_POST["cookie-cleanup"];
    $preferences_window = $_POST["preferences-windows"];
    $spellcheker = $_POST["spell-checker"];
    $previousName = $_POST["previous-name"];

   try {

        $db = new DB();
        $connection = $db->getConnection();

      $sql = "UPDATE template SET show_taskbar = '$show_taskbar', show_time = '$show_time', 
       show_reload_button = '$show_reload_button', show_keyboard_layout = '$show_keyboard_layout', enable_quitting = '$enable_quitting',
       ask_quitting = '$ask_quitting', mute_audio = '$mute_audio', audio_control = '$audio_control', delete_cookies = '$delete_cookies',
       preferences_window = '$preferences_window', spellcheker = '$spellcheker', name = '$name' WHERE name = '$previousName'";

        $stmt = $connection->prepare($sql);
        $stmt->execute();

        echo json_encode(["status" => "SUCCES", "message" => "Succes"]);
       
    } catch (PDOException $e)
    {
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => "Error!"]);
    }
}
?>
