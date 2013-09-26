function WFS(nom, titre, url, version){
	this.nom = nom;
	this.titre = titre;
	this.url = url;
	this.version = version;
	this.couches = [];
} 

/*
* Récupère la liste des couches et les stocke
*/
WFS.prototype.charger = function(){

	//Supprimer les vieilles couches
	this.couches = [];
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.url), //+ "&dc"+new Date().getTime(),
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			xml = format.read(response.responseText);

			//Liste des couches
			var xmlCouches = format.getElementsByTagNameNS(xml, "*", "FeatureType");
			for(var i=0; i< xmlCouches.length-1; i++){
				
				var couche = xmlCouches[i].children;
				var name = '';
				var title = '';
				var srs = '';
				for(var ii=0; ii<couche.length-1; ii++){
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
				
				
				this.ajouterCouche(name, title, srs);
			}
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

WFS.prototype.ajouterCouche = function(nom, titre, srs){
	var couche = new Couche(nom, titre, srs);
	this.couches.push(couche);
}