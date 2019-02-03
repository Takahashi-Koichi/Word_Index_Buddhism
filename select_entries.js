var xmlObj;
var xslObj01;
var xslObj02;
var xslProc;
var str="";
var xmlDoc
var xslDoc01;

//Bauddhakosha,sort_entries.jsからコピー、2019/02/03
// ブラウザ判別IE11対応、2015/04/18
//chang if(!document.all) into if(!isIE)
var ua, isIE;

// "http://garafu.blogspot.jp/2013/08/useragent-ie11.html"参照。
// UserAgent を小文字に正規化
ua = window.navigator.userAgent.toLowerCase();
// IE or else 判別
isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >=0);

function Init(){
	//ブラウザ判別
	if(!isIE){
		// Mozilla
		//XMLの読み込み
		xmlObj = new XMLHttpRequest();
		xmlObj.open("GET","word_index_IBTJ_ver3.xml",false);
		xmlObj.setRequestHeader('Content-Type', 'text/xml');
		xmlObj.overrideMimeType('text/xml');
		xmlObj.send();
		xmlDoc = xmlObj.responseXML;

		//XSLTの読み込み
		xslObj01 = new XMLHttpRequest();
		xslObj01.open("GET","definition.xsl",false);
		xslObj01.setRequestHeader('Content-Type', 'text/xml');
		xslObj01.overrideMimeType('text/xml');
		xslObj01.send();
		xslDoc01 = xslObj01.responseXML;

	}else{
		//Internet Explorer
		xmlDoc=new ActiveXObject("MSXML2.DOMDocument");

		xslDoc01=new ActiveXObject("MSXML2.FreeThreadedDOMDocument");

		//*xml, *xslt読み込み
		xmlDoc.async=false;
		xmlDoc.load("word_index_IBTJ_ver3.xml");
		xslDoc01.async=false;
		xslDoc01.load("definition.xsl");

	}
//	Show();
}

//XSLT辞書項目書式の適用
function onButtonClick(){
	var foundEntry;
	var btn = document.forms.forms.form_01.value;
	//ブラウザ判別
	if(!isIE){
		//Mozilla
		foundEntry=xslDoc01.getElementsByTagNameNS("http://www.w3.org/1999/XSL/Transform","apply-templates");
		foundEntry.item(0).setAttribute("select","TEI/data/entry[form/orth[contains(., '"+btn+"')]]");
		xslProc = new XSLTProcessor();
		xslProc.importStylesheet(xslDoc01);
		var fragment = xslProc.transformToFragment(xmlDoc, document);
		document.getElementById('output').innerHTML = "";
		document.getElementById('output').appendChild(fragment);
	}else{
		//Internet Explore
		foundEntry=xslDoc01.selectSingleNode("//xsl:apply-templates");
		foundEntry.setAttribute("select","TEI/data/entry[form/orth[contains(., '"+btn+"')]]");
		str = xmlDoc.transformNode(xslDoc01);
		output.innerHTML = str;
	}
//	Result();
}

function Result(){
	if(document.all){
		str = xmlObj.transformNode(xslObj01);
		output.innerHTML = str;
	}else{
		// Mozilla
		xslProc = new XSLTProcessor();
		xslProc.importStylesheet(xslObj01);
		var fragment = xslProc.transformToFragment(xmlObj, document);
		document.getElementById('output').innerHTML = "";
		document.getElementById('output').appendChild(fragment);
	}
}

function outPutLetters(){
        target = document.getElementById("word");
        target.innerText = document.forms.support.support_aa.value;
}
