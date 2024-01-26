document.addEventListener('DOMContentLoaded', () => {
	let sitekey = recaptcha_params.sitekey;
	let actions = recaptcha_params.actions;
	let inputs = document.querySelectorAll('input, textarea');

	function executeRecaptcha(action) {
		if (typeof grecaptcha !== "undefined") {
			grecaptcha.ready(function () {
				grecaptcha.execute(sitekey, {action: action})
					.then(function (token) {
						let token_inputs = document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');
						for (let i = 0; i < token_inputs.length; i++) {
							token_inputs.item(i).value = token;
						}

						let recaptchaEvent = new CustomEvent('wpcf7grecaptchaexecuted', {
							detail: {
								action: action,
								token: token
							}
						});

						document.dispatchEvent(recaptchaEvent);
					});
			});
		} else {
			loadRecaptchaScript(executeRecaptcha.bind(this, action));
		}
	}

	function loadRecaptchaScript(callback) {
		let head = document.querySelector('head');
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = callback;
		script.src = 'https://www.google.com/recaptcha/api.js?render=' + sitekey;
		head.appendChild(script);
	}

	if (inputs.length > 0) {
		for (const input of inputs) {
			input.addEventListener('change', () => {
				executeRecaptcha(actions.contactform);
			});
		}
	}
});
