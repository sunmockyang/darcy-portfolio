var app = (function() {
	var w = window;
	var animateInContainers = [];
	function main() {
		animateInContainers = document.getElementsByClassName("animate-container");

		processAnimateContainers();
		setupScrollAnimations();
	}

	// In Animation functions
	function animateInCallback() {
		this.classList.add("animate-end");
	};

	function processAnimateContainers() {
		var delay = 200;
		var delayInterval = 150;
		for (var i = 0; i < animateInContainers.length; i++) {
			var elemToAnimate = animateInContainers[i].getElementsByClassName("text-animate")[0];
			
			if (elemToAnimate) {
				var placeholder = elemToAnimate.cloneNode(true);
				placeholder.classList.remove("text-animate");
				placeholder.classList.add("text-animate-placeholder");
				animateInContainers[i].appendChild(placeholder);

				if (!elemToAnimate.classList.contains("fade-in")) {
					elemToAnimate.style.marginTop = elemToAnimate.getBoundingClientRect().height * 1.5 + "px";
				}
			}
			else {
				// hr tags. Just append the begin/end classes
				animateInContainers[i].classList.add("animate");
				animateInContainers[i].classList.add("animate-container");
				elemToAnimate = animateInContainers[i];
			}
			w.setTimeout(animateInCallback.bind(elemToAnimate), delay);
			delay += delayInterval;
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
				var start = headerElem.getBoundingClientRect().top + w.pageYOffset - topBar.getBoundingClientRect().bottom;
				return [start / 2, start * 0.9];
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
			var currentY = w.pageYOffset;
			var range = rangeController.getRange();
			var t = (currentY - range[0]) / (range[1] - range[0]);
			cb(t, currentY);
		}

		w.addEventListener("scroll", callbacker);
		w.addEventListener("resize", callbacker);
	};

	function MathClamp(t, min, max) {
		return Math.min(max, Math.max(min, t));
	};

	return main;
}());

window.onload = app;
