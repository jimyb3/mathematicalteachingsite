<?php
/**
 * NoNumber Framework Helper File: Assignments: Components
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

/**
 * Assignments: Components
 */
class nnFrameworkAssignmentsComponents
{
	function passComponents(&$parent, &$params, $selection = array(), $assignment = 'all')
	{
		return $parent->passSimple(strtolower($parent->params->option), $selection, $assignment);
	}
}
