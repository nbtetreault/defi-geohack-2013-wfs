function Couche(nom, titre, srs, WFS){
	this.nom = nom;
	this.titre = titre;
	this.srs = srs;
	this.attributs = new Attributs(); //array de <Attribut>
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

	//Supprimer les vieilles informations sur les attributs
	this.attributs.vider();
	
	this.chargerAttributs();
	this.chargerValeurs();

}

/*
* Télécharge la liste des attributs de la couche
*/
Couche.prototype.chargerAttributs = function (){

	
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
			for(var i=0; i< xmlItems.length; i++){
				
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
				
				this.attributs.ajouter(new Attribut(name, type));
			
			}
			
			//Trier les attributs pour affichage
			this.attributs.trier();
				
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

/**
* Télécharge la liste des valeurs d'attibuts possibles de la couche
*/
Couche.prototype.chargerValeurs = function (){
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.urlGetFeature()),
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			xml = format.read(response.responseText);

			var xmlItems = format.getElementsByTagNameNS(xml, "*", this.nom)
			
			//Parcourir la liste des features
			for(var i=0; i< xmlItems.length; i++){
							
				var childrens = xmlItems[i].children;
				
				//Parcourir la liste des attributs
				for(var ii = 0; ii < childrens.length; ii++){
					var children = childrens[ii];
					
					nomAttribut = children.nodeName;
					
					//Enlever le : et ce qui précède. Semble inutile.
					nomAttribut = nomAttribut.slice(nomAttribut.indexOf(":")+1, nomAttribut.length);
					
					valeurAttribut = children.textContent;
					valeurAttribut = valeurAttribut.trim();
					if(valeurAttribut.length > 0){
						this.attributs.ajouterValeurPossible(nomAttribut, valeurAttribut);
					}
					
				
				}
			}
			
			//Trier les valeurs d'attributs
			this.attributs.trierValeurs();
				
		},
		failure: function(){ alert('ca a pas marché');},
		scope:this //Nécessaire pour avoir accès à "this" dans le gestionnaire d'événement
	});
}

Couche.prototype.ajouterAttribut = function(nom, type){
	var attribut = new Attribut(nom, type);
	this.attributs.ajouter(attribut);
}

Couche.prototype.ajouterValeur = function(valeur){
	var valeur = new Valeur(valeur);
	this.valeurs.push(valeur);
}