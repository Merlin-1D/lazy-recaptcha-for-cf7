<?php
/**
 * Plugin Name: Lazy Recaptcha for Contact Form 7
 * Plugin URI: https://wordpress.org/plugins/lazy-recaptcha-for-cf7
 * Description: Improves website loading speed by lazy loading reCaptcha for Contact Form 7.
 * Author: Ivan Pazenko
 * Text Domain: lazy-recaptcha-for-cf7
 * Domain Path: /languages
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version: 0.1.0
 *
 * @package Cf7_Lazy_Recaptcha
 */


class CF7LazyRecaptcha {
	public function __construct() {
		define( 'CF7_LAZY_VERSION', '0.1.0' );
		define( 'LAZY_RECAPTCHA_DIR', plugin_dir_path( __FILE__ ) );
		define( 'LAZY_RECAPTCHA_URI', plugin_dir_url( __FILE__ ) );

		add_action( 'init', array( $this, 'lazy_recaptcha_init_setup' ) );
	}

	public function lazy_recaptcha_init_setup(): void {
		if ( class_exists( 'WPCF7' ) && class_exists( 'WPCF7_RECAPTCHA' ) ) {
			$recaptcha = WPCF7_RECAPTCHA::get_instance();
			if ( ! empty( $recaptcha->is_active() ) ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'dequeue_cf7_recaptcha_scripts' ), 21 );
				add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_lazy_recaptcha_script' ), 21 );
			}
		}
	}

	public function dequeue_cf7_recaptcha_scripts(): void {
		wp_dequeue_script( 'google-recaptcha' );
		wp_dequeue_script( 'wpcf7-recaptcha' );
	}

	public function enqueue_lazy_recaptcha_script(): void {
		$script_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script( 'lazy-recaptcha-script', LAZY_RECAPTCHA_URI . "dist/index{$script_suffix}.js", array(), CF7_LAZY_VERSION, true );

		$recaptcha_instance   = WPCF7_RECAPTCHA::get_instance();
		$recaptcha_sitekey    = $recaptcha_instance->get_sitekey();
		$recaptcha_parameters = array(
			'sitekey' => $recaptcha_sitekey,
			'actions' => apply_filters( 'wpcf7_recaptcha_actions', array(
				'homepage'    => 'homepage',
				'contactform' => 'contactform',
			) ),
		);
		wp_localize_script( 'lazy-recaptcha-script', 'recaptcha_params', $recaptcha_parameters );
	}
}

new CF7LazyRecaptcha();



