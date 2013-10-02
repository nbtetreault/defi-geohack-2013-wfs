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
			nomEntite:'source',
			width:800,
			modal:true
		});	
	});
	
	$("#btn_operateur").on("click", function(){
		$("#dialog_operateur_spatial").dialog({
			"title": "Choix de l'opérateur",
			"modal":true
		});
	
		var operateursSpatiaux = defi.OPETATEURS_SPATIAUX.sort();
		$.each(operateursSpatiaux, function(index, valeur){
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
			nomEntite:'reference',
			width:800,
			modal:true
		});
	});
	
	$("#btn_afficher_resultat").on("click", function(){
		//Vérifier que tout est OK
		lancer_handler();
		if(defi.champsRemplis()){
		
			
		}else{
			alert("Veuillez remplir les formulaires");
		}
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
	defi.map = new OpenLayers.Map("map",{
		projection: new OpenLayers.Projection("EPSG:3857"),
		units: "m",
		maxResolution: 156543.0339,
		layers: [new OpenLayers.Layer.OSM("OpenStreetMap")],
		controls: [
			new OpenLayers.Control.Navigation({
				dragPanOptions: {
					enableKinetic: true
				}
			}),
			new OpenLayers.Control.PanZoom(),
			new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.LayerSwitcher()
		]
	});
	
	//Ajout de overlays	
	var caserne = new OpenLayers.Layer.WMS( "Caserne", "http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?", {layers: 'caserne',transparent: "true",format: "image/png"},{isBaseLayer: false, visibility: false} );
	var stations = new OpenLayers.Layer.WMS( "Stations", "http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?", {layers: 'adn_station_max_public_v',transparent: "true",format: "image/png"},{isBaseLayer: false, visibility: false} );

	//vector layer pour dessin
	/*var pointLayer = new OpenLayers.Layer.Vector("Point Layer");
	var lineLayer = new OpenLayers.Layer.Vector("Line Layer");*/
	var polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer",{isBaseLayer: false, visibility: true});
			
	defi.map.addLayers([polygonLayer, caserne, stations]);
	
	//setCenter
	defi.map.setCenter(
			new OpenLayers.LonLat(-73, 46).transform(
				new OpenLayers.Projection("EPSG:4326"),
				defi.map.getProjectionObject()
			), 7
		);
	
	//Ajout des controles
	//defi.map.addControl(new OpenLayers.Control.LayerSwitcher());
	//Controle pour dessiner des features
	drawControls = 
	{
		/*point: new OpenLayers.Control.DrawFeature(pointLayer,
			OpenLayers.Handler.Point),
		line: new OpenLayers.Control.DrawFeature(lineLayer,
			OpenLayers.Handler.Path),*/
		polygon: new OpenLayers.Control.DrawFeature(polygonLayer,
			OpenLayers.Handler.Polygon)
	};
	for(var key in drawControls) {
		defi.map.addControl(drawControls[key]);
	}
}
