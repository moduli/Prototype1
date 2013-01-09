<?php
//****************************************
// 
// PLACES/HANDLER_UPDATELATLNG.PHP
//
//****************************************
// ----------------
// DATABASE INIT
// ----------------
include 'connect_db.php';

// ----------------
// RETRIEVE FORM DATA
// ----------------
// get data from 
$id = $_POST["id"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];

// store in an array
$data = array($lat, $lng, $id);

// send to database
$q = "UPDATE places SET Lat=?, Lng=? WHERE id=?";
$q = $pdo->prepare($q);
$q->execute($data);

// ----------------
// DATABASE CLOSE
// ----------------
$pdo = null;
?>