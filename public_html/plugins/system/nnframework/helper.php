<?php
/**
 * Plugin Helper File
 *
 * @package         NoNumber Framework
 * @version         15.1.1
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2015 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

require_once JPATH_PLUGINS . '/system/nnframework/helpers/functions.php';

/**
 * Helper NoNumber Quick Page stuf (nn_qp=1 in url)
 */
class plgSystemNNFrameworkHelper
{
	function render()
	{
		$url = JFactory::getApplication()->input->getString('url', '');

		$func = new nnFrameworkFunctions;

		if ($url)
		{
			echo $func->getByUrl($url);

			die;
		}

		$allowed = array(
			'administrator/components/com_dbreplacer/dbreplacer.inc.php',
			'administrator/components/com_nonumbermanager/details.inc.php',
			'administrator/modules/mod_addtomenu/addtomenu.inc.php',
			'media/rereplacer/images/image.inc.php',
			'plugins/editors-xtd/articlesanywhere/articlesanywhere.inc.php',
			'plugins/editors-xtd/contenttemplater/contenttemplater.inc.php',
			'plugins/editors-xtd/dummycontent/dummycontent.inc.php',
			'plugins/editors-xtd/modulesanywhere/modulesanywhere.inc.php',
			'plugins/editors-xtd/snippets/snippets.inc.php',
			'plugins/editors-xtd/sourcerer/sourcerer.inc.php'
		);

		$file = JFactory::getApplication()->input->getString('file', '');
		$folder = JFactory::getApplication()->input->getString('folder', '');

		if ($folder)
		{
			$file = implode('/', explode('.', $folder)) . '/' . $file;
		}

		if (!$file || in_array($file, $allowed) === false)
		{
			die;
		}

		jimport('joomla.filesystem.file');

		if (JFactory::getApplication()->isSite() && !JFactory::getApplication()->input->get('usetemplate'))
		{
			JFactory::getApplication()->setTemplate('../administrator/templates/bluestork');
		}

		$_REQUEST['tmpl'] = 'component';
		JFactory::getApplication()->input->set('option', '1');

		header('Content-Type: text/html; charset=utf-8');

		JFactory::getDocument()->addStyleSheet(JURI::root(true) . '/administrator/templates/bluestork/css/template.css');

		JFactory::getApplication()->set('_messageQueue', '');

		$file = JPATH_SITE . '/' . $file;

		$html = '';
		if (JFile::exists($file))
		{
			ob_start();
			include $file;
			$html = ob_get_contents();
			ob_end_clean();
		}

		JFactory::getDocument()->setBuffer($html, 'component');

		JFactory::getApplication()->render();

		$html = JResponse::toString(JFactory::getApplication()->getCfg('gzip'));
		$html = preg_replace('#\s*<' . 'link [^>]*href="[^"]*templates/system/[^"]*\.css[^"]*"[^>]* />#s', '', $html);
		$html = preg_replace('#(<' . 'body [^>]*class=")#s', '\1nnpopup ', $html);
		$html = str_replace('<' . 'body>', '<' . 'body class="nnpopup"', $html);

		echo $html;

		die;
	}
}
