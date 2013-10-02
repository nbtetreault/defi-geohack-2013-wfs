function Entite(){
	this.CLASS_NAME = 'Entite';
	
	this.WFS = null; //<WFS>
	this.couche = null; //<Couche>
	this.attribut = null;//<Attribut>
	this.operateur = null;//<Operateur>
	this.valeur = null; //<Valeur>
	this.buffer='';
	
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

Entite.prototype.conditionValide = function(){


	return (this.attribut && this.operateur && this.valeur) || (!this.attribut && !this.operateur && !this.valeur && this.couche && this.WFS) ? true : false;
}