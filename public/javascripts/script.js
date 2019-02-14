document.addEventListener(
	"DOMContentLoaded",
	() => {
		// console.log('IronGenerator JS imported successfully!');
	},
	false
);

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
});
