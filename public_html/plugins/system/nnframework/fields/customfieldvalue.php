<?php
/**
 * Element: Custom Field Value
 * Displays a custom key field (use in combination with customfieldkey)
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

class JFormFieldNN_CustomFieldValue extends JFormField
{
	public $type = 'CustomFieldValue';
	private $params = null;

	protected function getLabel()
	{
		return '<span id="span_' . $this->id . '"></span>';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		$size = ($this->get('size') ? 'size="' . $this->get('size') . '"' : '');
		$class = ($this->get('class') ? 'class="' . $this->get('class') . '"' : 'class="text_area"');
		$this->value = htmlspecialchars(html_entity_decode($this->value, ENT_QUOTES), ENT_QUOTES);

		return '<input type="text" name="' . $this->name . '" id="' . $this->id . '" value="' . $this->value . '" ' . $class . ' ' . $size . ' />';
	}

	private function get($val, $default = '')
	{
		return (isset($this->params[$val]) && (string) $this->params[$val] != '') ? (string) $this->params[$val] : $default;
	}
}
