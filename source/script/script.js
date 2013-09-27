var defi = new Defi();

$(document).ready(function(){
	init();
});

function init(){
	
	

	$("#btn_entite_source").on("click", function(){
	
	
		$("#dialog").dialogEntite({
			title:"Entité source",
			entite:defi.entiteSource,
			width:800,
			modal:true
		});
		
		
	});
	
	$("#btn_operateur").on("click", function(){
		$("#form_operateur").dialog({
			"title": "Choix de l'opérateur",
			"modal":true
		});
	
		
		$.each(defi.OPERATEURS__, function(index, valeur){
			$("#select_operateur").append('<option value="'+valeur+'">'+valeur+'</option>');
		});
		
		
	});
	$("#btn_operateur_ok").on("click", function(){
		defi.operateur = $("#select_operateur").val();
		$("#form_operateur").dialog("close");
	});
	
	
	$("#btn_entite_reference").on("click", function(){
		$("#dialog").dialogEntite({
			title:"Entité référence",
			entite:defi.entiteReference,
			width:800,
			modal:true
		});
	});
	
	
	$("#carte").dialog({
						"title": "Carte OpenLayers"
			
						});
	

}