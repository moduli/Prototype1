//****************************************
// 
// places.js
//
//****************************************
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//****************************************
// VARIABLES 
//****************************************
var places_db,
	keys = {};

var map,				// reference to google map
	geocoder,			// reference to google geocoder
	places_db,			// contains information from database
	table,				// reference to HTML table
	open_infowindow,	// reference to currently open marker/infowindow
	markers = [],		// containing all markers
	temp_marker;		// reference to marker used when adding a new location

var add_mode = false,	// flag: if adding a new location
	edit_mode = false;	// flag: if editing existing locations
	


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//****************************************
// MAP FUNCTIONS
//****************************************
// ---------------------------
//
// initializeMap
// create map instance
//
// ---------------------------
function initializeMap(places) {
	var mapOptions = {
          center: new google.maps.LatLng(20, 0),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    geocoder = new google.maps.Geocoder();
}
// ---------------------------
//
// populateMap
// add data to map
//
// ---------------------------
function populateMap(places) {
    for (var i in places) {
		// if place does not have lat/lng, geocode
		if (!places[i].Lat && !places[i].Lng) {
			var geocode_options = {
				type: "update",
				data: places[i]
			};
			var query_string = places[i].Street + ' ' + places[i].City + ', ' + places[i].State;
			geocode(query_string, geocode_options);
		}
		// else, place marker onto map
		else {	
			markers.push(placeMarker(new google.maps.LatLng(places[i].Lat, places[i].Lng), places[i]));
		}
	}
}
// ---------------------------
//
// geocode functions
// look up latlng or address
//
// ---------------------------
function geocode(query_string, options) {
	geocoder.geocode( { 'address': query_string}, function(results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
  			// if updating location when loading database
  			if (options.type == "update") {
  				// push update to server
  				$.ajax({
			   		url: 'handler_update.php',
			   		type: 'POST',
			   		/* ! check to see which one is true
			   		data: {
			   			'id':options.data.id, 
			   			'lat':results[0].geometry.location.Xa, 
			   			'lng':results[0].geometry.location.Ya
			   		},
			   		*/
			   		data: {
			   			'id':options.data.id, 
			   			'lat':results[0].geometry.location.Ya, 
			   			'lng':results[0].geometry.location.Za
			   		},
			   		success: function(response) {
						// show update complete:
			 	 	}
				});

				placeMarker(results[0].geometry.location, options.data);
  			}
  			// if user used the search box
  			else if (options.type == "search") {
  				map.setCenter(results[0].geometry.location);
  				map.setZoom(16);
  			}
      	} 
      	else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {

      	}
      	else {
      		alert("Geocode was not successful for the following reason: " + status);
      	}
    });
}
function geocodeReverse(query_lat, query_lng, options) {
	var latlng = new google.maps.LatLng(query_lat, query_lng);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
	  	if (status == google.maps.GeocoderStatus.OK) {

	  		if (options.type == "add") {

	  		}
	  		else if (options.type == "search") {
	  			if (results[1]) {
		        	map.setCenter(latlng);
					map.setZoom(13);
		        }
	  		}
	  	} 
	  	else {
	        alert("Geocode was not successful for the following reason: " + status);
	  	}
	});
}

// ---------------------------
//
// placeMarker
// add marker to map
//
// ---------------------------
function placeMarker(location, data) {
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});

	if (data) {
		// save id information to marker structure
		marker._id = data.id;

		// add infowindow
		var infowindow = new google.maps.InfoWindow();
		infowindow.setContent(data.Name);

		google.maps.event.addListener(marker, 'click', function(event) {
			if (open_infowindow) {
				open_infowindow.close();
			}
			open_infowindow = infowindow;
			infowindow.open(map, marker);

			// show info_div
			if (!add_mode) {
				// show add form
				$('#info_div').css({'display':'block'});
				$('.addform').css({'display':'none'});
				$('.infoform').css({'display':'inline'});
			}

		});

		marker.setTitle(data.Name);
	}

	return marker;
}

// ---------------------------
//
// submitSearch
// handle user input from search box
//
// ---------------------------
function submitSearch() {
	var query_string = document.getElementById('searchbox').value;

	// check if string is latlng coordinates
	var latlngStr = query_string.split(',', 2);
	if ((latlngStr.length == 2) && isNumber(parseFloat(latlngStr[0])) && isNumber(parseFloat(latlngStr[1]))) {
		// var lat = parseFloat(latlngStr[0]);
		// var lng = parseFloat(latlngStr[1]);	
		var geocode_options = {
			type: "update"
		};
		geocodeReverse(parseFloat(latlngStr[0]), parseFloat(latlngStr[1]));
	}
	else {
		var geocode_options = {
			type: "search",
		};
		geocode(query_string, geocode_options);
	}
}


//****************************************
// OTHER FUNCTIONS
//****************************************
// ---------------------------
//
// validateForm
// checks user input from add_entry.php
//
// ---------------------------
//http://www.yourhtmlsource.com/javascript/formvalidation.html
function validateForm() {
	if (!temp_marker) {
		alert("Need to select location on map");
		return false;
	}
	else {
		var error_flag = false;

		var name = document.forms["add_form"]["name"].value;
		if (name == null || name == "") {
			$("#input_name").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var street = document.forms["add_form"]["street"].value;
		if (street == null || street == "") {
			$("#input_street").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var city = document.forms["add_form"]["city"].value;
		if (city == null || city == "") {
			$("#input_city").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var state = document.forms["add_form"]["state"].value;
		if (state == null || state == "") {
			$("#input_state").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var country = document.forms["add_form"]["country"].value;
		if (country == null || country == "") {
			$("#input_country").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var date = document.forms["add_form"]["date"].value;
		if (date == null || date == "") {
			$("#input_date").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var category = document.forms["add_form"]["category"].value;
		if (category == null || category == "") {
			$("#input_category").append("<span class='input_error'> Required</span>");
			error_flag = true;
		}
		var lat = temp_marker.position.Ya;
		var lng = temp_marker.position.Za;
		var people = document.forms["add_form"]["people"].value;
		var comments = document.forms["add_form"]["comments"].value;

		if (error_flag) {
			return false;
		}
		else {
			// ADD TO DATABASE
			$.ajax({
		   		url: 'handler_add.php',
		   		type: 'POST',
		   		data: {
		   			'name':name,
		   			'street':street,
		   			'city':city,
		   			'state':state,
		   			'country':country,
		   			'latitude':lat, 
		   			'longitude':lng,
		   			'date':date,
		   			'category':category,
		   			'people':people,
		   			'comments':comments
		   		},
		   		success: function(response) {
					// show update complete:


					// drop marker on clicked position


					// remove temporary marker reference
					temp_marker = 0;

					// reset add_form
					$("#add_form")[0].reset();
					$(".input_error").remove();	// remove any error text
					$('#info_div').css({'display':'none'});
		 	 	}
			});
		}
	}
	return true;
}
// ---------------------------
//
// isNumber
// checks if input is a number
//
// ---------------------------
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
// ---------------------------
//
// getUnique
// returns unique values of a property
//
// ---------------------------
function getUnique(data) {
	// find unique values of selected property
	var unique = data.filter(function(itm, i, a) {
		return i==a.indexOf(itm);
	});
	// in case no unique values, initialize unique variable
	if (unique == null)
		unique = 0;
		
	return unique;
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//****************************************
// TABLE FUNCTIONS
//****************************************
// ---------------------------
//
// initializeTable
// 
//
// ---------------------------
function initializeTable() {
	table = $('#table').append($('<table>'));
}
// ---------------------------
//
// populateTable
//
// ---------------------------
function populateTable(places) {
	// write table header
	var keys = Object.keys(places[0]),
		row = $('<tr>'),
		cell,
		cells = [];
	$.each(keys, function(i) {
		// don't display these fields
		if ((/^(?:id|Lat|Lng|People|Notes|LastModified)$/.test(keys[i]))) {
			return;
		}
		cell = $('<th>').html(keys[i]);
		cells.push(cell);
	});
	table.append(row.append(cells));

	// write table cells
	$.each(places, function(i) {
		row = $('<tr>');
		cells = [];
		$.each(places[i], function(j) {
			// don't display these fields
			if ((/^(?:id|Lat|Lng|People|Notes|LastModified)$/.test(j))) {
				return;
			}
			cell = $('<td>').html(places[i][j]);
			cells.push(cell);
		});
		table.append(row.append(cells));
	});
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//****************************************
// MAP ENTRY FUNCTIONS
//****************************************
// ---------------------------
//
// populateAddForm
//
// ---------------------------
function populateAddForm(places) {
	// populate "Categories" pull-down menu
	var categories = [];
	$.each(places, function(i) {
		categories.push(places[i].Category);
	});
	var unique = getUnique(categories);
	unique.sort();
	$("#categoryoptions").append($("<option>")
			.attr("value", "")
			.attr("disabled", "disabled")
			.attr("selected", "selected")
			.text("Select an option"));
	$.each(unique, function(i) {
		$("#categoryoptions").append($("<option></option>")
			.attr("value", unique[i])
			.text(unique[i]));
	});
	$("#categoryoptions").append($("<option>")
			.attr("value", "custom")
			.text("Add new category..."));


}

// ---------------------------
//
// toggleAddMode
//
// ---------------------------
function toggleAddMode() {
	// turn off edit mode
	if (edit_mode) {
		toggleEditMode();
	}

	// OFF
	if (add_mode) {
		add_mode = false;
		$('#addbutton').css({'color':'blue'});	
		$('#cancelbuttonli').css({'display':'none'});
		google.maps.event.clearListeners(map);	// stop click-to-add event

		// hide information window
		$('#info_div').css({'display':'none'});

		// if a marker was placed on the map, remove it
		if (temp_marker) {
			// remove temporary marker
			temp_marker.setMap(null);
			temp_marker = 0;

			// reset add_form
			$("#add_form")[0].reset();
			$(".input_error").remove();	// remove any error text
		}
	}
	// ON
	else {
		add_mode = true;
		$('#addbutton').css({'color':'red'});
		$('#cancelbuttonli').css({'display':'list-item'});
		$('.addform').css({'display':'inline'});

		// add event: when user clicks map, creates a marker that is movable
		// defines new location to add to database
		google.maps.event.addListener(map, 'click', function(event) {
			// drop a marker
			if (!temp_marker) {
				temp_marker = placeMarker(event.latLng);
				temp_marker.setDraggable(true);	

				// show add form
				$('#info_div').css({'display':'block'});
			}
			// update existing marker
			else {
				temp_marker.setPosition(event.latLng);
			}
		});
	}
}
// ---------------------------
//
// cancelAdd
//
// ---------------------------
function cancelMode() {
	// turn off add mode
	if (add_mode) {
		toggleAddMode();	
	}
	// turn off edit mode
	if (edit_mode) {
		toggleEditMode();
	}
}

// ---------------------------
//
// toggleEditMode
//
// ---------------------------
function toggleEditMode() {
	// turn off add mode
	if (add_mode) {
		toggleAddMode();
	}

	// turn off edit mode
	if (edit_mode) {
		edit_mode = false;
		$('#editbutton').css({'color':'blue'});	
		$('#cancelbuttonli').css({'display':'none'});
		$('.infoform').css({'display':'none'});

		google.maps.event.clearListeners(map);

		// hide edit form
		//$('#info_div').css({'display':'none'});
	}
	// turn on add mode
	else {
		edit_mode = true;
		$('#editbutton').css({'color':'red'});	
		$('#cancelbuttonli').css({'display':'list-item'});
		$('.infoform').css({'display':'inline'});

		// add event: when user clicks map, creates a marker that is movable
		// modifies location
		$.each(markers, function() {
			// allow marker to be movable for editing purposes
			this.setDraggable(true);

			// track the marker that was moved and the lat/lng position it was moved to
			google.maps.event.addListener(this, 'dragend', function(event) {
				var changed = {};
				changed.id = this._id;
				changed.lat = this.getPosition().lat();
				changed.lng = this.getPosition().lng();
			});
		});
		/*
		google.maps.event.addListener(map, 'click', function(event) {
			// drop a marker
			if (!temp_marker) {
				temp_marker = placeMarker(event.latLng);
				temp_marker.setDraggable(true);	

				// show add form
				$('#info_div').css({'display':'block'})
			}
			// update existing marker
			else {
				temp_marker.setPosition(event.latLng);
			}
		});
		*/
	}

}

function saveChanges() {
	if (edit_mode) {


	}

}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//****************************************
// MAIN
//****************************************
// ---------------------------
//
// DOCUMENT.READY
//
// ---------------------------
$(document).ready(function() {
	initializeMap();
	//initializeTable();

	// ----------------
	// GET DATA FROM SQL
	// ----------------
	$.get('handler_get.php', function(data) {
		places_db = data;
		keys = Object.keys(data[0]);

		// ----------------
		// SETUP ADD_FORM
		// ----------------
		populateAddForm(places_db);

		// ----------------
		// SETUP TABLE
		// ----------------
		//populateTable(places_db);

		// ----------------
		// SETUP MAP
		// ----------------
		populateMap(places_db);

		
		// Loading Complete
	})
	.error(function() {
		alert("Error loading data from database");
	});

	// ----------------
	// SEARCH BOX
	// ----------------
});