function Entite(){
	this.estDefinie = false; //L'entitée est complète
	this.WFS = null; //<WFS>
	this.couche = null; //<Couche>
	this.attribut = null;//<Attribut>
	this.operateur = null;//<Operateur>
	this.valeur = null; //<Valeur>
}

/*
* Condition en format chaine
*/
Entite.prototype.getCondition = function(){
	if(!(this.attribut || this.operateur || this.valeur)){
		return '';
	}
	return this.attribut + this.operateur + this.valeur;
	
}
