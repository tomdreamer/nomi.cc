// Dynamic footer that stiks to the bottom of the page
function setFooterStyle() {
	var docHeight = $(window).height();
	var footerHeight = $("footer").outerHeight();
	var footerTop = $("footer").position().top + footerHeight;
	if (footerTop < docHeight) {
		$("footer").css("margin-top", docHeight - footerTop + "px");
	} else {
		$("footer").css("margin-top", "");
	}
	$("footer").removeClass("invisible");
}

$(document).ready(function() {
	// footer vertical align
	setFooterStyle();
	window.onresize = setFooterStyle;

	// navbar animation
	$("#nav-link-technology, #technology-list").click(function() {
		$("#technology-list").toggleClass("d-none");
		$("#nav-link-map").toggleClass("d-none");
		//.show(1000);
	});

	// parralax on item page
	var jumboHeight = $(".jumbotron").outerHeight();
	function parallax() {
		var scrolled = $(window).scrollTop();
		$(".show-workshop-details").css("height", jumboHeight - scrolled + "px");
	}

	$(window).scroll(function(e) {
		parallax();
	});

	// typewriter effect
	var TxtType = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = "";
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = "<span class=\"wrap\">" + this.txt + "</span>";

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

	window.onload = function() {
		var elements = document.getElementsByClassName("typewrite");
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute("data-type");
			var period = elements[i].getAttribute("data-period");
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap {border - right: 0.08em solid #fff}";
		document.body.appendChild(css);
	};
});
