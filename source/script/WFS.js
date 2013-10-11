function WFS(nom, titre, url, version){
	this.nom = nom;
	this.titre = titre;
	this.url = url;
	this.version = version;
	this.couches = new Couches(); //<Couches>
} 

/*
* Construit l'url à appeler pour faire un GetCapabilities
*/
WFS.prototype.urlGetCapabilities = function(){
	return this.url + "&VERSION=" + this.version + "&SERVICE=WFS&REQUEST=GetCapabilities";
}

/*
* Récupère la liste des couches et les stocke
*/
WFS.prototype.charger = function(){

	//Initialiser la liste des couches
	this.couches.vider();
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.urlGetCapabilities()),
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			
			response.responseText = response.responseText.removeHTMLComments();
			xml = format.read(response.responseText);
			

			//Liste des couches
			var xmlCouches = format.getElementsByTagNameNS(xml, "*", "FeatureType");
			for(var i=0; i< xmlCouches.length; i++){
				
				var couche = xmlCouches[i].children;
				var name = '';
				var title = '';
				var srs = '';
				for(var ii=0; ii < couche.length; ii++){
					var node = couche[ii];
					switch(node.nodeName){
						case "Name":
							name = node.textContent;
							break;
						case "Title":
							title = node.textContent;
							break;
						case "SRS":
							srs = node.textContent;
							break;
						default:
							break;
					}
				}
				
				
				this.ajouterCouche(name, title, srs, this);
			}
			//Liste des opérateurs
			var xmlOp = format.getElementsByTagNameNS(xml, "*", "Spatial_Operators");
			for(var i=0; i< xmlOp.length; i++){
				
				var op = xmlOp[i].children;
				var name = '';
				for(var ii=0; ii < op.length; ii++){
					var node = op[ii];
					//alert(node.nodeName);
					
				}

			}
			
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

/*
* Ajoute une couche à la liste des couches du WFS
*/
WFS.prototype.ajouterCouche = function(nom, titre, srs, WFS){
	var couche = new Couche(nom, titre, srs, WFS);
	this.couches.ajouter(couche);
}
