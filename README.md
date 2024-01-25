# Cf7 Lazy Recaptcha #
**Contributors:** [mtph9](https://profiles.wordpress.org/mtph9/)  
**Tags:** Contact Form 7, performance, speed optimization  
**Requires at least:** 4.5  
**Tested up to:** 6.4.2  
**Requires PHP:** 8.0  
**Stable tag:** 0.1.0  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Improves website loading speed by lazy loading reCaptcha for Contact Form 7.

## Description ##

Usually, reCaptcha scripts load immediately in Contect Form 7. Regardless of whether
you use the async or defer strategy, reCaptcha script execution requires a significant
amount of device resources, which is very noticeable on mobile devices.

The idea behind the plugin is simple: load and execute reCaptcha only when the user
starts interacting with the contact form. This results in a significant increase in
loading speed, but it can lead to worse spam detection (see FAQ).




## Installation ##

This section describes how to install the plugin and get it working.

1. Upload `lazy-recaptcha-for-cf7.zip` to the `/wp-content/plugins/` directory and unzip it
1. Activate the plugin through the 'Plugins' menu in WordPress

## Frequently Asked Questions ##

### Does it reduce the accuracy of spam detection? ###

It is likely to [decrease][recaptcha docs]. Therefore, it is advisable to use this method only if there are no other ways to improve the speed.


[recaptcha docs]: https://developers.google.com/recaptcha/docs/loading#lazy_loading "Loading reCAPTCHA | Google for Developers"
