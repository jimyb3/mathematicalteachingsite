<?php
/**
 * Element: Block
 * Displays a block with optionally a title and description
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

require_once JPATH_PLUGINS . '/system/nnframework/helpers/text.php';

class JFormFieldNN_Block extends JFormField
{
	public $type = 'Block';
	private $params = null;

	protected function getLabel()
	{
		return '';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		JHtml::stylesheet('nnframework/style.min.css', false, true);

		$title = $this->get('label');
		$description = $this->get('description');

		$start = $this->get('start', 0);
		$end = $this->get('end', 0);

		$hastitle = ($title || $description);

		JHtml::stylesheet('nnframework/style.min.css', false, true);

		$html = array();

		if ($start || !$end)
		{
			$html[] = $this->getTitleBlock($title, $description, $start);
			if ($start || !$hastitle)
			{
				$html[] = '<div class="nn_panel"><div class="nn_block' . (!$hastitle ? ' nn_block_notitle' : '') . '">';
			}
			if ($start)
			{
				$html[] = '<ul class="adminformlist"><li>';
			}
		}
		if ($end || !$start)
		{
			if ($end)
			{
				$html[] = '<div style="clear: both;"></div></li></ul>';
			}
			if ($end || !$hastitle)
			{
				$html[] = '<div style="clear: both;"></div>';
				$html[] = '</div></div>';
			}
		}

		return implode('', $html);
	}

	private function getTitleBlock($title = '', $description = '', $start = 0)
	{
		$nostyle = $this->get('nostyle', 0);

		if ($title)
		{
			$title = nnText::html_entity_decoder(JText::_($title));
		}

		if ($description)
		{
			// variables
			$v1 = JText::_($this->get('var1'));
			$v2 = JText::_($this->get('var2'));
			$v3 = JText::_($this->get('var3'));
			$v4 = JText::_($this->get('var4'));
			$v5 = JText::_($this->get('var5'));

			$description = nnText::html_entity_decoder(trim(JText::sprintf($description, $v1, $v2, $v3, $v4, $v5)));
			$description = str_replace('span style="font-family:monospace;"', 'span class="nn_code"', $description);
		}

		$html = array();

		if ($title)
		{
			if ($nostyle)
			{
				$html[] = '<div style="clear:both;"><div>';
			}
			else
			{
				$class = 'nn_panel nn_panel_title';
				if ($start || $description)
				{
					$class .= ' nn_panel_top';
				}
				$html[] = '<div class="' . $class . '"><div class="nn_block nn_title">';
			}
			$html[] = $title;
			$html[] = '<div style="clear: both;"></div>';
			$html[] = '</div></div>';
		}

		if ($description)
		{
			if ($nostyle)
			{
				$html[] = '<div style="clear:both;"><div>';
			}
			else
			{
				$class = 'nn_panel nn_panel_description';
				if ($start)
				{
					$class .= ' nn_panel_top';
				}
				if ($title)
				{
					$class .= ' nn_panel_hastitle';
				}
				$html[] = '<div class="' . $class . '"><div class="nn_block nn_title">';
			}

			$html[] = $description;
			$html[] = '<div style="clear: both;"></div>';
			$html[] = '</div></div>';
		}

		return implode('', $html);
	}

	private function get($val, $default = '')
	{
		return (isset($this->params[$val]) && (string) $this->params[$val] != '') ? (string) $this->params[$val] : $default;
	}
}
