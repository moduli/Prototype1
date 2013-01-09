<?php
//****************************************
// 
// PLACES/HANDLER_ADD.PHP
//
//****************************************
// ----------------
// DATABASE INIT
// ----------------
include 'connect_db.php';


// ----------------
// INPUT CHECKING
// ----------------
if (isset($_POST['Submit'])) {
	if ($_POST['name'] != "") {
		$_POST['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);

		if ($_POST['name'] == "") {
			$errors .= "Please enter a valid name.<br />";
		}
		else {
			$errors .= "Please enter your name.<br />";
		}
	}
}



// ----------------
// RETRIEVE FORM DATA
// ----------------
$name = $_POST["name"];
$street = $_POST["street"];
$city = $_POST["city"];
$state = $_POST["state"];
$country = $_POST["country"];
$lat = $_POST["latitude"];
$lng = $_POST["longitude"];
$category = $_POST["category"];


// ----------------
// VALIDATE DATA
// ----------------
// prevent SQL Injection Attacks 

// check name/street/city/state is not an invalid string

// if number field, check that input is actually a number
if (!is_numeric($lat)) {

}
if (!is_numeric($lng)) {

}

// check category


// (a single apostrophe closes the opening quote closes initial SQL statement)
// (any odd number of apostrophes would be transformed to an even number)
$data = array($name, $street, $city, $state, $country, $lat, $lng, $category);
foreach ($data as &$value) {
	$value = str_replace("'", "''", $value);
}


// ----------------
// INSERT FORM DATA
// ----------------
$q = "INSERT INTO places (Name, Street, City, State, Country, Lat, Lng, Category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$q = $pdo->prepare($q);
$q->execute($data);

// ----------------
// DATABASE CLOSE
// ----------------
$pdo = null;
?>