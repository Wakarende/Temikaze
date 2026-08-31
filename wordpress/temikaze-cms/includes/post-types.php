<?php
/**
 * Custom post type registration for Temikaze CMS.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Builds a standard WordPress post type labels array from a singular/plural pair.
 *
 * @param string $singular Singular label, e.g. "Release".
 * @param string $plural   Plural label, e.g. "Releases".
 * @return array<string, string>
 */
function temikaze_cms_post_type_labels( $singular, $plural ) {
	return array(
		'name'               => $plural,
		'singular_name'      => $singular,
		'add_new'            => 'Add New',
		'add_new_item'       => 'Add New ' . $singular,
		'edit_item'          => 'Edit ' . $singular,
		'new_item'           => 'New ' . $singular,
		'view_item'          => 'View ' . $singular,
		'view_items'         => 'View ' . $plural,
		'search_items'       => 'Search ' . $plural,
		'not_found'          => 'No ' . strtolower( $plural ) . ' found.',
		'not_found_in_trash' => 'No ' . strtolower( $plural ) . ' found in Trash.',
		'all_items'          => 'All ' . $plural,
		'menu_name'          => $plural,
	);
}

/**
 * Registers the five Temikaze CMS content types.
 */
function temikaze_cms_register_post_types() {
	$post_types = array(
		'artist_profile' => array(
			'singular' => 'Artist Profile',
			'plural'   => 'Artist Profile',
			'supports' => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
			'icon'     => 'dashicons-admin-users',
		),
		'releases'        => array(
			'singular' => 'Release',
			'plural'   => 'Releases',
			'supports' => array( 'title', 'excerpt', 'thumbnail', 'custom-fields' ),
			'icon'     => 'dashicons-format-audio',
		),
		'mixes'           => array(
			'singular' => 'Mix',
			'plural'   => 'Mixes',
			'supports' => array( 'title', 'excerpt', 'thumbnail', 'custom-fields' ),
			'icon'     => 'dashicons-controls-volumeon',
		),
		'events'          => array(
			'singular' => 'Event',
			'plural'   => 'Events',
			'supports' => array( 'title', 'thumbnail', 'custom-fields' ),
			'icon'     => 'dashicons-calendar-alt',
		),
		'gallery'         => array(
			'singular' => 'Gallery Image',
			'plural'   => 'Gallery',
			'supports' => array( 'title', 'excerpt', 'thumbnail', 'custom-fields', 'page-attributes' ),
			'icon'     => 'dashicons-format-gallery',
		),
	);

	foreach ( $post_types as $slug => $config ) {
		register_post_type(
			$slug,
			array(
				'labels'              => temikaze_cms_post_type_labels( $config['singular'], $config['plural'] ),
				'public'               => true,
				'has_archive'          => false,
				'exclude_from_search'  => true,
				'show_in_rest'         => true,
				'rest_base'            => $slug,
				'supports'             => $config['supports'],
				'menu_icon'            => $config['icon'],
			)
		);
	}
}
add_action( 'init', 'temikaze_cms_register_post_types' );
