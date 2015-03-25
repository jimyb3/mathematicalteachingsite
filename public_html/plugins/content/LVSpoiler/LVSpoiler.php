<?php
/**
 * @version        1.0.6 from Arkadiy Sedelnikov
 * @copyright    Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license        GNU General Public License version 2 or later;
 */

// No direct access to this file
defined('_JEXEC') or die();

jimport('joomla.plugin.plugin');

class plgContentLVSpoiler extends JPlugin
{
    public function onPrepareContent(&$article, &$params, $limitstart = 0)
    {
        $article->text = $this->prepare($article->text);
    }

    public function onContentPrepare($context, &$row, &$params, $page = 0)
    {
        // Danger, Will Robinson! $row in Joomla! 1.6/1.7 may be a string, not an article object!
        if (is_object($row)) {
            return $this->onPrepareContent($row, $params, $page);
        } else {
            $row = $this->prepare($row);
        }

        return true;
    }

    private function prepare($text)
    {
        $regex = "#{spoiler(?: title=(([_0-9A-Za-zА-яа-яЁё](.*?)))?)?[\s|&nbsp;]opened=([0-9](.*?))}(.*?){/spoiler}#s";
        $text = preg_replace_callback($regex, array($this, 'LVSpoiler_replacer'), $text);
        return $text;
    }

    private function getJVersion(){
        if (version_compare(JVERSION, '1.7.0', 'ge')) {
            $version = '1.7'; // Joomla! 1.7 code here
        } elseif (version_compare(JVERSION, '1.6.0', 'ge')) {
            $version = '1.6'; // Joomla! 1.6 code here
        } else {
            $version = '1.5'; // Joomla! 1.5 code here
        }
        return $version;
    }

    private function LVSpoiler_css($version = '1.7')
    {
        $plugin = & JPluginHelper::getPlugin('content', 'LVSpoiler');

        if ($version == '1.5') {
            $pathToPlugin = JURI::base() . 'plugins/content/';
            $pluginParams = new JParameter($plugin->params);
        }
        else {
            $pathToPlugin = JURI::base() . 'plugins/content/LVSpoiler/';
            $pluginParams = new JRegistry($plugin->params);
        }

        $lang = JFactory::getLanguage();
        $lang->load('plg_content_LVSpoiler', JPATH_ADMINISTRATOR);
        $jsjquery = $pluginParams->get('jsjquery', 1);
        $jsshow = $pluginParams->get('jsshow', 1);
        $jstype = $pluginParams->get('jstype', 1);
        $cssload = $pluginParams->get('cssload', 1);

        $titlesize = $pluginParams->get('titlesize', 18);
        $titlecolor = $pluginParams->get('titlecolor', '008aeb');
        $titlebordersize = $pluginParams->get('titlebordersize', 0);
        $titlebordercolor = $pluginParams->get('titlebordercolor', 'ccc');
        $titlestyle = $pluginParams->get('titlestyle', 'normal');
        $titleborderstyle = $pluginParams->get('titleborderstyle', 'solid');

        $titleborderradius = $pluginParams->get('titleborderradius', '8');
        $titlewidth = $pluginParams->get('titlewidth', '95%');
        $titlebgcolor = $pluginParams->get('titlebgcolor', 'ff5c00');
        $textShadow = $pluginParams->get('textshadow', 1);
        $boxShadow = $pluginParams->get('boxshadow', 1);
        $boxshadowvalue = $pluginParams->get('boxshadowvalue', '0 0 5px rgba(0,0,0,0.6)');
        $texthadowvalue = $pluginParams->get('texthadowvalue', '0 -1px 1px rgba(0,0,0,0.25)');
        $fontfamily = $pluginParams->get('fontfamily', '');

        $spoilerfontsize = $pluginParams->get('spoilerfontsize', 11);
        $spoilerfontweight = $pluginParams->get('spoilerfontweight', 'normal');
        $spoilerbg = $pluginParams->get('spoilerbg', 'FFFDDD');
        $spoilerbordersize = $pluginParams->get('spoilerbordersize', 1);
        $spoilerbordercolor = $pluginParams->get('spoilerbordercolor', 'ccc');
        $spoilerborderstyle = $pluginParams->get('spoilerborderstyle', 'solid');
        $spoilerborderradius = $pluginParams->get('spoilerborderradius', 7);
        $spoilerwidth = $pluginParams->get('spoilerwidth', '95%');
        $spoilerstyle = $pluginParams->get('spoilerstyle', 'italic');
        $spoilerpadding = $pluginParams->get('spoilerpadding', 10);
        $revealtype = $pluginParams->get('revealtype', 'click');
        $mouseoverdelay = $pluginParams->get('mouseoverdelay', 200);
        $collapseprev = $pluginParams->get('collapseprev', 0);
        $onemustopen = $pluginParams->get('onemustopen', 0);
        $animatedefault = $pluginParams->get('animatedefault', 0);
        $animatespeed = $pluginParams->get('animatespeed', 400);
        $togglehtml = $pluginParams->get('togglehtml', 'none');
        if ($togglehtml == 'none') {
            $togglehtml1 = '';
            $togglehtml2 = '';
        } else {
            $togglehtml1 = $pluginParams->get('togglehtml1', '');
            $togglehtml2 = $pluginParams->get('togglehtml2', '');
        }
        $document = & JFactory::getDocument();

        if (($jstype == 1) && $this->includeOnce('Spoiler_Mootools')) {
            $revealtype = ($revealtype == 'clickgo') ? 'click' : $revealtype;
            
            $jscode = '
                        var pb_sp_conf = {
                            revealtype: "' . $revealtype . '",
                            mouseoverdelay: ' . $mouseoverdelay . ',
                            collapseprev: ' . $collapseprev . ',
                            onemustopen: ' . $onemustopen . ',
                            animatedefault: ' . $animatedefault . ',
                            animatespeed: ' . $animatespeed . '
                        };';
            $document->addScriptDeclaration($jscode);
            
            JHTML::_('behavior.mootools');
            $document->addScript($pathToPlugin . 'LVSpoiler/mootools/spoiler.js');
            if ($cssload == 1) {
                $document->addStyleSheet($pathToPlugin . 'LVSpoiler/mootools/spoiler.css');
            }
            $css = '
    .sp-head-click a{font-size: ' . $titlesize . 'px; font-style: ' . $titlestyle . '; color: #' . $titlecolor . ' !important; }
	.sp-head{border: ' . $titlebordersize . 'px #' . $titlebordercolor . ' ' . $titleborderstyle . '; font-weight: bold;
            -webkit-border-radius: ' . $titleborderradius . 'px;
            -moz-border-radius: ' . $titleborderradius . 'px;
            -khtml-border-radius: ' . $titleborderradius . 'px;
            border-radius: ' . $titleborderradius . 'px;
            width: ' . $titlewidth . ';
            background-color: #' . $titlebgcolor . ';
            ';
        if($textShadow == 1){
            $css .= 'text-shadow: '.$texthadowvalue.';';
        }
            
        if(!empty($fontfamily)){
            $css .= 'font-family: '.$fontfamily.';';
        }
            
        if($boxShadow == 1){
            $css .= '
            box-shadow: '.$boxshadowvalue.';
            -moz-box-shadow: '.$boxshadowvalue.';
	        -webkit-box-shadow: '.$boxshadowvalue.';
	        ';
        }
            
        $css .= '}
	.sp-body{font-size: ' . $spoilerfontsize . 'px; font-weight: ' . $spoilerfontweight . '; background: #' . $spoilerbg . '; border: ' . $spoilerbordersize . 'px #' . $spoilerbordercolor . ' ' . $spoilerborderstyle . '; 
	-webkit-border-radius: ' . $spoilerborderradius . 'px;
	-moz-border-radius: ' . $spoilerborderradius . 'px;
	-khtml-border-radius: ' . $spoilerborderradius . 'px;
	border-radius: ' . $spoilerborderradius . 'px;
	width: ' . $spoilerwidth . ';
	font-style: ' . $spoilerstyle . ';
	padding: ' . $spoilerpadding . 'px}	
	';


        $document->addStyleDeclaration($css);
            
        }
        if (($jstype == 2) && $this->includeOnce('Spoiler_Jquery')) {
            
            $jscode = '
		ddaccordion.init({
		headerclass: "technology",
		contentclass: "thelanguage",
		revealtype: "' . $revealtype . '",
		mouseoverdelay: ' . $mouseoverdelay . ',
		collapseprev: ' . $collapseprev . ',
		defaultexpanded: [],
		onemustopen: ' . $onemustopen . ',
		animatedefault: ' . $animatedefault . ',
		toggleclass: ["closedlanguage", "openlanguage"],
		togglehtml: ["' . $togglehtml . '", "' . $togglehtml1 . '", "' . $togglehtml2 . '"],
		animatespeed: "' . $animatespeed . '",
		oninit:function(expandedindices){
			//do nothing
		},
		onopenclose:function(header, index, state, isuseractivated){
			//do nothing
		}
	});';
            $document->addScriptDeclaration($jscode);

            if ($jsjquery == 1) {
                $document->addScript($pathToPlugin . 'LVSpoiler/jquery/jquery.js');
            }
            $document->addScript($pathToPlugin . 'LVSpoiler/jquery/ddaccordion.js');
            $css = '
    .technology div{font-size: ' . $titlesize . 'px; color: #' . $titlecolor . '; font-style: ' . $titlestyle . ';border: ' . $titlebordersize . 'px #' . $titlebordercolor . ' ' . $titleborderstyle . '; font-weight: bold;
        -webkit-border-radius: ' . $titleborderradius . 'px;
        -moz-border-radius: ' . $titleborderradius . 'px;
        -khtml-border-radius: ' . $titleborderradius . 'px;
        border-radius: ' . $titleborderradius . 'px;
        width: ' . $titlewidth . ';
        background-color: #' . $titlebgcolor . ';
    ';
        if($textShadow == 1){
            $css .= 'text-shadow: '.$texthadowvalue.';';
        }
            
        if(!empty($fontfamily)){
            $css .= 'font-family: '.$fontfamily.';';
        }

        if($boxShadow == 1){
            $css .= '
            box-shadow: '.$boxshadowvalue.';
            -moz-box-shadow: '.$boxshadowvalue.';
	        -webkit-box-shadow: '.$boxshadowvalue.';
	        ';
        }
            
        $css .= '}
        
	.thetextinter{font-size: ' . $spoilerfontsize . 'px; font-weight: ' . $spoilerfontweight . '; background: #' . $spoilerbg . '; border: ' . $spoilerbordersize . 'px #' . $spoilerbordercolor . ' ' . $spoilerborderstyle . '; 
	-webkit-border-radius: ' . $spoilerborderradius . 'px;
	-moz-border-radius: ' . $spoilerborderradius . 'px;
	-khtml-border-radius: ' . $spoilerborderradius . 'px;
	border-radius: ' . $spoilerborderradius . 'px;
	width: ' . $spoilerwidth . ';
	font-style: ' . $spoilerstyle . ';
	padding: ' . $spoilerpadding . 'px}	
	';
            $document->addStyleDeclaration($css);
            if ($cssload == 1) {
                $document->addStyleSheet($pathToPlugin . 'LVSpoiler/jquery/style.css');
            }
        }
    }

    private function LVSpoiler_replacer(&$matches)
    {
        $plugin = & JPluginHelper::getPlugin('content', 'LVSpoiler');
        $version = $this->getJVersion();
        $this->LVSpoiler_css($version);

        if ($version == '1.5') {
            $pluginParams = new JParameter($plugin->params);
        }
        else {
            $pluginParams = new JRegistry($plugin->params);
        }

        //нумерация каждого спойлера (если нужно)
        global $numspoilers;
        if (!$numspoilers) {
            $numspoilers = 1;
        } else {
            $numspoilers++;
        }

        $jstype = $pluginParams->get('jstype', 1);
        $load_img = $pluginParams->get('load_img', 0);
        $revealtype = $pluginParams->get('revealtype', '');
        $opened = $matches[4];

        $html = '';
        $regex1 = "#{spoiler title=([_0-9A-Za-zА-яа-яЁё](.*?))}#s";
        $regex2 = "#{/spoiler}#s";
        $spoilertext = preg_replace($regex2, '', (preg_replace($regex1, '', $matches[0])));

        //обработка изображений если установлена загрузка после открытия спойлера
        if ($load_img == 1 && $opened != 1) {
            $search = array("src=", "src =", "src  =");
            $replace = 'src="#" class="spoilerimage" data_src=';
            $spoilertext = str_replace($search, $replace, $spoilertext);
        }

        switch ($jstype) {
            case '1'; //mootools

                $fold_class = ($opened == 1) ? 'unfolded' : 'folded';

                $url = 'javascript:void(0)';

                if ($revealtype == 'clickgo') {
                    $uri = & JURI::getInstance();
                    $base = $uri->toString(array('scheme', 'host', 'port'));
                    $url = $base . $_SERVER['REQUEST_URI'] . '#spoiler_' . $numspoilers;

                    //якорь к которому будет отсылать спойлер при нажатии
                    $html .= '<a name="spoiler_' . $numspoilers . '"></a>';
                }
                $html .= '<div class="spoiler" id="' . $numspoilers . '_spoiler">
                        <input type="hidden" class="opened" value="' . $opened . '">
			<div class="sp-head ' . $fold_class . '" id="' . $numspoilers . '-sp-head">
			<div class="sp-head-click" id="' . $numspoilers . '-sp-head-click"><a href="' . $url . '">' . $matches[1] . '</a></div></div>
			<div class="sp-body" id="' . $numspoilers . '-sp-body">' . $spoilertext . '</div>
			</div>';
                break;
            case '2'; //jquery
                $html .= '<div  id="spoiler_' . $numspoilers . '" class="technology"><div>' . $matches[1] . '</div></div><div class="thelanguage"><input type="hidden" class="opened" value="' . $opened . '"><div class="thetextinter">' . $spoilertext . '</div></div>';
                break;
        }
        return $html;
    }

    private function includeOnce($name)
    {
        if (!defined($name)) {
            define($name, true);
            return true;
        }
        return false;
    }

}

?>