<?php
/**
 * Element: Header
 * Displays a title with a bunch of extras, like: description, image, versioncheck
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

class JFormFieldNN_Header extends JFormField
{
	public $type = 'Header';
	private $params = null;

	protected function getLabel()
	{
		return '';
	}

	protected function getInput()
	{
		$this->params = $this->element->attributes();

		jimport('joomla.filesystem.file');
		JHtml::stylesheet('nnframework/style.min.css', false, true);

		$title = $this->get('label');
		$description = $this->get('description');
		$xml = $this->get('xml');
		$lang_file = $this->get('language_file');
		$image = $this->get('image');
		$image_w = $this->get('image_w', 120);
		$image_h = $this->get('image_h', 160);
		$url = $this->get('url');

		if (!$image && preg_match('#([^/]*)\.xml#', $xml, $name))
		{
			$image = '/media/' . $name['1'] . '/images/logo.png';
		}

		if ($description)
		{
			// variables
			$v1 = $this->get('var1');
			$v2 = $this->get('var2');
			$v3 = $this->get('var3');
			$v4 = $this->get('var4');
			$v5 = $this->get('var5');

			$description = nnText::html_entity_decoder(trim(JText::sprintf($description, $v1, $v2, $v3, $v4, $v5)));
		}

		if ($lang_file)
		{
			// Include extra language file
			$language = JFactory::getLanguage();
			$lang = str_replace('_', '-', $language->getTag());

			$inc = '';
			$lang_path = 'language/' . $lang . '/' . $lang . '.' . $lang_file . '.inc.php';
			if (JFile::exists(JPATH_ADMINISTRATOR . '/' . $lang_path))
			{
				$inc = JPATH_ADMINISTRATOR . '/' . $lang_path;
			}
			else if (JFile::exists(JPATH_SITE . '/' . $lang_path))
			{
				$inc = JPATH_SITE . '/' . $lang_path;
			}
			if (!$inc && $lang != 'en-GB')
			{
				$lang = 'en-GB';
				$lang_path = 'language/' . $lang . '/' . $lang . '.' . $lang_file . '.inc.php';
				if (JFile::exists(JPATH_ADMINISTRATOR . '/' . $lang_path))
				{
					$inc = JPATH_ADMINISTRATOR . '/' . $lang_path;
				}
				else if (JFile::exists(JPATH_SITE . '/' . $lang_path))
				{
					$inc = JPATH_SITE . '/' . $lang_path;
				}
			}
			if ($inc)
			{
				include $inc;
			}
		}

		if ($title)
		{
			$title = JText::_($title);
		}

		if ($description)
		{
			$description = str_replace('span style="font-family:monospace;"', 'span class="nn_code"', $description);
			if ($description['0'] != '<')
			{
				$description = '<p>' . $description . '</p>';
			}
		}

		if (!$xml && $this->form->getValue('element'))
		{
			if ($this->form->getValue('folder'))
			{
				$xml = 'plugins/' . $this->form->getValue('folder') . '/' . $this->form->getValue('element') . '/' . $this->form->getValue('element') . '.xml';
			}
			else
			{
				$xml = 'administrator/modules/' . $this->form->getValue('element') . '/' . $this->form->getValue('element') . '.xml';
			}
		}

		if ($xml)
		{
			$xml = JApplicationHelper::parseXMLInstallFile(JPATH_SITE . '/' . $xml);
			$version = 0;
			if ($xml && isset($xml['version']))
			{
				$version = $xml['version'];
			}
			if ($version)
			{
				if (strpos($version, 'PRO') !== false)
				{
					$version = str_replace('PRO', '', $version);
					$version .= ' <small style="color:green">[PRO]</small>';
				}
				else if (strpos($version, 'FREE') !== false)
				{
					$version = str_replace('FREE', '', $version);
					$version .= ' <small style="color:green">[FREE]</small>';
				}
				if ($title)
				{
					$title .= ' v';
				}
				else
				{
					$title = JText::_('Version') . ' ';
				}
				$title .= $version;
			}
		}

		if ($url)
		{
			$link = '<a href="' . $url . '" target="_blank" title="' . preg_replace('#<[^>]*>#', '', $title) . '">';
		}

		$html = array();

		$html[] = '<div class="nn_panel"><div class="nn_block nn_title">';

		if ($image && JFile::exists(JPATH_SITE . $image))
		{
			$image = '<img src="' . JURI::root(true) . $image . '" border="0" style="float:right;margin-left:10px" alt=""';
			if ($image_w)
			{
				$image .= ' width="' . $image_w . '"';
			}
			if ($image_h)
			{
				$image .= ' height="' . $image_h . '"';
			}
			$image .= ' />';
			if ($url)
			{
				$image = $link . $image . '</a>';
			}
			$html[] = $image;
		}

		if ($title)
		{
			if ($url)
			{
				$title = $link . $title . '</a>';
			}
			$html[] = '<h4 style="margin: 0px;">' . nnText::html_entity_decoder($title) . '</h4>';
		}
		if ($description)
		{
			$html[] = $description;
		}
		if ($url)
		{
			$html[] = '<p><a href="' . $url . '" target="_blank" title="' . JText::_('NN_MORE_INFO') . '">' . JText::_('NN_MORE_INFO') . '...</a></p>';
		}

		$html[] = '<div style="clear: both;"></div>';
		$html[] = '</div></div>';

		return implode('', $html);
	}

	private function get($val, $default = '')
	{
		return (isset($this->params[$val]) && (string) $this->params[$val] != '') ? (string) $this->params[$val] : $default;
	}
}
