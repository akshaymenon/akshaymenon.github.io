
(function ($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav = $('#nav');

	if ($nav.length > 0) {

		// Shrink effect.
		$main
			.scrollex({
				mode: 'top',
				enter: function () {
					$nav.addClass('alt');
				},
				leave: function () {
					$nav.removeClass('alt');
				},
			});

		// Links.
		var $nav_a = $nav.find('a');

		$nav_a
			.scrolly({
				speed: 1000,
				offset: function () { return $nav.height(); }
			})
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					initialize: function () {

						// Deactivate section.
						if (browser.canUse('transition'))
							$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($nav_a.filter('.active-locked').length == 0) {

							$nav_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000
	});





	//ExperienceModals

	//RFA Software Engineer 1
	// Get the modal
	var rfaSoftEng1Modal = document.getElementById("rfaSoftEng1Modal");
	// Get the button that opens the modal
	var rfaSoftEng1Item = document.getElementById("rfaSoftEng1");
	// Get the <span> element that closes the modal
	// var rfaSoftEng1ModalCloseSpan = document.getElementById("rfaSoftEng1ModalClose");
	// When the user clicks on the button, open the modal
	rfaSoftEng1Item.onclick = function () {
		rfaSoftEng1Modal.style.display = "-moz-flex";
		rfaSoftEng1Modal.style.display = "-webkit-flex";
		rfaSoftEng1Modal.style.display = "-ms-flex";
		rfaSoftEng1Modal.style.display = "flex";
	}
	// When the user clicks on <span> (x), close the modal
	// rfaSoftEng1ModalCloseSpan.onclick = function() {
	// 	rfaSoftEng1Modal.style.display = "none";
	// }


	
	//Associate Software Engineer
	var assocSoftEngModal = document.getElementById("assocSoftEngModal");
	var assocSoftEngItem = document.getElementById("assocSoftEng");
	// var assocSoftEngModalCloseSpan = document.getElementById("assocSoftEngModalClose");
	assocSoftEngItem.onclick = function () {
		assocSoftEngModal.style.display = "-moz-flex";
		assocSoftEngModal.style.display = "-webkit-flex";
		assocSoftEngModal.style.display = "-ms-flex";
		assocSoftEngModal.style.display = "flex";
	}
	// assocSoftEngModalCloseSpan.onclick = function() {
	// 	assocSoftEngModal.style.display = "none";
	// }

	//Deloitte Internship
	var deloitteInternModal = document.getElementById("deloitteInternModal");
	var deloitteInternItem = document.getElementById("deloitteIntern");
	// var deloitteInternModalCloseSpan = document.getElementById("deloitteInternModalClose");
	deloitteInternItem.onclick = function () {
		deloitteInternModal.style.display = "-moz-flex";
		deloitteInternModal.style.display = "-webkit-flex";
		deloitteInternModal.style.display = "-ms-flex";
		deloitteInternModal.style.display = "flex";
	}
	// deloitteInternModalCloseSpan.onclick = function() {
	// 	deloitteInternModal.style.display = "none";
	// }

	//LTI Internship
	var ltiInternModal = document.getElementById("ltiInternModal");
	var ltiInternItem = document.getElementById("ltiIntern");
	// var ltiInternModalCloseSpan = document.getElementById("ltiInternModalClose");
	ltiInternItem.onclick = function () {
		ltiInternModal.style.display = "-moz-flex";
		ltiInternModal.style.display = "-webkit-flex";
		ltiInternModal.style.display = "-ms-flex";
		ltiInternModal.style.display = "flex";
	}
	// ltiInternModalCloseSpan.onclick = function() {
	// 	ltiInternModal.style.display = "none";
	// }
	
	//Affinity Internship
	var affinityInternModal = document.getElementById("affinityInternModal");
	var affinityInternItem = document.getElementById("affinityIntern");
	// var affinityInternModalCloseSpan = document.getElementById("affinityInternModalClose");
	affinityInternItem.onclick = function () {
		affinityInternModal.style.display = "-moz-flex";
		affinityInternModal.style.display = "-webkit-flex";
		affinityInternModal.style.display = "-ms-flex";
		affinityInternModal.style.display = "flex";
	}
	// affinityInternModalCloseSpan.onclick = function() {
	// 	affinityInternModal.style.display = "none";
	// }


	// When the user clicks anywhere outside of the modal, close it 
	window.onclick = function (event) {
		if (rfaSoftEng1Modal.style.display !== "none") {
			if (event.target == rfaSoftEng1Modal) {
				rfaSoftEng1Modal.style.display = "none";
			}
		}
		if (assocSoftEngModal.style.display !== "none") {
			if (event.target == assocSoftEngModal) {
				assocSoftEngModal.style.display = "none";
			}
		}
		if (deloitteInternModal.style.display !== "none") {
			if (event.target == deloitteInternModal) {
				deloitteInternModal.style.display = "none";
			}
		}
		if (ltiInternModal.style.display !== "none") {
			if (event.target == ltiInternModal) {
				ltiInternModal.style.display = "none";
			}
		}
		if (affinityInternModal.style.display !== "none") {
			if (event.target == affinityInternModal) {
				affinityInternModal.style.display = "none";
			}
		}
	}




})(jQuery);