<style type="text/css">
/* custom template width */
/*
.container
{
width: <?php echo $this->params->get('customTemplateWidth');?> !important;
max-width: <?php echo $this->params->get('customTemplateWidth');?> !important;
}
*/
/* start custom color */
body
{
 font-family:<?php echo $FONTTYPE_P ?>;
}
</style>


<!-- START CSS -->
<!-- ################ -->
<style type="text/css">


/* start horizontal navigation */
#hor_nav ul li a
{
color: <?php echo ($hornav_font_color); ?>
}
#hor_nav LI.active A
{
background-color: <?php echo $this->params->get('templateColor');?> !important;
}
#hor_nav LI A:hover, #hor_nav LI:hover A, #hor_nav LI.sfHover A
{
background-color: <?php echo $this->params->get('templateColor');?> !important;
}
#hor_nav LI LI A, #hor_nav LI LI.active A, #hor_nav LI LI A:hover
{
background-color: <?php echo $this->params->get('templateColor');?> !important;
}
/* hor nav border color */
#hor_nav LI A
{
border-right: 2px solid <?php echo ($hornav_border_color); ?>
}
#hor_nav LI LI A, #hor_nav LI LI.active A, #hor_nav LI LI A:hover
{
border-top: 1px solid <?php echo $this->params->get('hornav_sub_border_color');?> !important;
border-right: 1px solid <?php echo $this->params->get('hornav_sub_border_color');?> !important;
}
</style>
<!-- END CSS -->
<!-- ################ -->

<script>var jQ = jQuery.noConflict();</script>

