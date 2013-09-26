var defi = {};
//defi.entites_sources = new Array();
defi.entiteSource = {};
defi.entiteSource.valeur = '';
defi.operateur = null;
//defi.entites_references = new Array();
defi.entiteReference = {};
defi.entiteReference.valeur = {};
defi.OPERATEURS = ["=", "!=", "<=", ">=", "<", ">", "Between", "Like", "AND", "OR"];
defi.OPERATEURS__ = [
    "equals",
    "disjoint",
    "touches",
    "within",
    "overlaps",
    "crosses",
    "intersect",
    "contains",
    "dwitin",
    "bbox"
];
defi.dialog = null;

(function( $, undefined ) {

	$.widget("defi.dialogEntite", $.ui.dialog,{
        
        
        options: {
            entite: {}
        },

		_create: function(param1, param2, param3){
			this._super();
			var dialog = this.uiDialog;
			defi.dialog = this;
	//		this._entite = this.options.entite;
            this.CLASS_NAME = 'dialogEntite';

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
						  
			
			this._chargerListeWfs('');
			
			
			//On a un WFS courant
			if(false){
				//Afficher les couches disponibles
				this._chargerListeCoches();
			}
			
			//Ajouter la liste des opérateurs
			$.each(defi.OPERATEURS, function(index, valeur){
				$("#operateurs").append('<option value="'+valeur+'">'+valeur+'</option>');
			});
			
			//On a une couche courante
			if(false){
				//Afficher les attributs de la couche et cocher le courant si appplicable
				
				
				//Afficher les valeurs et cocher la courante si applicable
			}	
			
			$("#wfs").change(function(param1, param2, param3){
				
				//Appeler le WFS et récupérer la liste des couches
                var wfs = $( "#wfs option:selected" ).val();
                var couches = defi.dialog._getCouches(wfs);
                var coucheCourante = defi.dialog.getEntiteValeur();
				defi.dialog._chargerListeCouches(couches, coucheCourante);
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
        
        getEntiteValeur:function(){
            if(this._entite.valeur){
                return this._entite.valeur;
            }
            return '';
        },
		
		_chargerListeWfs: function(wfsCourant){
		
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
				var selected = (wfsCourant == wfs.nom) ? 'selected' : '';
				$("#wfs").append('<option value="'+wfs.valeur+'" '+selected+'>'+wfs.nom+'</option>');
			});
		},
		_chargerListeCoches: function(liste, coucheCourante){
			
		},
		_chargerListeAttributs:function(attributCourant){
		
		},
		_chargerListeValeurs:function(valeurCourante){
		
		},
        //Récupère des couches à partir d'un url de WFS
        _getCouches: function(wfs){
            //TODO Appeler l'url des wfs
            return ["un", "deux", "trois"];
        }
	});

})( jQuery );