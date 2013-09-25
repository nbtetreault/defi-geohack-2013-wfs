$(document).ready(function(){
	init();
});
function init(){
	$("#main").dialog({
						"title":"Requête spatiale",
						"position": "left top"
						});
	
	$("#btn_entite_source").on("click", function(){
		
		$("#dialog").dialogEntite({
			title:"Entité source",
			entite:defi.entite_source,
			width:800
		});
		
	});
	
	$("#btn_operateur").on("click", function(){
		$("#form_operateur").dialog({
			"title": "Choix de l'opérateur",
			"modal":true
		});
		var operateurs = [
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
		
		$.each(operateurs, function(index, valeur){
			$("#select_operateur").append('<option value="'+valeur+'">'+valeur+'</option>');
		});
		
		
	});
	$("#btn_operateur_ok").on("click", function(){
		defi.operateur = $("#select_operateur").val();
		$("#form_operateur").dialog("close");
	});
	
	
	$("#btn_entite_reference").on("click", function(){
	
	});
	
	
	$("#carte").dialog({
						"title": "Carte OpenLayers",
						"position": "top"
						});
	
}