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
	setFooterStyle();
	window.onresize = setFooterStyle;

	$("#nav-link-technology, #technology-list").click(function() {
		$("#technology-list").toggleClass("d-none");
		$("#nav-link-map").toggleClass("d-none");
		//.show(1000);
	});
});
