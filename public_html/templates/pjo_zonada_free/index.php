<?php
/*
# Copyright (C) 2013  Pickjoomla.com  All Rights Reserved.    
# license - PHP files are licensed under  GNU/GPL V2                           
# license - CSS - JS files are Copyrighted material  
# license - Slideshow Images are used only for the demo and are Copyrighted Material  
# Website: http://www.Pickjoomla.com                                             
*/
defined('_JEXEC') or die;
if(!defined('DS'))
{
define( 'DS', DIRECTORY_SEPARATOR );
}
?>
<meta property="fb:admins" content="100000596641380" />
<?php
JLoader::import('joomla.filesystem.file');
define( 'YOURBASEPATH', dirname(__FILE__) );
require(YOURBASEPATH . DS . "includes/var.php");
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">

<head>

<jdoc:include type="head" />
<?php
require(YOURBASEPATH . DS . "includes/ict_slide_load.php");
require(YOURBASEPATH . DS . "includes/css_style.php");
require(YOURBASEPATH . DS . "includes/css3_style.php");
?>

<link rel="stylesheet" type="text/css" href="templates/pjo_zonada_free/css/jsxgraph.css" />
<link rel="stylesheet" type="text/css" href="templates/pjo_zonada_free/css/matrixFunctionsArticle.css" />
<script type="text/javascript" src="/templates/pjo_zonada_free/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/javascript" src="/templates/pjo_zonada_free/jsxgraphcore.js"></script>
<script type="text/javascript" src="/templates/pjo_zonada_free/js/d3.v2.min.js"></script>
<script type="text/javascript" src="/templates/pjo_zonada_free/js/chance.js"></script>

<script src="/templates/pjo_zonada_free/js/jquery.js" type="text/javascript"></script>
<script src="/templates/pjo_zonada_free/js/modernizr.js" type="text/javascript"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63050559-1', 'auto');
  ga('send', 'pageview');

</script>
</head>

<body class="site <?php echo $option . " view-" . $view . " layout-" . $layout . " task-" . $task . " itemid-" . $itemid . " ";?> <?php if ($this->params->get('fluidContainer')) { echo "fluid"; } ?>">
<!-- Body -->
<div class="body">
<div class="container<?php if ($this->params->get('fluidContainer')) { echo "-fluid"; } ?>">

<!-- ///////////////// START extra CONTAINER INNER div ////////////////// -->
<!-- //////////////////////////////////////////////////////////////////// -->
<div id="container_inner">

<!-- ///////////////// START HEADER ////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<div class="header">
<div class="header-inner">

<!-- ///////////////// START HEADER TOP ////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<div id="header-top">

<!-- ///////////////// START PATHWAY ////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<?php if ($this->countModules('pathway')) : ?>
<div id="pathway">
<jdoc:include type="modules" name="pathway" style="none" />
</div>
<?php endif; ?>
<!-- /////////////////  END PATHWAY  ////////////////// -->
<!-- //////////////////////////////////////////////////// -->

<!-- ///////////////// START SOCIAL MEDIA ////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<?php 
require(YOURBASEPATH . DS . "includes/socialmedia.php");
?>
<!-- ///////////////// END SOCIAL MEDIA ////////////////// -->
<!-- //////////////////////////////////////////////////// -->

</div>
<!-- ///////////////// END HEADER TOP ////////////////// -->
<!-- //////////////////////////////////////////////////// -->

<a class="brand" href="<?php echo $this->baseurl; ?>">
<?php echo $logo;?> 
<?php if ($this->params->get('sitedescription'))
{ 
echo '<div class="site-description">'. htmlspecialchars($this->params->get('sitedescription')) .'</div>'; 
} 
?>
</a>
<div class="header-search pull-right">
<jdoc:include type="modules" name="search" style="none" />
</div>
<div class="clearfix"></div>

</div>
</div>
<!-- ///////////////// END HEADER ////////////////// -->
<!-- //////////////////////////////////////////////////// -->

<!-- ///////////////////// START HOR MENU /////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<div id="hor_nav"><?php echo $top_hornav; ?></div>
<div class="clearfix"></div>
<div id="all_in">
<?php if ($mod_right) { ?>

<div id="aside" class="span3" style="float: right;width: 270px;">

<jdoc:include type="modules" name="right" style="well" />
<a href="http://www.teicm.gr/"><img src="http://imathsite.net/images/LogoBanner/teicmLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://noether.math.uoa.gr/"><img src="http://imathsite.net/images/LogoBanner/athensLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.math.auth.gr/"><img src="http://imathsite.net/images/LogoBanner/aristoLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://fourier.math.uoc.gr/~mathweb/"><img src="http://imathsite.net/images/LogoBanner/creteLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.math.upatras.gr/"><img src="http://imathsite.net/images/LogoBanner/patraLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.math.aegean.gr/"><img src="http://imathsite.net/images/LogoBanner/aigeouLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.hms.gr/"><img src="http://imathsite.net/images/LogoBanner/hellenicMathComLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.cms.org.cy/"><img src="http://imathsite.net/images/LogoBanner/cyprusMathCompLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.euro-math-soc.eu/"><img src="http://imathsite.net/images/LogoBanner/emsLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.ams.org/home/page"><img src="http://imathsite.net/images/LogoBanner/amsLogoBanner.png" style="padding-bottom: 10px;"></a>
<a href="http://www.lms.ac.uk/"><img src="http://imathsite.net/images/LogoBanner/lmsLogoBanner.png" style="padding-bottom: 10px;"></a>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- firstAd -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3031287159742602"
     data-ad-slot="1374724773"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<?php } ?>

<jdoc:include type="modules" name="banner" style="xhtml" />
</div>
<div class="row-fluid">

<!-- ///////////////////// START LEFT COLUMN ///////////// -->
<!-- //////////////////////////////////////////////////// -->

<?php if ($mod_left) { ?>
<div id="sidebar" class="span3">
<div class="sidebar-nav">
<jdoc:include type="modules" name="left" style="well" />
</div>
</div>
<?php } ?>
<!-- ///////////////////// END LEFT COLUMN ///////////// -->
<!-- //////////////////////////////////////////////////// -->

<!-- ///////////////// START CONTENT ////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<div id="content" class="<?php echo $span;?>">
<jdoc:include type="message" />

<!-- ///////////////// START SLIDESHOW ////////////////// -->
<?php
if ($menu->getActive() == $menu->getDefault()) 
{
require(YOURBASEPATH . DS . "includes/ict_slideshow.php");
}
?>
<!-- ///////////////// END SLIDESHOW ///////////////////// -->

<?php if ($this->countModules('tabs')): ?>
<jdoc:include type="modules" name="tabs" style="none"/>
<?php endif; ?>

<!-- //////////////// START COMPONENT /////////////////// -->
<?php if ($ict_frontpage == "yes") { ?>
<jdoc:include type="component" />
<?php } ?>

<!-- //////////////// END COMPONENT /////////////////// -->
</div>
<!-- ///////////////// END CONTENT ////////////////// -->
<!-- //////////////////////////////////////////////////// -->

<!-- ///////////////////// START RIGHT COLUMN ///////////// -->
<!-- //////////////////////////////////////////////////// 
<?php if ($mod_right) { ?>
<div id="aside" class="span3">
<jdoc:include type="modules" name="right" style="well" />
</div>
<?php } ?>-->

</div>

<!-- ///////////////////// END RIGHT COLUMN ///////////// -->
<!-- //////////////////////////////////////////////////// -->

<?php if ($this->countModules('shownews')): ?>
<jdoc:include type="modules" name="shownews" style="well"/>
<?php endif; ?>

<!-- start footer 960px -->
<!-- ///////////////// START BOTTOM MODULES ////////////////// -->
<?php if ($this->countModules('bottom1 + bottom2 + bottom3 + bottom4')) { ?>
<div id="footer_inner" class="row">

<div class="<?php echo $footerspan;?>">
<jdoc:include type="modules" name="bottom1" style="well" />
</div>
<div class="<?php echo $footerspan;?>">
<jdoc:include type="modules" name="bottom2" style="well" />
</div>
<div class="<?php echo $footerspan;?>">
<jdoc:include type="modules" name="bottom3" style="well" />
</div>
<div class="<?php echo $footerspan;?>">
<jdoc:include type="modules" name="bottom4" style="well" />
</div>

</div>
<?php } ?>
<!-- END BOTTOM MODULES -->
<!-- end footer 960px -->

</div>
<!-- ///////////////// END extra CONTAINER INNER div //////////////////// -->
<!-- //////////////////////////////////////////////////////////////////// -->

</div>
</div>

<!-- ///////////////// START FOOTER ////////////////// -->
<!-- ///////////////////////////////////////////////// -->
<div class="footer">
<div class="container<?php if ($this->params->get('fluidContainer')) { echo "-fluid"; } ?>"> 

<!-- start footer 100% -->
<!-- end footer 100% -->

<hr />
<jdoc:include type="modules" name="footer" style="none" />
<p class="pull-right"><a href="#top" id="back-top"><?php echo JText::_('TPL_BACKTOTOP'); ?></a></p>
<p>&copy; <?php echo $sitename; ?> <?php echo date('Y');?><br>Style created by jimyb3 and ioanna65.<br>Original style by <a href="http://www.pickjoomla.com">Pickjoomla.com</a></p>
</div> 
</div>
<!-- ///////////////// END FOOTTR////////////////// -->
<!-- ////////////////////////////////////////////// -->

<jdoc:include type="modules" name="debug" style="none" />


</body>
</html>
