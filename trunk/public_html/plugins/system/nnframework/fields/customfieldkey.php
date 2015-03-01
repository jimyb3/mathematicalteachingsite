<?php
/**
 * Element: Custom Field Key
 * Displays a custom key field (use in combination with customfieldvalue)
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

class JFormFieldNN_CustomFieldKey extends JFormField
{
	public $type = 'CustomFieldKey';
	private $params = null;

	protected function getLabel()
	{
		return '';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		$size = ($this->get('size') ? 'size="' . $this->get('size') . '"' : '');
		$class = ($this->get('class') ? 'class="' . $this->get('class') . '"' : 'class="text_area"');
		$this->value = htmlspecialchars(html_entity_decode($this->value, ENT_QUOTES), ENT_QUOTES);

		JHtml::_('behavior.mootools');
		JHtml::script('nnframework/script.min.js', false, true);

		$html = '<input type="text" name="' . $this->name . '" id="' . $this->id . '" value="' . $this->value . '" ' . $class . ' ' . $size . ' />';
		$html = '<label for="' . $this->id . '" style="margin: 0;">' . $html . '</label>';

		return $html;
	}

	private function get($val, $default = '')
	{
		return (isset($this->params[$val]) && (string) $this->params[$val] != '') ? (string) $this->params[$val] : $default;
	}
}
