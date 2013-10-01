var defi = new Defi();
var drawControls;

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
			$("#dialog_operateur_spatial").dialog("destroy");
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

function toggleControl(element) {
	for(key in drawControls) {
		var control = drawControls[key];
		
		if(element.value == key && element.checked) {
			control.activate();
		} else {
			control.deactivate();
		}
	}
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
		]/*,
		center: new OpenLayers.LonLat(-73, 46).transform(
				new OpenLayers.Projection("EPSG:4326"),
				defi.map.getProjectionObject()
			),
		zoom: 7*/
	});
	
	//setCenter
	defi.map.setCenter(
			new OpenLayers.LonLat(-73, 46).transform(
				new OpenLayers.Projection("EPSG:4326"),
				defi.map.getProjectionObject()
			), 7
		);

	//Ajout de overlays
	//vector layer pour polygone
	var polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer",{isBaseLayer: false, visibility: true});
	defi.map.addLayer(polygonLayer);
	
	//Ajout des controles
	defi.map.addControl(new OpenLayers.Control.LayerSwitcher());
	//pour dessiner des features
	drawControls = {
		drawPolygon: new OpenLayers.Control.DrawFeature(polygonLayer,
			OpenLayers.Handler.Polygon)
	};
	for(var key in drawControls) {
		defi.map.addControl(drawControls[key]);
	}
}
