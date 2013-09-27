function Couches(){
	this.items = [];
}

Couches.prototype.ajouter = function(couche){
	this.items.push(couche);
}

Couches.prototype.length = function(){
	return this.items.length;
}

Couches.prototype.vider = function(){
	this.items = [];
}

/*
* Retourne la couche ou faux si elle n'est pas trouvée
*/
Couches.prototype.getCoucheParNom = function(nom){
	
	var nb = this.length();
	var ind = 0;
	var couche = false;
	while(ind <= nb -1 && !couche){
		if(this.items[ind].nom == nom){
			couche = this.items[ind];
		}	
		ind++;
	}
	return couche;
}