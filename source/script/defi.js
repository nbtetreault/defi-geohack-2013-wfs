function Defi(){
	this.OPERATEURS = ["=", "!=", "<=", ">=", "<", ">", "Between", "Like", "AND", "OR"];
	this.OPETATEURS_SPATIAUX = [
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

	this.entiteSource = {};
	this.operateurSpatial = null;
	this.entiteReference = {};


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


Defi.prototype.getWFSParNom = function (nom){
	var WFS = '';
	
	//Parcourir les WFS et trouver celui qui a le bon nom
	while(WFS == ''){
		
	}
	return '';
}



