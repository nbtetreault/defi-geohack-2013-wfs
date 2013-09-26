function Helper(){

}

//http://www.w3schools.com/xml/xml_parser.asp
Helper.stringToXML = function(texte){
	if (window.DOMParser){
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(texte,"text/xml");
	// Internet Explorer
	}else{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(texte); 
	}
	return xmlDoc;
}