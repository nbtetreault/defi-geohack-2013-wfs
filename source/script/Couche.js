function Couche(nom, titre, srs, WFS){
	this.nom = nom;
	this.titre = titre;
	this.srs = srs;
	this.attributs = []; //array de <Attribut>
	this.WFS = WFS;
}

/*
* Construit l'url à appeler pour faire un DescribeFeatureType
*/
Couche.prototype.urlGetFeatureType = function(){
	return this.WFS.url + "&VERSION=" + this.WFS.version + "&SERVICE=WFS&REQUEST=DescribeFeatureType&TYPENAME=" + this.nom;
}

/*
* Construit l'url à appeler pour faire un GetFeature
*/
Couche.prototype.urlGetFeature = function(){
	return this.WFS.url + "&VERSION=" + this.WFS.version + "&SERVICE=WFS&REQUEST=GetFeature&TYPENAME=" + this.nom;
}

/*
* Récupère les informations de la couche et les stocke (attributs et valeurs)
*/
Couche.prototype.charger = function(){

	this.chargerAttributs();
	this.chargerValeurs();

}

Couche.prototype.chargerAttributs = function (){

	//Supprimer les vieilles informations
	this.attributs.vider();
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.urlGetFeatureType()),
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			xml = format.read(response.responseText);

			var xmlItems = format.getElementsByTagNameNS(xml, "*", "sequence");
			xmlItems = xmlItems[0].children;
			
			//Parcourir la liste des attributs
			for(var i=0; i< xmlItems.length-1; i++){
				
				var element = xmlItems[i];
				var name = '';
				var type = '';
				
				//Parcourir les informations d'attributs
				for(var ii = 0; ii< element.attributes.length;ii++){
					var attribut = element.attributes[ii];
					switch(attribut.nodeName){
						case "name":
							name = attribut.textContent;
							break;
						case "type":
							type = attribut.textContent;
							break;
						default:
							break;
					}
				}
				
				
				
				//TODO récupérer les informations pour faire l'ajout.
				this.attributs.ajouter(new Attribut(name, type));
		//		this.ajouterValeur();
			
			}
				
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

Couche.prototype.chargerValeurs = function (){
	return;
	
	//Supprimer les vieilles informations
	this.valeurs = [];
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.urlGetFeature()),
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			xml = format.read(response.responseText);

			var xmlItems = format.getElementsByTagNameNS(xml, "*", "sequence");
			xmlItems = xmlItems[0].children;
			
			//Parcourir la liste des attributs
			for(var i=0; i< xmlItems.length-1; i++){
				
				var element = xmlItems[i];
				var name = '';
				var type = '';
				
				//Parcourir les informations d'attributs
				for(var ii = 0; ii< element.attributes.length;ii++){
					var attribut = element.attributes[ii];
					switch(attribut.nodeName){
						case "name":
							name = attribut.textContent;
							break;
						case "type":
							type = attribut.textContent;
							break;
						default:
							break;
					}
				}
				
				
				
				//TODO récupérer les informations pour faire l'ajout.
				this.ajouterAttribut(name, type);
		//		this.ajouterValeur();
			
			}
				
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

Couche.prototype.ajouterAttribut = function(nom, type){
	var attribut = new Attribut(nom, type);
	this.attributs.push(attribut);
}

Couche.prototype.ajouterValeur = function(valeur){
	var valeur = new Valeur(valeur);
	this.valeurs.push(valeur);
}