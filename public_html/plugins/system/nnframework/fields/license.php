<?php
/**
 * Element: License
 * Displays the License state
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

class JFormFieldNN_License extends JFormField
{
	public $type = 'License';
	private $params = null;

	protected function getLabel()
	{
		return '';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		$extension = $this->get('extension');

		if (!strlen($extension))
		{
			return '';
		}

		// Import library dependencies
		require_once JPATH_PLUGINS . '/system/nnframework/helpers/licenses.php';
		$licenses = nnLicenses::getInstance();

		return $licenses->getMessage($extension);
	}

	private function get($val, $default = '')
	{
		return (isset($this->params[$val]) && (string) $this->params[$val] != '') ? (string) $this->params[$val] : $default;
	}
}

/* For backward compatibility */
if (!function_exists('NoNumber_License_outputState'))
{
	function NoNumber_License_outputState($extension)
	{
		require_once JPATH_PLUGINS . '/system/nnframework/helpers/licenses.php';
		$licenses = nnLicenses::getInstance();

		return $licenses->getMessage($extension);
	}
}
if (!function_exists('NoNumber_License_getState'))
{
	function NoNumber_License_getState($extension)
	{
		require_once JPATH_PLUGINS . '/system/nnframework/helpers/licenses.php';
		$licenses = nnLicenses::getInstance();

		return $licenses->getState($extension);
	}
}
