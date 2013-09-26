function Defi(){
	this.entiteSource = {};
	this.entiteSource.valeur = '';
	this.operateur = null;
	this.entiteReference = {};
	this.entiteReference.valeur = {};
	this.OPERATEURS = ["=", "!=", "<=", ">=", "<", ">", "Between", "Like", "AND", "OR"];
	this.OPERATEURS__ = [
		"equals",
		"disjoint",
		"touches",
		"within",
		"overlaps",
		"crosses",
		"intersect",
		"contains",
		"dwitin",
		"bbox"
	];

	//Initialisation des WFS
	this.listeWFS = new ListeWFS();
	this.listeWFS.ajouter("Gouvernement du Québec - Données ouvertes", 
							  "Gouvernement du Québec - Données ouvertes", 
							  "http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?&VERSION=1.0.0&SERVICE=WFS&REQUEST=getCapabilities",
							  "1.0.0");
	this.listeWFS.ajouter("WMS Demo Server for MapServer",
							"WMS Demo Server for MapServer",
							"http://demo.mapserver.org/cgi-bin/WFS?SERVICE=WFS&VERSION=1.0.0&REQUEST=getCapabilities",
							"1.0.0");
					
	this.dialog = null;
}


Defi.prototype.getWFSParNom = function (nom){
	var WFS = '';
	
	//Parcourir les WFS et trouver celui qui a le bon nom
	while(WFS == ''){
		
	}
	return '';
}



