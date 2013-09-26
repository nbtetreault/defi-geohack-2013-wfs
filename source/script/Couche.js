function Couche(nom, titre, srs){
	this.nom = nom;
	this.titre = titre;
	this.srs = srs;
	this.attributs = []; //array de <Attribut>
	this.valeurs = []; 
}

/*
* Récupère les informations de la couche et les stocke (attributs et valeurs)
*/
Couche.prototype.charger = function(){

	//Supprimer les vieilles informations
	this.attributs = [];
	this.valeurs = [];
	
	//Appel ajax qui récupère la liste des couches
	var request = OpenLayers.Request.GET({	
		url: 'proxy.php?url=' + encodeURIComponent(this.url), //TODO construire le url 
		async:false,
		success: function(response){

			var format = new OpenLayers.Format.XML();
			xml = format.read(response.responseText);

			var xmlItems = format.getElementsByTagNameNS(xml, "*", "ms:"+this.nom);
			
			for(var i=0; i< xmlItems.length-1; i++){
			
				
				//TODO récupérer les informations pour faire l'ajout.
				this.ajouterAttribut();
				this.ajouterValeur();
			
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