function Attributs(){
	this.items = []; //Array de <Attributs>
}

Attributs.prototype.ajouter=function(attribut){
	this.items.push(attribut);
}

Attributs.prototype.vider=function(){
	this.items = [];
}