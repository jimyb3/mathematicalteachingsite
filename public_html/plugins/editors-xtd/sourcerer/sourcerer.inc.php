<?php
/**
 * Popup page
 * Displays the Sourcerer Code Helper
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

$user = JFactory::getUser();
if ($user->get('guest')
	|| (
		!$user->authorise('core.edit', 'com_content')
		&& !$user->authorise('core.create', $asset)
	)
)
{
	JError::raiseError(403, JText::_("ALERTNOTAUTH"));
}

require_once JPATH_PLUGINS . '/system/nnframework/helpers/parameters.php';
$parameters = nnParameters::getInstance();
$params = $parameters->getPluginParams('sourcerer');

if (JFactory::getApplication()->isSite())
{
	if (!$params->enable_frontend)
	{
		JError::raiseError(403, JText::_("ALERTNOTAUTH"));
	}
}

$class = new plgButtonSourcererPopup;
$class->render($params);

class plgButtonSourcererPopup
{
	function render(&$params)
	{
		jimport('joomla.filesystem.file');

		// Load plugin language
		require_once JPATH_PLUGINS . '/system/nnframework/helpers/functions.php';
		nnFrameworkFunctions::loadLanguage('plg_system_nnframework');
		nnFrameworkFunctions::loadLanguage('plg_editors-xtd_sourcerer');
		nnFrameworkFunctions::loadLanguage('plg_system_sourcerer');

		$language = 'en';
		$locales = JFactory::getLanguage()->getLocale();
		foreach ($locales as $locale)
		{
			if (JFile::exists(JPATH_PLUGINS . '/editors-xtd/sourcerer/editarea/langs/' . $locale . '.js'))
			{
				$language = $locale;
				break;
			}
		}

		// Add scripts and styles
		JHtml::_('behavior.mootools');

		JFactory::getDocument()->addScript(JURI::root(true) . '/plugins/editors-xtd/sourcerer/editarea/edit_area_full.js');
		JHtml::script('sourcerer/script.min.js', false, true);

		$script = "
			editAreaLoader.init({
				id: 'source',	// id of the textarea to transform
				start_highlight: true,	// if start with highlight
				allow_resize: 'y',
				allow_toggle: false,
				word_wrap: true,
				language: '" . $language . "',
				syntax: 'php',
				toolbar: 'fullscreen, |, undo, redo, |, select_font, |, syntax_selection, |, highlight, reset_highlight, word_wrap',
				syntax_selection_allow: 'css,html,js,php'
			});

			var sourcerer_syntax_word = '" . $params->syntax_word . "';
			var sourcerer_editorname = '" . JFactory::getApplication()->input->getString('name', 'text') . "';
			var sourcerer_default_addsourcetags = " . (int) $params->addsourcetags . ";
			var sourcerer_root = '" . JURI::root(true) . "';

			window.addEvent( 'domready', function() { sourcerer_init(); });
		";
		JFactory::getDocument()->addScriptDeclaration($script);
		JHtml::stylesheet('nnframework/style.min.css', false, true);
		JHtml::stylesheet('nnframework/popup.min.css', false, true);
		JHtml::stylesheet('sourcerer/popup.min.css', false, true);

		$params->code = '<!-- You can place html anywhere within the source tags --><br /><br /><br /><script language=&quot;javascript&quot; type=&quot;text/javascript&quot;><br />    // You can place JavaScript like this<br />    <br /></script><br /><?php<br />    // You can place PHP like this<br />    <br />?>';
		$params->code = str_replace('<br />', "\n", $params->code);

		echo $this->getHTML($params);
	}

	function getHTML(&$params)
	{
		JHtml::_('behavior.tooltip');

		ob_start();
		?>
		<div style="margin: 0 10px;">
			<form action="index.php" id="sourceForm" method="post">
				<fieldset>
					<legend style="display:none;"></legend>
					<div style="float: left">
						<h1><?php echo JText::_('SRC_SOURCERER_CODE_HELPER'); ?></h1>
					</div>
					<div style="float: right; text-align: right;">
						<div class="button2-left">
							<div class="blank hasicon apply">
								<a rel="" onclick="sourcerer_insertText();window.parent.SqueezeBox.close();"
									href="javascript://"
									title="<?php echo JText::_('SRC_INSERT') ?>"><?php echo JText::_('SRC_INSERT') ?></a>
							</div>
						</div>
						<div class="button2-left">
							<div class="blank hasicon cancel">
								<a rel=""
									onclick="if ( confirm( '<?php echo JText::_('NN_ARE_YOU_SURE'); ?>' ) ) { window.parent.SqueezeBox.close(); }"
									href="javascript://"
									title="<?php echo JText::_('JCANCEL') ?>"><?php echo JText::_('JCANCEL') ?></a>
							</div>
						</div>
					</div>
				</fieldset>

				<textarea id="source" class="source" name="source" cols="" rows=""><?php echo $params->code ?></textarea>

				<fieldset>
					<legend style="display:none;"></legend>
					<div style="float: right; text-align: right;">
						<div class="button2-left">
							<div class="blank hasicon apply">
								<a rel="" onclick="sourcerer_insertText();window.parent.SqueezeBox.close();"
									href="javascript://"
									title="<?php echo JText::_('SRC_INSERT') ?>"><?php echo JText::_('SRC_INSERT') ?></a>
							</div>
						</div>
						<div class="button2-left">
							<div class="blank hasicon cancel">
								<a rel=""
									onclick="if ( confirm( '<?php echo JText::_('NN_ARE_YOU_SURE'); ?>' ) ) { window.parent.SqueezeBox.close(); }"
									href="javascript://"
									title="<?php echo JText::_('JCANCEL') ?>"><?php echo JText::_('JCANCEL') ?></a>
							</div>
						</div>
					</div>

					<div class="button2-left">
						<div class="blank">
							<a rel="" onclick="eAL.toggle( 'source' );return false;" href="javascript://;"
								class="hasTip"
								title="<?php echo JText::_('SRC_TOGGLE_EDITOR') . '::' . JText::_('SRC_TOGGLE_EDITOR_DESC'); ?>">
								<?php echo JText::_('SRC_TOGGLE_EDITOR') ?></a>
						</div>
					</div>
					<div class="button2-left">
						<div class="blank button-nonumber button-src-sourcetags" id="sourcetags_button">
							<a rel="" onclick="sourcerer_toggleSourceTags();return false;" href="javascript://;"
								class="hasTip"
								title="<?php echo JText::_('SRC_TOGGLE_SOURCE_TAGS') . '::' . JText::_('SRC_TOGGLE_SOURCE_TAGS_DESC'); ?>">
								<?php echo JText::_('SRC_TOGGLE_SOURCE_TAGS') ?></a>
						</div>
					</div>
					<div class="button2-left">
						<div class="blank button-nonumber button-src-tagstyle" id="tagstyle_button">
							<a rel="" onclick="sourcerer_toggleTagStyle();return false;" href="javascript://;"
								class="hasTip"
								title="<?php echo JText::_('SRC_TOGGLE_TAG_STYLE') . '::' . JText::_('SRC_TOGGLE_TAG_STYLE_DESC'); ?>">
								<?php echo JText::_('SRC_TOGGLE_TAG_STYLE') ?></a>
						</div>
					</div>

				</fieldset>
			</form>
			<?php
			if (JFactory::getApplication()->isAdmin())
			{
				$user = JFactory::getUser();
				if ($user->authorise('core.admin', 1))
				{
					echo '<em>' . str_replace('<a ', '<a target="_blank" ', html_entity_decode(JText::_('SRC_SETTINGS'))) . '</em>';
				}
			}
			?>
		</div>
		<?php
		$html = ob_get_contents();
		ob_end_clean();
		return $html;
	}
}
