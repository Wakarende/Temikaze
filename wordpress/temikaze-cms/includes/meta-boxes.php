<?php
/**
 * Native admin meta boxes for Temikaze CMS custom fields.
 *
 * One labelled meta box per post type, built directly from the shared
 * field schema in field-schema.php, plus a single generic save handler
 * that sanitizes and persists whatever fields exist for the post's type.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const TEMIKAZE_CMS_META_NONCE_ACTION = 'temikaze_cms_save_meta_boxes';
const TEMIKAZE_CMS_META_NONCE_NAME   = 'temikaze_cms_meta_nonce';

/**
 * Registers one meta box per post type defined in the field schema.
 */
function temikaze_cms_add_meta_boxes() {
	foreach ( temikaze_cms_get_field_schema() as $post_type => $fields ) {
		add_meta_box(
			'temikaze_cms_fields_' . $post_type,
			'Temikaze CMS Fields',
			'temikaze_cms_render_meta_box',
			$post_type,
			'normal',
			'high'
		);
	}
}
add_action( 'add_meta_boxes', 'temikaze_cms_add_meta_boxes' );

/**
 * Renders the meta box fields for the current post's post type.
 *
 * @param WP_Post $post Current post being edited.
 */
function temikaze_cms_render_meta_box( $post ) {
	$schema = temikaze_cms_get_field_schema();
	$fields = isset( $schema[ $post->post_type ] ) ? $schema[ $post->post_type ] : array();

	wp_nonce_field( TEMIKAZE_CMS_META_NONCE_ACTION, TEMIKAZE_CMS_META_NONCE_NAME );

	if ( empty( $fields ) ) {
		return;
	}

	echo '<table class="form-table" role="presentation"><tbody>';

	foreach ( $fields as $meta_key => $field ) {
		$value    = get_post_meta( $post->ID, $meta_key, true );
		$input_id = 'temikaze_cms_' . $meta_key;
		$name     = 'temikaze_cms[' . $meta_key . ']';

		echo '<tr>';
		echo '<th scope="row"><label for="' . esc_attr( $input_id ) . '">' . esc_html( $field['label'] ) . '</label></th>';
		echo '<td>';

		switch ( $field['input'] ) {
			case 'textarea':
				echo '<textarea id="' . esc_attr( $input_id ) . '" name="' . esc_attr( $name ) . '" rows="4" class="large-text">' . esc_textarea( $value ) . '</textarea>';
				break;

			case 'attachment':
				temikaze_cms_render_attachment_field( $input_id, $name, $value );
				break;

			case 'email':
			case 'url':
			case 'date':
				echo '<input type="' . esc_attr( $field['input'] ) . '" id="' . esc_attr( $input_id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $value ) . '" class="regular-text" />';
				break;

			default:
				echo '<input type="text" id="' . esc_attr( $input_id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $value ) . '" class="regular-text" />';
				break;
		}

		echo '</td></tr>';
	}

	echo '</tbody></table>';
}

/**
 * Renders the native media-library picker used for the TG & fRenz logo field.
 *
 * @param string $input_id  HTML id for the hidden ID input.
 * @param string $name      HTML name for the hidden ID input.
 * @param string $attachment_id Currently stored attachment ID, if any.
 */
function temikaze_cms_render_attachment_field( $input_id, $name, $attachment_id ) {
	$preview_url = $attachment_id ? wp_get_attachment_image_url( (int) $attachment_id, 'thumbnail' ) : '';

	echo '<div class="temikaze-cms-attachment-field">';
	echo '<input type="hidden" id="' . esc_attr( $input_id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $attachment_id ) . '" />';
	echo '<div class="temikaze-cms-attachment-preview" style="margin-bottom:8px;">';
	if ( $preview_url ) {
		echo '<img src="' . esc_url( $preview_url ) . '" style="max-width:150px;height:auto;display:block;" />';
	}
	echo '</div>';
	echo '<button type="button" class="button temikaze-cms-select-attachment" data-target="' . esc_attr( $input_id ) . '">Select Image</button> ';
	echo '<button type="button" class="button temikaze-cms-remove-attachment" data-target="' . esc_attr( $input_id ) . '">Remove</button>';
	echo '</div>';
}

/**
 * Enqueues the WP media library and the small picker script, only on
 * edit screens for post types that have an attachment-type field.
 *
 * @param string $hook Current admin page hook.
 */
function temikaze_cms_enqueue_media_picker( $hook ) {
	if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
		return;
	}

	$post_type = isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : '';
	if ( '' === $post_type && isset( $_GET['post'] ) ) {
		$post_type = get_post_type( absint( $_GET['post'] ) );
	}

	$has_attachment_field = false;
	foreach ( temikaze_cms_get_field_schema() as $schema_post_type => $fields ) {
		if ( $schema_post_type !== $post_type ) {
			continue;
		}
		foreach ( $fields as $field ) {
			if ( 'attachment' === $field['input'] ) {
				$has_attachment_field = true;
			}
		}
	}

	if ( ! $has_attachment_field ) {
		return;
	}

	wp_enqueue_media();

	$script = <<<'JS'
	( function ( $ ) {
		$( document ).on( 'click', '.temikaze-cms-select-attachment', function ( e ) {
			e.preventDefault();
			var button = $( this );
			var targetId = button.data( 'target' );
			var frame = wp.media( { title: 'Select Image', multiple: false } );

			frame.on( 'select', function () {
				var attachment = frame.state().get( 'selection' ).first().toJSON();
				$( '#' + targetId ).val( attachment.id );
				var preview = button.closest( '.temikaze-cms-attachment-field' ).find( '.temikaze-cms-attachment-preview' );
				var thumb = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
				preview.html( '<img src="' + thumb + '" style="max-width:150px;height:auto;display:block;" />' );
			} );

			frame.open();
		} );

		$( document ).on( 'click', '.temikaze-cms-remove-attachment', function ( e ) {
			e.preventDefault();
			var button = $( this );
			var targetId = button.data( 'target' );
			$( '#' + targetId ).val( '' );
			button.closest( '.temikaze-cms-attachment-field' ).find( '.temikaze-cms-attachment-preview' ).empty();
		} );
	} )( jQuery );
JS;

	wp_add_inline_script( 'media-editor', $script );
}
add_action( 'admin_enqueue_scripts', 'temikaze_cms_enqueue_media_picker' );

/**
 * Sanitizes and saves the submitted Temikaze CMS custom fields for a post.
 *
 * @param int $post_id Post being saved.
 */
function temikaze_cms_save_meta_boxes( $post_id ) {
	if ( ! isset( $_POST[ TEMIKAZE_CMS_META_NONCE_NAME ] )
		|| ! wp_verify_nonce( sanitize_key( $_POST[ TEMIKAZE_CMS_META_NONCE_NAME ] ), TEMIKAZE_CMS_META_NONCE_ACTION ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$schema    = temikaze_cms_get_field_schema();
	$post_type = get_post_type( $post_id );

	if ( ! isset( $schema[ $post_type ] ) ) {
		return;
	}

	$submitted = isset( $_POST['temikaze_cms'] ) ? (array) $_POST['temikaze_cms'] : array();

	foreach ( $schema[ $post_type ] as $meta_key => $field ) {
		if ( ! array_key_exists( $meta_key, $submitted ) ) {
			continue;
		}

		$raw_value = wp_unslash( $submitted[ $meta_key ] );
		$sanitized = call_user_func( $field['sanitize'], $raw_value );

		if ( '' === $sanitized || null === $sanitized ) {
			delete_post_meta( $post_id, $meta_key );
		} else {
			update_post_meta( $post_id, $meta_key, $sanitized );
		}
	}
}
add_action( 'save_post', 'temikaze_cms_save_meta_boxes' );
