<?php

/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2014 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
class WFFormatPluginConfig {

    public static function getConfig(&$settings) {
        wfimport('admin.models.editor');
        $model = new WFModelEditor();
        $wf = WFEditor::getInstance();

        $settings['inline_styles'] = $wf->getParam('editor.inline_styles', 1, 1);

        // Paragraph handling
        $settings['forced_root_block'] = $wf->getParam('editor.forced_root_block', 'p', '', false);

        // set as boolean if disabled
        if (is_numeric($settings['forced_root_block'])) {
            $settings['forced_root_block'] = (bool) $settings['forced_root_block'];

            if ($wf->getParam('editor.force_br_newlines', 0, 0, 'boolean') === false) {
                // legacy
                $settings['force_p_newlines'] = $wf->getParam('editor.force_p_newlines', 1, 0, 'boolean');
            }
        }

        if (strpos($settings['forced_root_block'], '|') !== false) {
            // multiple values
            $values = explode('|', $settings['forced_root_block']);

            foreach ($values as $value) {
                $kv = explode(':', $value);

                if (count($kv) == 2) {
                    $settings[$kv[0]] = (bool) $kv[1];
                } else {
                    $settings['forced_root_block'] = (bool) $kv[0];
                }
            }
        }

        $settings['removeformat_selector'] = $wf->getParam('editor.removeformat_selector', 'span,b,strong,em,i,font,u,strike', 'span,b,strong,em,i,font,u,strike');
        
        // Relative urls
        $settings['relative_urls'] = $wf->getParam('editor.relative_urls', 1, 1, 'boolean');
        if ($settings['relative_urls'] == 0) {
            $settings['remove_script_host'] = false;
        }
    }
}

?>
