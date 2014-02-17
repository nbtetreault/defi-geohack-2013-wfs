<?php
header('Content-type: application/json; charset=utf-8');

function SendRequest( $url, $method = 'GET', $data = array(), $headers = array('Content-type: application/x-www-form-urlencoded') )
{
	$url = filter_var($url, FILTER_SANITIZE_URL);
	$context = stream_context_create(array
	(
		'http' => array(
			'method' => $method,
			'header' => $headers,
			'content' => http_build_query( $data )
		)
	));
 
	$xml = file_get_contents($url, false, $context);
	//S'assure d'un encodage utf-8
	$xml = mb_convert_encoding($xml, 'UTF-8', mb_detect_encoding($xml, 'UTF-8, ISO-8859-1', true));
	return $xml;
}

//POST ou GET
$method = $_SERVER["REQUEST_METHOD"];

$url = $_REQUEST['url'];
$params = array();

if("POST" == $method){
	$params = $_POST;
}

$retour = SendRequest($url, $method, $params);
echo $retour;

?>
