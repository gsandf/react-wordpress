<?php

/**
 * Register support for menus in your theme
 */
function register_my_menu()
{
    register_nav_menu('header-menu', __('Header Menu'));
}
add_action('init', 'register_my_menu');
