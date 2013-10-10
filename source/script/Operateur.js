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

var aszOperateursDescriptifs = new Array();
var aszOperateursSpatiaux = new Array();
var aszOperateursLogiques = new Array();

//Ces arrays contiennent ce qui existe dans la norme
//La liste des opérateurs supportés provient d"un getCapabilities

aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsEqualTo"] = "=";
aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsNotEqualTo"] = "<>";
aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsLessThan"] = "<";
aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsGreaterThan"] = ">";
aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsLessThanOrEqualTo"] = "<=";
aszOperateursDescriptifs["Simple_Comparisons"]["PropertyIsGreaterThanOrEqualTo"] = ">=";
aszOperateursDescriptifs["Like"] = "PropertyIsLike";
aszOperateursDescriptifs["Between"] = "PropertyIsBetween";

//Logique
aszOperateursLogiques["And"] = "Et";
aszOperateursLogiques["Or"] = "Ou";
aszOperateursLogiques["Not"] = "n'est pas";

//Spatiaux
aszOperateursSpatiaux["Equals"] = "a la même géométrie que";
aszOperateursSpatiaux["Disjoint"] = "n'a aucune géométrieu commune";
aszOperateursSpatiaux["Touches"] = "touche à";
aszOperateursSpatiaux["Within"] = "est totalement à l'intérieur de ";
aszOperateursSpatiaux["Overlaps"] = "se superpose";
aszOperateursSpatiaux["Crosses"] = "crosses";
aszOperateursSpatiaux["Intersect"] = "intersecte ";
aszOperateursSpatiaux["Contains"] = "contient totalement";
aszOperateursSpatiaux["DWithin"] = "est à une distance de";
aszOperateursSpatiaux["BBOX"] = "est contenu dans";