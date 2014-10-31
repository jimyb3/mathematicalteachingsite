mathpublisherREADME.txt

The MathPublisher plugin allows you to include math formulae sections in your Joomla 1.6 or 1.5 content using {mathpublisher} or custom tag.
Use of the {mathpublisher} tag allows you to work with code sections in your Joomla WYSIWIG editors.

Plugin uses phpMathPublisher by Pascal Brachet from http://www.xm1math.net/phpmathpublisher/


INSTALLATION INSTRUCTIONS:
====================

- download the mathpublisher plugin.
- install the plugin using the Joomla Extensions install utility.
- ENABLE the new MathPublisher plugin with the Joomla 1.6 or 1.5 backend plugin manager.
- Set default parameters for the plugin engine.

USING THE PLUGIN:
The syntax for the usage is:

{mathpublisher}maths text{/mathpublisher}


For more information about MATHS SYNTAX please visit http://www.xm1math.net/phpmathpublisher/

EXAMPLES
{mathpublisher}
pi=sum{n=0}{+infty}{{(n!)^2 2^{n+1}}/{(2n+1)!}}
{/mathpublisher}

OR if you set custom tag=math in plugin parameters:
{math}pi</math> can be defined as {math}pi=sum{n=0}{+infty}{{(n!)^2 2^{n+1}}/{(2n+1)!}}{/math}


REVISION HISTORY:
=================

VERSION 1.8
========
  - simpler config by automatically finding the plugin directory. 
  - write debug info when config is wrong for easier diagnosis.

VERSION 1.7
========
  - add compatibility with Joomla 1.6

VERSION 1.5
========
  - allow / for joomla_root config value when joomla installed directly in DOCUMENT_ROOT
  - better support for html entities and special characters like less than, greater than, euro, quotes in the formula.
  - new special code 'slash' or '\slash' for simple  a / b style fractions

VERSION 1.4
========
  - support html entities in the formula.

VERSION 1.3
========
  - support php 5.3

VERSION 1.2
========
  - support maths in JComments

VERSION 1.1
========
  - support colour
  - more configuration options added

VERSION 1.0
========
  - initial release

