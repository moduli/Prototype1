<!-- ============================== -->
<!--                        		-->
<!-- PLACES/INDEX.PHP          	-->
<!--                   				-->
<!-- ============================== -->
<!DOCTYPE>
<html>
<head>
	<title>Places</title>
	<?php include 'includes.php' ?>
</head>
<body>


<!-- ============= -->
<!-- HEADER        -->
<!-- ============= -->
<div id="header">
<?php include 'header.php'; ?>
</div>


<!-- ============= -->
<!-- MAP       	   -->
<!-- ============= -->
<div id="map">
</div>

<div id="info_div">
	<form id="add_form">
		<ul>
			<li>
				<span id="input_name">Location Name:</span>
				<input class="addform" type="text" name="name" autocomplete="off">
				<span id="data_name" class="infoform"></span>
			</li>
			<li>
				<span id="input_street">Street:</span>
				<input class="addform" type="text" name="street" autocomplete="off">
				<span id="data_street" class="infoform"></span>
			</li>
			<li>
				<span id="input_city">City:</span>
				<input class="addform" type="text" name="city" autocomplete="off">
				<span id="data_city" class="infoform"></span>
			</li>
			<li>
				<span id="input_state">State:</span>
				<input class="addform" type="text" name="state" autocomplete="off">
				<span id="data_state" class="infoform"></span>
			</li>
			<li>
				<span id="input_country">Country:</span>
				<?php include 'countries.php' ?>
				<span id="data_country" class="infoform"></span>
			</li>
			<li>
				<span id="input_category">Category:</span>
				<select class="addform" id="categoryoptions" name="category" autocomplete="off"></select>
				<span id="data_category" class="infoform"></span>
			</li>
			
			<a class="infoform" id="editbutton" href="javascript:void(0)" onclick="toggleEditMode();">Edit</a>
			<input class="addform" type="button" value="Submit" onclick="validateForm()">
		</ul>
	</form>
</div>


<!-- ============= -->
<!-- TABLE     	   -->
<!-- ============= -->
<div id="table">
</div>





</body>
</html>