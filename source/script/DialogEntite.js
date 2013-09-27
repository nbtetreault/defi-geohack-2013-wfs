/*
* Inspiré de https://github.com/jquery-boilerplate/boilerplate/

* TODO Stocker les informations d'entités dans le dialog. Quand on Enregistre, stocker ça dans defi.entiteSource ou defi.entiteReference
//TODO Mettre un "veuillez patienter" quand on fait du ajax
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

			dialog.append('<b>WFS</b><br><select id="WFS"><option value="">Choisir un WFS</option></select><br>'
						  + '<b>Couche</b><br><select disabled id="couche"><option value="">Sélectionner une couche</option></select><br>'
						  + '<b>Critères</b><br><table><tr><td>Attributs de la couche<br>'
						  + '<select id="attribut" size="10"></select>'
						  + '</td><td>Opérateur<br>'
						  + '<select id="operateur" size="10"></select>'
						  + '</td><td>Valeurs disponibles<br>'
						  + '<select id="valeur" size="10"></select>'
						  + '</td></tr></table>'
						  + '<b>Condition</b><br>'
						  + '<p id="condition">&nbsp;</p>'
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
				$("#attribut").html("");
				
				var valeur = $("#couche option:selected").val();
				if(valeur){
					//Récupérer une référence vers la couche
					var couche = this.options.entite.WFS.couches.getCoucheParNom(valeur);
					
					if(couche){
					
						this.options.entite.couche = couche;
					
						//Maj des couches du wfs
						couche.charger();
						
						//Vider la liste
						$(attribut).html('');
						
						//Maj de la liste des attributs de la couche
						$.each(couche.attributs.items, function(index, valeur){
							$("#attribut").append('<option value="'+valeur.nom+'">'+valeur.nom+'</option>');
						});
						
					}else{
						alert("la couche n'a pas été trouvé");
					}
				}else{
					
					$("#valeur").html("");
					
				}
				
				this.majCondition();
				
			}, this));
			
			$("#attribut").change($.proxy(function(){
				
				$("#valeur").html("");
				
				
				var nomAttribut = $("#attribut option:selected").val();
				if(nomAttribut){
					
					var attribut = this.options.entite.couche.attributs.getAttributParNom(nomAttribut);
					if(attribut){
						//Remplir la liste des valeurs en fonction de l'attribut sélectionné
						$.each(attribut.valeursPossibles.items, function(index, valeur){
							$("#valeur").append('<option value="'+valeur.valeur+'">'+valeur.valeur+'</option>');
						});
					}
				}
				
				this.majCondition();
			
			}, this));
			
						
			$("#operateur").change($.proxy(function(){
				this.majCondition();
			},this));
			
						
			$("#valeur").change($.proxy(function(){
				this.majCondition();
			},this));
			
			$("#enregistrer_condition").on("click", function(){
				alert("ajouter la condition click");
			});
			
			
			
			
		},
		majCondition:function (){
			var attribut = $("#attribut").val();
			var operateur = $("#operateur").val();
			var valeur = $("#valeur").val();
			
			if(attribut && operateur && valeur){
				$("#condition").html(attribut + operateur + valeur);
			}else{
				$("#condition").html('&nbsp;');
			}
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