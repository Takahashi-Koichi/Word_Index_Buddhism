var xmlObj;
var xslObj01;
var xslObj02;
var xslProc;
var str="";

function Init(){
	//ブラウザ判別
	if(document.all){
		//Internet Explorer
		xmlObj=new ActiveXObject("MSXML2.DOMDocument");
		xslObj01=new ActiveXObject("MSXML2.DOMDocument");
//		xslObj02=new ActiveXObject("MSXML2.DOMDocument");
	}else{
		// Mozilla
		xmlObj = document.implementation.createDocument("", "", null);
		xslObj01 = document.implementation.createDocument("", "", null);
//		xslObj02 = document.implementation.createDocument("", "", null);
	}
	//*xml, *xslt読み込み
	xmlObj.async=false;
	xmlObj.load("word_index_IBTJ_ver3.xml");
	xslObj01.async=false;
	xslObj01.load("definition.xsl");
	//表示
//	Show();
}

//function onButtonClick() {
//        target = document.getElementById("output");
//        target.innerText = document.forms.forms.form_01.value;
//      }

//XSLT辞書項目書式の適用
//function onButtonClick(){
//        target = document.getElementById("output");
//	//ブラウザ判別
//	if(document.all){
//		//Internet Explore
//		foundEntry=xslObj01.selectSingleNode("//xsl:apply-templates");
//		foundEntry.setAttribute("select","TEI/data/entry[form/orth='"+target+"']");
//	}else{
//		//Mozilla
//		foundEntry=xslObj02.getElementsByTagName("xsl:apply-templates");
//		foundEntry.item(0).setAttribute("select","TEI/data/entry[form/orth='"+target+"']");
//	}
//	Result();
//}



//XSLT辞書項目書式の適用
function onButtonClick(){
	var foundEntry;
	var btn = document.forms.forms.form_01.value;
	//ブラウザ判別
	if(document.all){
		//Internet Explore
		foundEntry=xslObj01.selectSingleNode("//xsl:apply-templates");
		foundEntry.setAttribute("select","TEI/data/entry[form/orth[contains(., '"+btn+"')]]");
	}else{
		//Mozilla
		foundEntry=xslObj01.getElementsByTagName("xsl:apply-templates");
		foundEntry.item(0).setAttribute("select","TEI/data/entry[form/orth[contains(., '"+btn+"')]]");
	}
	Result();
}

//function Show(){
//	if(document.all){
//		//Internet Explorer
//		str = xmlObj.transformNode(xslObj01);
//		output.innerHTML = str;
//	}else{
//		// Mozilla
//		xslProc = new XSLTProcessor();
//		xslProc.importStylesheet(xslObj01);
//		var fragment = xslProc.transformToFragment(xmlObj, document);//
//		document.getElementById('output').innerHTML = "";
//		document.getElementById('output').appendChild(fragment);
//	}
//}

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
