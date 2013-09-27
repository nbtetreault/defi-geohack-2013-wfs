function Valeurs(){
	this.items = []; //Array de <Valeur>
}

Valeurs.prototype.ajouter = function(valeur){
	this.items.push(valeur);
}

Valeurs.prototype.length = function(){
	return this.items.length;
}

Valeurs.prototype.vider = function(){
	this.items = [];
}

Valeurs.prototype.trier = function(){
	this.items.sort(function(a,b){
		return a.valeur > b.valeur;
	});
}

Valeurs.prototype.getValeurParValeur = function (valeurATrouver){
	var nb = this.length();
	var ind = 0;
	var valeur = false;
	while(ind <= nb -1 && !valeur){
		if(this.items[ind].valeur == valeurATrouver){
			valeur = this.items[ind];
		}	
		ind++;
	}
	return valeur;
}