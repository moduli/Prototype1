<?php
//****************************************
// 
// PLACES/CONNECT_DB.PHP
//
//****************************************
// ----------------
// DATABASE INIT
// ----------------
try {
	$pdo = new PDO(
		'mysql:host=localhost;dbname=places_database;charset=UTF-8', 
		'root', 
		'', 
		array(	PDO::ATTR_EMULATE_PREPARES => false, // OPTION 1: Turn off Prepare Emulation to use PDO safely (only usable if using old version of MySQL)
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION // OPTION 2: PDO Exception Mode
		)
	); 
}
catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br />";
	die();
}


?>