var app = (function() {
	var animateInContainers = [];
	function main() {
		animateInContainers = document.getElementsByClassName("text-animate-container");

		processAnimateContainers();
		setupScrollAnimations();
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

	var topBar = null,
	    headerElem = null;

	// Scroll animation functions
	function setupScrollAnimations() {
		topBar = document.getElementById('topBar');
		headerElem = document.getElementById('firstHeader');

		var rangeController = {
			getRange: function() {
				var start = headerElem.getBoundingClientRect().top + window.pageYOffset - topBar.getBoundingClientRect().bottom;
				return [start / 2, start];
			}
		};

		AddScrollHandler(rangeController, handleTopBarFade);
	};

	function handleTopBarFade(t) {
		var opacity = MathClamp(1 - t, 0 , 1);
		topBar.style.opacity = opacity;

		if (opacity == 0) {
			topBar.style.visibility = "hidden";
		}
		else {
			topBar.style.visibility = "visible";
		}
	};

	function AddScrollHandler (rangeController, cb) {
		function callbacker(e){
			var currentY = window.pageYOffset;
			var range = rangeController.getRange();
			var t = (currentY - range[0]) / (range[1] - range[0]);
			cb(t, currentY);
		}

		window.addEventListener("scroll", callbacker);
		window.addEventListener("resize", callbacker);
	};

	function MathClamp(t, min, max) {
		return Math.min(max, Math.max(min, t));
	};

	return main;
}());

window.onload = app;
