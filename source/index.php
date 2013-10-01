<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Geohack</title>
  
	<!-- style -->
	<link rel="stylesheet" href="css/default.css" type="text/css">
    <link rel="stylesheet" href="css/reset.css" type="text/css">
	<link rel="stylesheet" href="css/style.css" type="text/css">
    
	<!-- Maps -->
	<script type="text/javascript" src="./proj4js/proj4js-compressed.js" type="text/javascript"></script>
	<script type="text/javascript" src="./proj4js/EPSG32198.js" type="text/javascript"></script>
	<script type="text/javascript" src="./proj4js/EPSG3857.js" type="text/javascript"></script>

    <script src="http://openlayers.org/api/OpenLayers.js"></script>
	
	
	<script type="text/javascript" src="./ol.js"></script>	
	
</head>    
<body onload="init_ol()">
	<!-- Interface -->
	<div id="divMap" class="smallmap"></div>
	<div id="divText"></div>
</body>
</html>