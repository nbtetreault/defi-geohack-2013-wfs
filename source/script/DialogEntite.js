/*
* Inspiré de https://github.com/jquery-boilerplate/boilerplate/

* TODO Stocker les informations d'entités dans le dialog. Quand on Enregistre, stocker ça dans defi.entiteSource ou defi.entiteReference
*/
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
						  + '<select id="attribut" size="10"></select>'
						  + '</td><td>Opérateur<br>'
						  + '<select id="operateur" size="10"></select>'
						  + '</td><td>Valeurs disponibles<br>'
						  + '<select id="valeur" size="10"></select>'
						  + '</td><td>Condition<br>'
						  + '<input type="text" id="condition" readonly>'
						  + '</td></tr></table>'
						  + '<input type="button" value="Enregistrer la condition" id="enregistrer_condition">'
						  );
						  
			
			//Remplir la liste des WFS
			$.each(defi.WFSS.items, function(index, WFS){
				$("#WFS").append('<option value="'+WFS.nom+'">'+WFS.nom+'</option>');
			});
			
				
			//Remplir la liste des opérateurs
			$.each(defi.OPERATEURS, function(index, valeur){
				$("#operateur").append('<option value="'+valeur+'">'+valeur+'</option>');
			});
			
			
			//On a déjà définie l'entitée
			if(false){
				
				//Remplir la liste des couches
				
				
				//Remplir la liste des attributs de couche
				//stocké pour ne pas avoir à réinterroger le WFS
			
			
				//Remplir la liste des valeurs
				//stocké pour ne pas avoir à réinterroger le WFS
				
			}

			$("#WFS").change($.proxy(function(){
				
				//Appeler le WFS et récupérer la liste des couches
				var valeur = $( "#WFS option:selected" ).val();
				if(valeur){
				
					//Vider la liste
					$("#couche").html('<option value="">Sélectionner une couche</option>');
					
					var WFS = defi.WFSS.getWFSParNom(valeur);
					if(WFS){
						
						this.options.entite.WFS = WFS;
						
						//Maj des couches du wfs
						WFS.charger();
						
						if(WFS.couches.length() > 0){
							$("#couche").removeAttr("disabled");
						}else{
							$("#couche").attr("disabled", "disabled");
						}
						//Maj de la liste des couches
						$.each(WFS.couches.items, function(index, valeur){
							$("#couche").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
						});
						
					}else{
						alert("le wfs n'a pas été trouvé");
					}
					
				}else{
					
					$("#couche").attr("disabled", "disabled");
				}
                
			}, this));
			
			$("#couche").change($.proxy(function(){
				
				//Vider la liste des attributs
				$("#attributs").html("");
				
				var valeur = $("#couche option:selected").val();
				
				//Récupérer une référence vers la couche
				var couche = this.options.entite.WFS.couches.getCoucheParNom(valeur);
				
				if(couche){
				
					this.options.entite.couche = couche;
				
					//Maj des couches du wfs
					couche.charger();
					
					//Vider la liste
					$(attribut).html('');
					
					//Maj de la liste des attributs de la couche
					$.each(couche.attributs, function(index, valeur){
						$("#attribut").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
					});
					
/*				
				$.each(valeur.valeurs, function(index, valeur){
						$("#valeur").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
					});
					*/
					
				}else{
					alert("la couche n'a pas été trouvé");
				}
				
			}, this));
			
			$("#attribut").change($.proxy(function(){
				
				$("#valeur").html("");
				
				//Remplir la liste des valeurs en fonction de l'attribut
				var nomAttribut = $("#atribut option:selected").val();
				if(nomAttribut){
					var attribut = this.options.entite.couche.
				}
			
			}, this));
			
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