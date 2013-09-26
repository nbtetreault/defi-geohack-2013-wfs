$(document).ready(function(){
	init();
});
function init(){
	$("#main").dialog({
						"title":"Requ�te spatiale",
						"position": "left top"
						});
	
	$("#btn_entite_source").on("click", function(){
		
		$("#dialog").dialogEntite({
			title:"Entit� source",
			entite:defi.entiteSource,
			width:800
		});
		
	});
	
	$("#btn_operateur").on("click", function(){
		$("#form_operateur").dialog({
			"title": "Choix de l'op�rateur",
			"modal":true
		});
		var operateurs = 
		
		$.each(defi.OPERATEURS__, function(index, valeur){
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