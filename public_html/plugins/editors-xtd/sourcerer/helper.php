<?php
/**
 * Plugin Helper File
 *
 * @package         Sourcerer
 * @version         4.4.8
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2015 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

/**
 * Plugin that places the Button
 */
class plgButtonSourcererHelper
{
	public function __construct(&$params)
	{
		$this->params = $params;
	}

	/**
	 * Display the button
	 *
	 * @return array A two element array of ( imageName, textToInsert )
	 */
	function render($name)
	{
		$button = new JObject;

		if (JFactory::getApplication()->isSite() && !$this->params->enable_frontend)
		{
			return $button;
		}

		JHtml::_('behavior.modal');
		JHtml::stylesheet('nnframework/style.min.css', false, true);

		$class = 'blank';
		if ($this->params->button_icon)
		{
			$class .= ' button-nonumber button-sourcerer';
		}

		$link = 'index.php?nn_qp=1'
			. '&folder=plugins.editors-xtd.sourcerer'
			. '&file=sourcerer.inc.php'
			. '&name=' . $name;

		$text_ini = strtoupper(str_replace(' ', '_', $this->params->button_text));
		$text = JText::_($text_ini);
		if ($text == $text_ini)
		{
			$text = JText::_($this->params->button_text);
		}

		$button->modal = true;
		$button->link = $link;
		$button->text = trim($text);
		$button->name = $class;
		$button->options = "{handler: 'iframe', size: {x:window.getSize().x-100, y: window.getSize().y-100}}";

		return $button;
	}
}
