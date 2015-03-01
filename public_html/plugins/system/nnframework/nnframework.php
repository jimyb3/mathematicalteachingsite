<?php
/**
 * Main Plugin File
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

if (JFactory::getApplication()->isAdmin())
{
	// load the NoNumber Framework language file
	require_once JPATH_PLUGINS . '/system/nnframework/helpers/functions.php';
	nnFrameworkFunctions::loadLanguage('plg_system_nnframework');
}

/**
 * Plugin that loads Framework
 */
class plgSystemNNFramework extends JPlugin
{
	public function onAfterRoute()
	{
		$this->loadSearchHelper();

		if (JFactory::getApplication()->isAdmin() && JFactory::getApplication()->getTemplate() == 'adminpraise3')
		{
			JHtml::stylesheet('nnframework/ap3.min.css', false, true);
		}

		if (!JFactory::getApplication()->input->getInt('nn_qp', 0))
		{
			return;
		}

		// Include the Helper
		require_once JPATH_PLUGINS . '/system/nnframework/helper.php';
		$helper = new plgSystemNNFrameworkHelper;

		$helper->render();
	}

	function loadSearchHelper()
	{
		// Only in frontend search component view
		if (!JFactory::getApplication()->isSite() || JFactory::getApplication()->input->get('option') != 'com_search')
		{
			return;
		}

		$classes = get_declared_classes();

		if (in_array('SearchModelSearch', $classes) || in_array('searchmodelsearch', $classes))
		{
			return;
		}

		require_once JPATH_PLUGINS . '/system/nnframework/helpers/search.php';
	}
}
