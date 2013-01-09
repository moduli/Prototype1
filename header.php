<!-- ============================== -->
<!--                        		-->
<!-- PLACES/HEADER.PHP         		-->
<!--                   				-->
<!-- ============================== -->

<!-- ============= -->
<!-- TITLE 		   -->
<!-- ============= -->

<!-- ============= -->
<!-- NAV MENU	   -->
<!-- ============= -->
<form id="search_form">
	<input id="searchbox" autocomplete="off" type="textbox">
	<input type="button" value="Search" onclick="submitSearch()">
</form>

<ul id="nav">
	<li><a id="addbutton" href="javascript:void(0)" onclick="toggleAddMode();">Add Entry</a></li>
	<li id="editbuttonli"><a id="editbutton" href="javascript:void(0)" onclick="toggleEditMode();">Edit</a></li>
	<li id="savebuttonli"><a id="savebutton" href="javascript:void(0)" onclick="saveChanges();">Save</a></li>
	<li id="cancelbuttonli"><a id="cancelbutton" href="javascript:void(0)" onclick="cancelMode();">Cancel</a></li>
</ul>




