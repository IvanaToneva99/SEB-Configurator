<?php

require_once("../db/db.php");

try {
    $db = new DB();
    $connection = $db->getConnection();

    $sql = "SELECT * FROM template";
    $stmt = $connection->prepare($sql);
    $stmt->execute();

    $arr = array();
    while($data = $stmt->fetch(PDO::FETCH_ASSOC)) { 
    $arr[] = array (
        "templatesName" => $data['name'],
        "isTaskbarEnabled" => $data['show_taskbar'] != "0",
        "isTimeEnabled" => $data['show_time'] != "0",
        "isReloadEnabled" => $data['show_reload_button'] != "0",
        "isLanguageBarEnabled" => $data['show_keyboard_layout'] != "0",
        "isExitingEnabled" => $data['enable_quitting'] != "0",
        "isSpellCheckerEnabled" => $data['spellcheker'] != "0",
        "isConfirmationEnabled" => $data['ask_quitting'] != "0",
        "isAudioMuted" => $data['mute_audio'] != "0",
        "isControlAudioEnabled" => $data['audio_control'] != "0",
        "isCookieCleanupEnabled" => $data['delete_cookies'] != "0",
        "isPreferencesWindowsEnabled" => $data['preferences_window'] != "0"
    );
    }
    echo json_encode($arr);

} catch (PDOException $e) {
    echo $e->getMessage();
}

?>
