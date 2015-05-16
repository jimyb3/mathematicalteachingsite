<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_users_latest
 * @copyright	Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */
// no direct access
defined('_JEXEC') or die;
?>
<?php if (!empty($names)) : ?>
	<ul class="latestusers<?php echo $moduleclass_sfx ?>" >
	<?php echo "Οι τελευταίοι 50 χρήστες ήταν:</br>" ?>
	<?php foreach($names as $name) : ?>	
		<?php echo "$name->username, " ?>
	<?php endforeach;  ?>
	</ul>
<?php endif; ?>
