function Defi(){
	this.OPERATEURS = ["=", "!=", "<=", ">=", "<", ">", "Between", "Like"];
	this.OPERATEURS_SPATIAUX = [
		"equals",
		"disjoint",
		"touches",
		"within",
		"overlaps",
		"crosses",
		"intersect",
		"contains",
		"dwithin",
		"bbox"
	];

	this.entiteSource = new Entite();
	this.operateurSpatial = null;
	this.entiteReference = new Entite();


	//Initialisation des WFS
	this.WFSS = new WFSS();
	this.WFSS.ajouter("Gouvernement du Québec - Données ouvertes", 
							  "Gouvernement du Québec - Données ouvertes", 
							  "http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?",
							  "1.0.0");
	this.WFSS.ajouter("WMS Demo Server for MapServer",
							"WMS Demo Server for MapServer",
							"http://demo.mapserver.org/cgi-bin/wfs?",
							"1.0.0");
					
	this.dialog = null;
	this.map = null;
}

Defi.prototype.champsRemplis = function(){
	var sourceValide = this.entiteSource.getCondition();
	var operateurSpatialValide = this.operateurSpatial;
	//todo vérifier les polygones qu'on aurait pu dessiner
	var referenceValide = this.entiteReference.getCondition || false;
	
	return sourceValide && operateurSpatialValide && referenceValide;
}
