<?xml version="1.0" encoding="UTF-8"?>
<html xsl:version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">
    <xsl:for-each select="products/product">
      <div>
        <div style="background-color:teal;color:white;padding:4px">
          <span style="font-weight:bold">
            <xsl:value-of select="name"/>
          </span>
        </div>
        <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
          <p>
            <xsl:value-of select="price"/>
            <span style="font-style:italic">
              <xsl:value-of select="priceCurrency"/>
            </span>
          </p>
        </div>
        comments:
        <xsl:for-each select="comments/comment">
          <div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
            <p>
              <xsl:value-of select="name"></xsl:value-of>
              <span style="font-style:italic;padding:5px;background-color:#bfbfbf;">
                <xsl:value-of select="content"></xsl:value-of>
              </span>
            </p>
          </div>
        </xsl:for-each>
      </div>
    </xsl:for-each>
  </body>
</html>