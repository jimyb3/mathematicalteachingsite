<?php
// slideshow 
?>

<?php

if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2') == 0 ) && ($this->params->get('slideshow_image3') == 0 )
&& ($this->params->get('slideshow_image4') == 0 ) && ($this->params->get('slideshow_image5') == 0 ) && ($this->params->get('slideshow_image6') == 0 ) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 30) / 2;
$controlnav_width = '30px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'false';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3') == 0 )
&& ($this->params->get('slideshow_image4') == 0 ) && ($this->params->get('slideshow_image5') == 0 ) && ($this->params->get('slideshow_image6') == 0 ) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 60) / 2;
$controlnav_width = '60px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3'))
&& ($this->params->get('slideshow_image4') == 0 ) && ($this->params->get('slideshow_image5') == 0 ) && ($this->params->get('slideshow_image6') == 0 ) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 90) / 2;
$controlnav_width = '90px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3'))
&& ($this->params->get('slideshow_image4')) && ($this->params->get('slideshow_image5') == 0 ) && ($this->params->get('slideshow_image6') == 0 ) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 120) / 2;
$controlnav_width = '120px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3'))
&& ($this->params->get('slideshow_image4')) && ($this->params->get('slideshow_image5')) && ($this->params->get('slideshow_image6') == 0 ) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 150) / 2;
$controlnav_width = '150px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3'))
&& ($this->params->get('slideshow_image4')) && ($this->params->get('slideshow_image5')) && ($this->params->get('slideshow_image6')) 
&& ($this->params->get('slideshow_image7') == 0 )) {
$controlnav_left = (1000 - 180) / 2;
$controlnav_width = '180px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
if (($this->params->get('slideshow_image1')) && ($this->params->get('slideshow_image2')) && ($this->params->get('slideshow_image3'))
&& ($this->params->get('slideshow_image4')) && ($this->params->get('slideshow_image5')) && ($this->params->get('slideshow_image6')) 
&& ($this->params->get('slideshow_image7'))) {
$controlnav_left = (1000 - 210) / 2;
$controlnav_width = '210px';
if ($this->params->get('slideshow_controlnav') == 0 ) {
$controlnav = 'true';
} else {
$controlnav = 'false';
}
} 
?>

<?php if($slideshow_use == "true") : ?>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/photo.js"></script>
<script type="text/javascript">
jQuery.noConflict();
jQuery(window).load(function() {
setTimeout(function(){
jQuery('#slider').slimSlider({
effect:'<?php echo (implode(', ', $this->params->get('slideshow_effect'))); ?>',
slices:<?php echo ($this->params->get('slideshow_slices')); ?>,
animSpeed:<?php echo ($this->params->get('slideshow_animspeed')); ?>,
pauseTime:<?php echo ($this->params->get('slideshow_pausetime')); ?>,
startSlide:<?php echo ($this->params->get('slideshow_startslide')); ?>,
directionNav:false,
controlNav:<?php echo $controlnav; ?>
});
});     
}); 
</script>
<?php endif; ?>



