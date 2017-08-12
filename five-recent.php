<?php
/**
 * Plugin Name: Five Recent
 * Plugin URI:  https://github.com/cjkoepke/five-recent
 * Description: Basic WordPress plugin to manage and modify the last 5 posts. An experiment with React + WP-API.
 * Version:     0.9.0
 * Author:      Calvin Koepke
 * Author URI:  https://calvinkoepke.com/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: five-recent
 * Domain Path: /languages
 */

/**
 * Main plugin class.
 *
 * @since 0.9.0
 */
final class Five_Recent {

    /**
	 * Plugin version.
	 */
    public $plugin_version = '0.9.0';

    /**
	 * The plugin textdomain, for translations.
	 */
    public $plugin_textdomain = 'five-recent';

    /**
	 * The url to the plugin directory.
	 */
    public $plugin_dir_url;

    /**
	 * The path to the plugin directory.
	 */
    public $plugin_dir_path;

    /**
     * Holds the instantiation of the admin page.
     */
    public $admin_page;

    /**
	 * Constructor.
	 *
	 * @since 0.9.0
	 */
	public function __construct() {
		$this->plugin_dir_url  = plugin_dir_url( __FILE__ );
        $this->plugin_dir_path = plugin_dir_path( __FILE__ );
    }

    /**
     * Initialize the plugin.
     *
     * @since 0.9.0
     */
    public function init() {

        // Load textdomain.
        add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

        // Instantiate the plugin features.
        require_once( $this->plugin_dir_path . 'lib/class-five-recent-config-admin.php' );
        $this->admin_page = new Five_Recent_Config_Admin;

    }

    /**
     * Load the textdomain (translation).
     *
     * 0.9.0
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain( $this->plugin_textdomain, false, dirname( plugin_basename( __FILE__ ) ) . 'languages/' );
    }

}

/**
* Helper function to retrieve the static object without using globals.
*
* @since 0.9.0
*/
function Five_Recent() {
    static $object;
	if ( null == $object ) {
		$object = new Five_Recent;
    }
	return $object;
}

add_action( 'plugins_loaded', array( Five_Recent(), 'init' ));
