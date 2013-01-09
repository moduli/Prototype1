<?php
//****************************************
// 
// PLACES/HANDLER_GET.PHP
//
//****************************************
// ----------------
// DATABASE INIT
// ----------------
include 'connect_db.php';

// ----------------
// GET DATA
// ----------------
// get data from database
$selected_data = $pdo->query('SELECT * FROM places');

// cycle through each row of data, store each row in an array
$places = array();
while ($row = $selected_data->fetch(PDO::FETCH_ASSOC)) {
	//$places[] = array('place'=>$row); // store the row of data (with a new key 'place') into an index
	$places[] = $row;
}

// ----------------
// FORMAT DATA
// ----------------
$format = 'json';

// JSON FORMAT
if($format == 'json') {
	header('Content-type: application/json');
	//echo json_encode(array('places'=>$places));
	echo json_encode($places);
}

// XML FORMAT
else {
	header('Content-type: text/xml');
	echo '<places>';
	foreach($places as $index => $place) {
		if(is_array($place)) {
			foreach($place as $key => $value) {
				echo '<',$key,'>';
				if(is_array($value)) {
					foreach($value as $tag => $val) {
						echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
					}
				}
				echo '</',$key,'>';
			}
		}
	}
	echo '</places>';
}

// ----------------
// DATABASE CLOSE
// ----------------
$pdo = null;

/*
// http://davidwalsh.name/web-service-php-mysql-xml-json
// require the user as the parameter
if(isset($_GET['user']) && intval($_GET['user'])) {

	// soak in the passed variable or set our own
	$number_of_posts = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
	$format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default
	$user_id = intval($_GET['user']); //no default

	// connect to the db 
	$link = mysql_connect('localhost','username','password') or die('Cannot connect to the DB');
	mysql_select_db('db_name',$link) or die('Cannot select the DB');

	// grab the posts from the db
	$query = "SELECT post_title, guid FROM wp_posts WHERE post_author = $user_id AND post_status = 'publish' ORDER BY ID DESC LIMIT $number_of_posts";
	$result = mysql_query($query,$link) or die('Errant query:  '.$query);

	// create one master array of the records
	$posts = array();
	if(mysql_num_rows($result)) {
		while($post = mysql_fetch_assoc($result)) {
			$posts[] = array('post'=>$post);
		}
	}

	// output in necessary format
	if($format == 'json') {
		header('Content-type: application/json');
		echo json_encode(array('posts'=>$posts));
	}
	else {
		header('Content-type: text/xml');
		echo '<posts>';
		foreach($posts as $index => $post) {
			if(is_array($post)) {
				foreach($post as $key => $value) {
					echo '<',$key,'>';
					if(is_array($value)) {
						foreach($value as $tag => $val) {
							echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
						}
					}
					echo '</',$key,'>';
				}
			}
		}
		echo '</posts>';
	}

	// disconnect from the db
	@mysql_close($link);

}
*/
?>