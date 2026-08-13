<?php
/**
 * REST-exposed post meta registration for Temikaze CMS.
 *
 * Every field here comes from the shared schema in field-schema.php, so
 * anything added there is automatically registered for REST without
 * touching this file.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers every custom field from the field schema as REST-visible post meta.
 */
function temikaze_cms_register_meta_fields() {
	foreach ( temikaze_cms_get_field_schema() as $post_type => $fields ) {
		foreach ( $fields as $meta_key => $field ) {
			register_post_meta(
				$post_type,
				$meta_key,
				array(
					'type'              => isset( $field['meta_type'] ) ? $field['meta_type'] : 'string',
					'single'            => true,
					'show_in_rest'      => true,
					'sanitize_callback' => $field['sanitize'],
					'auth_callback'     => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}
	}
}
add_action( 'init', 'temikaze_cms_register_meta_fields', 20 );
