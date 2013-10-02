function Operateur(titre){
	this.titre = titre;
}

Operateur.prototype.getEquivalentOpenlayers=function(){

	var retour;
	switch(this.titre){
	
		case '=':
			retour = OpenLayers.Filter.Comparison.EQUAL_TO;
			break;
		case '!=':
			retour = OpenLayers.Filter.Comparison.NOT_EQUAL_TO;
			break;
		case '<=':
			retour = OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO;
			break;
		case '>=':
			retour = OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO;
			break;
		case '<':
			retour = OpenLayers.Filter.Comparison.LESS_THAN;
			break;
		case '>':
			retour = OpenLayers.Filter.Comparison.GREATER_THAN;
			break;
		case 'Between':
			retour = OpenLayers.Filter.Comparison.BETWEEN;
			break;
		default:
			alert("equivalent non trouvé");
			break;
	}
	return retour;
}