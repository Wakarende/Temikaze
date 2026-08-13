<?php
/**
 * Shared field schema for all Temikaze CMS content types.
 *
 * This is the single source of truth for each post type's custom fields.
 * includes/meta-fields.php uses it to register REST-exposed post meta, and
 * includes/meta-boxes.php uses it to render and save the matching admin UI,
 * so both stay in sync automatically when a field is added or changed here.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the custom field definitions for every Temikaze CMS post type.
 *
 * Each field entry supports:
 * - label      Human-readable label shown in the admin meta box.
 * - input      Admin input type: text | textarea | email | url | date | attachment.
 * - meta_type  register_post_meta() 'type'. Defaults to 'string' if omitted.
 * - sanitize   Callable used both for register_post_meta()'s sanitize_callback
 *              and for sanitizing the value on admin save.
 *
 * @return array<string, array<string, array<string, mixed>>>
 */
function temikaze_cms_get_field_schema() {
	return array(
		'artist_profile' => array(
			'tagline'              => array(
				'label'    => 'Tagline',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'location'              => array(
				'label'    => 'Location',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'dj_description'        => array(
				'label'    => 'DJ Description',
				'input'    => 'textarea',
				'sanitize' => 'sanitize_textarea_field',
			),
			'producer_description'  => array(
				'label'    => 'Producer Description',
				'input'    => 'textarea',
				'sanitize' => 'sanitize_textarea_field',
			),
			'curator_description'   => array(
				'label'    => 'Curator Description',
				'input'    => 'textarea',
				'sanitize' => 'sanitize_textarea_field',
			),
			'booking_email'         => array(
				'label'    => 'Booking Email',
				'input'    => 'email',
				'sanitize' => 'sanitize_email',
			),
			'spotify_url'            => array(
				'label'    => 'Spotify URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'youtube_url'            => array(
				'label'    => 'YouTube URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'instagram_url'          => array(
				'label'    => 'Instagram URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'tiktok_url'             => array(
				'label'    => 'TikTok URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'linktree_url'           => array(
				'label'    => 'Linktree URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'tg_frenz_url'           => array(
				'label'    => 'TG & fRenz URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'tg_frenz_logo_id'       => array(
				'label'     => 'TG & fRenz Logo',
				'input'     => 'attachment',
				'meta_type' => 'integer',
				'sanitize'  => 'absint',
			),
		),
		'releases'        => array(
			'release_date'         => array(
				'label'    => 'Release Date',
				'input'    => 'date',
				'sanitize' => 'sanitize_text_field',
			),
			'release_type'         => array(
				'label'    => 'Release Type',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'genre'                 => array(
				'label'    => 'Genre',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'spotify_url'            => array(
				'label'    => 'Spotify URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'youtube_url'            => array(
				'label'    => 'YouTube URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'other_streaming_url'    => array(
				'label'    => 'Other Streaming URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
		),
		'mixes'           => array(
			'publish_date'          => array(
				'label'    => 'Publish Date',
				'input'    => 'date',
				'sanitize' => 'sanitize_text_field',
			),
			'youtube_url'            => array(
				'label'    => 'YouTube URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'soundcloud_url'         => array(
				'label'    => 'SoundCloud URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
			'tracklist'              => array(
				'label'    => 'Tracklist',
				'input'    => 'textarea',
				'sanitize' => 'sanitize_textarea_field',
			),
		),
		'events'          => array(
			'event_date'            => array(
				'label'    => 'Event Date',
				'input'    => 'date',
				'sanitize' => 'sanitize_text_field',
			),
			'venue'                  => array(
				'label'    => 'Venue',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'location'               => array(
				'label'    => 'Location',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'external_url'           => array(
				'label'    => 'External URL',
				'input'    => 'url',
				'sanitize' => 'esc_url_raw',
			),
		),
		'gallery'         => array(
			'alt_text'               => array(
				'label'    => 'Alt Text',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'category'               => array(
				'label'    => 'Category',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
			'event_date'             => array(
				'label'    => 'Event Date',
				'input'    => 'date',
				'sanitize' => 'sanitize_text_field',
			),
			'event_name'             => array(
				'label'    => 'Event Name',
				'input'    => 'text',
				'sanitize' => 'sanitize_text_field',
			),
		),
	);
}
