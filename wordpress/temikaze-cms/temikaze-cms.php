<?php
/**
 * Plugin Name: Temikaze CMS
 * Description: Registers the custom post types and fields that power the headless Temikaze website (artist profile, releases, mixes, events, gallery).
 * Version: 0.1.0
 * Author: Temikaze
 * Text Domain: temikaze-cms
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TEMIKAZE_CMS_DIR', plugin_dir_path( __FILE__ ) );

require_once TEMIKAZE_CMS_DIR . 'includes/field-schema.php';
require_once TEMIKAZE_CMS_DIR . 'includes/post-types.php';
require_once TEMIKAZE_CMS_DIR . 'includes/meta-fields.php';
require_once TEMIKAZE_CMS_DIR . 'includes/meta-boxes.php';
