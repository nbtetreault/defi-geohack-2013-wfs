var defi = new Defi();

$(document).ready(function(){
	init();
	init_map();
});

function init(){

	$("#btn_entite_source").on("click", function(){
		
		$("#dialog_entite").dialogEntite({
			title:"Entité source",
			entite:defi.entiteSource,
			width:800,
			modal:true
		});	
	});
	
	$("#btn_operateur").on("click", function(){
		$("#dialog_operateur_spatial").dialog({
			"title": "Choix de l'opérateur",
			"modal":true
		});
	
		
		$.each(defi.OPETATEURS_SPATIAUX, function(index, valeur){
			$("#select_operateur_spatial").append('<option value="'+valeur+'">'+valeur+'</option>');
		});
		
		
	});
	$("#btn_operateur_ok").on("click", function(){
		var operateur = $("#select_operateur_spatial").val();
		if(operateur){
			defi.operateurSpatial = operateur;
			$("#dialog_operateur_spatial").dialog("close");
		}else{
			alert("Veuillez sélectionner un opérateur");
		}
		
	});
	
	
	$("#btn_entite_reference").on("click", function(){
		$("#dialog_entite").dialogEntite({
			title:"Entité référence",
			entite:defi.entiteReference,
			width:800,
			modal:true
		});
	});
	

}

function init_map(){
	defi.map = new OpenLayers.Map({
		div: "map",
		layers: [
			new OpenLayers.Layer.OSM("OpenStreetMap")
		],
		controls: [
			new OpenLayers.Control.Navigation({
				dragPanOptions: {
					enableKinetic: true
				}
			}),
			new OpenLayers.Control.PanZoom(),
			new OpenLayers.Control.Attribution()
		],
		center: [-7968226,6439648],
		zoom: 5
	});

	defi.map.addControl(new OpenLayers.Control.LayerSwitcher());
}
