
String.prototype.ltrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("^[" + chars + "]+", "g"), "" );
}

String.prototype.rtrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("[" + chars + "]+$", "g"), "" );
}
String.prototype.trim = function( chars ) {
    return this.rtrim(chars).ltrim(chars);
}

String.prototype.removeHTMLComments = function(string){
	return this.replace(/<!--(.*?)-->/gm, "");
}