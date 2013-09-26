function ListeWFS(){
	this.items = [];
}

ListeWFS.prototype.ajouter = function(nom, titre, url, version){
	this.items.push(new WFS(nom, titre, url, version));
}

ListeWFS.prototype.length = function(){
	return this.items.length;
}

/*
* Retourne le WFS ou faux si il n'est pas trouvé
*/
ListeWFS.prototype.getWFSParNom = function(nom){
	
	var nb = this.length();
	var ind = 0;
	var wfs = false;
	while(ind < nb-1 && !wfs){
		if(this.items[ind].nom == nom){
			wfs = this.items[ind];
		}	
		ind++;
	}
	return wfs;
}
/*
ListeWFS.prototype.getListe = function(){
	return this.items;
}*/