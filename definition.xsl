<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html>
     <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta http-equiv="content-style-type" content="text/css" />
        <meta http-equiv="content-script-type" content="text/javascript" />
        <title><xsl:value-of select="TEI/teiHeader/fileDesc/titleStmt/title" /></title>
        <link rel="stylesheet" type="text/css" href="definition_web.css" />
      </head>
      <body class="inner">
        <div class="wrap">
          <!--  登録語彙の全情報  -->
          <div class="entry">
            <xsl:apply-templates select="TEI/data/entry" />
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <!--  見出し語書式  -->
  <xsl:template match="entry">
      <div ><font color="red"><xsl:value-of select="form/orth" /></font>[</font><xsl:value-of select="form/orth/@xml:lang" />]</div>
      <div class="sense">
	<xsl:value-of select="sense/def" />
      </div>
      <div class="source">
	<xsl:for-each select="source">
		(<i><xsl:value-of select="title" /></i>
		p.<xsl:value-of select="imprint/biblScope" />)
	</xsl:for-each>
      </div>
	<hr />
  </xsl:template>

 </xsl:stylesheet>
