<?php
/**
 * NoNumber Framework Helper File: Cache
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

class nnCache
{
	static $cache = array();

	static public function has($hash)
	{
		return isset(self::$cache[$hash]);
	}

	static public function get($hash)
	{
		if (!isset(self::$cache[$hash]))
		{
			return false;
		}

		return is_object(self::$cache[$hash]) ? clone self::$cache[$hash] : self::$cache[$hash];
	}

	static public function set($hash, $data)
	{
		self::$cache[$hash] = $data;

		return $data;
	}
}
