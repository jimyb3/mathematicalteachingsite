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
.toolbar_fixed{position:fixed;left:1px;top:1px;width:100%;height:50px;background-color:rgba(163, 163, 163, 0.6);z-index:1001} 
.toolbar_fixed_inner{height:70px;style="height:100%;width:100%;"}
.toolbar_fixed_content{text-align:'.$params->get('align').';width:100%;margin-top:0px;padding-bottom:10px;margin-bottom:5px}
.toolbar_fixed_content a:hover{background:none!important}
.toolbar_fixed_content img{margin-right:'.$params->get('images_space').'px}
');	

echo '<div class="toolbar_fixed">
			<div class="toolbar_fixed_inner">
				<div class="toolbar_fixed_content">
				<script>
				
					function sizeControl(fontSize){
						
						var stoixeia=document.getElementsByClassName("article-size");
						var i;
						for(i=0; i<stoixeia.length; i++) {
    							stoixeia[i].style.fontSize = fontSize+"px";
						}
						
					}
					function lightsControl() {
						//an exei "sbhse ta fwta" dhladh einai se fwteino skin, to kanei skoteino
						if(document.getElementById("'.lightsOn.'")){
    						document.getElementById("'.lightsOn.'").src = "http://imathsite.net/images/lamp_OFF.png";
    						document.getElementById("'.lightsOn.'").id="lightsOff";
    						document.getElementById("'.container_inner.'").style.boxShadow="0px 0px 450px rgba(0, 0, 0, 1)";
    						var imagesLoader=document.getElementsByClassName("djslider-loader");
							var i;
							for(i=0; i<imagesLoader.length; i++) {
    							imagesLoader[i].style.boxShadow="0px 0px 0px rgba(0, 0, 0, 0)";
							}
							var sideMod=document.getElementsByClassName("well ");
							var i;
							for(i=0; i<sideMod.length; i++) {
    							sideMod[i].style.boxShadow="0px 0px 0px rgba(0, 0, 0, 0)";
							}
    						document.getElementById("'.container_inner.'").style.backgroundColor="#51504a";
    						document.body.style.color="#f1f1f1";
    						document.body.style.backgroundColor="rgb(67, 105, 109)";
    					/*var links = document.getElementsByTagName("a"); 
							for (var i = 0; i < links.length; i++) { 
							    links[i].setAttribute("style", "color: #f1f1f1"); 
									   
							}*/
    						//document.getElementById("'.hor_nav.'").style.backgroundImage = "url(http://www.imathsite.net/templates/pjo_zonada_free/images/menu/menu_bg_dark_skin.png)";
    			 			//document.getElementsByClassName("'.menu.'").style.backgroundImage = "url(http://www.imathsite.net/templates/pjo_zonada_free/images/menu/menu_bg_dark_skin.png)"			  						
						}else {
							//metabash apo skoteino skin se fwteino skin
							document.getElementById("'.lightsOff.'").src="http://imathsite.net/images/lamp_ON.png";	
							document.getElementById("'.lightsOff.'").id="lightsOn";	
							document.getElementById("'.container_inner.'").style.boxShadow="0px 0px 450px rgba(0, 0, 0, 1)";
							var imagesLoader=document.getElementsByClassName("djslider-loader");
							var i;
							for(i=0; i<imagesLoader.length; i++) {
    							imagesLoader[i].style.boxShadow="8px 12px 2px rgba(0, 0, 0, 0.298039)";
							}
							var sideMod=document.getElementsByClassName("well ");
							var i;
							for(i=0; i<sideMod.length; i++) {
    							sideMod[i].style.boxShadow="8px 12px 2px rgba(0, 0, 0, 0.3)";
							}
    						document.getElementById("'.container_inner.'").style.backgroundColor="rgb(226, 218, 153)";
    						document.body.style.color="#000000";
    						document.body.style.backgroundColor="rgb(115, 175, 182)";
    						/*var links =document.getElementsByTagName("a"); 
							for (var i = 0; i < links.length; i++) { 
							    links[i].setAttribute("style", "color: #cd2122"); 
									   
							}*/
						}
					}
					
				</script>
				';
				if ($params->get('img1')){
					echo'<img id="lightsOn" onclick="lightsControl()" cursor:"pointer" src="http://imathsite.net/images/lamp_ON.png" style="position: fixed;top:1px;width:50px;height:50px;cursor:pointer;"/>';
					
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