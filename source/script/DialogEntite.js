/*
* Inspiré de https://github.com/jquery-boilerplate/boilerplate/

//TODO Mettre un "veuillez patienter" quand on fait du ajax

*/
(function( $, undefined ) {

	$.widget("defi.dialogEntite", $.ui.dialog,{
        
        options: {
            entite: {},
			nomEntite:''
        },

		_create: function(){
			this._super();
			var dialog = this.uiDialog;
			defi.dialog = this;
            this.CLASS_NAME = 'dialogEntite';

			//Faire une copie de l'entité. Ne pas modifier l'originale
			this.entiteTempo = jQuery.extend({}, this.options.entite);

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
						  + '<b>Buffer</b> (mètres)'
						  + '<input id="txtBuffer" type="text">'
						  + '<input type="button" value="Enregistrer la condition" id="enregistrer_condition">'
				);	  
			
			
			var nomWFSCourant = (this.entiteTempo.getCondition()) ? this.entiteTempo.WFS.nom : '';
			this.majListeWFS(defi.WFSS.items, nomWFSCourant);

			var operateurCourant = '';
			
			//On a déjà définie l'entitée
			if(this.entiteTempo.getCondition()){
				
				//Remplir la liste des couches et sélectionner la couche courante
				this.majListeCouches(this.entiteTempo.WFS.couches.items, this.entiteTempo.couche.nom);
				
				//Remplir la liste des attributs et sélectionner l'attribut courant
				this.majListeAttributs(this.entiteTempo.couche.attributs.items, this.entiteTempo.attribut.nom);
			
				//Remplir la liste des valeurs et sélectionner la liste courante
				this.majListeValeurs(this.entiteTempo.attribut.valeursPossibles.items, this.entiteTempo.valeur.valeur);
				
				operateurCourant = this.entiteTempo.operateur.titre;
			}
			
			this.majListeOperateurs(defi.OPERATEURS, operateurCourant);
		
			$("#WFS").change($.proxy(function(){
				
				var valeur = $("#WFS option:selected").val();
				
				//Un WFS est sélectionné
				if(valeur){
				
					//Vider la liste des couches
					this.viderListeCouches();
					
					this.viderListeAttributs();
					this.viderListeValeurs();
					
					var WFS = defi.WFSS.getWFSParNom(valeur);
					if(WFS){
						
						this.entiteTempo.WFS = WFS;
						
						//Demander une maj des couches du WFS
						WFS.charger();
						
						//Au moins une couche pour le WFS
						if(WFS.couches.length() > 0){
							
							this.majListeCouches(WFS.couches.items, '');
						}else{
						
							//Désactiver le contrôle de sélection des couches
							$("#couche").attr("disabled", "disabled");
						}
						

					}else{
						alert("Le wfs n'a pas été trouvé");
					}
					
				}else{
					
					$("#couche").attr("disabled", "disabled");
				}
                
			}, this));
			
			//Sélection d'une couche
			$("#couche").change($.proxy(function(){
				
				//Vider la liste des attributs de couche
				this.viderListeAttributs();
				
				this.viderListeValeurs();

				var valeur = $("#couche option:selected").val();
				
				//Une couche est sélectionnée
				if(valeur){
				
					var couche = this.entiteTempo.WFS.couches.getCoucheParNom(valeur);	
					if(couche){
					
						this.entiteTempo.couche = couche;
					
						//Maj des couches du wfs
						couche.charger();
						
						//Vider la liste
						$(attribut).html('');
						
						//Maj de la liste des attributs de la couche
						this.majListeAttributs(couche.attributs.items, '')
						
						
					}else{
						alert("La couche n'a pas été trouvée.");
					}
				}
				
				this.majCondition();
				
			}, this));
			
			$("#attribut").change($.proxy(function(){
				
				this.viderListeValeurs();
				
				var nomAttribut = $("#attribut option:selected").val();
				
				//Un attribut est sélectionné
				if(nomAttribut){
					
					var attribut = this.entiteTempo.couche.attributs.getAttributParNom(nomAttribut);
					if(attribut){
					
						this.entiteTempo.attribut = attribut;

						//Remplir la liste des valeurs en fonction de l'attribut sélectionné
						this.majListeValeurs(attribut.valeursPossibles.items, '');
					}
				}
				
				this.majCondition();
			
			}, this));


			$("#operateur").change($.proxy(function(){

				var operateur = $("#operateur option:selected").val();
				if(operateur){
					operateur = new Operateur(operateur);
					this.entiteTempo.operateur = operateur;
				}else{
					this.entiteTempo.operateur = null
				}

				this.majCondition();
			},this));
	
			$("#valeur").change($.proxy(function(){

				var valeur = $("#valeur option:selected").val();
				if(valeur){
					valeur = new Valeur(valeur);
					this.entiteTempo.valeur = valeur;
				}else{
					this.entiteTempo.operateur = null;
				}

				this.majCondition();
			},this));
			
			$("#txtBuffer").change($.proxy(function(){

				this.entiteTempo.buffer = $("#txtBuffer").val();
				
			},this));
			
			$("#enregistrer_condition").click($.proxy(function(){
			
				if(this.entiteTempo.conditionValide()){

					//Patch pour transférer la référence sur l'objet, en passant 
					//par this.options.entite ça ne semble pas fonctionner
					if(this.options.nomEntite == "source"){
						defi.entiteSource = this.entiteTempo;
					}else{
						defi.entiteReference = this.entiteTempo;
					}
					this.options.entite = this.entiteTempo;
					this.close();
				}else{
					alert("Veuillez sélectionner les options nécessaires");
				}
				
			}, this));

		},
		majCondition:function (){

			if(this.entiteTempo.conditionValide()){
				var attribut = $("#attribut").val();
				var operateur = $("#operateur").val();
				var valeur = $("#valeur").val();
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
		},
		viderListeCouches: function (){
			//Vider la liste des couches
			$("#couche").html('<option value="">Sélectionner une couche</option>');
		},
		viderListeAttributs: function(){
			$("#attribut").html("");
		},
		viderListeValeurs: function(){
			$("#valeur").html("");
		},
		majListeWFS: function(WFSS, nomWFSCourant){
			
			$.each(defi.WFSS.items, function(index, WFS){
				var selected = (WFS.nom == nomWFSCourant) ? "selected" : "";
				$("#WFS").append('<option value="'+WFS.nom.HTMLEntities()+'" '+selected+'>'+WFS.nom.HTMLEntities()+'</option>');
			});
		},
		/**
		* Rempli l'outil de sélection de la couche
		* @param array couches Array de <Couche>
		* @param string Valeur courante
		*/
		majListeCouches: function (couches, coucheCourante){
		
			//Activer le contrôle de sélection des couches
			$("#couche").removeAttr("disabled");
		
			$.each(couches, function(index, couche){
				var selected = (couche.nom == coucheCourante) ? "selected" : "";
				$("#couche").append('<option value="'+couche.nom.HTMLEntities()+'" '+selected+'>'+couche.nom.HTMLEntities()+'</option>');
			});
		},
		/**
		* Rempli l'outil de sélection de l'attribut
		* @param array attributs Array de <Attribut>
		* @param string Valeur courante courant
		*/
		majListeAttributs: function(attributs, attributCourant){
			$.each(attributs, function(index, attribut){
				var selected = (attribut.nom == attributCourant) ? "selected" : "";
				$("#attribut").append('<option value="'+attribut.nom.HTMLEntities()+'" '+selected+'>'+attribut.nom.HTMLEntities()+'</option>');
			});	
		},
		majListeOperateurs: function(operateurs, operateurCourant){
			//Remplir la liste des opérateurs
			$.each(operateurs, function(index, operateur){
				var selected = operateurCourant == operateur ? "selected" : "";
				$("#operateur").append('<option value="'+operateur+'" '+selected+'>'+operateur+'</option>');
			});
			
		},
		/**
		* Rempli l'outil de sélection de la valeur
		* @param array valeurs Array de <Valeur>
		* @param string Valeur courante
		*/
		majListeValeurs: function(valeurs, valeurCourante){
			$.each(valeurs, function(index, valeur){
				var selected = (valeur.valeur == valeurCourante) ? "selected" : "";
				$("#valeur").append('<option value="'+valeur.valeur.HTMLEntities()+'"  '+selected+'>'+valeur.valeur.HTMLEntities()+'</option>');
			});
		}
	});
})( jQuery );