<?php
/*---------------------------------------------------------
# Toolbar - Joomla! Module
# ---------------------------------------------------------
# For Joomla! 2.5.x & Joomla! 3.1.x
# Copyright (C) 2013 Joomla357.com. All rights reserved.
# License: GNU/GPLv3, http://www.gnu.org/licenses/gpl-3.0.html
# Demo: http://www.joola357.com/demo/
# Website: http://www.joola357.com
# Support: support@joola357.com
----------------------------------------------------------- */ 

defined( '_JEXEC' ) or die( 'Restricted access' );

// Add styles
$document = JFactory::getDocument();
$document->addStyleDeclaration('body{margin-bottom:65px!important} 
.toolbar_fixed{position:fixed;left:1px;top:1px;width:100%} 
.toolbar_fixed_inner{height:70px;style="height:100%;width:100%;background:url(http://test1forprojectmatimaticasite.comule.com/images/topMenuBody2.png)}
.toolbar_fixed_content{text-align:'.$params->get('align').';width:100%;margin-top:0px;padding-bottom:10px;margin-bottom:5px}
.toolbar_fixed_content a:hover{background:none!important}
.toolbar_fixed_content img{margin-right:'.$params->get('images_space').'px}
');	

echo '<div class="toolbar_fixed">
			<div class="toolbar_fixed_inner">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
  					<tbody><tr> 
    					<td align="left" valign="top"><img src="http://test1forprojectmatimaticasite.comule.com/images/topMenuLeft.png" width="50" height="100" style="border-radius:0px"></td>
						<td align="right" valign="top"><img src="http://test1forprojectmatimaticasite.comule.com/images/topMenuRight3.png" width="51" height="100" style="border-radius:0px"></td>
					</tr>
				</tbody></table>
				<div class="toolbar_fixed_content">
				';
				if ($params->get('img1')){
					echo '<a href="'.$params->get('link1').'" target="'.$params->get('target').'"><img src="'.$params->get('img1').'" <img src="http://test1forprojectmatimaticasite.comule.com/images/ligths_off.png" <img src="http://test1forprojectmatimaticasite.comule.com/images/ligths_off.png" style="position: fixed;top:1px"/></a>';
				}
				if ($params->get('img2')){
					echo '<a href="'.$params->get('link2').'" target="'.$params->get('target').'"><img src="'.$params->get('img2').'" /></a>';
				}
				if ($params->get('img3')){
					echo '<a href="'.$params->get('link3').'" target="'.$params->get('target').'"><img src="'.$params->get('img3').'" /></a>';
				}
				if ($params->get('img4')){
					echo '<a href="'.$params->get('link4').'" target="'.$params->get('target').'"><img src="'.$params->get('img4').'" /></a>';
				}
				if ($params->get('img5')){
					echo '<a href="'.$params->get('link5').'" target="'.$params->get('target').'"><img src="'.$params->get('img5').'" /></a>';
				}
				if ($params->get('img6')){
					echo '<a href="'.$params->get('link6').'" target="'.$params->get('target').'"><img src="'.$params->get('img6').'" /></a>';
				}
				if ($params->get('img7')){
					echo '<a href="'.$params->get('link7').'" target="'.$params->get('target').'"><img src="'.$params->get('img7').'" /></a>';
				}
				if ($params->get('img8')){
					echo '<a href="'.$params->get('link8').'" target="'.$params->get('target').'"><img src="'.$params->get('img8').'" /></a>';
				}
				if ($params->get('img9')){
					echo '<a href="'.$params->get('link9').'" target="'.$params->get('target').'"><img src="'.$params->get('img9').'" /></a>';
				}
				if ($params->get('img10')){
					echo '<a href="'.$params->get('link10').'" target="'.$params->get('target').'"><img src="'.$params->get('img10').'" /></a>';
				}
				if ($params->get('html')){
					echo $params->get('html');
				}	
			
			echo '</div>
			</div>
		</div>';
?>