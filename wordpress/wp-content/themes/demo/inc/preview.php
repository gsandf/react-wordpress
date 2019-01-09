<?php

/**
 * Customize the preview button in the WordPress admin to point to the headless client.
 * Please see this page for more info: https://wordpress.org/support/topic/preview-changes-with-wordpress-rest-api-authentication-problem/
 *
 * @param  str $link The WordPress preview link.
 * @return str The headless WordPress preview link.
 */
function set_headless_preview_link($link)
{
    return get_frontend_origin() .
        '/' .
        '_preview/' .
        get_the_ID() .
        '/' .
        wp_create_nonce('wp_rest');
}

add_filter('preview_post_link', 'set_headless_preview_link');
