var app = (function() {
	var animateInContainers = [];
	function main() {
		animateInContainers = document.getElementsByClassName("text-animate-container");

		processAnimateContainers();
	}

	// In Animation functions
	function animateInCallback() {
		this.classList.add("text-animate-end");
	};

	function processAnimateContainers() {
		var delay = 200;
		var delayInterval = 150;
		for (var i = 0; i < animateInContainers.length; i++) {
			var textToAnimate = animateInContainers[i].children[0];
			
			if (textToAnimate) {
				var placeholder = textToAnimate.cloneNode(true);
				placeholder.classList.remove("text-animate");
				placeholder.classList.add("text-animate-placeholder");
				animateInContainers[i].appendChild(placeholder);

				if (!textToAnimate.classList.contains("fade-in")) {
					textToAnimate.style.marginTop = textToAnimate.getBoundingClientRect().height * 1.5 + "px";
				}
				window.setTimeout(animateInCallback.bind(textToAnimate), delay);
				delay += delayInterval;
			}
		}
	};

	return main;
}());

window.onload = app;
