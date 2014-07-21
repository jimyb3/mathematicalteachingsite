<?php
	// template params
	$app			= JFactory::getApplication();
	$templateparams	= $app->getTemplate(true)->params;	
	$slideshow_image_folder = $this->params->get('slideshow_image_folder') .'/';

	$caption1 = $this->params->get("caption1", "");
    $caption2 = $this->params->get("caption2", "");
    $caption3 = $this->params->get("caption3", "");
	$caption4 = $this->params->get("caption4", "");
    $caption5 = $this->params->get("caption5", "");
	$caption6 = $this->params->get("caption6", "");
	$caption7 = $this->params->get("caption7", "");
?>
<?php if ($this->params->get('slideshow_image1')) : ?>

<div id="slider" class="slimSlider"> 
			<img src="<?php echo $this->params->get('slideshow_image1'); ?>" alt="" title="<?php echo $caption1 ?>" />
			<?php if ($this->params->get('slideshow_image2')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image2'); ?>" alt="" title="<?php echo $caption2 ?>" />
			<?php endif; ?>
			<?php if ($this->params->get('slideshow_image3')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image3'); ?>" alt="" title="<?php echo $caption3 ?>" />
			<?php endif; ?>
			<?php if ($this->params->get('slideshow_image4')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image4'); ?>" alt="" title="<?php echo $caption4 ?>" />
			<?php endif; ?>
			<?php if ($this->params->get('slideshow_image5')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image5'); ?>" alt="" title="<?php echo $caption5 ?>" />
			<?php endif; ?>
			<?php if ($this->params->get('slideshow_image6')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image6'); ?>" alt="" title="<?php echo $caption6 ?>" />
			<?php endif; ?>
			<?php if ($this->params->get('slideshow_image7')) : ?>
				<img src="<?php echo $this->params->get('slideshow_image7'); ?>" alt="" title="<?php echo $caption7 ?>" />
			<?php endif; ?>
</div>

<?php endif; ?>