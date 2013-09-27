function Attributs(){
	this.items = []; //Array de <Attribut>
}

/*
*
* @param attribut <Attribut>
*/
Attributs.prototype.ajouter = function(attribut){
	this.items.push(attribut);
}

Attributs.prototype.vider = function(){
	this.items = [];
}

Attributs.prototype.trier = function(){
	this.items.sort(function(a,b){
		return a.nom > b.nom;
	});
}

Attributs.prototype.trierValeurs = function(){
	
	for(var i = 0; i < this.items.length; i++){
		this.items[i].trier();
	}
}

Attributs.prototype.getAttributParNom = function(nom){
	var nb = this.items.length;
	var ind = 0;
	var attribut = false;
	while(ind <= nb -1 && !attribut){
		if(this.items[ind].nom == nom){
			attribut = this.items[ind];
		}	
		ind++;
	}
	return attribut;
}

/*
* Ajoute une valeur possible à l'attribut si elle n'existe pas déjà
* @param string nomAttribut Attribut pour lequel on ajoute la valeur
* @param string valeur Valeur à ajouter
*/
Attributs.prototype.ajouterValeurPossible = function(nomAttribut, valeur){

	//Trouver l'attribut
	var attribut = this.getAttributParNom(nomAttribut);
	
	//La valeur n'existe pas déjà
	if(attribut && !attribut.valeursPossibles.getValeurParValeur(valeur)){
		
		//Ajouter la valeur
		attribut.valeursPossibles.ajouter(new Valeur(valeur));
	}
	
}