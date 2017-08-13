<?php
/**
 * Handles the admin page details and setup.
 *
 * @since 0.9.0
 */

class Five_Recent_Config_Admin {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'register_page' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
    }

    public function register_page() {
        add_posts_page(
            __( 'Edit Five Recent', 'five-recent' ),
            __( 'Edit Five Recent', 'five-recent' ),
            'edit_posts',
            'five-recent-plugin',
            array( $this, 'page_html' )
        );
    }

    public function page_html() {

        if ( ! current_user_can( 'edit_posts' ) )
            return;

        // Container for React.
        echo '<div id="five-recent-root"></div>';
    }

    public function register_scripts() {

        if ( get_current_screen()->base !== 'posts_page_five-recent-plugin' ) {
            return;
        }

        $map = file_get_contents( plugin_dir_path( __DIR__ ) . 'view/build/asset-manifest.json' );
        $paths = json_decode($map, true);

        wp_enqueue_script( 'five-recent-js', plugin_dir_url( __DIR__ ) . 'view/build/' . $paths['main.js'], array(), '0.9.0', true );
        wp_enqueue_style( 'five-recent-css', plugin_dir_url( __DIR__ ) . 'view/build/' . $paths['main.css'], array(), '0.9.0' );

        // Localize relevant scripts.
        if ( current_user_can( 'edit_posts' ) ) {
            wp_localize_script(
                'five-recent-js',
                'five_recent_api',
                array(
                    'root' => esc_url_raw( rest_url() ),
                    'nonce' => wp_create_nonce( 'wp_rest' ),
                    'page_title' => __( 'Five Recent Posts', 'five-recent' )
                )
            );
        }

    }

}
