<?php
/**
* MathPublisher 1.8
* Joomla plugin
* allow usage of SyntaxHighlighter in WYSIWYG editor
* Usage: {mathpublisher size=14}FORMULA_STRING{/mathpublisher}
* Usage example: {mathpublisher}pi=sum{n=0}{+infty}{{(n!)^2 2^{n+1}}/{(2n+1)!}}{/mathpublisher}
* Copyright 2011, 2010 Ian Holden All rights reserved.
* This is a derivative work. Portions are copyright:
*     uses phpMathPublisher by Pascal Brachet from http://www.xm1math.net/phpmathpublisher/
*     Open Source Matters
* This work is licensed under the GNU/GPL license.
* This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
*/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

jimport( 'joomla.event.plugin' );


class plgContentMathPublisher extends JPlugin {
	
	const _tag="mathpublisher";
	
	private $regex; // set when we have initialised
	private $mp_inc_file=""; // the include file  location
	private $config_ok=0; // set 1 when we have initialised and config looks OK
	
	function plgContentMathPublisher( &$subject, $params ){
		parent::__construct( $subject, $params );
	}

	/**
	 * v1.6 prepare content method
	 *
	 * Method is called by the view
	 *
	 * @param	string	The context of the content being passed to the plugin.
	 * @param	object	The content object.  Note $article->text is also available
	 * @param	object	The content params
	 * @param	int		The 'page' number
	 * @since	1.6
	 */
	public function onContentPrepare($context, &$article, &$params, $limitstart)
	{
		return $this->onPrepareContent( $article, $params, $limitstart);
	}	
	
	// onPrepareContent 1.5 event handler. Replace all entries of {mathpublisher} tag and load necessary scripts
	function onPrepareContent( &$row, &$params=undef, $page=0 ) {
		global $dirfonts,$dirimg; // used by mathpublisher
		$regex = $this->_initialise();
		// register the regular expresstion to invoke our replacer in case Joomla finds the matches
		$row->text = preg_replace_callback( $regex, array($this,'replacer'), $row->text );
		return true;
	}
	
	// onBeforeDisplayComment event handler. Replace all entries of {mathpublisher} tag in jcomments and load necessary scripts
	function onBeforeDisplayComment( &$row ) {
		global $dirfonts,$dirimg; // used by mathpublisher
		$enabled=$this->params->def( 'enable_in_comments', '0');
		if ($enabled == '1'){
			$regex = $this->_initialise();
			$row->comment = preg_replace_callback( $regex, array($this,'replacer'), $row->comment );
		}
		return true;
	}
	
	function _initialise() {
		global $dirfonts,$dirimg,$mainframe; // used by mathpublisher
		
		if(!isset($this->regex)){
			// include the phpMathPublisher code

			$dirmp = get_plugin_dir();
			$dirimg=$dirmp."img";
			$dirfonts=$dirmp."fonts";
			$this->mp_inc_file = $dirmp."mathpublisher.php";
			if(file_exists($this->mp_inc_file)){
				include_once $this->mp_inc_file;
				if(file_exists($dirimg.DS."README") && file_exists($dirfonts.DS."FreeSerif.ttf")){
			   		$this->config_ok=1;
				}
			}
		
			$tag=self::_tag;
			$alternativetag=$this->params->def( 'alternativetag', '');
			if ($alternativetag!='')
			{
				$tag='('.$tag.'|'.$alternativetag.')'; 		
			}
			else
			{
				$tag='('.$tag.')';
			}
			$this->regex = "#{".$tag."(?:\s|&nbsp;)*(.*?)}([\s\S]*?){/\\1}#s";
		}
		return $this->regex;	
	}

	// Do the replacement work to replace {mathpublisher}{/mathpublisher} into the formula image
	// and include scripts as necessary
	private function replacer( &$matches ) {
		global $dirfonts,$dirimg; // used by mathpublisher
		
		$args = $matches[2];
		$size=14; // default size
		if (preg_match("/size\s*=\s*(\d+)/", $args, $arg_match)){
			$size = $arg_match[1];
		}
		$text = $matches[3];
		# make sure the string is url encoded. Some Joomla editors pass in the raw code points
		$text = fix_encoding(html_entity_decode($text)); # decode all html entities in string first.
		$text = htmlentities($text, ENT_COMPAT, 'UTF-8'); # encode again in UTF-8

		# now look for entities we want to process in a special way
		# euro not in ISO 8859-1 so use epsilon in formula
		$text = str_replace('&euro;','{epsilon}',$text);
		$text = str_replace('&#8364;','{epsilon}',$text);

		# use special tage for other code points that would otherwise become Greek characters
		$text = str_replace('&pound;','{pound}',$text);
		$text = str_replace('&#163;','{pound}',$text);
		
		$text = str_replace('&copy;','{copy}',$text);
		$text = str_replace('&#169;','{copy}',$text);
		
		$text = str_replace('&reg;','{reg}',$text);
		$text = str_replace('&#174;','{reg}',$text);
		
		$text = str_replace('&cent;','{cent}',$text);
		$text = str_replace('&#162;','{cent}',$text);
		
		$text = str_replace('&deg;','{deg}',$text);
		$text = str_replace('&#176;','{deg}',$text);
		
		# now decode html entities again ready for converting to image
		$text = fix_encoding(html_entity_decode($text)); # decode all html entities before converting to an image. e.g. &lt; => <
		# change quotes to {prime} so they don't cause problems and look OK in the formula
		$text = str_replace("'",'{prime}',$text);
		$text = str_replace('"','{prime}{prime}',$text);
		
		$joomla_url_root=$this->params->def( 'joomla_url_root', '');
		# clean up slashes and spaces around the path
		if (preg_match('/^[\/\s]*(.*?)[\/\s]*$/', $joomla_url_root, $arg_match)){
			$joomla_url_root=$arg_match[1];
			# add one leading slash UNLESS empty (joomla is in root)
			if ($joomla_url_root != '') $joomla_url_root = '/' . $joomla_url_root;
		}
		$color=$this->params->def( 'color', '#000000');
		$bg_color=$this->params->def( 'bg_color', '#ffffff');

		# override colours if they are on the mathpublisher tag
		if (preg_match("/^(?:.*[^_])?color\s*=\s*([^,\s]+)/", $args, $arg_match)){
			$color = $arg_match[1];
		}
		if (preg_match("/bg_color\s*=\s*([^,\s]+)/", $args, $arg_match)){
			$bg_color = $arg_match[1];
		}
		
		$vf = get_plugin_version_folder();
		if($vf != ''){
			$vf = '/'.$vf;
		}

		if($this->config_ok){
			$text = mathimage($text,$size, "$joomla_url_root/plugins/content$vf/mathpublisher/img/", $color, $bg_color);
		}else{
			$text = "$text<br />MathPublisher config error!<br />Chek your MathPublisher path configuration.<br />Expecting:<br />"
			."mathpublisher.php (lowercase) in '". $this->mp_inc_file."'<br />"
			."fonts in '". $dirfonts."'<br />"
			."images in '". $dirimg."'<br />"
			."image url '$joomla_url_root/plugins/content$vf/mathpublisher/img/*.png<br />";
		}
		return $text;
	}

}

// Fixes the encoding to uf8
function fix_encoding($in_str)
{
  #return $in_str; # utf8 seems to mess things up
	$cur_encoding = mb_detect_encoding($in_str) ;
	if($cur_encoding == "UTF-8" && mb_check_encoding($in_str,"UTF-8"))
    	return $in_str;
	else
    	return utf8_encode($in_str);
}

function get_plugin_dir(){
	$vf = get_plugin_version_folder();
	if ($vf != '') {
		$vf .= DS;
	}
	return JPATH_PLUGINS.DS.'content'.DS.$vf.'mathpublisher'.DS;
}

function get_plugin_version_folder(){
	
	$vf = '';
	jimport('joomla.version');
	$version = new JVersion();
	if ($version) {
		if (substr($version->getShortVersion(), 0, 3 ) >= '1.6') {
		$vf = 'MathPublisher';
		}
	}
	return $vf;
}

function get_file_dir() {
    global $argv;
    $dir = dirname(getcwd() . '/' . $argv[0]);
    $curDir = getcwd();
    chdir($dir);
    $dir = getcwd();
    chdir($curDir);
    return $dir;
}