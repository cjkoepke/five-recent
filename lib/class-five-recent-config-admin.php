<?php
/**
 * Handles the admin page details and setup.
 *
 * @since 0.9.0
 */

class Five_Recent_Config_Admin {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'register_page' ) );
    }

    public function register_page() {
        add_posts_page(
            __( 'Five Recent Posts', $this->plugin_textdomain ),
            __( 'Five Recent Posts', $this->plugin_textdomain ),
            'edit_posts',
            'five-recent-plugin',
            array( $this, 'page_html' )
        );
    }

    public function page_html() {

        if ( ! current_user_can( 'edit_posts' ) )
            return;
        ?>
        <div id="five-recent-root"><h1><?php get_admin_page_title(); ?></h1></div>
        <?php

    }

}
