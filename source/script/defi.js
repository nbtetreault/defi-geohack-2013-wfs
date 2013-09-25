var defi = new Object();

defi.entites_sources = new Array();
defi.entite_source = null;
defi.operateur = null;
defi.entites_references = new Array();
defi.entite_reference = null;

(function( $, undefined ) {

	$.widget("defi.dialogEntite", $.ui.dialog,{
	
		_create: function(){
			this._super();
			var dialog = this.uiDialog;
			
			this._entite = this.options.entite;

			dialog.append('<select id="wfs"><option value="">Choisir un WFS</option></select><br>'
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
						  + '<input type="button" value="Ajouter la condition" id="ajouter_condition">'
						  );
						  
			
			this._charger_liste_wfs('');
			
			var operateurs = ["=", "!=", "<=", ">=", "<", ">", "Between", "Like", "AND", "OR"];
			
			//On a un WFS courant
			if(false){
				//Afficher les couches disponibles
				this._charger_liste_couches();
			}
			
			//Ajouter la liste des opérateurs
			$.each(operateurs, function(index, valeur){
				$("#operateurs").append('<option value="'+valeur+'">'+valeur+'</option>');
			});
			
			//On a une couche courante
			if(false){
				//Afficher les attributs de la couche et cocher le courant si appplicable
				
				
				//Afficher les valeurs et cocher la courante si applicable
			}	
			
			$("#wfs").change(function(){
				alert("wfs on change ...");
				//Appeler le WFS et récupérer la liste des couches
				//TODO écrire une fonction qui chage les couches dans la liste et la réutiliser lors de l'affichage initial si on en avait déjà 
			});
			
			$("#couche").change(function(){
				alert("couche on change ...");
			});
			
			$("#ajouter_condition").on("click", function(){
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
		},
		
		_charger_liste_wfs: function(wfs_courant){
		
			//Ajouter les WFS 
			var liste_wfs = [
						{
							"nom":"casernes",
							"valeur":"http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?&VERSION=1.0.0&SERVICE=WFS&REQUEST=getFeature&TYPENAME=CASERNE"
						},
						{
							"nom":"adn bassin",
							"valeur":"http://geoegl.msp.gouv.qc.ca/cgi-wms/gouvouvertqc?&VERSION=1.0.0&SERVICE=WFS&REQUEST=getFeature&TYPENAME=adn_bassin_n1_public_v&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Ebh_n1_s_id%3C/PropertyName%3E%3CLiteral%3E102%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E"
						}	
						];
						
			$.each(liste_wfs, function(index, wfs){
			
				//TODO Sélectionner l'option si elle correspond à l'option courante de l'entité
				var selected = (wfs_courant == wfs.nom) ? 'selected' : '';
				$("#wfs").append('<option value="'+wfs.valeur+'" '+selected+'>'+wfs.nom+'</option>');
			});
		},
		_charger_liste_couches: function(couche_courante){
			
		},
		_charger_liste_attributs:function(attribut_courant){
		
		},
		_charger_liste_valeurs:function(valeur_courante){
		
		}
	});

})( jQuery );