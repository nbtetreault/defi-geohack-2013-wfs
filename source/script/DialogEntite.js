(function( $, undefined ) {

	$.widget("defi.dialogEntite", $.ui.dialog,{
        
        
        options: {
            entite: {}
        },

		_create: function(){
			this._super();
			var dialog = this.uiDialog;
			defi.dialog = this;
            this.CLASS_NAME = 'dialogEntite';

			dialog.append('<select id="WFS"><option value="">Choisir un WFS</option></select><br>'
						  + '<select disabled id="couche"><option value="">Sélectionner une couche</option></select><br>'
						  + '<table><tr><td>Attributs de la couche<br>'
						  + '<select id="attributs" size="10"></select>'
						  + '</td><td>Opérateur<br>'
						  + '<select id="operateurs" size="10"></select>'
						  + '</td><td>Valeurs disponibles<br>'
						  + '<select id="valeurs" size="10"></select>'
						  + '</td><td>Condition<br>'
						  + '<input type="text" id="condition" readonly>'
						  + '</td></tr></table>'
						  + '<input type="button" value="Enregistrer la condition" id="enregistrer_condition">'
						  );
						  
			
			//Remplir la liste des WFS
			$.each(defi.listeWFS.items, function(index, WFS){
				$("#WFS").append('<option value="'+WFS.nom+'">'+WFS.nom+'</option>');
			});
			
				
			//Remplir la liste des opérateurs
			$.each(defi.OPERATEURS, function(index, valeur){
				$("#operateurs").append('<option value="'+valeur+'">'+valeur+'</option>');
			});
			
			
			//On a déjà définie l'entitée
			if(false){
				
				//Remplir la liste des couches
				
				
				//Remplir la liste des attributs de couche
				//stocké pour ne pas avoir à réinterroger le WFS
			
			
				//Remplir la liste des valeurs
				//stocké pour ne pas avoir à réinterroger le WFS
				
			}
			
			
	

		
			
			$("#WFS").change(function(){
				
				//Appeler le WFS et récupérer la liste des couches
				var valeur = $( "#WFS option:selected" ).val();
				if(valeur){
				
					//Vider la liste
					$("#couche").html('<option value="">Sélectionner une couche</option>');
					
					var WFS = defi.listeWFS.getWFSParNom(valeur);
					if(WFS){
						
						//TODO Stocker une référence au WFS de cette entité dans defi, soit pour source ou référence 
						
						
						//Maj des couches du wfs
						WFS.charger();
						
						if(WFS.couches.length > 0){
							$("#couche").removeAttr("disabled");
						}else{
							$("#couche").attr("disabled", "disabled");
						}
						//Maj de la liste des couches
						$.each(WFS.couches, function(index, valeur){
							$("#couche").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
						});
						
					}else{
						alert("le wfs n'a pas été trouvé");
					}
					
				}else{
					
					$("#couche").attr("disabled", "disabled");
				}
                
			});
			
			$("#couche").change(function(){
				
				//Vider la liste des attributs et des valeurs disponibles
				$("#attributs").html("");
				$("#valeurs").html("");
				
				
				//Récupérer une référence vers la couche
				//var couche = defi.listeWFS.getWFSParNom(valeur);
				
				if(couche){
					//Maj des couches du wfs
					couche.charger();
					
					
					//Maj de la liste des couches
					$.each(couche.attributs, function(index, valeur){
						$("#attribut").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
					});
					
					$.each(valeur.valeurs, function(index, valeur){
						$("#couche").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
					});
					
				}else{
					alert("la couche n'a pas été trouvé");
				}
				
			});
			
			$("#enregistrer_condition").on("click", function(){
				alert("ajouter la condition click");
			});
			
			
			
			
		},
		open: function(){
			this._super();

			//charger les données de l'entitée
		},
		
		close: function(){
			this._super();
			this.destroy();
		}
	});

})( jQuery );