/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (skel.vars.browser == 'ie'		// IE
				||	skel.vars.browser == 'edge'		// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	skel.vars.mobile)				// Mobile devices
					off();

			// Enable everywhere else.
				else {

					skel.on('!large -large', on);
					skel.on('+large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	$(function() {
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$nav = $('#nav'),
			$main = $('#main'),
			$navPanelToggle, $navPanel, $navPanelInner;

		// Disable animations/transitions until the page has loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly();

		// Background.
			$wrapper._parallax(0.925);

		// Nav Panel.

			// Toggle.
				$navPanelToggle = $(
					'<a href="#navPanel" id="navPanelToggle">Menu</a>'
				)
					.appendTo($wrapper);

				// Change toggle styling once we've scrolled past the header.
					$header.scrollex({
						bottom: '5vh',
						enter: function() {
							$navPanelToggle.removeClass('alt');
						},
						leave: function() {
							$navPanelToggle.addClass('alt');
						}
					});

			// Panel.
				$navPanel = $(
					'<div id="navPanel">' +
						'<nav>' +
						'</nav>' +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'right',
						target: $body,
						visibleClass: 'is-navPanel-visible'
					});

				// Get inner.
					$navPanelInner = $navPanel.children('nav');

				// Move nav content on breakpoint change.
					var $navContent = $nav.children();

					skel.on('!medium -medium', function() {

						// NavPanel -> Nav.
							$navContent.appendTo($nav);

						// Flip icon classes.
							$nav.find('.icons, .icon')
								.removeClass('alt');

					});

					skel.on('+medium', function() {

						// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

						// Flip icon classes.
							$navPanelInner.find('.icons, .icon')
								.addClass('alt');

					});

				// Hack: Disable transitions on WP.
					if (skel.vars.os == 'wp'
					&&	skel.vars.osVersion < 10)
						$navPanel
							.css('transition', 'none');

		// Intro.
			var $intro = $('#intro');

			if ($intro.length > 0) {

				// Hack: Fix flex min-height on IE.
					if (skel.vars.browser == 'ie') {
						$window.on('resize.ie-intro-fix', function() {

							var h = $intro.height();

							if (h > $window.height())
								$intro.css('height', 'auto');
							else
								$intro.css('height', h);

						}).trigger('resize.ie-intro-fix');
					}

				// Hide intro on scroll (> small).
					skel.on('!small -small', function() {

						$main.unscrollex();

						$main.scrollex({
							mode: 'bottom',
							top: '25vh',
							bottom: '-50vh',
							enter: function() {
								$intro.addClass('hidden');
							},
							leave: function() {
								$intro.removeClass('hidden');
							}
						});

					});

				// Hide intro on scroll (<= small).
					skel.on('+small', function() {

						$main.unscrollex();

						$main.scrollex({
							mode: 'middle',
							top: '15vh',
							bottom: '-15vh',
							enter: function() {
								$intro.addClass('hidden');
							},
							leave: function() {
								$intro.removeClass('hidden');
							}
						});

				});

			}

	});

    $('#gallery a').magnificPopup({
        items: [
            {
                src: "https://payalb.s3.amazonaws.com/gallery/1.jpg",
                title: "Regional meet for Dr Reddys"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/2.jpg",
                title: "Destination wedding event in Belgaum"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/3.jpg",
                title: "Launch of Clai Brand in Pune in presence of Umesh Kamat, Santosh Juvekar and Swapnil Joshi"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/4.jpg",
                title: "Building Estate Launch of Tirupati Homes in Aurangabad"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/5.jpg",
                title: "Rewards Night for Veiva"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/6.jpg",
                title: "Dandiya event in pune in presence of Zareen Khan"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/7.jpg",
                title: "Rewards Night for Veiva"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/8.jpg",
                title: "Launch of Clai Brand in Pune in presence of Umesh Kamat, Santosh Juvekar and Swapnil Joshi"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/9.jpg",
                title: "Dandiya event in pune in presence of Zareen Khan"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/10.jpg",
                title: "Launch of Clai Brand in Pune in presence of Umesh Kamat, Santosh Juvekar and Swapnil Joshi"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/11.jpg",
                title: "Wedding event in Qatar for the Abbas Family in presence of Pakistani player"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/12.jpg",
                title: "Rewards and recognition Night for Syntel in Mumbai"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/13.jpg",
                title: "Rewards and recognition Night for Syntel in Mumbai"
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/14.jpg",
                title: "Annual meet In Mumbai for Dr Reddys"
            }
        ],
        gallery: {
            enabled: true
        },
        type: 'image' // this is default type
    });

    $('#udaipur').magnificPopup({
        items: [
            {
                src: "https://payalb.s3.amazonaws.com/gallery/udaipur/01.jpg",
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/udaipur/02.jpg",
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/udaipur/03.jpg",
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/udaipur/04.jpg",
            }
        ],
        gallery: {
            enabled: true
        },
        type: 'image' // this is default type
    });

    $('#dy_patil').magnificPopup({
        items: [
            {
                src: "https://payalb.s3.amazonaws.com/gallery/dy_patil/01.jpg",
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/dy_patil/02.jpg",
            },
            {
                src: "https://payalb.s3.amazonaws.com/gallery/dy_patil/03.jpg",
            }
        ],
        gallery: {
            enabled: true
        },
        type: 'image' // this is default type
    });
})(jQuery);


function init() {
    var imgDefer = document.getElementsByTagName('img');
    for (var i=0; i<imgDefer.length; i++) {
        if(imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
        }
    }

    var imgDefer = document.getElementsByClassName('video');
    for (var i=0; i<imgDefer.length; i++) {
        if(imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
        }
    }
}

window.onload = init;
