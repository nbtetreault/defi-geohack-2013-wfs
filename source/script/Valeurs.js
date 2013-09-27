function Valeurs(){
	this.items = [];
}

Valeurs.prototype.ajouter = function(valeur){
	this.items.push(valeur);
}

Valeurs.prototype.length = function(){
	return this.items.length;
}