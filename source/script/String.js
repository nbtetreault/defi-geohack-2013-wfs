
String.prototype.ltrim = function(chars) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("^[" + chars + "]+", "g"), "" );
}

String.prototype.rtrim = function(chars) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("[" + chars + "]+$", "g"), "" );
}
String.prototype.trim = function(chars) {
    return this.rtrim(chars).ltrim(chars);
}

String.prototype.removeHTMLComments = function(string){
	return this.replace(/<!--(.*?)-->/gm, "");
}


String.prototype.HTMLEntities = function(){
	
	var texte = this.replace(/"/g,'&quot;'); // 34 22
	texte = texte.replace(/&/g,'&amp;'); // 38 26
	texte = texte.replace(/\'/g,'&#39;'); // 39 27
	texte = texte.replace(/</g,'&lt;'); // 60 3C
	texte = texte.replace(/>/g,'&gt;'); // 62 3E
	texte = texte.replace(/\^/g,'&circ;'); // 94 5E
	texte = texte.replace(/�/g,'&lsquo;'); // 145 91
	texte = texte.replace(/�/g,'&rsquo;'); // 146 92
	texte = texte.replace(/�/g,'&ldquo;'); // 147 93
	texte = texte.replace(/�/g,'&rdquo;'); // 148 94
	texte = texte.replace(/�/g,'&bull;'); // 149 95
	texte = texte.replace(/�/g,'&ndash;'); // 150 96
	texte = texte.replace(/�/g,'&mdash;'); // 151 97
	texte = texte.replace(/�/g,'&tilde;'); // 152 98
	texte = texte.replace(/�/g,'&trade;'); // 153 99
	texte = texte.replace(/�/g,'&scaron;'); // 154 9A
	texte = texte.replace(/�/g,'&rsaquo;'); // 155 9B
	texte = texte.replace(/�/g,'&oelig;'); // 156 9C
	texte = texte.replace(/�/g,'&#357;'); // 157 9D
	texte = texte.replace(/�/g,'&#382;'); // 158 9E
	texte = texte.replace(/�/g,'&Yuml;'); // 159 9F
	texte = texte.replace(/�/g,'&iexcl;'); // 161 A1
	texte = texte.replace(/�/g,'&cent;'); // 162 A2
	texte = texte.replace(/�/g,'&pound;'); // 163 A3
	texte = texte.replace(/�/g,'&yen;'); // 165 A5
	texte = texte.replace(/�/g,'&brvbar;'); // 166 A6
	texte = texte.replace(/�/g,'&sect;'); // 167 A7
	texte = texte.replace(/�/g,'&uml;'); // 168 A8
	texte = texte.replace(/�/g,'&copy;'); // 169 A9
	texte = texte.replace(/�/g,'&ordf;'); // 170 AA
	texte = texte.replace(/�/g,'&laquo;'); // 171 AB
	texte = texte.replace(/�/g,'&not;'); // 172 AC
	texte = texte.replace(/�/g,'&shy;'); // 173 AD
	texte = texte.replace(/�/g,'&reg;'); // 174 AE
	texte = texte.replace(/�/g,'&macr;'); // 175 AF
	texte = texte.replace(/�/g,'&deg;'); // 176 B0
	texte = texte.replace(/�/g,'&plusmn;'); // 177 B1
	texte = texte.replace(/�/g,'&sup2;'); // 178 B2
	texte = texte.replace(/�/g,'&sup3;'); // 179 B3
	texte = texte.replace(/�/g,'&acute;'); // 180 B4
	texte = texte.replace(/�/g,'&micro;'); // 181 B5
	texte = texte.replace(/�/g,'&para'); // 182 B6
	texte = texte.replace(/�/g,'&middot;'); // 183 B7
	texte = texte.replace(/�/g,'&cedil;'); // 184 B8
	texte = texte.replace(/�/g,'&sup1;'); // 185 B9
	texte = texte.replace(/�/g,'&ordm;'); // 186 BA
	texte = texte.replace(/�/g,'&raquo;'); // 187 BB
	texte = texte.replace(/�/g,'&frac14;'); // 188 BC
	texte = texte.replace(/�/g,'&frac12;'); // 189 BD
	texte = texte.replace(/�/g,'&frac34;'); // 190 BE
	texte = texte.replace(/�/g,'&iquest;'); // 191 BF
	texte = texte.replace(/�/g,'&Agrave;'); // 192 C0
	texte = texte.replace(/�/g,'&Aacute;'); // 193 C1
	texte = texte.replace(/�/g,'&Acirc;'); // 194 C2
	texte = texte.replace(/�/g,'&Atilde;'); // 195 C3
	texte = texte.replace(/�/g,'&Auml;'); // 196 C4
	texte = texte.replace(/�/g,'&Aring;'); // 197 C5
	texte = texte.replace(/�/g,'&AElig;'); // 198 C6
	texte = texte.replace(/�/g,'&Ccedil;'); // 199 C7
	texte = texte.replace(/�/g,'&Egrave;'); // 200 C8
	texte = texte.replace(/�/g,'&Eacute;'); // 201 C9
	texte = texte.replace(/�/g,'&Ecirc;'); // 202 CA
	texte = texte.replace(/�/g,'&Euml;'); // 203 CB
	texte = texte.replace(/�/g,'&Igrave;'); // 204 CC
	texte = texte.replace(/�/g,'&Iacute;'); // 205 CD
	texte = texte.replace(/�/g,'&Icirc;'); // 206 CE
	texte = texte.replace(/�/g,'&Iuml;'); // 207 CF
	texte = texte.replace(/�/g,'&ETH;'); // 208 D0
	texte = texte.replace(/�/g,'&Ntilde;'); // 209 D1
	texte = texte.replace(/�/g,'&Ograve;'); // 210 D2
	texte = texte.replace(/�/g,'&Oacute;'); // 211 D3
	texte = texte.replace(/�/g,'&Ocirc;'); // 212 D4
	texte = texte.replace(/�/g,'&Otilde;'); // 213 D5
	texte = texte.replace(/�/g,'&Ouml;'); // 214 D6
	texte = texte.replace(/�/g,'&times;'); // 215 D7
	texte = texte.replace(/�/g,'&Oslash;'); // 216 D8
	texte = texte.replace(/�/g,'&Ugrave;'); // 217 D9
	texte = texte.replace(/�/g,'&Uacute;'); // 218 DA
	texte = texte.replace(/�/g,'&Ucirc;'); // 219 DB
	texte = texte.replace(/�/g,'&Uuml;'); // 220 DC
	texte = texte.replace(/�/g,'&Yacute;'); // 221 DD
	texte = texte.replace(/�/g,'&THORN;'); // 222 DE
	texte = texte.replace(/�/g,'&szlig;'); // 223 DF
	texte = texte.replace(/�/g,'&aacute;'); // 224 E0
	texte = texte.replace(/�/g,'&aacute;'); // 225 E1
	texte = texte.replace(/�/g,'&acirc;'); // 226 E2
	texte = texte.replace(/�/g,'&atilde;'); // 227 E3
	texte = texte.replace(/�/g,'&auml;'); // 228 E4
	texte = texte.replace(/�/g,'&aring;'); // 229 E5
	texte = texte.replace(/�/g,'&aelig;'); // 230 E6
	texte = texte.replace(/�/g,'&ccedil;'); // 231 E7
	texte = texte.replace(/�/g,'&egrave;'); // 232 E8
	texte = texte.replace(/�/g,'&eacute;'); // 233 E9
	texte = texte.replace(/�/g,'&ecirc;'); // 234 EA
	texte = texte.replace(/�/g,'&euml;'); // 235 EB
	texte = texte.replace(/�/g,'&igrave;'); // 236 EC
	texte = texte.replace(/�/g,'&iacute;'); // 237 ED
	texte = texte.replace(/�/g,'&icirc;'); // 238 EE
	texte = texte.replace(/�/g,'&iuml;'); // 239 EF
	texte = texte.replace(/�/g,'&eth;'); // 240 F0
	texte = texte.replace(/�/g,'&ntilde;'); // 241 F1
	texte = texte.replace(/�/g,'&ograve;'); // 242 F2
	texte = texte.replace(/�/g,'&oacute;'); // 243 F3
	texte = texte.replace(/�/g,'&ocirc;'); // 244 F4
	texte = texte.replace(/�/g,'&otilde;'); // 245 F5
	texte = texte.replace(/�/g,'&ouml;'); // 246 F6
	texte = texte.replace(/�/g,'&divide;'); // 247 F7
	texte = texte.replace(/�/g,'&oslash;'); // 248 F8
	texte = texte.replace(/�/g,'&ugrave;'); // 249 F9
	texte = texte.replace(/�/g,'&uacute;'); // 250 FA
	texte = texte.replace(/�/g,'&ucirc;'); // 251 FB
	texte = texte.replace(/�/g,'&uuml;'); // 252 FC
	texte = texte.replace(/�/g,'&yacute;'); // 253 FD
	texte = texte.replace(/�/g,'&thorn;'); // 254 FE
	texte = texte.replace(/�/g,'&yuml;'); // 255 FF
	return texte;
}

  String.prototype.encodeHTML = function () {
    return this.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;');
  };