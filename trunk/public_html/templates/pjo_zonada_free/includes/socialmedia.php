<div id="social_bm_outer">
<?php if($this->params->get('enable_disable_social_media') == '1') : ?>

<ul id="social_bm_nav">

<?php if($this->params->get('item_twitter_sw') == '1') : ?>
<li class="item_twitter"><a href="<?php echo $this->params->get('item_twitter'); ?>" title="Twitter"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_facebook_sw') == '1') : ?>
<li class="item_facebook"><a href="<?php echo $this->params->get('item_facebook'); ?>" title="Facebook"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_google_sw') == '1') : ?>
<li class="item_google"><a href="<?php echo $this->params->get('item_google'); ?>" title="Google"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_linkedin_sw') == '1') : ?>
<li class="item_linkedin"><a href="<?php echo $this->params->get('item_linkedin'); ?>" title="LinkedIn"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_myspace_sw') == '1') : ?>
<li class="item_myspace"><a href="<?php echo $this->params->get('item_myspace'); ?>" title="MySpace"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_blogger_sw') == '1') : ?>
<li class="item_blogger"><a href="<?php echo $this->params->get('item_blogger'); ?>" title="Blogger"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_flickr_sw') == '1') : ?>
<li class="item_flickr"><a href="<?php echo $this->params->get('item_flickr'); ?>" title="Flickr"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_rssfeed_sw') == '1') : ?>
<li class="item_rssfeed"><a href="<?php echo $this->params->get('item_rssfeed'); ?>" title="RSS Feed"></a></li>
<?php endif; ?>

<?php if($this->params->get('item_stumble_sw') == '1') : ?>
<li class="item_stumble"><a href="<?php echo $this->params->get('item_stumble'); ?>" title="StumbleUpon"></a></li>
<?php endif; ?>

</ul>

<?php endif; ?>
</div>
