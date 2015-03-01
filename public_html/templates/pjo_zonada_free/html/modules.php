<?php

defined('_JEXEC') or die;

function modChrome_no($module, &$params, &$attribs)
{
if ($module->content) {
echo $module->content;
}
}


function modChrome_well($module, &$params, &$attribs)
{
if ($module->content) {
echo "<div class=\"well " . htmlspecialchars($params->get('moduleclass_sfx')) . "\">";
if ($module->showtitle)
{
// echo "<div class=\"page-header\"><strong>" . $module->title . "</strong></div>";
echo "<div class=\"page-header\" id=\"page_header_h3\">" . $module->title . "</div>";
}
echo $module->content;
echo "</div>";
}
}
?>
