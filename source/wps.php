<?php
header('Content-type: application/json; charset=utf-8');

function SendRequest( $url, $method = 'GET', $data = array(), $headers = array('Content-type: application/x-www-form-urlencoded') )
{
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

if( !empty($_GET) )
{
	$urlService = $_GET['urlService'];//"http://10.102.27.181:8080/geoserver/TestWfsPost";
	$url = $_GET['url'];//"http://10.102.27.181:8080/geoserver/ows";
	$body = $_GET['body'];//'';
}
else//c'est un post
{
	$urlService = "http://10.102.27.181:8080/geoserver/TestWfsPost";
	$url = "http://10.102.27.181:8080/geoserver/ows";
	$body = file_get_contents('php://input');
}

$xmlDoc = SendRequest($urlService, 'POST', array('url' => $url, 'body'=> $body));

echo $xmlDoc;

?>